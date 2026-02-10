import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * StarRating - Composant de notation par étoiles
 *
 * @param {number} rating - Note actuelle (1-5, null si non noté)
 * @param {Function} onRatingChange - Callback appelé avec la nouvelle note
 * @param {boolean} disabled - Désactive les interactions
 * @param {number} size - Taille des étoiles (défaut: 24)
 * @param {string} color - Couleur des étoiles pleines (défaut: #f59e0b - amber-500)
 */
export default function StarRating({
  rating = null,
  onRatingChange,
  disabled = false,
  size = 24,
  color = '#f59e0b',
}) {
  const handlePress = (star) => {
    if (disabled || !onRatingChange) return;
    // Si on clique sur la même étoile, on désélectionne
    if (rating === star) {
      onRatingChange(null);
    } else {
      onRatingChange(star);
    }
  };

  return (
    <View className="flex-row">
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => handlePress(star)}
          disabled={disabled}
          activeOpacity={disabled ? 1 : 0.7}
          className="mr-1"
        >
          <Ionicons
            name={rating && star <= rating ? 'star' : 'star-outline'}
            size={size}
            color={rating && star <= rating ? color : '#d1d5db'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}
