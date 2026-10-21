# Hướng dẫn dự án Đế chế Độc quyền

Các đường dẫn và lệnh trong tài liệu này tính từ thư mục gốc repository. Xem [README](../../README.md) để chạy nhanh hoặc [mục lục tài liệu](../README.md).

Web game học Chương 4 — Cạnh tranh và độc quyền, lấy cảm hứng từ lịch sử Samsung. React + TypeScript + Vite, chạy tại trình duyệt và lưu tiến trình trên thiết bị. Không tài khoản, không API trả phí.

## Đã triển khai

- Màn chào và 4 tab dùng được trên điện thoại.
- 6 màn × 3 lựa chọn; 4 chỉ số khởi đầu 50, giới hạn 0–100.
- Rủi ro M3B, sự kiện phạt M5A, lời dẫn riêng khi chọn M4C.
- Kết quả, 5 kết cục có thứ tự ưu tiên, lịch sử, chơi lại, sao chép kết quả.
- 12 bài kiến thức có liên kết từ game và câu sai.
- 10 câu trắc nghiệm theo giáo trình; mỗi lượt đảo thứ tự câu và đáp án, giải thích ngay, tổng kết câu sai.
- 40 câu hỏi bấm chọn và câu trả lời tương ứng. Đây là nội dung soạn sẵn theo yêu cầu cập nhật của người dùng, không gọi API AI.
- 6 minh họa SVG riêng cho màn chơi và 1 minh họa màn chào do dự án tự tạo.
- Cache ngoại tuyến của bản production sau lần tải đầu, thông báo cập nhật, xử lý bản lưu hỏng và xung đột cửa sổ.

## Chạy trên Windows

Nếu dùng máy hiện tại có runtime Codex, mở PowerShell trong thư mục dự án:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-app.ps1
```

Lệnh mặc định chạy bản production ở `http://127.0.0.1:5173/`. Ctrl+C để dừng. Script tìm Node đang cài hoặc runtime Codex của tài khoản hiện tại; không chỉnh PATH vĩnh viễn.

Các chế độ:

```powershell
.\scripts\start-app.ps1 -Mode Dev
.\scripts\start-app.ps1 -Mode Test
.\scripts\start-app.ps1 -Mode Build
.\scripts\start-app.ps1 -Mode Install
.\scripts\start-app.ps1 -Mode QR -ProductionUrl https://ten-website.vercel.app
```

Trên máy khác: dùng Node 24 (phiên bản đã kiểm thử: 24.19.0) và pnpm. Giữ `pnpm-lock.yaml`:

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm build
pnpm preview --port 5173
```

Phát triển: `pnpm dev`. Không mở trực tiếp `dist/index.html` bằng `file://`; phải dùng máy chủ HTTP/HTTPS. `localhost` chỉ dùng được trên máy chạy server, không phải địa chỉ để cả lớp quét QR từ Internet.

## Sửa nội dung

| File | Nội dung |
|---|---|
| `src/content/stages.json` | Lời dẫn, lựa chọn, điểm, sự kiện và thẻ lý luận |
| `src/content/endings.json` | Điều kiện và ưu tiên kết cục |
| `src/content/articles.json` | 12 bài kiến thức |
| `src/content/questions.json` | 10 câu trắc nghiệm và ID đáp án đúng |
| `src/content/faq.json` | 40 câu hỏi bấm chọn và câu trả lời |
| `src/content/sources.json` | Tên và đường dẫn nguồn |
| `src/content/content-meta.json` | Phiên bản và các giả định tạm |

Giữ ID ổn định. Mỗi lựa chọn phải đủ `capital`, `marketShare`, `welfare`, `marketPower`. Đáp án chuẩn dùng ID, không dùng vị trí A/B/C sau khi đảo.

Sau khi đổi luật hoặc nội dung, tăng `version` trong `content-meta.json`, chạy `pnpm test` và `pnpm build`. Bản lưu khác phiên bản sẽ được thông báo để bắt đầu lượt mới. Sửa CSS không bắt buộc tăng phiên bản nội dung.

## Các quy ước đang áp dụng

Đúng bảng tạm trong [kế hoạch](../planning/implementation-plan.md): chỉ số không ghi bằng 0; M2A cộng ngay lợi thế kỳ vọng; M3B trừ vốn trước rồi bốc rủi ro 50% nếu còn sống; M5A cộng 20 rồi phạt 30 trước khi cắt trần; M4C đổi lời dẫn M5. M5 là hồi tưởng, không nối niên đại liên tục với M4.

