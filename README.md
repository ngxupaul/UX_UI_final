# Flazers — Mobile Exam Management App

> A React Native (Expo) mobile application for teachers to create, manage, and distribute exams to students. Built from a Figma design prototype.

---

## 📱 App Overview

Flazers is a Vietnamese-language mobile app for exam management. Teachers can create exam banks, write questions manually or with AI assistance, distribute exams to classes, and view analytics. Students can take exams and see results.

Figma reference map: see [`docs/figma-page-map.md`](./docs/figma-page-map.md) for the latest page sorting by `teacher`, `student`, `shared`, and `draft` screens.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- **Android Studio** (for Android builds) or an Android device/emulator
- **Expo CLI** (included via npx)

### Installation

```bash
cd FlazersApp

# Install dependencies (already done)
npm install

# Install correct Expo SDK 54 compatible packages (already done)
npx expo install --fix

# Start development server
npx expo start
```

### Running on Device

```bash
# Android
npx expo run:android

# With clean native rebuild
npx expo prebuild --platform android --clean
npx expo run:android
```

### Expo Dev Client (recommended for fast reload)

```bash
npx expo start --dev-client
# Then press 'i' for iOS or 'a' for Android
```

---

## 🔑 Demo Credentials

No backend required — login uses hardcoded dummy accounts.

| Role | Email | Password |
|------|-------|----------|
| 👑 **Admin** | `admin@flazers.vn` | `admin123` |
| 🧑‍🏫 **Teacher** | `giaovien@flazers.vn` | `teacher123` |
| 🧑‍🎓 **Student** | `hocsinh@flazers.vn` | `student123` |

The login screen now defaults to the **Student** demo account and also provides quick-fill chips for **Học sinh**, **Giáo viên**, and **Admin**.

Inside **Cài đặt**, the app also includes a local role switcher so you can swap between teacher and student dummy datasets without any database or backend.

---

## 🗂️ App Structure

```
FlazersApp/
├── App.tsx                         # Root entry point
├── src/
│   ├── theme/
│   │   ├── colors.ts               # Design system colors (from Figma)
│   │   └── paperTheme.ts          # React Native Paper MD3 theme
│   ├── types/
│   │   └── index.ts               # Navigation & data type definitions
│   ├── components/                 # Reusable UI components
│   │   ├── Avatar.tsx             # Avatar with initials or image
│   │   ├── BottomNavBar.tsx       # Bottom tab bar
│   │   ├── Button.tsx             # Primary/secondary/outline button
│   │   ├── Card.tsx               # Container card with elevation
│   │   ├── Chip.tsx               # Filter/status chip
│   │   ├── DeleteConfirmDialog.tsx  # Reusable delete confirmation modal
│   │   ├── Header.tsx             # Screen header with back/action
│   │   ├── Icon.tsx               # Typed icon wrapper
│   │   ├── InputField.tsx         # Text input with label/error
│   │   └── SearchBar.tsx          # Search input
│   ├── navigation/
│   │   ├── RootNavigator.tsx      # Top-level: Onboarding → Auth / MainTabs
│   │   ├── AuthNavigator.tsx      # Login → Register → ForgotPassword
│   │   ├── MainTabNavigator.tsx   # 4-tab bottom navigation
│   │   └── DashboardStackNavigator.tsx  # All detail screens
│   └── screens/
│       ├── onboarding/
│       │   └── OnboardingScreen.tsx    # 3-step intro carousel
│       ├── auth/
│       │   ├── LoginScreen.tsx         # Login with demo buttons
│       │   ├── RegisterScreen.tsx     # Registration form
│       │   └── ForgotPasswordScreen.tsx
│       ├── dashboard/
│       │   └── DashboardScreen.tsx    # Home: stats, quick actions, recent exams
│       ├── khoDe/
│       │   ├── KhoDeScreen.tsx         # Exam bank: search + tabs (open/draft/closed)
│       │   └── KhoDeDetailScreen.tsx   # Filtered exam list per status
│       ├── lopHoc/
│       │   ├── LopHocScreen.tsx        # Class management list
│       │   └── LopHocDetailScreen.tsx  # Class detail with students
│       ├── aiGenerator/
│       │   └── AIGeneratorScreen.tsx    # AI prompt input → generated questions
│       ├── thi/
│       │   ├── TaoDeThiScreen.tsx       # Create exam: title, subject, grade
│       │   ├── SoanThaoCauHoiScreen.tsx # Question list with add/edit
│       │   ├── ThemCauHoiScreen.tsx     # Add question: type, options, correct answer
│       │   ├── ChinhSuaCauHoiScreen.tsx  # Edit existing question
│       │   ├── PhatDeScreen.tsx         # Share/distribute exam (QR, link, class)
│       │   ├── ThietLapDeThiScreen.tsx   # Exam settings (time, pass score, shuffle)
│       │   ├── HocSinhLamBaiScreen.tsx   # Student exam-taking interface
│       │   └── KetQuaBaiThiScreen.tsx   # Student result: score, breakdown
│       ├── thongKe/
│       │   └── ThongKeScreen.tsx         # Analytics: stats grid, bar charts, class breakdown
│       └── caiDat/
│           └── CaiDatScreen.tsx           # Settings: profile, notifications, logout
```

