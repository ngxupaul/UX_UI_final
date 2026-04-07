# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## ⚡ Quick Start

```bash
# Start dev server (always use --clear)
npx expo start --clear

# Run on Android
npx expo prebuild --platform android --clean
npx expo run:android

# Fix dependency versions
npx expo install --fix

# Check for issues
npx expo-doctor
```

---

## 🔄 Figma → Code Workflow

**When the user says "update from Figma" or "check Figma changes":**

### Option A: Use the Skill (Recommended)

```
@figma-sync <screen-name> <figma-node-id>
```

Example:
```
@figma-sync LoginScreen 20:1080
@figma-sync RegisterScreen 20:1258
@figma-sync Dashboard 20:1423
```

See `~/.claude/skills/figma-sync/SKILL.md` for full skill docs.

### Option B: Manual Workflow

#### Step 1: Get Figma File Key + Node ID

From any Figma URL:
```
https://www.figma.com/design/sSVF9eIvhSd0Xuaw7vZqTx/Untitled?node-id=20:1258
                                   ^fileKey                              ^nodeId
```

#### Step 2: Inspect Figma (in order)

```bash
# 1. Verify connection
mcp__plugin_figma_figma__whoami

# 2. Get structure + exact values
mcp__plugin_figma_figma__get_metadata(nodeId="20:1258", fileKey="sSVF9eIvhSd0Xuaw7vZqTx")

# 3. Get visual reference
mcp__plugin_figma_figma__get_screenshot(nodeId="20:1258", fileKey="sSVF9eIvhSd0Xuaw7vZqTx")
```

#### Step 3: Extract Values from Metadata

From `get_metadata` output, look for:
- `width=382 height=47` → input dimensions
- `text height=32` → fontSize ≈ 28
- `borderRadius=16` → border-radius
- `backgroundColor` → fill colors

#### Step 4: Read Existing Code

```
Read file: src/screens/auth/LoginScreen.tsx
```

#### Step 5: Rebuild Screen

- Copy exact Figma values — don't approximate
- Use `Colors` from `../../theme`
- Use `Ionicons` from `@expo/vector-icons`
- Use `SafeAreaView` from `react-native-safe-area-context`

#### Step 6: Validate

```bash
npx tsc --noEmit
```

Fix any TypeScript errors before finishing.

---

## 🎯 Available Skills

See `~/.claude/skills/SKILLS.md` for the full user guide.

| Command | Purpose |
|---------|---------|
| `@figma-sync` | Sync a screen from Figma to React Native code |
| `@figma-use` | Write directly to Figma files (components, tokens) |
| `@figma-generate-design` | Build pages in Figma from design system |

---

## 📁 Figma Source

**File:** `sSVF9eIvhSd0Xuaw7vZqTx`
**URL:** `https://www.figma.com/design/sSVF9eIvhSd0Xuaw7vZqTx/`

All Figma frames map to one app screen. Key frame IDs:

| Screen | Figma Node ID | Notes |
|--------|--------------|-------|
| Onboarding 1 | `20:1021` | |
| Onboarding 2 | `20:934` | |
| Onboarding 3 | `20:983` | |
| Đăng nhập tài khoản | `20:1080` | Login screen |
| Đăng ký tài khoản mới (v2) | `20:1258` | **Active Register screen** — has role selector (Giáo viên/Học sinh) |
| Khôi phục Mật khẩu | `20:1376` | |
| Dashboard | `20:1423` | |
| Kho đề | `21:1210` | |
| Kho đề - Đang mở | `21:1602` | |
| Kho đề - Bản nháp | `21:1667` | |
| Kho đề - Đã đóng | `21:1738` | |
| Thống kê & Phân tích lớp | `21:1794` | |
| Thêm Câu hỏi | `21:934`, `21:1072` | |
| Chỉnh sửa Câu hỏi | `20:1566`, `26:1622` | |
| Soạn thảo câu hỏi thủ công | `26:1748`, `26:1915` | |
| Phát đề & Chia sẻ | `27:934` | |
| Lớp học | `27:1603` | |
| Thiết lập thông tin đề thi | `27:1705`, `27:1834` | |
| AI Generator | `33:934` | |
| Cài đặt Tài khoản | `26:1506` | |
| Học sinh Làm bài thi | `24:1880`–`26:1018` | Many variants |
| Kết quả Bài thi Học sinh | `26:1186`, `26:1296`, `26:1401` | 3 variants |