Điểm M4B/C, M5C, một số chỉ số đề xuất và ngưỡng kết cục chưa có xác nhận từ nhóm. Nội dung học thuật đã được biên tập để phân biệt mô phỏng/lịch sử/điều tra/kết luận, nhưng chưa có giáo trình chính thức của lớp để đối chiếu. Trạng thái `provisional`/`approved: false` ghi đúng thực trạng, không phải lỗi kỹ thuật.

Khi người phụ trách đã duyệt: sửa trạng thái nội dung thành `approved`, ghi tham chiếu giáo trình trong hồ sơ duyệt và bật `approved` cho từng bài/câu hỏi/FAQ. `node scripts/validate-content.mjs --classroom` kiểm tra cổng duyệt này; không tự chuyển trạng thái khi chưa duyệt.

## Kiểm thử

`pnpm test` kiểm tra tính điểm, trần/sàn, xác suất ở ngưỡng, ưu tiên kết cục, toàn bộ nhánh, chống hành động trùng, khôi phục giao dịch và đảo/chấm quiz.

Để chạy kiểm thử trình duyệt, dựng bản production và mở máy chủ ở một terminal:

```sh
pnpm build
pnpm preview --port 5174
```

Ở terminal thứ hai, từ thư mục gốc chạy `pnpm test:browser`.

Script dùng Playwright cài trên máy hoặc bản đi kèm runtime Codex hiện tại; dùng Edge/Chrome đã cài. Nếu máy khác chưa có Playwright, cài công cụ này cho môi trường kiểm thử. Có thể đặt `PLAYWRIGHT_MODULE_PATH`, `CHROMIUM_PATH`, `APP_TEST_URL` để chỉ định đường dẫn và địa chỉ cần thử.

Kết quả ở `artifacts/browser-tests/browser-test-results.json`, ảnh giao diện ở `artifacts/browser-tests/screenshots/`. Các file sinh tự động được bỏ qua trong Git. Kiểm thử 60 phiên trên localhost là kiểm tra kỹ thuật cục bộ; chưa thay thế thử 60 điện thoại và mạng Wi-Fi thực tại lớp. Bản ghi nghiệm thu nằm ở [báo cáo](../reports/acceptance.md).

## Đưa lên Vercel và tạo QR

Đã có `vercel.json` cho bản tĩnh: lệnh build `pnpm build`, thư mục đầu ra `dist`. Không cần biến môi trường hoặc API key.

1. Đưa mã nguồn cùng `pnpm-lock.yaml` lên kho của bạn, hoặc dùng Vercel CLI đã đăng nhập.
2. Trên Vercel chọn dự án Vite và dùng cấu hình trong `vercel.json`.
3. Phát hành production; mở URL HTTPS bằng điện thoại/cửa sổ ẩn danh để chắc chắn người học không bị yêu cầu đăng nhập.
4. Chạy `pnpm qr <URL-HTTPS-production>` để tạo PNG, SVG và file URL trong `artifacts/qr`.
5. In QR cùng địa chỉ chữ lên slide. Tải trước website trên máy trình chiếu để cache ngoại tuyến.

Mã nguồn đã sẵn sàng phát hành. Địa chỉ HTTPS và QR production cần được tạo từ một lần phát hành thành công, không dùng một tên miền giả hoặc QR trỏ localhost.

## Đóng gói bản production dự phòng

Sau khi `pnpm build` thành công, chạy trong PowerShell tại thư mục gốc:

```powershell
New-Item -ItemType Directory -Path .\artifacts\releases -Force | Out-Null
Compress-Archive -Path .\dist\* -DestinationPath .\artifacts\releases\de-che-doc-quyen-dist.zip -Force
```

ZIP này nằm ngoài các file theo dõi bởi Git. Sau khi giải nén, phục vụ bằng máy chủ HTTP để dùng; không mở trực tiếp `index.html` bằng `file://`.

## Trước giờ học

Mở một lượt game, một lượt quiz và một câu Hỏi đáp trên điện thoại. Kiểm tra QR từ Wi-Fi và mạng di động. Nếu mất mạng sau khi tải/cache đủ, bộ học vẫn hoạt động; thiết bị chưa từng tải website sẽ cần mạng để truy cập lần đầu. Chuẩn bị laptop chạy bản production để trình chiếu khi mạng lớp lỗi.

Không mở nhiều cửa sổ cùng sửa một tiến trình trên cùng thiết bị; khi phát hiện cửa sổ khác đã ghi, ứng dụng yêu cầu tải lại để tránh ghi đè. Chơi lại chỉ đặt lại game, không xóa quiz.
