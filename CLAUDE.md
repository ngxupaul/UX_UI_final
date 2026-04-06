# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Common Commands

```bash
# Start development server (always use --clear to avoid stale cache issues)
npx expo start --clear

# Run on Android
npx expo prebuild --platform android --clean
npx expo run:android

# Fix dependency versions after package.json changes
npx expo install --fix

# Check for issues
npx expo-doctor
```

---

## Architecture

### Navigation Hierarchy (3 levels)
```
RootNavigator (native-stack)
├── Splash
├── Onboarding
├── AuthNavigator (native-stack)
│    └── Login / Register / ForgotPassword
└── DashboardStackNavigator (native-stack)
     └── MainTabNavigator (bottom-tabs, 5 tabs)
         ├── DashboardTab → DashboardScreen
         │    └── All exam/question screens via stack
         ├── KhoDeTab → KhoDeScreen → KhoDeDetailScreen
         ├── LopHocTab → LopHocScreen → LopHocDetailScreen
         ├── ThongKeTab → ThongKeScreen
         └── CaiDatTab → CaiDatScreen
```

All screens beyond the main tabs live inside `DashboardStackNavigator`, not as tab routes. Use `navigation.popToTop()` to return to the main tab screen.

### Auth Flow
`LoginScreen` and `RegisterScreen` receive `onAuthSuccess?: () => void` as a prop. They call `onAuthSuccess?.()` on successful auth. The `AuthNavigatorWithSuccess` component (in `RootNavigator.tsx`) hooks this to `navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'MainTabs' }] }))` at the root navigator level. **Do not use `navigation.getParent()` or `useNavigation()` inside auth screens** — use the `onAuthSuccess` prop pattern instead.

---

## Tech Stack

- React Native 0.81.5 + Expo SDK 54
- React Navigation v7 (native-stack + bottom-tabs)
- React Native Paper v5 (MD3)
- `@expo/vector-icons` (Ionicons)
- `expo-linear-gradient` — **must use `~15.0.8`**, not v55
- `@react-navigation/native` v7

---

## State & Data

- No backend — all data is in-memory (hardcoded dummy arrays in each screen).
- Navigation params in `src/types/index.ts` (`RootStackParamList`, `DashboardStackParamList`, etc.).
- `Exam`, `Class`, `Question`, `Student`, `ExamResult` interfaces defined there.

---

## Design System

### Colors (`src/theme/colors.ts`)
Figma token: `sSVF9eIvhSd0Xuaw7vZqTx`

```ts
import { Colors } from '../theme'; // from screens/components
import { Colors } from '../../theme'; // from deep screen dirs
```

Key palette:
- Primary green: `#21C05D` (`Colors.primary`)
- Background: `#F8F9FA` (`Colors.screenBg`), `#FFFFFF` (`Colors.white`)
- Text: `#0F172A` (primary), `#64748B` (secondary), `#94A3B8` (muted)
- Semantic: `success`, `warning`, `info`, `error`

### PaperTheme (`src/theme/paperTheme.ts`)
Extends MD3LightTheme with Flazers colors. Wrap app root in `PaperProvider`.

### Components (`src/components/`)
All exported from `src/components/index.ts`:
- `AppHeader` — screen headers (back button + title + optional actions)
- `Button`, `InputField`, `Card`, `Chip`, `Avatar`, `SearchBar`, `Icon`
- `DeleteConfirmDialog` — reusable delete confirmation modal
- `BottomNavBar` — custom bottom navigation bar

---

## Critical Rules

### ⚠️ RN 0.81 Boolean-in-Style Bug
**Never use `condition && styleObject` in JSX `style` props.** React Native 0.81's bridge strictness causes `java.lang.String cannot be cast to java.lang.Boolean` crashes.

```tsx
// ❌ Breaks on RN 0.81
style={[styles.base, condition && styles.active]}

// ✅ Always use ternary
style={condition ? styles.active : styles.base}
```

This applies to ALL conditional style expressions everywhere — StyleSheet.create objects, inline styles, array styles, etc.

### ⚠️ `CommonActions` Import
`CommonActions` for navigation actions (`reset`, `navigate`, `goBack`) must be imported from **`@react-navigation/native`**, NOT from `react-native`. Importing from the wrong place causes `Cannot read property 'reset' of undefined`.

```tsx
// ✅ Correct
import { CommonActions } from '@react-navigation/native';

// ❌ Wrong — CommonActions is undefined at runtime
import { CommonActions } from 'react-native';
```

### ⚠️ Auth Navigation Pattern
Do NOT use `navigation.getParent()` inside screens rendered by `AuthNavigator`. The parent reference is unreliable in nested navigators. Use the `onAuthSuccess` callback prop pattern documented above instead.

---

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@flazers.vn` | `admin123` |
| Teacher | `giaovien@flazers.vn` | `teacher123` |

Quick-fill buttons on the login screen auto-populate these.

---

## Source Figma

File: `sSVF9eIvhSd0Xuaw7vZqTx` | URL: `https://www.figma.com/design/sSVF9eIvhSd0Xuaw7vZqTx/`

Contains 91 screens. Each Figma frame maps to one app screen. See `README.md` for full screen → file mapping.
