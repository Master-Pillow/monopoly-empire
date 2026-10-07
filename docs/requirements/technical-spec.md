# Yêu cầu kỹ thuật – Web game "Đế chế Độc quyền"

# *Note: có thể thay đổi tùy thuộc vào bạn, nhưng phải đầy đủ các chức năng: chơi, kiến

# thức, trắc nghiệm và chatbox AI

## Tổng quan

Sản phẩm là một trang web duy nhất, mở trên điện thoại qua mã QR, gồm 4 phần: Game, Kiến thức, Trắc nghiệm và Chatbot hỏi đáp. Mục tiêu là giúp sinh viên hiểu Chương 4 (Cạnh tranh và độc quyền) qua trải nghiệm làm chủ doanh nghiệp dựa trên các tình huống thật của Samsung.

## Cấu trúc trang

Trang có một màn hình chào và 4 tab cố định ở thanh dưới cùng, bấm được bằng ngón cái.

|Tab|Nội dung|Liên kết sang tab khác|
|---|---|---|
|Chơi|Game 6 màn, 4 chỉ số, thẻ Mác-Lênin, màn hình kết thúc|Thẻ lý thuyết có nút "Xem thêm" sang Kiến thức; màn kết thúc có nút "Làm trắc nghiệm"|
|Kiến thức Trắc nghiệm Hỏi đáp|Bài tóm tắt Chương 4 theo mục giáo trình 10 câu ngẫu nhiên mỗi lượt, chấm điểm, giải thích. Chatbot trả lời về Chương 4 và các tình huống trong game|Mỗi bài có nút "Hỏi chatbot về mục này"|

Màn hình chào gồm tên game, một câu giới thiệu, nút "Bắt đầu chơi".

## Game

Một lượt chơi gồm 6 màn, tổng thời gian khoảng 5–6 phút.

## Chỉ số

- 4 chỉ số: Vốn, Thị phần, Phúc lợi người tiêu dùng, Quyền lực thị trường. Mỗi chỉ số khởi điểm 50, giới hạn trong khoảng 0–100.
- Luôn hiện ở đầu màn hình dạng 4 thanh ngang có biểu tượng. Khi thay đổi, thanh chạy hiệu ứng và hiện số +/− bên cạnh trong khoảng 1 giây.
- Vốn về 0 thì game kết thúc ngay với kết cục "Phá sản".
## Mỗi màn gồm 4 bước

1. Bối cảnh: năm, tiêu đề, 2–4 câu mô tả, có thể kèm một hình minh họa.
2. Lựa chọn: 3 nút A, B, C. Không hiện trước điểm của từng lựa chọn.
3. Kết quả: cập nhật chỉ số, rồi hiện đoạn "Thực tế Samsung đã làm gì".

4. Thẻ "Mác–Lênin giải thích", nút "Xem thêm" và nút "Màn tiếp theo".
## Luật đặc biệt

- Thẻ rủi ro: một số lựa chọn có xác suất gây sự kiện, ví dụ Màn 3B có 50% phá sản, Màn 5A bị phạt Vốn −30. Sự kiện hiện thành một thẻ riêng trước bước Kết quả.
- Rẽ nhánh: chọn Màn 4C thì chuyển thẳng sang Màn 5 với lời dẫn riêng.
- Không có lựa chọn "đúng" tuyệt đối; lựa chọn nào cũng dẫn đến thẻ lý thuyết.
## Màn hình kết thúc

- Kết cục xác định theo chỉ số cuối, bảng ngưỡng do thành viên số 4 cung cấp. Tối thiểu 4 kết cục: Phá sản; Bị điều tra chống độc quyền (Quyền lực cao, Phúc lợi thấp); Ông trùm tài phiệt; Doanh nghiệp cạnh tranh lành mạnh (Phúc lợi cao).
- Hiện 4 chỉ số cuối, danh sách lựa chọn đã chọn ở từng màn, và một câu tổng kết lý thuyết.
- Nút: Chơi lại, Làm trắc nghiệm, Chia sẻ kết quả (sao chép một dòng văn bản).
## Kiến thức

## Trắc nghiệm

Mỗi gồm 10 đảo thứ tự đáp án.

- Mỗi câu: đề, 4 đáp án, một đáp án đúng. Bấm chọn thì hiện ngay đúng/sai, tô màu đáp án đúng, và lời giải thích 1–2 câu.
- Thanh tiến độ "Câu 3/10" ở đầu màn hình. Không giới hạn thời gian.
- Màn hình kết quả: điểm trên 10, danh sách câu sai kèm nút sang bài Kiến thức tương ứng, nút Làm lại.
- Bảng xếp hạng theo biệt danh là tùy chọn, nếu được làm tương tự quizz hoặc kahoot.
## Chatbot hỏi đáp

Tài liệu này giả định chatbot là AI trả lời câu hỏi về kiến thức; nếu nhóm chọn khung chat giữa người chơi thì phần này phải viết lại.

- Phạm vi: chỉ trả lời về Chương 4 và các tình huống Samsung trong game, dựa trên tài liệu nguồn của thành viên số 7. Câu hỏi ngoài chủ đề thì lịch sự từ chối và gợi ý câu hỏi liên quan.
- Giao diện: khung chat kiểu tin nhắn, 3–4 câu hỏi gợi ý bấm sẵn khi mới mở, câu trả lời tối đa khoảng 150 từ, tiếng Việt.
- Dòng lưu ý cố định dưới khung chat: "Câu trả lời do AI tạo, có thể sai. Đối chiếu với giáo trình."
- Bảo mật: khóa API không được nằm trong code phía trình duyệt. Gọi AI qua hàm máy chủ (serverless function trên Vercel) và giới hạn số tin nhắn mỗi người, ví dụ 20 tin/giờ, để tránh tốn phí.
- Phương án dự phòng nếu không có khóa API: chatbot theo từ khóa, trả lời từ bộ 30–50 cặp hỏi–đáp soạn sẵn.
## Deploy