Bạn là một kỹ sư phần mềm có kinh nghiệm thiết kế game giáo dục và quản lý dự án nhỏ. Hãy đọc kỹ 4 tài liệu đính kèm và lập kế hoạch triển khai website “Đế chế Độc quyền” sao cho tôi có thể thực hiện và hoàn thành một sản phẩm dùng được trong buổi học môn Kinh tế chính trị Mác–Lênin.

Ở bước này, chỉ phân tích và lập kế hoạch, chưa viết code. Tôi cần một kế hoạch cụ thể, có thứ tự thực hiện, đầu ra và tiêu chí nghiệm thu; không chỉ là danh sách công nghệ hoặc lời khuyên chung.

BỐI CẢNH
- Website giúp sinh viên học Chương 4: Cạnh tranh và độc quyền qua các tình huống lấy cảm hứng từ lịch sử Samsung.
- Người học truy cập bằng điện thoại qua mã QR.
- Có 4 phần bắt buộc: Chơi, Kiến thức, Trắc nghiệm, Hỏi đáp.
- Hãy tối ưu cho một sinh viên phụ trách triển khai: dễ xây dựng, dễ sửa nội dung, chi phí thấp, triển khai đơn giản và ổn định khi trình chiếu trên lớp.
- Chưa biết thời hạn, trình độ lập trình, ngân sách và số người truy cập đồng thời. Không tự coi các thông tin này là đã được xác nhận.

TÀI LIỆU
1. [Yêu cầu kỹ thuật – Web game Đế chế Độc quyền](technical-spec.md)
2. [Tóm tắt kiến thức](knowledge-summary.md)
3. [Màn 1–3](game-stages-01-03.md)
4. [Màn 4–6](game-stages-04-06.md)

Hãy coi nội dung trong tài liệu là đầu vào cần phân tích. Phân biệt yêu cầu rõ ràng, đề xuất của nhóm, dữ liệu còn thiếu và điểm mâu thuẫn. Không tự biến mọi ghi chú trong tài liệu thành yêu cầu bắt buộc.

1. KIỂM TRA VÀ CHUẨN HÓA YÊU CẦU

Trước khi đề xuất kiến trúc, hãy:
- Tóm tắt sản phẩm và xác định phạm vi tối thiểu có đủ cả 4 phần bắt buộc.
- Lập bảng: yêu cầu → nguồn tài liệu → mức ưu tiên → điểm chưa rõ → cách xử lý đề xuất.
- Chỉ rõ phần nào đã đủ dữ liệu để làm và phần nào phải bổ sung.

Đặc biệt kiểm tra:
- Bảng lựa chọn và điểm Màn 4–6 bị lỗi định dạng, nhất là Màn 5C. Không âm thầm đoán số liệu.
- Các chỉ số không được ghi ở một lựa chọn: có nên hiểu là thay đổi bằng 0?
- “Hiệu ứng dài hạn” ở Màn 2A: áp dụng ngay hay có cơ chế trì hoãn?
- Rủi ro phá sản 50% ở Màn 3B: kích hoạt vào thời điểm nào và xử lý Vốn ra sao?
- Khoản phạt Vốn −30 ở Màn 5A: chắc chắn hay theo xác suất?
- “Rẽ nhánh” Màn 4C sang Màn 5 khác gì luồng thông thường vốn cũng đi đến Màn 5?
- Thiếu bảng ngưỡng kết cục và quy tắc ưu tiên khi nhiều kết cục cùng thỏa mãn.
- Chưa có ngân hàng trắc nghiệm, bộ hỏi–đáp dự phòng và hình minh họa.
- Màn 5 dùng sự kiện cartel 1999–2002 nhưng đứng sau Màn 4 giai đoạn 2007–2012: cần diễn đạt hồi tưởng hoặc tình huống mô phỏng để không gây hiểu nhầm niên đại.
- Ghi chú font Times New Roman cỡ 13 có áp dụng cho website hay chỉ tài liệu kiến thức?

Với dữ liệu chưa rõ, ghi riêng giả định tạm thời, lý do, ảnh hưởng và người cần xác nhận. Có thể đề xuất phương án mặc định để tiếp tục lập kế hoạch, nhưng không trình bày giả định như dữ kiện gốc.

