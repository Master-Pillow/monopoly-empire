# Kết quả triển khai và kiểm thử

Ngày kiểm thử: 07/10/2026. Phiên bản nội dung: `2026.10.07-v1`.

## Phạm vi đã hoàn thành

- Website React + TypeScript + Vite, bốn tab, giao diện máy tính và điện thoại.
- Game 6 màn, 18 lựa chọn, tính bốn chỉ số, sự kiện ngẫu nhiên lưu một lần, 5 kết cục, lịch sử và chơi lại.
- 12 bài kiến thức có liên kết từ lý luận game và phần ôn câu sai.
- Ngân hàng 24 câu trắc nghiệm; mỗi lượt lấy 10 câu không trùng, đảo đáp án và chấm theo ID.
- Hỏi đáp gồm 40 câu hỏi bấm chọn với câu trả lời soạn sẵn, tìm kiếm và lọc chủ đề. Đúng yêu cầu cập nhật của người dùng; không cần AI, máy chủ hay API key.
- Lưu tiến trình trên thiết bị, phát hiện bản lưu hỏng/cũ và xung đột cửa sổ.
- Bản production lưu tài nguyên ngoại tuyến sau lần tải đầu; có thông báo cập nhật.
- Minh họa SVG, cấu hình Vercel, công cụ tạo QR, script chạy Windows và hướng dẫn bàn giao.

## Kết quả kiểm thử thực tế

| Hạng mục | Kết quả |
|---|---|
| TypeScript và production build | Đạt |
| Kiểm tra dữ liệu nội dung | Đủ 6 màn / 18 lựa chọn / 12 bài / 24 câu / 40 hỏi đáp; ID và liên kết hợp lệ |
| Vitest | 20 kiểm thử đạt; bao gồm toàn bộ nhánh game, ưu tiên kết cục, giới hạn chỉ số, khôi phục và chấm quiz |
| Playwright | 10 nhóm kiểm tra đạt; không có lỗi console hoặc lỗi JavaScript |
| Điện thoại mô phỏng | Bốn tab ở 360, 390 và 430 px không tràn ngang |
| Ngoại tuyến | Tải lại trang, Hỏi đáp bấm chọn và mở bài kiến thức khi ngắt mạng đều đạt |
| 60 phiên tải trên máy cục bộ | 180/180 yêu cầu HTTP 200; p95 356 ms; tổng 368 ms |

Số đo tải lấy từ máy hiện tại và Vite production preview tại `http://127.0.0.1:5174`. Đây là kiểm tra cục bộ, chưa phải kiểm tra hosting Internet hoặc 60 điện thoại trên mạng lớp. Báo cáo máy đọc được ở `artifacts/browser-tests/browser-test-results.json`; ảnh giao diện ở `artifacts/browser-tests/screenshots/`, tính từ thư mục gốc. Các file này được giữ trên máy và tạo lại khi chạy kiểm thử, không đưa vào Git.

## Các việc cần điều kiện bên ngoài

1. Bảng điểm, ngưỡng kết cục và nội dung đang dùng giả định đã ghi trong kế hoạch. Chưa có giáo trình chính thức hay xác nhận của người phụ trách; dữ liệu giữ trạng thái `provisional`, không tự ghi là đã duyệt.
2. Chưa phát hành lên hosting vì môi trường chưa có phiên đăng nhập Vercel. Chưa có URL HTTPS công khai nên chưa tạo QR production. Cấu hình và công cụ đã chuẩn bị, không dùng QR trỏ localhost.
3. Chưa thử trên điện thoại thật, Wi-Fi/4G tại lớp, hoặc đo thời gian học với sinh viên. Các bước này thực hiện theo README và kế hoạch trước buổi trình bày.

## Chạy và bàn giao

Mở PowerShell trong thư mục dự án và chạy:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-app.ps1
```

Mở `http://127.0.0.1:5173/`. Xem [README](../../README.md) và [hướng dẫn dự án](../guides/project-guide.md) để cài thư viện, sửa nội dung, kiểm thử, phát hành và tạo QR. File `artifacts/releases/de-che-doc-quyen-dist.zip` chứa bản production dự phòng; giải nén và phục vụ qua máy chủ HTTP, không mở trực tiếp bằng `file://`.

## Kiểm tra sau khi sắp xếp repository

Ngày 07/10/2026, tài liệu được gom theo `requirements`, `planning`, `guides` và `reports`; script Windows chuyển sang `scripts/start-app.ps1`. File sinh tự động chuyển sang `artifacts/` và bỏ qua trong Git.

- Script Windows ở vị trí mới: chế độ Test và Build đều chạy thành công.
- 20 kiểm thử luật và 10 nhóm kiểm thử trình duyệt đều đạt.
- Liên kết nội bộ của 11 tài liệu hợp lệ.
- 60 phiên tải cục bộ: 180/180 HTTP 200, p95 411 ms, tổng 420 ms; không có lỗi console.
- Ảnh và báo cáo JSON được xuất vào vị trí mới trong `artifacts/browser-tests/`.
