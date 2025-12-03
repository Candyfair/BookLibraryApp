# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BookLibraryApp is an Expo-based React Native mobile application (iOS/Android/Web) for managing a personal book library. The app uses React Native's new architecture and is styled with NativeWind (TailwindCSS for React Native).

## Development Commands

### Starting the App
```bash
npm start              # Start Expo development server
npm run android        # Start with Android emulator
npm run ios            # Start with iOS simulator
npm run web            # Start web version
```

### Important Notes
- Always use `--legacy-peer-deps` flag when installing new packages due to React 19.1.0 compatibility
- Clear cache with `npx expo start --clear` after configuration changes

## Architecture

### Technology Stack
- **Framework**: Expo ~54.0.25 with React Native 0.81.5 (new architecture enabled)
- **React Version**: 19.1.0
- **Navigation**: Expo Router 6.0.15 (file-based routing with Tabs)
- **Styling**: NativeWind 4.2.1 (TailwindCSS for React Native)
- **Storage**: expo-sqlite (for main database), AsyncStorage (for simple key-value)
- **Authentication**: Google Sign-In and Apple Authentication libraries included
- **Additional Features**: Barcode scanning via expo-barcode-scanner
- **Animations**: react-native-reanimated@~3.10.1 (installed but Babel plugin disabled)

### Project Structure
```
app/                      # Expo Router - File-based navigation
├── (tabs)/               # Tab Navigator (main navigation)
│   ├── _layout.js        # Tabs configuration
│   ├── index.js          # Home screen (search + scan)
│   ├── library.js        # Library screen (book grid)
│   ├── stats.js          # Statistics screen
│   └── profile.js        # Profile screen (auth)
├── book/
│   └── [id].js           # Dynamic book detail screen
├── scan.js               # ISBN scanner modal
├── _layout.js            # Root layout (Stack Navigator)
└── +not-found.js         # 404 screen

src/
├── components/           # Reusable UI components
│   ├── common/           # Generic components (Button, Header, Input, etc.)
│   ├── book/             # Book-related components (BookCard, BookGrid, etc.)
│   ├── scan/             # Scanner components
│   └── stats/            # Statistics components
├── services/             # Business logic & APIs
│   ├── database/         # SQLite (DatabaseService, schema)
│   ├── api/              # External APIs (Google Books, OpenLibrary, normalizer)
│   ├── BookService.js    # Book business logic
│   ├── AuthService.js    # Authentication logic
│   └── StatsService.js   # Statistics calculations
├── hooks/                # Custom React hooks
│   ├── useBooks.js
│   ├── useAuth.js
│   ├── useStats.js
│   └── useScanner.js
├── utils/                # Utility functions
│   ├── constants.js
│   ├── validators.js
│   └── formatters.js
└── contexts/             # React Contexts (if needed)
    ├── AuthContext.js
    └── BookContext.js
```

### Navigation Architecture
- **Expo Router** with file-based routing
- **Root Stack** (`app/_layout.js`): Wraps the entire app
- **Tabs Navigator** (`app/(tabs)/_layout.js`): Main navigation with 4 tabs
- **Modals**: Scan screen presented as modal
- **Dynamic Routes**: `/book/[id]` for book details

### Styling Approach
- Uses NativeWind 4.x with official preset
- TailwindCSS configured to scan `./app/**/*.{js,jsx,ts,tsx}` and `./src/**/*.{js,jsx,ts,tsx}`
- Global styles defined in `global.css`
- Apply classes using `className` prop with NativeWind
- Metro bundler configured via `metro.config.js` for NativeWind integration

### Entry Point
- `index.js` imports `expo-router/entry` for file-based routing
- `app/_layout.js` is the root layout component
- App configuration in `app.json` (splash screen, icons, platform-specific settings, Expo Router plugin)

## Key Dependencies

### Navigation
- `expo-router@~6.0.15` - File-based navigation
- `react-native-screens` - Native screen primitives
- `react-native-safe-area-context` - Safe area handling
- `react-native-gesture-handler` - Gesture system

### Styling
- `nativewind@^4.2.1` - TailwindCSS for React Native
- `tailwindcss@^3.4.17` - TailwindCSS core
- `react-native-reanimated@~3.10.1` - Required by NativeWind (Babel plugin disabled)

### Authentication
- `@react-native-google-signin/google-signin` - Google OAuth integration
- `@invertase/react-native-apple-authentication` - Apple Sign-In integration

### Storage & State
- `expo-sqlite` - Local SQLite database for books
- `@react-native-async-storage/async-storage` - Simple key-value storage

### UI & Features
- `expo-barcode-scanner` - ISBN scanning capability
- `expo-splash-screen` - Splash screen management
- `expo-font` - Custom fonts loading
- `@expo/vector-icons` - Ionicons icon set
- `axios` - HTTP client for API requests

## Configuration Files

### babel.config.js
- Configured with `babel-preset-expo` and NativeWind support
- `reanimated: false` to disable reanimated Babel plugin (avoiding dependency issues)
- `jsxImportSource: "nativewind"` for NativeWind support

### metro.config.js
- Configured with `withNativeWind` for NativeWind CSS processing
- `inlineRem: false` to avoid reanimated dependencies in CSS transforms

### tailwind.config.js
- Uses official `nativewind/preset`
- Scans `app/` and `src/` directories for Tailwind classes

## Important Notes

### Dependency Management
- Always use `npm install --legacy-peer-deps` due to React 19.1.0
- `react-native-reanimated` is installed but Babel plugin is disabled
- This setup allows NativeWind to work without full reanimated integration

### Navigation Best Practices
- Use Tabs for main navigation (simpler than Drawer, no reanimated dependency)
- Use `router.push()` from `expo-router` for programmatic navigation
- Modal screens use `presentation: 'modal'` in Stack.Screen options

### Styling Best Practices
- Use NativeWind className prop for styling
- Dark mode support via `useColorScheme()` hook
- Consistent color palette defined in tab layouts