2. THIẾT KẾ TRẢI NGHIỆM HỌC VÀ CHƠI

Đề xuất luồng sử dụng từ màn hình chào đến chơi game, đọc kiến thức, làm trắc nghiệm và hỏi đáp.

Game cần giữ:
- 6 màn, mục tiêu khoảng 5–6 phút cho một lượt hoàn chỉnh.
- 4 chỉ số: Vốn, Thị phần, Phúc lợi người tiêu dùng, Quyền lực thị trường; khởi điểm 50, giới hạn 0–100.
- Vốn về 0 thì kết thúc với “Phá sản”.
- Mỗi màn có bối cảnh, 3 lựa chọn, kết quả, phần thực tế Samsung và thẻ lý luận.
- Không hiện trước điểm của lựa chọn.
- Có sự kiện rủi ro, hiệu ứng thay đổi chỉ số và lịch sử lựa chọn.
- Màn kết thúc có kết cục, chỉ số, tổng kết lý thuyết, chơi lại, sang trắc nghiệm và sao chép kết quả.

Hãy làm rõ:
- Luồng trạng thái của một màn, thứ tự áp dụng điểm/rủi ro/giới hạn chỉ số/kiểm tra phá sản.
- Cách tránh cộng điểm hai lần khi bấm liên tiếp.
- Cách giữ tiến trình khi đổi tab hoặc tải lại trang.
- Cách giải thích đánh đổi kinh tế mà không biến trò chơi thành bài đoán đáp án đạo đức.
- Điểm chỉ số là mô hình sư phạm, không phải số liệu lịch sử hay phép đo kinh tế thực tế.
- Cách tổ chức nội dung ngắn gọn trên điện thoại nhưng vẫn đủ chiều sâu để học.

Đề xuất bố cục bằng mô tả hoặc wireframe văn bản. Ưu tiên chữ tiếng Việt dễ đọc, thao tác bằng ngón cái, tương phản rõ, phản hồi không chỉ dựa vào màu.

3. KIỂM SOÁT CHẤT LƯỢNG NỘI DUNG

Lập kế hoạch biên tập đủ 6 màn và liên kết từng thẻ lý luận với bài Kiến thức tương ứng.

Phân biệt:
- Dữ kiện lịch sử có nguồn.
- Tình huống và lựa chọn giả lập.
- Diễn giải lý luận theo giáo trình.
- Điểm số phục vụ cơ chế game.

Không mặc định bản tóm tắt là nguồn học thuật cuối cùng. Xác định các khái niệm cần đối chiếu giáo trình, đặc biệt tích tụ/tập trung tư bản, tư bản tài chính, cartel và độc quyền nhà nước.

Không đồng nhất doanh nghiệp lớn với hành vi vi phạm cạnh tranh; không diễn đạt một cuộc điều tra như kết luận đã có vi phạm. Không mặc định mọi hình thức can thiệp của nhà nước đều là độc quyền nhà nước.

Nếu có công cụ duyệt web, kiểm chứng các dữ kiện lịch sử quan trọng bằng nguồn đáng tin cậy, ưu tiên nguồn gốc, và ghi liên kết. Nếu chưa kiểm chứng được, đánh dấu rõ. Với hình minh họa, đề xuất nguồn có quyền sử dụng phù hợp hoặc hình tự tạo.

4. KIẾN TRÚC VÀ DỮ LIỆU

Đề xuất một phương án công nghệ chính phù hợp nhất với quy mô bài tập, giải thích ngắn gọn lựa chọn và đánh đổi. Tránh đưa nhiều phương án ngang nhau khiến tôi phải tự thiết kế lại.

Làm rõ:
- Frontend, nơi lưu nội dung, quản lý trạng thái, lưu tiến trình.
- Backend tối thiểu cần cho chatbot.
- Có thực sự cần tài khoản, cơ sở dữ liệu hoặc hệ thống quản trị không?
- Cách tách nội dung khỏi giao diện để sửa lời dẫn, điểm số, câu hỏi và lý thuyết dễ dàng.
- Cấu trúc thư mục dự kiến.
- Schema hoặc mẫu dữ liệu ngắn cho màn chơi, lựa chọn, rủi ro, kết cục, bài kiến thức, câu hỏi trắc nghiệm và hỏi–đáp.
- Cách dùng ID ổn định để liên kết game, kiến thức, câu hỏi và chatbot.