---

## 🗂️ App Architecture

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

All screens beyond the main tabs live inside `DashboardStackNavigator`, NOT as tab routes. Use `navigation.popToTop()` to return to the main tab screen.

### Auth Flow
`LoginScreen` and `RegisterScreen` receive `onAuthSuccess?: () => void` as a prop. They call `onAuthSuccess?.()` on successful auth. The `AuthNavigatorWithSuccess` component (in `RootNavigator.tsx`) hooks this to `navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'MainTabs' }] }))` at the root navigator level. **Do not use `navigation.getParent()` or `useNavigation()` inside auth screens** — use the `onAuthSuccess` prop pattern instead.

---

## 🛠️ Tech Stack

- React Native 0.81.5 + Expo SDK 54
- React Navigation v7 (native-stack + bottom-tabs)
- React Native Paper v5 (MD3)
- `@expo/vector-icons` (Ionicons)
- `expo-linear-gradient` — **must use `~15.0.8`**, not v55
- `@react-navigation/native` v7

---

## 📊 State & Data

- No backend — all data is in-memory (hardcoded dummy arrays in each screen).
- Navigation params in `src/types/index.ts` (`RootStackParamList`, `DashboardStackParamList`, etc.).
- `Exam`, `Class`, `Question`, `Student`, `ExamResult` interfaces defined there.

---

## 🎨 Design System

### Colors (`src/theme/colors.ts`)

```ts
import { Colors } from '../theme'; // from screens in subdirs
import { Colors } from '../../theme'; // from deep screen dirs (e.g., screens/thi/)
```

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#21C05D` | Buttons, links, active states |
| `primaryLight` | `#DCFCE7` | Success backgrounds |
| `primaryBg` | `#F0FDF4` | Primary tinted backgrounds |
| `screenBg` | `#F8F9FA` | Screen backgrounds |
| `white` | `#FFFFFF` | Card backgrounds |
| `textPrimary` | `#0F172A` | Headings, body text |
| `textSecondary` | `#64748B` | Subtitles, labels |
| `textMuted` | `#94A3B8` | Placeholder text |
| `gray10` | `#F8FAFC` | Light backgrounds |
| `gray20` | `#E2E8F0` | Borders |
| `gray30` | `#CBD5E1` | Disabled states |
| `gray50` | `#94A3B8` | Icons (muted) |
| `border` | `#E2E8F0` | Card borders |
| `borderLight` | `#F1F5F9` | Dividers |
| `error` | `#EF4444` | Error states |
| `success` | `#21C05D` | Success states |
| `warning` | `#B45309` | Warning states |

### PaperTheme (`src/theme/paperTheme.ts`)
Extends MD3LightTheme with Flazers colors. Wrap app root in `PaperProvider`.

### Components (`src/components/`)
All exported from `src/components/index.ts`:
- `AppHeader` — screen headers (back button + title + optional actions)
- `Button`, `InputField`, `Card`, `Chip`, `Avatar`, `SearchBar`, `Icon`
- `DeleteConfirmDialog` — reusable delete confirmation modal
- `BottomNavBar` — custom bottom navigation bar

---

## ⚠️ Critical Rules

### RN 0.81 Boolean-in-Style Bug
**Never use `condition && styleObject` in JSX `style` props.** React Native 0.81's bridge strictness causes `java.lang.String cannot be cast to java.lang.Boolean` crashes.

```tsx
// ❌ Breaks on RN 0.81
style={[styles.base, condition && styles.active]}

// ✅ Always use ternary
style={condition ? styles.active : styles.base}
```

This applies to ALL conditional style expressions everywhere — StyleSheet.create objects, inline styles, array styles, etc.

### `CommonActions` Import
`CommonActions` for navigation actions (`reset`, `navigate`, `goBack`) must be imported from **`@react-navigation/native`**, NOT from `react-native`.

```tsx
// ✅ Correct
import { CommonActions } from '@react-navigation/native';

// ❌ Wrong — CommonActions is undefined at runtime
import { CommonActions } from 'react-native';
```

### Auth Navigation Pattern
Do NOT use `navigation.getParent()` inside screens rendered by `AuthNavigator`. Use the `onAuthSuccess` callback prop pattern instead.

