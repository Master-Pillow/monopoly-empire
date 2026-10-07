# Monopoly Empire — Đế chế Độc quyền

Web game học Chương 4 Kinh tế chính trị Mác–Lênin về cạnh tranh và độc quyền, lấy cảm hứng từ lịch sử Samsung. React + TypeScript + Vite; tiến trình lưu trên thiết bị, không cần tài khoản hoặc API trả phí.

## Tính năng

- Game 6 màn, 18 lựa chọn, 4 chỉ số và 5 kết cục.
- 12 bài kiến thức, 24 câu trắc nghiệm với 10 câu ngẫu nhiên mỗi lượt.
- 40 câu Hỏi đáp bấm chọn với câu trả lời soạn sẵn.
- Giao diện điện thoại, lưu tiến trình và hỗ trợ ngoại tuyến sau lần tải đầu của bản production.

## Chạy nhanh

Cần Node 24 và pnpm. Cài thư viện từ file khóa, sau đó chạy:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Trên máy Windows hiện tại có runtime Codex, mở PowerShell tại thư mục dự án để chạy bản production:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-app.ps1
```

Địa chỉ mặc định: `http://127.0.0.1:5173/`. Nếu chưa cài thư viện, chạy script với `-Mode Install` trước.

## Các lệnh chính

| Lệnh | Mục đích |
|---|---|
| `pnpm dev` | Phát triển với cập nhật trực tiếp |
| `pnpm test` | Kiểm thử luật game và trắc nghiệm |
| `pnpm check:content` | Kiểm tra dữ liệu nội dung |
| `pnpm build` | Kiểm tra TypeScript, dựng production và cache ngoại tuyến |
| `pnpm preview --port 5173` | Xem bản production đã dựng |
| `pnpm test:browser` | Kiểm thử trình duyệt; cần bản production chạy tại cổng 5174 |
| `pnpm qr <URL-HTTPS-production>` | Tạo QR cho địa chỉ đã phát hành |

## Cấu trúc repository

```text
monopoly-empire/
├── src/                  # Mã nguồn ứng dụng
│   ├── components/       # Thành phần giao diện dùng chung
│   ├── content/          # Dữ liệu game, bài học, quiz và hỏi đáp
│   ├── domain/           # Luật game, chấm quiz và kiểu dữ liệu
│   ├── features/         # Chơi, Kiến thức, Trắc nghiệm, Hỏi đáp
│   ├── lib/              # Lưu trữ và tiện ích
│   └── styles/           # CSS và bố cục điện thoại
├── public/               # Favicon, manifest và minh họa SVG
├── scripts/              # Chạy Windows, build, kiểm tra nội dung và tạo QR
├── tests/                # Kiểm thử tự động
├── docs/                 # Tài liệu; xem docs/README.md
│   ├── requirements/     # Tài liệu đầu vào của nhóm
│   ├── planning/         # Kế hoạch và giả định triển khai
│   ├── guides/           # Hướng dẫn dự án và kịch bản demo
│   └── reports/          # Báo cáo nghiệm thu
├── artifacts/            # Kết quả kiểm thử, ảnh, ZIP và QR; bỏ qua trong Git
└── dist/                 # Bản build; bỏ qua trong Git
```

`package.json`, `pnpm-lock.yaml`, `index.html` và các file cấu hình ở thư mục gốc để công cụ build/hosting nhận diện dự án.

## Tài liệu

- [Mục lục tài liệu](docs/README.md)
- [Hướng dẫn chạy, sửa nội dung và phát hành](docs/guides/project-guide.md)
- [Kế hoạch và giả định triển khai](docs/planning/implementation-plan.md)
- [Kịch bản trình bày](docs/guides/classroom-demo.md)
- [Kết quả kiểm thử](docs/reports/acceptance.md)

Nội dung và ngưỡng kết cục đang mang trạng thái `provisional`, chờ đối chiếu giáo trình của lớp. Xem các giả định trong `src/content/content-meta.json` và kế hoạch triển khai.