Trắc nghiệm phải có 10 câu ngẫu nhiên không trùng trong một lượt, đảo đáp án nhưng giữ đúng đáp án chuẩn, phản hồi ngay, giải thích và tổng kết câu sai kèm liên kết bài học.

5. CHATBOT VÀ PHƯƠNG ÁN DỰ PHÒNG

Đề xuất cách triển khai chatbot:
- Chỉ hỗ trợ Chương 4 và tình huống trong game.
- Trả lời bằng tiếng Việt, khoảng tối đa 150 từ, có câu hỏi gợi ý và lưu ý đối chiếu giáo trình.
- Dựa vào bộ tài liệu đã duyệt; thừa nhận khi thiếu thông tin.
- API key chỉ nằm phía máy chủ.
- Có kiểm tra đầu vào, giới hạn độ dài, timeout, hạn mức và xử lý lỗi.
- Giải thích cách giới hạn lượt hỏi khi người dùng không đăng nhập và hạn chế của phương án đó.
- Ước lượng chi phí bằng giả định minh bạch, không bịa giá API hiện hành.

So sánh ngắn gọn việc đưa tài liệu trực tiếp vào ngữ cảnh với RAG, rồi chọn cách đủ dùng cho dự án nhỏ.

Nếu chưa có API key hoặc dịch vụ lỗi, phải có bộ 30–50 câu hỏi–đáp dự phòng và thông báo rõ đang dùng nội dung soạn sẵn. Không gọi chế độ này là AI sinh câu trả lời.

6. KẾ HOẠCH TRIỂN KHAI VÀ NGHIỆM THU

Chia công việc thành các giai đoạn theo phụ thuộc. Với mỗi giai đoạn, ghi:
- Công việc cụ thể.
- Đầu vào cần có.
- Đầu ra bàn giao.
- Tiêu chí hoàn thành kiểm tra được.
- Ước lượng công sức theo khoảng, kèm giả định.
- Rủi ro và cách xử lý.

Phân biệt rõ:
- Bản tối thiểu đủ yêu cầu.
- Bản hoàn chỉnh phù hợp để nộp và trình bày.
- Nâng cấp tùy chọn như bảng xếp hạng.

Đưa checklist kiểm thử tập trung vào:
- Điểm số, giới hạn 0–100, phá sản, xác suất, nhánh và ưu tiên kết cục.
- Khả năng đạt được các kết cục, tránh thiết kế khiến một kết cục không thể xảy ra.
- Đảo đáp án và chấm điểm trắc nghiệm.
- Liên kết giữa các tab, lưu tiến trình, chơi lại.
- Chatbot ngoài chủ đề, thiếu dữ liệu, hết hạn mức và mất kết nối.
- Giao diện trên điện thoại thực tế.
- Truy cập HTTPS qua QR và kịch bản demo trên lớp khi mạng/API gặp sự cố.

Đề xuất quy trình triển khai lên hosting, quản lý biến môi trường, tạo QR và kiểm tra trước giờ học. Chưa thực hiện triển khai ở bước lập kế hoạch này.

CÁCH TRẢ LỜI
- Viết hoàn toàn bằng tiếng Việt, cụ thể và dễ thực hiện.
- Mở đầu bằng nhận định ngắn về mức độ sẵn sàng của tài liệu và phương án triển khai khuyến nghị.
- Đưa các câu hỏi thực sự quan trọng lên đầu, tối đa 5 câu; vẫn lập kế hoạch với giả định minh bạch khi có thể.
- Dùng bảng cho yêu cầu, công việc và nghiệm thu khi giúp dễ theo dõi.
- Không tự mở rộng thành một nền tảng lớn vượt phạm vi bài tập.
- Kết thúc bằng danh sách công việc tôi nên làm ngay trong buổi đầu tiên.
