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

**114 frames total** on Page 1. Each app screen maps to one Figma frame. The file is a Vietnamese exam/grading teacher app.

---

## Screen → Figma Frame Mapping

Use these node IDs with `get_design_context` and `get_screenshot`:

| App Screen | Figma Frame Node | Notes |
|---|---|---|
| `OnboardingScreen` | `47:1276` (Onboarding 2: Chấm điểm tự động) | Full 430×932 phone mockup — matches Figma ✅ |
| `LoginScreen` | `47:1284` (Đăng nhập tài khoản) | Matches Figma ✅ |
| `RegisterScreen` | `47:1284` (Đăng ký tài khoản mới) | Matches Figma ✅ |
| `ForgotPasswordScreen` | `47:1284` (Khôi phục Mật khẩu) | Matches Figma ✅ |
| `DashboardScreen` | `47:1284` (Dashboard) | Matches Figma ✅ |
| `KhoDeScreen` | `47:1284` (Kho đề) | Matches Figma ✅ |
| `KhoDeDetailScreen` | `47:1284` (Kho đề - Đang mở) | Matches Figma ✅ |
| `LopHocScreen` | `47:1284` (Lớp học) | Matches Figma ✅ |
| `LopHocDetailScreen` | `47:1284` | Matches Figma ✅ |
| `ThongKeScreen` | `47:1284` (Thống kê & Phân tích lớp) | Matches Figma ✅ |
| `AIGeneratorScreen` | `47:1284` (AI Generator) | Matches Figma ✅ |
| `AILoadingScreen` | `47:1284` | Header fixed (was English "Editorial Intelligence") ✅ |
| `TaoDeThiScreen` | `47:1284` (Tạo đề thủ công) | Matches Figma ✅ |
| `SoanThaoCauHoiScreen` | `47:1284` | Matches Figma ✅ |
| `ChinhSuaCauHoiScreen` | `47:1284` | Matches Figma ✅ |
| `ThemCauHoiScreen` | `47:1284` | Matches Figma ✅ |
| `HocSinhLamBaiScreen` | `47:1284` (Học sinh Làm bài thi) | Matches Figma ✅ |
| `KetQuaBaiThiScreen` | `47:1284` (Kết quả Bài thi Học sinh) | Matches Figma ✅ |
| `ThietLapDeThiScreen` | `47:1284` | Matches Figma ✅ |
| `PhatDeScreen` | `47:1284` (Phát đề & Chia sẻ) | Matches Figma ✅ |
| `CaiDatScreen` | `47:1284` (Cài đặt Tài khoản) | Matches Figma ✅ |
| `SplashScreen` | `47:1284` | Matches Figma ✅ |

> **Note:** Since all frames share the same parent container (`47:1284`), node IDs above indicate the _closest named frame_. For precise design context, use the `get_design_context` tool with the specific node ID returned by `get_metadata` for each frame's direct ID.

---

## Design Verification Rules

When implementing or updating a screen, follow this checklist:

### ✅ Layout Rules (match Figma exactly)
- **Phone mockup frames**: Figma uses a 430×932px phone frame. The app should render a centered phone mockup with status bar (time, wifi, signal, battery), notch-style back/skip buttons, scrollable content area, and fixed bottom CTA.
- **Status bar**: Always include a status bar at the top with `12:34` time, wifi/signal/battery icons. Font: 15px semibold, black.
- **Header**: Back button (chevron-back, circular gray bg, top-left), title (center), optional right action. Use `Ionicons` icons, not custom SVGs.
- **Bottom CTA**: Fixed green button (#21C05D), 52–56px height, 12px radius, shadow `rgba(33,196,93,0.3)`.
- **Card radius**: 12–16px for cards, 20px for phone frame outer shell.
- **Spacing**: 16px horizontal padding for content, 20px for headers.
- **Colors**: Use `Colors` from `src/theme/colors.ts` — never hardcode hex values unless Figma specifies a unique color.
- **Typography**: 18–24px bold for titles, 14–16px for body, 12px for labels/captions.

### ✅ Interaction Rules
- **RN 0.81 Boolean Bug**: Never use `condition && style` — always use ternary.
- **Navigation**: Use `navigation.popToTop()` for "back to home" actions.
- **Auth screens**: Use `onAuthSuccess` callback prop, NOT `navigation.getParent()`.

### ✅ Figma Workflow
```
1. get_screenshot  → capture visual reference (nodeId)
2. get_design_context → get code suggestion (nodeId)
3. Adapt React+Tailwind output to React Native + StyleSheet
4. Compare rendered result against screenshot
5. If mismatch: re-check pixel values, colors, spacing
```

### ⚠️ Common Figma-to-Code Pitfalls
| Issue | Fix |
|---|---|
| Tailwind `top-[80px]` | Convert to `top: 80` in StyleSheet |
| Tailwind `w-[430px]` | Phone frame width, center align |
| Tailwind color `text-[#0a0f29]` | Use exact hex `#0A0F29` or nearest `Colors` token |
| `borderWidth` without explicit color | Figma uses `#F1F5F9` light border |
| SVG icons in Figma | Replace with `Ionicons` equivalents |
| Gradient fills | Use `expo-linear-gradient` |
| Font: `Inter` | RN uses system font; `fontWeight` maps directly |
| `rounded-[9999px]` | Use `borderRadius: 999` in RN |

---

## Figma MCP Server & Skills (Claude Code)

Claude Code can connect to Figma via the official **Figma MCP Server (Remote)** — a streaming-HTTP MCP server that requires no local installation.

### Installation

**Recommended — via Figma plugin (includes Skills):**
```bash
claude plugin install figma@claude-plugins-official
```

**Manual setup via terminal:**
```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp
# Add --scope user for project-wide availability
```

### Authentication

After adding the server:
1. Type `/mcp` in Claude Code and select **figma**
2. Choose **Authenticate**
3. Click **Allow Access**
4. Confirm with `"Authentication successful. Connected to figma"`

### Available MCP Tools

#### Read / Design Context
| Tool | Description |
|------|-------------|
| `get_design_context` | Generates code from Figma selection (default: React + Tailwind) |
| `get_variable_defs` | Extracts design tokens (colors, spacing, typography) |
| `get_screenshot` | Captures visual reference from Figma |
| `get_metadata` | Returns XML with layer IDs, names, positions, sizes |
| `get_figjam` | FigJam metadata with screenshots |
| `search_design_system` | Searches published design libraries |
| `generate_diagram` | Creates diagrams from Mermaid syntax |
| `whoami` | Returns authenticated Figma user identity |

#### Write / Canvas (beta, remote only)
| Tool | Description |
|------|-------------|
| `use_figma` | General-purpose write tool — create/modify frames, components, variables, layouts |
| `create_new_file` | Creates blank Figma design files or FigJam boards |

#### Code Connect
| Tool | Description |
|------|-------------|
| `get_code_connect_map` | Gets existing code→component mappings |
| `get_code_connect_suggestions` | Scans codebase for unmapped components |
| `add_code_connect_map` | Creates a new code↔component connection |
| `send_code_connect_mappings` | Bulk-creates Code Connect mappings |

#### Workflow
| Tool | Description |
|------|-------------|
| `generate_figma_design` | Converts web pages to Figma (remote only) |
| `create_design_system_rules` | Writes team rules file for AI tools |

### Design Workflow (Read)

```
get_design_context → get_screenshot → implement → validate
```

1. **`get_design_context`** — pass a Figma file/frame URL or node ID; returns layer tree, styles, code suggestion
2. **`get_screenshot`** — capture visual reference for layout verification
3. **`get_variable_defs`** — extract design tokens to sync with code

### Figma Skills (Agentic Workflows)

Skills are pre-built instructions that teach Claude Code to handle complex Figma tasks. They are bundled with the Figma plugin or available at `github.com/figma/mcp-server-guide`.

| Skill | What It Does |
|-------|-------------|
| `figma-use` | **Write-to-canvas.** Creates/edits frames, components, variables, layouts in Figma. Requires write access to target file. |
| `figma-implement-design` | Reads a Figma design (frame or component URL) and generates working app code. Checks output against original. |
| `figma-generate-design` | Assembles full screens from existing design system assets (variables, styles, components). Can use live app screenshots for layout reference. |
| `figma-generate-library` | Builds or updates a design system library from the codebase. 5 phases: Discovery → Foundations → File Structure → Components → Integration & QA. |
| `figma-code-connect-components` | Links published Figma components to code implementations via Code Connect. Scans codebase, proposes matches, creates in bulk. Requires Org/Enterprise + published team library. |
| `figma-create-design-system-rules` | Analyzes codebase structure and writes a rules file documenting team conventions for translating designs to code. |
| `figma-create-new-file` | Creates blank Figma design files or FigJam boards. Usage: `/figma-create-new-file [editorType] [fileName]` |

### Invoking Skills

Skills are invoked via slash commands or natural language:

```
/figma-use [task description]
/figma-implement-design https://www.figma.com/design/.../page?node-id=XXX:XXX
/figma-generate-library
```

### Rate Limits

| Seat Type | Limit |
|-----------|-------|
| Starter / View / Collab | 6 tool calls/month |
| Dev / Full (paid plans) | Per-minute limits matching Figma REST API Tier 1 |
| Write operations | **Exempt** from rate limits |

### Best Practices

1. **Use components + Code Connect** — link design components to code for round-trip fidelity
2. **Use variables for tokens** — extract with `get_variable_defs` and sync to code
3. **Name layers semantically** — improves AI context extraction
4. **Use Auto Layout** — conveys responsive intent to the AI
5. **Pass node IDs, not just file URLs** — for precise frame targeting in `get_design_context`
6. **Skills require different permissions** — `figma-use` needs write access; `figma-generate-library` needs codebase access

### Quick Reference

```bash
# Install Figma plugin + MCP + Skills
claude plugin install figma@claude-plugins-official

# Manual MCP only
claude mcp add --transport http figma https://mcp.figma.com/mcp

# Verify MCP connection
/mcp

# Authenticate Figma
/mcp → select figma → Authenticate → Allow Access

# Check authenticated identity
whoami  # returns Figma user info

# Extract design tokens
get_variable_defs  # pass Figma file URL or node ID

# Get design context + code suggestion
get_design_context  # pass Figma file URL + node ID

# Capture visual reference
get_screenshot  # pass Figma file URL + node ID
```