### Typography & Form Rules (Verified from Figma)

**Always verify against Figma metadata before documenting.** The values below are confirmed from Figma frames.

#### Font Sizes (exact, from Figma text nodes)
| Element | Font Size | Weight | Line Height |
|---------|-----------|--------|-------------|
| Title / Heading 1 | `28px` | `700` | — |
| Heading 2 | `24px` | `700` | — |
| Heading 3 | `20px` | `700` | — |
| Body large | `16px` | `500` | `22` |
| Body | `15px` | `500` | — |
| Input text | `14px` | `400` | — |
| Label (uppercase) | `12px` | `600` | — |
| Caption | `12px` | `500` | — |
| Small | `11px` | `500` | — |

#### Colors (exact, from Figma)
| Token | Hex | Usage |
|-------|-----|-------|
| Text primary | `#0F172A` | Body text, headings |
| Text secondary | `#64748B` | Subtitles, labels |
| Text muted | `#94A3B8` | Placeholders |
| Border gray | `#E2E8F0` | Borders (when present) |
| Light gray | `#F8FAFC` | Button backgrounds |

#### Form Inputs (screen-specific — NOT generic)
| Screen | Height | Border | Border Radius | Background |
|--------|--------|--------|---------------|------------|
| Login (`20:1080`) | `53px` | **None** | `0` | `white` |
| Register (`20:1258`) | `47px` | `1.5px #E2E8F0` | `12px` | `white` |
| Forgot Password (`20:1376`) | `55px` | **None** | `0` | `white` |

> ⚠️ **Do NOT apply generic form rules.** Each screen has different input specs. Always check the specific Figma frame.

#### Buttons
| Element | Height | Border Radius |
|---------|--------|---------------|
| Primary CTA | `52px` or `56px` | `16px` or `24px` (per screen) |
| Social button | `54px` | `24px` |
| Small button | `40px` | `12px` |

---

## 🔐 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@flazers.vn` | `admin123` |
| Teacher | `giaovien@flazers.vn` | `teacher123` |

Quick-fill buttons on the login screen auto-populate these.

---

## 📝 Screen-Specific Notes

### RegisterScreen (`src/screens/auth/RegisterScreen.tsx`)
- **Follows Figma frame `20:1258`** — NOT the old v1 design
- Has **role selector** ("Bạn là ai?") with Giáo viên / Học sinh cards
- Form fields: Họ và tên *, Email *, Mật khẩu * (no confirm password)
- Social login: Google + Facebook buttons
- Header has back button, center divider, "Trợ giúp" button
- Uses `useState<RoleType>` for role selection

### KhoDeDetailScreen (`src/screens/khoDe/KhoDeDetailScreen.tsx`)
- Tab types: `'all'` | `'open'` | `'draft'` | `'closed'`
- `TabKey` union type must include `'all'`
- Exam `status` field: `'open'` | `'draft'` | `'closed'` (NOT `TabKey`)
- `MOCK_EXAMS` key type: `Record<string, ...>` — use string for TS compatibility

### LopHocDetailScreen (`src/screens/lopHoc/LopHocDetailScreen.tsx`)
- Has 3 working tabs: `students` | `exams` | `results`
- Uses `useState` for tab switching — not visual-only
- Shows FlatList for students, empty states for exams/results

### CaiDatScreen (`src/screens/caiDat/CaiDatScreen.tsx`)
- Logout uses `CommonActions.reset()` to navigate to Auth screen
- All menu rows have `onPress` handlers (show development alert)

### SoanThaoCauHoiScreen (`src/screens/thi/SoanThaoCauHoiScreen.tsx`)
- Questions are stored in `useState` (not a const array)
- Delete confirmation removes question from state via `setQuestions`

### AIGeneratorScreen (`src/screens/aiGenerator/AIGeneratorScreen.tsx`)
- "Tạo đề ngay" button navigates to `AILoading` screen

---

## 📦 Adding New Screens

1. Create the screen file in `src/screens/<section>/`
2. Add to `DashboardStackNavigator.tsx` (NOT `MainTabNavigator`)
3. Add navigation type in `src/types/index.ts` (`DashboardStackParamList`)
4. Use `navigation.goBack()` for back, `navigation.popToTop()` to return to dashboard home