---

## 📐 Design System

Derived directly from the Figma prototype (`sSVF9eIvhSd0Xuaw7vZqTx`).

| Token | Value | Usage |
|-------|-------|--------|
| Primary | `#21C05D` | Buttons, links, active states |
| Primary Light | `#DCFCE7` | Success backgrounds, chip fills |
| Screen BG | `#F8F9FA` | All screen backgrounds |
| Overlay Green | `rgba(220,252,231,0.5)` | Decorative blobs on auth screens |
| Text Primary | `#000000` | Headings, body text |
| Text Secondary | `#6C757D` | Subtitles, labels |
| Border | `#DEE2E6` | Card borders, dividers |

---

## 🧭 Navigation Architecture

```
RootNavigator (native-stack)
├── SplashScreen              (auto-transitions to Onboarding after 3s)
├── OnboardingScreen         (3-step carousel)
├── Auth (stack)
│   └── AuthNavigator
│       ├── LoginScreen      ← demo credentials here
│       ├── RegisterScreen
│       └── ForgotPasswordScreen
└── DashboardStackNavigator (stack)
     └── MainTabNavigator (bottom-tabs)
    ├── DashboardTab → DashboardScreen
    │                → KhoDeDetailScreen
    │                → TaoDeThiScreen
    │                → SoanThaoCauHoiScreen
    │                → ThemCauHoiScreen
    │                → ChinhSuaCauHoiScreen
    │                → PhatDeScreen
    │                → ThietLapDeThiScreen
    │                → AIGeneratorScreen
    │                → ThongKeScreen
    ├── KhoDeTab → KhoDeScreen
    │            → KhoDeDetailScreen
    │            → SoanThaoCauHoiScreen
    │            → ThemCauHoiScreen
    │            → ChinhSuaCauHoiScreen
    │            → PhatDeScreen
    ├── LopHocTab → LopHocScreen
    │            → LopHocDetailScreen
    │            → HocSinhLamBaiScreen
    │            → KetQuaBaiThiScreen
    └── CaiDatTab → CaiDatScreen
```

---

## 🎯 Screen Summary

| # | Screen | Description |
|---|--------|-------------|
| 1 | Onboarding | 3-step intro with feature highlights |
| 2 | Login | Email/password + demo quick-fill buttons |
| 3 | Register | Name, email, password, confirm |
| 4 | Forgot Password | Email → reset link (simulated) |
| 5 | Dashboard | Stats cards, quick actions, recent exams |
| 6 | Kho Đề | Exam bank with Open/Draft/Closed tabs + search |
| 7 | Kho Đề Detail | Filtered list per exam status |
| 8 | Tạo Đề Thi | New exam: name, subject, grade, duration |
| 9 | Soạn Thảo Câu Hỏi | Question list with add/AI/edit actions |
| 10 | Thêm Câu Hỏi | Add question: type, options, correct answer |
| 11 | Chỉnh Sửa Câu Hỏi | Edit/delete existing question |
| 12 | Phát Đề & Chia Sẻ | Share via link, QR code, or class |
| 13 | Thiết Lập Đề Thi | Exam settings: shuffle, time, pass score |
| 14 | AI Generator | Prompt input → AI-generated questions |
| 15 | Thống Kê | Analytics: stats, score distribution, class grades |
| 16 | Lớp Học | Class list with student/exam counts |
| 17 | Lớp Học Detail | Student list with submission status |
| 18 | Học Sinh Làm Bài | Student exam-taking UI with progress bar |
| 19 | Kết Quả Bài Thi | Score circle, breakdown, retry/share |
| 20 | Cài Đặt | Profile, settings menu, logout |

---

## 🧩 Key Features

