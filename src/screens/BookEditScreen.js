import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Services
import { getBookById, updateBook, deleteBook } from '../services/DatabaseService';

/**
 * BookEditScreen - Écran de détail et d'édition d'un livre
 *
 * Fonctionnalités :
 * - Affiche tous les champs d'un livre depuis la BDD
 * - Permet de modifier chaque champ
 * - Sauvegarde automatique ou manuelle
 * - Possibilité de supprimer le livre
 *
 * @param {Object} route.params.bookId - ID du livre à afficher/éditer
 */
export default function BookEditScreen({ navigation, route }) {
  const { bookId } = route.params;

  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Champs éditables
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [description, setDescription] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [language, setLanguage] = useState('');
  const [categories, setCategories] = useState('');
  const [coverUrl, setCoverUrl] = useState('');

  // Charge le livre depuis la BDD
  useEffect(() => {
    loadBook();
  }, [bookId]);

  const loadBook = () => {
    try {
      const fetchedBook = getBookById(bookId);
      if (fetchedBook) {
        setBook(fetchedBook);
        // Initialise les champs avec les valeurs du livre
        setTitle(fetchedBook.title || '');
        setAuthor(fetchedBook.author || '');
        setIsbn(fetchedBook.isbn || '');
        setDescription(fetchedBook.description || '');
        setPublisher(fetchedBook.publisher || '');
        setPublishedDate(fetchedBook.publishedDate || '');
        setPageCount(fetchedBook.pageCount ? String(fetchedBook.pageCount) : '');
        setLanguage(fetchedBook.language || '');
        setCategories(
          fetchedBook.categories ? fetchedBook.categories.join(', ') : ''
        );
        setCoverUrl(fetchedBook.coverUrl || '');
      }
    } catch (error) {
      console.error('Erreur lors du chargement du livre:', error);
      Alert.alert('Erreur', 'Impossible de charger le livre');
    } finally {
      setIsLoading(false);
    }
  };

  // Marque les changements
  const handleFieldChange = (setter) => (value) => {
    setter(value);
    setHasChanges(true);
  };

  // Sauvegarde les modifications
  const handleSave = () => {
    if (!hasChanges) return;

    setIsSaving(true);
    try {
      const updatedData = {
        title: title.trim(),
        author: author.trim(),
        isbn: isbn.trim() || null,
        description: description.trim() || null,
        publisher: publisher.trim() || null,
        publishedDate: publishedDate.trim() || null,
        pageCount: pageCount ? parseInt(pageCount, 10) : null,
        language: language.trim() || null,
        categories: categories
          .split(',')
          .map((c) => c.trim())
          .filter((c) => c.length > 0),
        coverUrl: coverUrl.trim() || null,
      };

      updateBook(bookId, updatedData);
      setHasChanges(false);
      Alert.alert('Succès', 'Livre mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      Alert.alert('Erreur', 'Impossible de sauvegarder les modifications');
    } finally {
      setIsSaving(false);
    }
  };

  // Supprime le livre
  const handleDelete = () => {
    Alert.alert(
      'Supprimer le livre',
      'Êtes-vous sûr de vouloir supprimer ce livre de votre bibliothèque ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            try {
              deleteBook(bookId);
              navigation.navigate('Library');
            } catch (error) {
              console.error('Erreur lors de la suppression:', error);
              Alert.alert('Erreur', 'Impossible de supprimer le livre');
            }
          },
        },
      ]
    );
  };

  // Retour avec confirmation si changements non sauvegardés
  const handleBack = () => {
    if (hasChanges) {
      Alert.alert(
        'Modifications non sauvegardées',
        'Voulez-vous sauvegarder vos modifications avant de quitter ?',
        [
          { text: 'Annuler', style: 'cancel' },
          {
            text: 'Ne pas sauvegarder',
            style: 'destructive',
            onPress: () => navigation.goBack(),
          },
          {
            text: 'Sauvegarder',
            onPress: () => {
              handleSave();
              navigation.goBack();
            },
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-500">Chargement...</Text>
      </SafeAreaView>
    );
  }

  if (!book) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
        <Text className="text-gray-700 text-lg mt-4">Livre non trouvé</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="mt-6 bg-blue-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Retour</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
          <TouchableOpacity onPress={handleBack} className="p-2">
            <Ionicons name="arrow-back" size={24} color="#1f2937" />
          </TouchableOpacity>

          <Text className="text-lg font-semibold text-gray-800">
            Détail du livre
          </Text>

          <TouchableOpacity
            onPress={handleSave}
            disabled={!hasChanges || isSaving}
            className={`p-2 ${hasChanges ? 'opacity-100' : 'opacity-40'}`}
          >
            <Text
              className={`font-semibold ${hasChanges ? 'text-blue-500' : 'text-gray-400'}`}
            >
              {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="p-4">
            {/* Couverture */}
            <View className="items-center mb-6">
              {coverUrl ? (
                <Image
                  source={{ uri: coverUrl }}
                  style={{ width: 150, height: 220 }}
                  resizeMode="contain"
                />
              ) : (
                <View
                  className="bg-gray-200 items-center justify-center rounded-lg"
                  style={{ width: 150, height: 220 }}
                >
                  <Ionicons name="book-outline" size={48} color="#9ca3af" />
                </View>
              )}
            </View>

            {/* Champs éditables */}
            <View className="space-y-4">
              {/* Titre */}
              <View>
                <Text className="text-sm font-medium text-gray-600 mb-1">
                  Titre *
                </Text>
                <TextInput
                  value={title}
                  onChangeText={handleFieldChange(setTitle)}
                  placeholder="Titre du livre"
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                />
              </View>

              {/* Auteur */}
              <View className="mt-4">
                <Text className="text-sm font-medium text-gray-600 mb-1">
                  Auteur
                </Text>
                <TextInput
                  value={author}
                  onChangeText={handleFieldChange(setAuthor)}
                  placeholder="Nom de l'auteur"
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                />
              </View>

              {/* ISBN */}
              <View className="mt-4">
                <Text className="text-sm font-medium text-gray-600 mb-1">
                  ISBN
                </Text>
                <TextInput
                  value={isbn}
                  onChangeText={handleFieldChange(setIsbn)}
                  placeholder="ISBN-10 ou ISBN-13"
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                  keyboardType="numeric"
                />
              </View>

              {/* Description */}
              <View className="mt-4">
                <Text className="text-sm font-medium text-gray-600 mb-1">
                  Description
                </Text>
                <TextInput
                  value={description}
                  onChangeText={handleFieldChange(setDescription)}
                  placeholder="Résumé du livre"
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  style={{ minHeight: 100 }}
                />
              </View>

              {/* Éditeur */}
              <View className="mt-4">
                <Text className="text-sm font-medium text-gray-600 mb-1">
                  Éditeur
                </Text>
                <TextInput
                  value={publisher}
                  onChangeText={handleFieldChange(setPublisher)}
                  placeholder="Nom de l'éditeur"
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                />
              </View>

              {/* Date de publication */}
              <View className="mt-4">
                <Text className="text-sm font-medium text-gray-600 mb-1">
                  Date de publication
                </Text>
                <TextInput
                  value={publishedDate}
                  onChangeText={handleFieldChange(setPublishedDate)}
                  placeholder="ex: 2024 ou 15/03/2024"
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                />
              </View>

              {/* Nombre de pages */}
              <View className="mt-4">
                <Text className="text-sm font-medium text-gray-600 mb-1">
                  Nombre de pages
                </Text>
                <TextInput
                  value={pageCount}
                  onChangeText={handleFieldChange(setPageCount)}
                  placeholder="ex: 350"
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                  keyboardType="numeric"
                />
              </View>

              {/* Langue */}
              <View className="mt-4">
                <Text className="text-sm font-medium text-gray-600 mb-1">
                  Langue
                </Text>
                <TextInput
                  value={language}
                  onChangeText={handleFieldChange(setLanguage)}
                  placeholder="ex: fr, en"
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                />
              </View>

              {/* Catégories */}
              <View className="mt-4">
                <Text className="text-sm font-medium text-gray-600 mb-1">
                  Catégories
                </Text>
                <TextInput
                  value={categories}
                  onChangeText={handleFieldChange(setCategories)}
                  placeholder="Fiction, Fantasy, Roman (séparés par des virgules)"
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                />
              </View>

              {/* URL de couverture */}
              <View className="mt-4">
                <Text className="text-sm font-medium text-gray-600 mb-1">
                  URL de la couverture
                </Text>
                <TextInput
                  value={coverUrl}
                  onChangeText={handleFieldChange(setCoverUrl)}
                  placeholder="https://..."
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                  autoCapitalize="none"
                  keyboardType="url"
                />
              </View>

              {/* Métadonnées (lecture seule) */}
              <View className="mt-6 pt-4 border-t border-gray-200">
                <Text className="text-sm text-gray-400">
                  Ajouté le : {book.createdAt || 'Non disponible'}
                </Text>
                {book.updatedAt && book.updatedAt !== book.createdAt && (
                  <Text className="text-sm text-gray-400 mt-1">
                    Modifié le : {book.updatedAt}
                  </Text>
                )}
              </View>

              {/* Bouton Supprimer */}
              <TouchableOpacity
                onPress={handleDelete}
                className="mt-6 mb-8 bg-red-50 border border-red-200 rounded-lg py-3 items-center"
                activeOpacity={0.8}
              >
                <View className="flex-row items-center">
                  <Ionicons name="trash-outline" size={20} color="#ef4444" />
                  <Text className="text-red-500 font-semibold ml-2">
                    Supprimer ce livre
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
