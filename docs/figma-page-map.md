# Figma Page Map

Reference file: `https://www.figma.com/design/sSVF9eIvhSd0Xuaw7vZqTx/Untitled`

Last checked: `2026-04-15`

This document sorts the Figma pages by product role so it is easier to find teacher flows, student flows, and shared screens again.

## Summary

- Total Figma pages: `92`
- Unique page names: `46`
- Main product roles in the app:
  - `Teacher`
  - `Student`
  - `Shared / Auth / System`
  - `Draft / Trash / Exploration`

## Teacher Pages

These pages are primarily for the teacher workflow: creating exams, managing classes, publishing, and reviewing analytics.

| Page name | Notes | Duplicate count |
|---|---|---:|
| `Dashboard` | Teacher home/dashboard | 1 |
| `Kho đề` | Exam bank | 1 |
| `Kho đề - Đang mở` | Exam bank filtered: open | 1 |
| `Kho đề - Bản nháp` | Exam bank filtered: draft | 1 |
| `Kho đề - Đã đóng` | Exam bank filtered: closed | 1 |
| `Thêm Câu hỏi` | Add question flow | 2 |
| `Chỉnh sửa Câu hỏi` | Edit question flow | 2 |
| `Soạn thảo câu hỏi thủ công` | Manual question editor | 2 |
| `AI Generator` | AI question generation | 1 |
| `Tạo đề thủ công (Danh sách)` | Manual exam creation list flow | 20 |
| `Thiết lập thông tin đề thi` | Exam setup / metadata | 2 |
| `Phát đề & Chia sẻ` | Publish and share exam | 1 |
| `Lớp học` | Class management | 1 |
| `Thống kê & Phân tích lớp` | Teacher analytics | 1 |

## Student Pages

These pages are primarily for the student workflow: taking an exam and seeing results.

| Page name | Notes | Duplicate count |
|---|---|---:|
| `Học sinh Làm bài thi` | Student exam-taking flow | 15 |
| `Kết quả Bài thi Học sinh` | Student result screen | 3 |

## Shared / Auth / System Pages

These pages are shared across both roles or belong to onboarding/authentication.

| Page name | Notes | Duplicate count |
|---|---|---:|
| `Onboarding 1` | Shared onboarding | 1 |
| `Onboarding 2: Chấm điểm tự động` | Shared onboarding | 1 |
| `Onboarding 3: Quản lý lớp học` | Shared onboarding | 1 |
| `Unplash` | Splash screen | 1 |
| `Đăng nhập tài khoản` | Login | 1 |
| `Đăng ký tài khoản mới` | Register | 2 |
| `Khôi phục Mật khẩu` | Forgot password | 1 |
| `yêu cầu mật khẩu` | Password prompt / gated access | 1 |
| `Cài đặt Tài khoản` | Account settings; likely shared | 1 |

## Draft / Trash / Exploration Pages

These pages do not look like stable product screens and should usually be ignored during implementation unless explicitly requested.

| Page name | Notes | Duplicate count |
|---|---|---:|
| `Page 1` | Large mixed canvas / working area | 1 |
| `Body` | Exploration / design experiments | 7 |
| `xóa 1` | Trash | 1 |
| `xóa 1(1)` | Trash | 1 |
| `xóa 2(1)` | Trash | 1 |
| `xóa 2(2)` | Trash | 1 |
| `xóa 3(1)` | Trash | 1 |
| `xóa 3(2)` | Trash | 1 |
| `xóa 3(3)` | Trash | 1 |
| `xóa 4(1)` | Trash | 1 |
| `xóa 4(2)` | Trash | 1 |
| `xóa 4(3)` | Trash | 1 |
| `xóa 4(4)` | Trash | 1 |
| `xóa 5(1)` | Trash | 1 |
| `xóa 5(2)` | Trash | 1 |
| `xóa 5(3)` | Trash | 1 |
| `xóa 5(4)` | Trash | 1 |
| `Frame 69` | Unclear draft page | 1 |
| `Frame 70` | Unclear draft page | 1 |
| `Frame 71` | Unclear draft page | 1 |
| `Frame 72` | Unclear draft page | 1 |

## Fast Lookup

Use this when searching Figma quickly:

- Teacher exam creation:
  - `AI Generator`
  - `Thêm Câu hỏi`
  - `Chỉnh sửa Câu hỏi`
  - `Soạn thảo câu hỏi thủ công`
  - `Tạo đề thủ công (Danh sách)`
  - `Thiết lập thông tin đề thi`
  - `Phát đề & Chia sẻ`
- Teacher management:
  - `Dashboard`
  - `Kho đề`
  - `Kho đề - Đang mở`
  - `Kho đề - Bản nháp`
  - `Kho đề - Đã đóng`
  - `Lớp học`
  - `Thống kê & Phân tích lớp`
- Student journey:
  - `Học sinh Làm bài thi`
  - `Kết quả Bài thi Học sinh`
- Shared entry:
  - `Unplash`
  - `Onboarding 1`
  - `Onboarding 2: Chấm điểm tự động`
  - `Onboarding 3: Quản lý lớp học`
  - `Đăng nhập tài khoản`
  - `Đăng ký tài khoản mới`
  - `Khôi phục Mật khẩu`

## Notes

- Duplicate counts matter. Some screens have many page variants, especially:
  - `Tạo đề thủ công (Danh sách)`: `20`
  - `Học sinh Làm bài thi`: `15`
  - `Body`: `7`
  - `Kết quả Bài thi Học sinh`: `3`
- `Cài đặt Tài khoản` is listed as shared because the name does not clearly lock it to only teacher or only student.
- `Page 1` and `Body` appear to be broad working canvases rather than single implementation targets.
