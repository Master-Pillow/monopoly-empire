# Tài liệu dự án

Các đường dẫn bên dưới tương đối với thư mục `docs`. Tên file dùng tiếng Anh không dấu; nội dung tài liệu giữ tiếng Việt.

## Yêu cầu và tài liệu đầu vào

| Tài liệu | Nguồn ban đầu |
|---|---|
| [Đề bài và bối cảnh](requirements/project-brief.md) | `requirements.md` |
| [Yêu cầu kỹ thuật](requirements/technical-spec.md) | `Yêu cầu kỹ thuật – Web game Đế chế Độc quyền.md` |
| [Màn 1–3](requirements/game-stages-01-03.md) | `Màn 1-3.md` |
| [Màn 4–6](requirements/game-stages-04-06.md) | `Màn 4-6.md` |
| [Tóm tắt kiến thức](requirements/knowledge-summary.md) | `Tóm tắt kiến thức.md` |

## Kế hoạch, hướng dẫn và báo cáo

- [Kế hoạch triển khai](planning/implementation-plan.md): phạm vi, bảng điểm tạm, nguồn và tiêu chí nghiệm thu.
- [Hướng dẫn dự án](guides/project-guide.md): chạy trên Windows, sửa nội dung, kiểm thử, Vercel và QR.
- [Kịch bản demo](guides/classroom-demo.md): các bước trình bày trên lớp.
- [Báo cáo nghiệm thu](reports/acceptance.md): kết quả đã kiểm tra và các việc cần điều kiện bên ngoài.

## File sinh tự động

Các file này được tạo trong `artifacts/` tại thư mục gốc và bỏ qua trong Git:

| Thư mục | Nội dung |
|---|---|
| `artifacts/browser-tests/` | Báo cáo JSON và ảnh màn hình khi chạy `pnpm test:browser` |
| `artifacts/releases/` | ZIP production dự phòng |
| `artifacts/qr/` | QR PNG/SVG và URL khi chạy `pnpm qr` |

File sinh tự động có thể tạo lại; bản ghi kết quả nghiệm thu được giữ trong `docs/reports/`. Bản build nằm trong `dist/`, thư viện nằm trong `node_modules/` và bộ nhớ đệm pnpm nằm trong `.pnpm-store/` nếu dùng script Windows; các thư mục này cũng bỏ qua trong Git.