| Feature | Screen | Notes |
|---------|---------|-------|
| Exam bank management | Kho Đề | Filter by Open/Draft/Closed |
| Manual exam creation | Tạo Đề Thi | Subject, grade, duration |
| AI question generation | AI Generator | Prompt-based, simulated output |
| Manual question editing | Soạn Thảo / Thêm / Chỉnh Sửa | Multiple choice + essay |
| Exam distribution | Phát Đề | Link, QR code, class assignment |
| Student exam taking | Học Sinh Làm Bài | Progress tracking, answer selection |
| Result viewing | Kết Quả Bài Thi | Score, correct/incorrect breakdown |
| Class management | Lớp Học | Student list, submission tracking |
| Analytics | Thống Kê | Score distribution, per-class stats |

---

## 📦 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React Native (Expo) | SDK 54 |
| Language | TypeScript | ~5.9 |
| Navigation | React Navigation | v7 |
| UI Components | React Native Paper | v5 |
| Icons | @expo/vector-icons (Ionicons) | bundled |
| Gestures | react-native-gesture-handler | ~2.28 |
| Screens | react-native-screens | ~4.16 |
| Safe Area | react-native-safe-area-context | ~5.6 |

---

## ⚠️ Common Issues & Fixes

### `java.lang.String cannot be cast to java.lang.Boolean`
**Cause:** React Native 0.81 bridge is strict about boolean casting.
**Fix:** Never use `condition && styleObject` in JSX style props. Always use ternary:
```tsx
// ❌ Crashes on RN 0.81
style={[styles.base, condition && styles.active]}

// ✅ Safe
style={condition ? styles.active : styles.base}
```

### `Cannot read property 'reset' of undefined`
**Cause:** `CommonActions` imported from `react-native` instead of `@react-navigation/native`.
**Fix:** Always import from `@react-navigation/native`:
```tsx
// ✅ Correct
import { CommonActions } from '@react-navigation/native';
// ❌ Wrong — CommonActions is undefined at runtime
import { CommonActions } from 'react-native';
```

### Auth screens: `navigation.getParent()` returns undefined
**Cause:** Parent reference is unreliable from inside nested `AuthNavigator`.
**Fix:** Use the `onAuthSuccess` callback prop pattern — see `AuthNavigatorWithSuccess` in `RootNavigator.tsx`.

### `expo-linear-gradient` version mismatch
**Cause:** Wrong version installed (v55 vs SDK 54 requirement).
**Fix:** Run `npx expo install --fix` to install correct versions.

### Package version errors
**Fix:**
```bash
npx expo install --fix
npx expo-doctor
# All 17/17 checks must pass
```

---

## 📝 Adding New Screens

1. Create the screen file in `src/screens/<section>/`
2. Add to `DashboardStackNavigator.tsx` (NOT `MainTabNavigator`)
3. Add navigation type in `src/types/index.ts` (`DashboardStackParamList`)
4. Use `navigation.goBack()` for back, `navigation.popToTop()` to return to dashboard home

---

## 📂 Source Figma File

**URL:** `https://www.figma.com/design/sSVF9eIvhSd0Xuaw7vZqTx/`
**Screens:** 93 nodes — 20 unique screens implemented

| Figma Screens | → | App Screen |
|---|---|---|
| Onboarding 1–3 | → | `OnboardingScreen` |
| Đăng nhập | → | `LoginScreen` |
| Đăng ký ×2 | → | `RegisterScreen` |
| Khôi phục mật khẩu | → | `ForgotPasswordScreen` |
| Dashboard | → | `DashboardScreen` |
| Kho đề (3 tabs) | → | `KhoDeScreen` + `KhoDeDetailScreen` |
| AI Generator ×2 | → | `AIGeneratorScreen` |
| Tạo đề thủ công | → | `TaoDeThiScreen` |
| Soạn thảo câu hỏi thủ công | → | `SoanThaoCauHoiScreen` |
| Thêm Câu hỏi ×2 | → | `ThemCauHoiScreen` |
| Chỉnh sửa Câu hỏi ×2 | → | `ChinhSuaCauHoiScreen` |
| Phát đề & Chia sẻ | → | `PhatDeScreen` |
| Thiết lập thông tin đề thi ×2 | → | `ThietLapDeThiScreen` |
| Học sinh Làm bài thi ×12 | → | `HocSinhLamBaiScreen` |
| Kết quả Bài thi ×3 | → | `KetQuaBaiThiScreen` |
| Thống kê & Phân tích | → | `ThongKeScreen` |
| Lớp học | → | `LopHocScreen` + `LopHocDetailScreen` |
| Cài đặt Tài khoản | → | `CaiDatScreen` |

---

## 📄 License

This is a student project built for academic purposes. The Figma design and React Native implementation are for demonstration only.
