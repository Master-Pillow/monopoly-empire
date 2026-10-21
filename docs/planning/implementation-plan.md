**Kế hoạch triển khai “Đế chế Độc quyền” — bản 1, ngày 07/10/2026**

**Trạng thái thực hiện ngày 07/10/2026:** Đã có bản website đủ bốn tính năng, 20 kiểm thử luật và 10 nhóm kiểm thử trình duyệt đạt. Xem [README](../../README.md) để chạy và [báo cáo nghiệm thu](../reports/acceptance.md) để xem kết quả. Phát hành HTTPS/QR đang chờ tài khoản hosting; nội dung và luật tạm vẫn chờ đối chiếu giáo trình/duyệt của nhóm.

**Cập nhật khi triển khai:** Người dùng đã xác nhận phần Hỏi đáp chỉ cần hiển thị câu hỏi cơ bản để bấm chọn và trả câu trả lời tương ứng. Bản thực hiện dùng 40 cặp hỏi–đáp soạn sẵn, không yêu cầu nhập câu hỏi tự do hay API AI. Các mục về máy chủ AI bên dưới giữ lại như phương án tương lai, không nằm trong phạm vi nghiệm thu bản này.

Tài liệu hiện đủ để xác định sản phẩm và thiết kế luồng học, nhưng chưa đủ để chốt luật chơi và nội dung học thuật. Khuyến nghị làm một website tĩnh bằng React + TypeScript + Vite, phục vụ 60 người dùng qua điện thoại, lưu tiến trình trên thiết bị và dùng bộ hỏi–đáp soạn sẵn làm chế độ mặc định. Đây là phương án phù hợp với ngân sách 0 đồng đã được xác nhận.

Phần dưới giữ nội dung kế hoạch trước khi viết mã; trạng thái thực hiện xem ở đầu tài liệu và báo cáo nghiệm thu. Các điểm số bổ sung, ngưỡng kết cục và ước lượng dưới đây đều là đề xuất, không phải dữ liệu đã được nhóm xác nhận.

Thông tin đã xác nhận: 60 người truy cập đồng thời; ngân sách 0 đồng; chưa có bảng điểm đã sửa, ngưỡng kết cục và giáo trình chính thức. Thời hạn, trình độ lập trình và việc có API key/tín dụng miễn phí vẫn chưa xác nhận.

Các câu hỏi còn cần chốt, theo mức ảnh hưởng:

1. Ngày trình bày/nộp bài và số giờ có thể dành mỗi ngày là bao nhiêu?
2. Người triển khai đã biết JavaScript/React tới đâu?
3. Nhóm sẽ dùng bản giáo trình nào, và ai duyệt nội dung lý luận cùng bảng điểm tạm?
4. Nếu người chấm bắt buộc có AI sinh câu trả lời, nhóm có nguồn API miễn phí đủ hạn mức cho lớp không? Bộ hỏi–đáp soạn sẵn đáp ứng phương án dự phòng trong tài liệu, nhưng không thay thế yêu cầu AI thật nếu người chấm bắt buộc điều đó.

Trong lúc chờ, kế hoạch tiếp tục với giả định một sinh viên đã biết JavaScript cơ bản và có thể sửa React; một người trong nhóm hoặc giảng viên duyệt nội dung trước khi dùng trên lớp. Các vai trò duyệt dưới đây là vai trò cần bố trí, chưa phải nhân sự đã được phân công.

**1. Phạm vi bàn giao và cách phân biệt các phiên bản**

Sản phẩm giúp sinh viên học Chương 4 về cạnh tranh và độc quyền thông qua quyết định kinh doanh lấy cảm hứng từ lịch sử Samsung. Người chơi điều hành một doanh nghiệp giả lập; các quyết định của người chơi không được trình bày như quyết định có thật của Samsung.

| Phiên bản | Phạm vi | Điều kiện nghiệm thu |
|---|---|---|
| Tối thiểu dùng được | Màn chào; 4 tab; game 6 màn × 3 lựa chọn; 4 chỉ số; rủi ro; lịch sử; kết cục; lưu tiến trình; bài kiến thức; ngân hàng 24 câu với 10 câu/lượt; 40 hỏi–đáp; HTTPS và QR | Hoàn thành luồng trên điện thoại; không có lỗi tính điểm/lưu trạng thái; nội dung và luật tạm được duyệt trước buổi học |
| Hoàn chỉnh để nộp | Toàn bộ bản tối thiểu; 6 minh họa tự tạo; liên kết nguồn và giáo trình; hỗ trợ đọc bằng bàn phím; cache ngoại tuyến sau lần tải đầu; thử nghiệm 60 phiên; báo cáo kiểm thử; README và kịch bản demo | Đạt checklist cuối tài liệu; chạy thử tại lớp; khôi phục được khi mất mạng/API |
| Tùy chọn sau nghiệm thu | AI sinh câu trả lời nếu có hạn mức miễn phí đã xác nhận; bảng xếp hạng; phòng chơi chung; đồng bộ nhiều thiết bị | Lập yêu cầu riêng, không kéo dài tiến độ bản lớp học |

Tài liệu kỹ thuật cho phép phương án hỏi–đáp soạn sẵn khi chưa có API key. Bản ngân sách 0 đồng chọn phương án đó ngay từ đầu, gắn nhãn rõ “Nội dung soạn sẵn”. Không cần đăng nhập, cơ sở dữ liệu người chơi, trang quản trị hoặc bảng xếp hạng trong bản đầu.

**2. Đối chiếu yêu cầu với đầu vào**

Quy ước nguồn: R = [đề bài](../requirements/project-brief.md); KT = [yêu cầu kỹ thuật](../requirements/technical-spec.md); M13 = [Màn 1–3](../requirements/game-stages-01-03.md); M46 = [Màn 4–6](../requirements/game-stages-04-06.md); K = [tóm tắt kiến thức](../requirements/knowledge-summary.md). Tên file gốc được ghi ở [mục lục tài liệu](../README.md). P0 là bắt buộc để dùng trên lớp; P1 là hoàn thiện bản nộp; P2 là tùy chọn.

| Yêu cầu | Nguồn | Ưu tiên | Điểm chưa rõ/thiếu | Cách xử lý đề xuất |
|---|---|---|---|---|
| Màn chào, 4 tab cố định | KT, R | P0 | Bảng mô tả tab bị gộp ô | Tách Chơi, Kiến thức, Trắc nghiệm, Hỏi đáp; vào mọi tab không cần chơi trước |
| 6 màn, 5–6 phút/lượt | KT, M13, M46 | P0 | Nội dung hiện quá dài và lỗi bảng | Viết lại phần đọc chính; kiến thức sâu mở thêm |
| 4 chỉ số khởi đầu 50, giới hạn 0–100 | KT, M13 | P0 | Nhiều lựa chọn bỏ trống chỉ số | Đề xuất phần không ghi bằng 0; dữ liệu cuối vẫn phải ghi đủ 4 số |
| Điểm Màn 4–6 | M46 | P0 | M4B/C, M5C bị dồn ô; vài số có nhãn “đề xuất” | Tách bảng ở mục 3, gắn trạng thái tạm; nhóm duyệt trước khi phát hành |
| Hiệu ứng dài hạn M2A | M13 | P0 | Không có thời điểm trả hiệu ứng | Bản đầu cộng ngay toàn bộ; diễn giải đây là lợi thế kỳ vọng được quy đổi trong mô hình |
| Rủi ro M3B | KT, M13 | P0 | Thiếu thời điểm và cách đặt Vốn | Sau chi phí cơ bản, nếu còn vốn thì bốc rủi ro một lần; trúng đặt Vốn = 0 |
| Phạt Vốn −30 ở M5A | KT | P0 | Không có xác suất | Đề xuất sự kiện chắc chắn, áp dụng sau lợi ích +20; ghi rõ mô phỏng |
| Nhánh M4C → M5 | KT, M46 | P0 | Luồng thường cũng đến M5 | Chỉ đổi lời dẫn và cờ ngữ cảnh; mọi lượt còn sống vẫn đủ 6 màn |
| Kết cục và ưu tiên | KT, R | P0 | Thiếu toàn bộ bảng ngưỡng | Dùng bảng đề xuất ở mục 4; kiểm thử khả năng đạt và thứ tự ưu tiên |
| Kết quả, chia sẻ, chơi lại | KT | P0 | Chưa có mẫu văn bản | Sao chép tên kết cục và 4 chỉ số; có cách chọn văn bản nếu clipboard lỗi |
| Kiến thức | K, R | P0 | Nguồn tóm tắt chưa phải giáo trình đã duyệt | Biên tập 12 bài ngắn, bổ sung mục/trang giáo trình sau khi có |
| Trắc nghiệm | KT, R | P0 | Chưa có câu hỏi | Soạn 24 câu, mỗi lượt lấy 10 câu không trùng, giải thích và liên kết bài |
| Hỏi đáp | KT, R | P0 | Chưa có bộ nguồn duyệt/API key | Soạn 40 cặp; tìm theo từ khóa và chủ đề; không nhận là AI |
| AI sinh câu trả lời | KT, R; ràng buộc ngân sách mới | Có điều kiện | Ngân sách 0; chưa xác nhận nguồn API miễn phí | Thiết kế điểm kết nối máy chủ; mặc định tắt, không phụ thuộc khi demo |
| Một minh họa mỗi màn | M13, M46 | P1 | Chưa có ảnh/quyền dùng | Vẽ 6 SVG đơn giản: cửa hàng, chip, khủng hoảng, nhà máy, bàn họp, máy chủ |
| Font Times New Roman 13 | K | Cần xác nhận | Có thể chỉ là quy cách tài liệu | Website dùng font hệ thống hỗ trợ tiếng Việt, chữ nội dung 16–18 px |
| HTTPS, QR, ổn định lớp học | KT, R | P0/P1 | Chưa có hosting và URL | Vercel Hobby, tên miền được cấp; QR trỏ URL production; kiểm tra bằng mạng di động |
| Bảng xếp hạng | KT | P2 | Cần định danh và dữ liệu chung | Để sau; điểm mô phỏng không phù hợp làm bảng xếp hạng “đúng/sai” |

Có thể bắt đầu thiết kế giao diện, cấu trúc dữ liệu và bộ máy trạng thái ngay. Cần bổ sung hoặc duyệt trước khi chốt bản nộp: điểm tạm, ngưỡng kết cục, giáo trình, 6 kịch bản đã biên tập, 24 câu hỏi, 40 hỏi–đáp và minh họa có quyền sử dụng. Không coi các mục này là đã hoàn thành chỉ vì đã có kế hoạch.

**3. Giả định tạm và bảng điểm chuẩn hóa để triển khai**

| Mã | Giả định/đề xuất | Lý do và ảnh hưởng | Người cần xác nhận |
|---|---|---|---|
| A01 | Chỉ số không được ghi có thay đổi bằng 0 | Tạo quy tắc nhất quán; có thể ảnh hưởng cân bằng | Phụ trách luật chơi |
| A02 | M2A cộng ngay V −25, TP +5, QL +15 | Giảm cơ chế trì hoãn trong lượt 5–6 phút; chưa mô phỏng đầu tư nhiều kỳ | Phụ trách nội dung + luật |
| A03 | M3B trừ V 20 rồi kiểm tra khả năng sống; nếu còn sống bốc rủi ro 50% một lần | Trúng rủi ro đặt V = 0; xác suất là quy tắc sư phạm, không phải tỷ lệ lịch sử | Phụ trách luật |
| A04 | M5A nhận V +20 rồi chịu V −30 chắc chắn | Thiếu xác suất gốc; kết quả ròng V −10 trước giới hạn | Phụ trách luật |
| A05 | M4C chỉ đổi lời dẫn M5 | Đúng cấu trúc 6 màn; không tạo nhánh bỏ màn hoặc cộng điểm phụ | Phụ trách kịch bản |
| A06 | Dùng bảng điểm tạm bên dưới cho các ô hỏng | Đây là thiết kế đề xuất, không khẳng định đã phục dựng đúng bảng gốc | Phụ trách M4–6 |
| A07 | Dùng ngưỡng kết cục ở mục 4 | Cần cho việc lập trình và kiểm thử; được phép thay đổi sau thử nghiệm | Thành viên phụ trách kết cục, tài liệu gọi là thành viên 4 |
| A08 | M5 là “Hồi tưởng: cartel DRAM 1999–2002 tại Mỹ” | Đặt sau M4 theo mạch học, không theo niên đại liên tục | Phụ trách lịch sử |
| A09 | Dùng font dễ đọc trên web; Times New Roman 13 dành cho bản tài liệu nếu cần | Không ép quy cách trang in vào điện thoại | Nhóm trình bày |
| A10 | Hỏi đáp soạn sẵn là chế độ lớp học | Bảo đảm chi phí 0 và hoạt động khi API không có | Trưởng nhóm; đối chiếu tiêu chí người chấm |
| A11 | Lưu cục bộ một thiết bị; không đồng bộ tài khoản | Giảm chi phí và công việc; xóa dữ liệu trình duyệt sẽ mất lượt chơi | Người triển khai |
| A12 | Phúc lợi là chỉ số quy ước trong mô phỏng | M3A giảm nhân sự không tự động chứng minh phúc lợi người tiêu dùng giảm; giữ điểm gốc tạm và cần biên tập lại lý do | Người duyệt lý luận |

V = Vốn; TP = Thị phần; PL = Phúc lợi người tiêu dùng; QL = Quyền lực thị trường. Tất cả là **điểm trên thang 100**, kể cả TP; không hiển thị TP như tỷ lệ thị phần lịch sử. Điểm không có đơn vị tiền tệ và không quy đổi từ các khoản phạt thực tế.

| Màn/lựa chọn | V | TP | PL | QL | Trạng thái/ghi chú |
|---|---:|---:|---:|---:|---|
| 1A — Bán giá thấp | −5 | +15 | +10 | 0 | Theo M13; QL = 0 theo A01 |
| 1B — Đầu tư máy móc | −10 | +10 | +5 | +5 | Đủ dữ liệu trong M13 |
| 1C — Định giá cao | +10 | −10 | −5 | 0 | Theo M13; QL = 0 theo A01 |
| 2A — Đầu tư DRAM | −25 | +5 | 0 | +15 | PL = 0 theo A01; thời điểm theo A02 |
| 2B — Tiếp tục lắp ráp | +10 | +5 | 0 | −5 | PL = 0 theo A01 |
| 2C — Gia công | +5 | 0 | 0 | −10 | TP/PL = 0 theo A01 |
| 3A — Tái cơ cấu | +10 | −5 | −10 | +5 | Theo M13; cần xem lại cách giải thích PL |
| 3B — Vay cứu các mảng | −20 | 0 | 0 | 0 | Số 0 theo A01; rủi ro thêm theo A03 |
| 3C — Mua doanh nghiệp | −10 | +15 | −5 | +15 | Đủ dữ liệu trong M13 |
| 4A — Mở rộng sản xuất | −20 | +20 | +10 | +20 | Hàng điểm đọc được trong M46 |
| 4B — Cắt sản lượng | +5 | −10 | −5 | −5 | TẠM: tách từ hàng dồn ô; PL vốn là đề xuất |
| 4C — Liên hệ đối thủ | 0 | 0 | 0 | 0 | TẠM: tách từ hàng dồn ô; bật cờ lời dẫn M5 |
| 5A — Tham gia cartel | +20 | 0 | −20 | +15 | Điểm cơ bản theo M46; V −30 là sự kiện thêm |
| 5B — Tiếp tục cạnh tranh | −5 | 0 | +10 | 0 | TP = 0 vốn là đề xuất |
| 5C — Tham gia rồi hợp tác điều tra, xin khoan hồng | +10 | 0 | −10 | +5 | TẠM TOÀN BỘ: thiết kế để thử cân bằng, không khẳng định thứ tự số trong bảng hỏng |
| 6A — Giữ sản lượng | +25 | 0 | −15 | +10 | Đủ dữ liệu trong M46 |
| 6B — Mở rộng, hạ giá | +5 | +5 | +10 | 0 | QL = 0 vốn là đề xuất |
| 6C — Ép giá mua đầu vào | +10 | 0 | −5 | +10 | PL = −5 vốn là đề xuất |

Riêng M5C: không dạy rằng tự tố giác luôn được miễn phạt. Lời giải phải nêu quyền lợi khoan hồng phụ thuộc điều kiện và vụ việc; mô hình điểm tạm chỉ minh họa động cơ làm liên minh kém bền vững. Khi người phụ trách duyệt hoặc thay bảng, tăng `contentVersion` và chạy lại toàn bộ kiểm thử đường chơi.

**4. Luồng trạng thái, tính điểm và kết cục**

Luồng một màn: **bối cảnh + lựa chọn → khóa lựa chọn và ghi nhận kết quả → thẻ sự kiện nếu có → phản hồi chỉ số → thực tế Samsung → thẻ lý luận → màn tiếp theo hoặc kết thúc**. Lựa chọn A/B/C không hiển thị điểm trước. Các kết quả đã tính không phụ thuộc việc người chơi đã xem xong hiệu ứng hay chưa.

Thứ tự xử lý một lần chọn:

1. Chấp nhận hành động chỉ khi đúng màn hiện tại, ở pha lựa chọn, và màn đó chưa có bản ghi trong lịch sử.
2. Tạo một bản dự thảo bằng chỉ số cũ cộng đủ 4 thay đổi cơ bản, chưa cắt trần 100.
3. Nếu V của bản dự thảo ≤ 0: đặt V = 0, giới hạn các chỉ số còn lại, ghi kết cục Phá sản ngay; không bốc rủi ro và không sang màn sau.
4. Nếu còn V: giải quyết sự kiện một lần. M3B: một số ngẫu nhiên trong [0,1), dưới 0,5 thì V = 0. M5A: trừ thêm V 30 chắc chắn. Các lượt không rủi ro không cần bốc số.
5. Giới hạn mỗi chỉ số bằng min(100, max(0, giá trị)); nếu V = 0 thì chốt Phá sản. Cộng điểm cơ bản và phạt trong cùng giao dịch trước khi cắt trần, tránh mất lợi ích rồi lại trừ phạt sai.
6. Ghi đồng thời chỉ số trước/sau, lựa chọn, sự kiện, cờ nhánh, pha hiển thị và phiên bản vào trạng thái và bản lưu. Giao diện phát hiệu ứng từ dữ liệu đã ghi.
7. Nếu còn sống và chưa hết màn 6, cho đi tiếp sau thẻ lý luận. Nếu đã hết màn 6, xét kết cục theo thứ tự ưu tiên.

Ví dụ kiểm thử thứ tự: V = 95, chọn 5A thì V cuối = 85 theo phép tính 95 + 20 − 30; không ra 70 do cắt trần quá sớm. Nếu V = 15 và chọn 3B, chi phí đã làm phá sản; không cần bốc xác suất.

Khóa nút ngay khi nhận lựa chọn; bộ xử lý trạng thái vẫn phải kiểm tra `stageId` và lịch sử để từ chối hành động trùng. Chỉ khóa giao diện là chưa đủ. Sinh kết quả ngẫu nhiên ngoài hàm reducer thuần, đưa vào một hành động và lưu kết quả đã giải quyết; không gọi ngẫu nhiên trong render/reducer hoặc khi tải lại trang.

Lưu tự động sau mỗi hành động hợp lệ bằng `localStorage`, có `schemaVersion`, `contentVersion`, `runId`, `revision`, thời điểm và toàn bộ lịch sử. Khi tải lại: kiểm tra cấu trúc, tính hợp lệ của ID và pha trước khi khôi phục; không áp dụng điểm lại. Bản lưu hỏng hoặc khác phiên bản nội dung phải có thông báo và nút bắt đầu lượt mới. Nếu bị chặn lưu trữ, cho chơi trong bộ nhớ và thông báo không thể giữ tiến trình khi đóng trang.

Đổi tab trong ứng dụng giữ nguyên lượt chơi và câu trắc nghiệm. Bản đầu hỗ trợ một cửa sổ thao tác trên mỗi thiết bị; phát hiện thay đổi từ cửa sổ khác thì yêu cầu tải lại trạng thái mới, không hứa đồng bộ chỉnh sửa đồng thời. Không cần chống sửa điểm cục bộ vì chưa có thi đua chung.

Khi phá sản, khóa lượt chơi ngay và đưa về kết quả có thẻ giải thích màn vừa chọn; người học vẫn xem được kiến thức, nhưng không tiếp tục tích điểm. Nút chơi lại xác nhận khi còn lượt đang chơi; chỉ đặt lại game, không xóa bài đang đọc hoặc kết quả trắc nghiệm.

| Ưu tiên | Kết cục đề xuất | Điều kiện sau giới hạn chỉ số | Cách diễn giải |
|---:|---|---|---|
| 1 | Phá sản | V = 0, kiểm tra ở mọi màn | Không đủ nguồn lực duy trì hoạt động trong mô hình |
| 2 | Bị điều tra chống độc quyền | QL ≥ 80 và PL ≤ 35 | Kết cục giả lập về nguy cơ bị xem xét; điều tra không đồng nghĩa kết luận vi phạm |
| 3 | Doanh nghiệp cạnh tranh lành mạnh | PL ≥ 70 và V > 0 | Tên kết cục sư phạm theo chỉ số, không chứng nhận doanh nghiệp tuân thủ pháp luật |
| 4 | Ông trùm tài phiệt | V ≥ 60, TP ≥ 70 và QL ≥ 75 | Nhãn trong game; không suy ra khái niệm tư bản tài chính chỉ từ doanh nghiệp lớn |
| 5 | Doanh nghiệp đang chuyển mình | Mọi trường hợp còn sống còn lại | Kết cục bổ sung để mọi lượt đều có kết quả |

Chọn dòng đầu tiên thỏa mãn. Các ngưỡng và thứ tự này đều theo A07. Nếu lịch sử có lựa chọn cartel nhưng kết quả PL cao, phần nhận xét vẫn nhắc hành vi đó; nhãn kết cục không xóa nội dung phản biện.

Các đường sau tính tay từ bảng tạm chứng minh sơ bộ bốn kết cục bắt buộc có thể đạt; chưa thay cho kiểm thử tự động:

| Chuỗi lựa chọn | V / TP / PL / QL cuối | Kết quả |
|---|---|---|
| 1B → 2A → 3B | 0 / 65 / 55 / 70 | Phá sản do chi phí cơ bản |
| 1C → 2B → 3C → 4A → 5A → 6A | 55 / 80 / 15 / 100 | Bị điều tra chống độc quyền |
| 1C → 2B → 3C → 4A → 5B → 6A | 60 / 80 / 45 / 90 | Ông trùm tài phiệt |
| 1A → 2B → 3C → 4A → 5B → 6B | 25 / 100 / 85 / 80 | Doanh nghiệp cạnh tranh lành mạnh |

Khi triển khai, liệt kê tối đa 3^6 = 729 chuỗi lựa chọn, rẽ thêm hai kết quả của sự kiện ngẫu nhiên khi nó xảy ra, dừng các nhánh đã phá sản. Báo cáo số đường tới từng kết cục và xác suất có điều kiện theo luật; không coi tần suất trong danh sách đường chơi là xác suất hành vi thực của người chơi.

**5. Trải nghiệm trên điện thoại và nhịp học**

Màn chào giới thiệu “6 quyết định kinh doanh, khám phá cạnh tranh và độc quyền”, thời lượng dự kiến, bốn chỉ số và dòng “Điểm là mô hình học tập, không phải số liệu kinh tế lịch sử”. Có Bắt đầu/Tiếp tục, cùng quyền truy cập ngay Kiến thức, Trắc nghiệm, Hỏi đáp.

Một lượt mục tiêu: khoảng 30 giây làm quen, 40–45 giây mỗi màn và 30 giây đọc kết quả, tổng khoảng 5–5,5 phút. Đây là mục tiêu thử nghiệm, không phải đồng hồ ép thời gian; mở bài đọc sâu có thể làm lượt chơi dài hơn. Sau thử với 5 sinh viên, rút câu chữ nếu đa số mất quá 6 phút.

Wireframe dự kiến cho tab Chơi:

```text
ĐẾ CHẾ ĐỘC QUYỀN                    Màn 2/6
Vốn             45/100    Thị phần          65/100
Phúc lợi        60/100    Quyền lực         50/100
───────────────────────────────────────────────
1983 · Canh bạc bán dẫn
[Minh họa chip, có mô tả thay thế]
Bối cảnh 2–4 câu. Một câu hỏi quyết định.

[ A  Dồn vốn vào nghiên cứu và sản xuất DRAM ]
[ B  Tiếp tục lắp ráp hàng điện tử           ]
[ C  Gia công cho hãng khác                 ]

Sau lựa chọn:
[Sự kiện, nếu có] → [Thay đổi chỉ số]
[Thực tế Samsung · nguồn] [Lý luận · Xem thêm]
[Màn tiếp theo]
───────────────────────────────────────────────
  Chơi       Kiến thức       Trắc nghiệm      Hỏi đáp
```

Giữ 4 thanh chỉ số ở đầu vùng chơi, số và nhãn đầy đủ, dấu +/− sau lựa chọn khoảng một giây; lịch sử vẫn giữ thay đổi để xem lại. Dùng biểu tượng kèm chữ, không chỉ dùng màu. Khi bật giảm chuyển động, bỏ hoạt ảnh nhưng giữ thông tin. Không khóa nút tiếp tục chỉ để người dùng phải chờ hoạt ảnh.

Nút cao tối thiểu 44 px; chữ nội dung 16–18 px; giãn dòng khoảng 1,5; tương phản mục tiêu 4,5:1 cho chữ thường. Kiểm tra chiều rộng 360, 390 và 430 px, chữ phóng to 200%, vùng an toàn ở đáy màn hình và bàn phím ảo trong chat. Thanh tab không che nút hành động cuối trang. Hỗ trợ focus bàn phím, nhãn cho thanh chỉ số và thông báo kết quả đọc được bằng trình đọc màn hình.

Phản hồi mỗi lựa chọn gồm: lợi ích trước mắt, chi phí/đánh đổi, hệ quả liên quan lý luận. Không tô lựa chọn game thành đúng/sai; chỉ trắc nghiệm có đáp án đúng. Phân biệt nhận xét về hiệu quả kinh tế với hành vi thỏa thuận giá đã được xác định trong một vụ việc cụ thể. Không có cơ chế mặc định “càng nhiều quyền lực càng tốt”.

Tab Kiến thức có danh mục và tìm tiêu đề/từ khóa, mỗi bài gồm ý chính, ví dụ game, phần đọc thêm, nguồn. Nút Xem thêm từ game mở đúng `articleId` và có Quay lại màn đang chơi. Hỏi về mục này chuyển sang Hỏi đáp, điền chủ đề/câu hỏi gợi ý mà chưa tự gửi đến API.

Tab Trắc nghiệm hiển thị Câu n/10, không giới hạn thời gian. Chọn xong hiện chữ Đúng/Chưa đúng, đáp án chuẩn và giải thích, rồi mới cho chuyển câu. Kết quả có điểm trên 10, danh sách câu sai gồm câu hỏi + đáp án đã chọn + đáp án đúng + bài liên quan, và Làm lại.

Tab Hỏi đáp có nhãn chế độ, 4 gợi ý đầu, danh sách tin nhắn, ô nhập và trạng thái đang tìm. Mặc định ghi “Câu trả lời từ nội dung soạn sẵn; đối chiếu với giáo trình”. Nếu sau này bật AI, từng tin có nguồn/chế độ và dòng “Câu trả lời do AI tạo, có thể sai. Đối chiếu với giáo trình”.

Màn kết thúc có tên kết cục, giải thích điều kiện kích hoạt, 4 chỉ số cuối, lịch sử lựa chọn và sự kiện, một câu tổng kết lý luận; các nút Chơi lại, Làm trắc nghiệm, Sao chép kết quả. Bản sao chép gồm nhãn “kết quả mô phỏng”, kết cục và chỉ số; nếu clipboard bị chặn, hiện hộp văn bản cho người dùng chọn và sao chép.

**6. Biên tập nội dung và kiểm chứng lịch sử**

Mỗi màn cần bốn lớp dữ liệu riêng: tình huống giả lập; điểm của mô hình; dữ kiện lịch sử có nguồn; diễn giải lý luận được đối chiếu giáo trình. Trên giao diện dùng các nhãn ngắn “Tình huống mô phỏng”, “Thực tế lịch sử”, “Lý luận” tại phần tương ứng. Nguồn do doanh nghiệp công bố phù hợp kiểm tra mốc hoạt động, nhưng không tự chứng minh động cơ cạnh tranh hoặc nguyên nhân một đối thủ phá sản.

Danh mục bài dự kiến: K01 Quy luật giá trị và cạnh tranh; K02 Nguyên nhân hình thành độc quyền; K03 Tích tụ và tập trung tư bản; K04 Các hình thức tổ chức độc quyền; K05 Tư bản tài chính và tài phiệt; K06 Xuất khẩu tư bản; K07 Phân chia thị trường và phạm vi ảnh hưởng; K08 Giá cả và lợi nhuận độc quyền; K09 Tác động hai mặt và cạnh tranh trong độc quyền; K10 Độc quyền nhà nước; K11 Biểu hiện mới; K12 Vai trò lịch sử và giới hạn của chủ nghĩa tư bản. K01 là phần nhắc lại kiến thức nền nếu nằm ngoài Chương 4 của giáo trình nhóm dùng.

| Màn | Việc biên tập | Bài gắn thẻ | Tiêu chí duyệt |
|---|---|---|---|
| 1 · 1938 | Viết rõ đánh đổi giá thấp, đầu tư hạ chi phí, định vị giá cao | K01 | Không khẳng định Samsung thực sự đã chọn A/B/C; phân biệt giá với giá trị |
| 2 · 1983 | Viết rõ vốn đầu tư và lợi thế kỹ thuật; chú thích quy đổi hiệu ứng dài hạn | K02, K03 | Không đưa thành công tương lai thành điều chắc chắn của lựa chọn người chơi |
| 3 · 1997 | Tách khủng hoảng 1997 với chuyển giao mảng ô tô năm 2000 | K03 | Mua lại là tập trung tư bản; tự tái đầu tư là tích tụ; xem lại diễn giải PL |
| 4 · 2007–2012 | Tách mô phỏng chiến lược sản lượng với lịch sử tái cấu trúc ngành | K02, K03, K09 | Không khẳng định Samsung cố tình làm đối thủ phá sản khi thiếu chứng cứ |
| 5 · Hồi tưởng | Tách DRAM Mỹ, DRAM EU và ví dụ khoan hồng LCD; nêu thời gian từng vụ | K04 | Không trộn số tiền phạt, người được miễn phạt và thị trường sản phẩm |
| 6 · 2017–2018 | Mô phỏng quyết định sản lượng/giá mua; diễn giải điều tra thận trọng | K08, K09; liên kết đọc thêm K10 | Không coi giá tăng/ít hãng là đủ bằng chứng thông đồng; không coi điều tiết nào cũng là độc quyền nhà nước |

Những điểm đã kiểm tra được trong bước lập kế hoạch:

| Dữ kiện | Kết quả kiểm tra và nguồn | Cách dùng |
|---|---|---|
| Samsung Sanghoe thành lập 1938; Cheil Industries 1954 | Có trong [lịch sử Samsung C&T](https://www.samsungcnt.com/eng/about-us/history.do) | Dùng hai mốc này; chi tiết hàng hóa, Daegu và Cheil Jedang 1953 cần dẫn nguồn cụ thể bổ sung |
| DRAM 64K năm 1983; vị trí dẫn đầu DRAM năm 1992 | Có trong [lịch sử bán dẫn Samsung](https://news.samsungsemiconductor.com/global/about-us/) và [bài lịch sử Samsung](https://news.samsung.com/kr/%EC%8A%A4%ED%8E%98%EC%85%9C-%EB%A6%AC%ED%8F%AC%ED%8A%B8-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EC%82%B0%EC%97%85-30%EB%85%84%EC%82%AC-%EB%B9%9B%EB%82%B8-%EC%82%BC%EC%84%B1-%EB%B0%98%EB%8F%84%EC%B2%B4) | Chú thích nguồn doanh nghiệp; ngày chính xác của “Tuyên bố Tokyo” cần đối chiếu thêm |
| Renault mua 70,1% Samsung Motors năm 2000 | [Tài liệu đăng ký thường niên Renault 2020](https://www.renaultgroup.com/Document-denregistrement-universel-2020/62/) | Ghi đúng mốc 2000, không gộp thành sự kiện năm 1997 |
| Micron mua Elpida năm 2013 | [Dòng thời gian Micron](https://www.micron.com/about/company/company-timeline) | Màn 4 kết thúc bối cảnh 2012; phần thực tế có thể kể hệ quả năm 2013, ghi rõ năm |
| Samsung tại Mỹ: khoản phạt 300 triệu USD năm 2005; hành vi trong hồ sơ từ 1999–2002 | [Thông báo Bộ Tư pháp Hoa Kỳ ngày 13/10/2005](https://www.justice.gov/archive/opa/pr/2005/October/05_at_540.html) nêu thỏa thuận nhận tội và nộp phạt; [hồ sơ vụ án](https://www.justice.gov/atr/case/us-v-samsung-electronics-company-ltd-and-samsung-semiconductor-inc) có thỏa thuận nhận tội | Sửa đoạn “A00 triệu USD” bị hỏng; không dùng chi tiết án tù nếu chưa đối chiếu hồ sơ riêng |
| DRAM EU năm 2010: tổng tiền phạt khoảng 331 triệu euro; Micron được miễn phạt | [Thông cáo chính thức EC IP/10/586](https://ec.europa.eu/commission/presscorner/api/files/document/print/en/ip_10_586/IP_10_586_EN.pdf) | Khoản 331 triệu là tổng vụ việc, không phải riêng Samsung; thời gian cartel của vụ EU là 1998–2002 |
| Samsung được miễn phạt trong vụ LCD của EC năm 2010 | [Công báo EU, quyết định COMP/39.309 — LCD](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ%3AC%3A2011%3A295%3AFULL) | Chỉ dùng làm ví dụ LCD riêng; không gọi Samsung là bên được miễn phạt trong vụ DRAM EU |
| SAMR thông báo điều tra Micron về khả năng thông đồng của các nhà cung cấp DRAM năm 2018 | [Hồ sơ Micron nộp SEC](https://www.sec.gov/Archives/edgar/data/723125/000072312519000014/a2019q2.htm) | Có căn cứ cho sự kiện điều tra, không có căn cứ từ nguồn này để viết đã kết luận vi phạm của cả ba hãng |

Các chi tiết chưa được kiểm chứng đủ trong bước này phải giữ trạng thái “chờ xác minh”: Qimonda phá sản năm 2009; thời điểm Elpida nộp đơn phá sản năm 2012; con số hơn 90% thị trường DRAM với mốc đo cụ thể; bảng xếp hạng doanh thu Samsung/Intel năm 2017 từ hãng nghiên cứu gốc; khẳng định Samsung thực tế chọn phương án A ở M4/M6; các chi tiết Hanbo, Kia, Daewoo. Không đưa các câu đó vào bản lịch sử như dữ kiện đã duyệt. Có thể bỏ chi tiết phụ nếu chưa có nguồn, vẫn giữ tình huống giả lập và mục tiêu học.

Nguồn K dẫn tới [bản tóm tắt LetQA](https://letqa.vn/knowledge/tom-tat-kien-thuc-chuong-4-kinh-te-chinh-tri-mac-lenin/74), đã mở để kiểm tra nguồn tham khảo. Chưa có giáo trình chính thức của lớp nên chưa thể xác nhận cách định nghĩa/trình bày cuối cùng. Khi có giáo trình, lưu tên sách, năm/ấn bản, chương/mục và trang cho từng bài, thay vì ghi chung “theo giáo trình”.

Ưu tiên đối chiếu: tích tụ với tập trung tư bản; tư bản tài chính với tài chính doanh nghiệp; cartel/syndicate/trust/consortium và cách giáo trình sắp xếp; giá cả/lợi nhuận độc quyền; độc quyền nhà nước và các biểu hiện nhân sự, sở hữu, điều tiết. Không biến consortium thành một bậc tiến hóa bắt buộc của mọi doanh nghiệp; không suy từ tập đoàn lớn sang đã vi phạm cạnh tranh; không đồng nhất luật chống cartel với độc quyền nhà nước.

Quy trình duyệt: viết nháp → kiểm tra nguồn lịch sử → đối chiếu giáo trình → người thứ hai đọc thử → đánh dấu `approved` và khóa phiên bản. Cho phép bản nội bộ dùng dữ liệu `provisional`; bản dùng trên lớp phải qua cổng duyệt nội dung. Nếu chưa có giáo trình, báo rõ phần chưa đối chiếu và chưa nhận là bản học thuật hoàn chỉnh.

Ảnh: ưu tiên 6 SVG do nhóm tự vẽ bằng hình học và biểu tượng tự tạo, có `alt`, lưu trong dự án để không phụ thuộc máy chủ ngoài. Ảnh lịch sử nếu dùng phải có hồ sơ tác giả, URL nguồn, giấy phép và yêu cầu ghi công; không mặc định ảnh trên website doanh nghiệp được phép tái sử dụng.

**7. Kiến trúc và dữ liệu**

Chọn một phương án chính: **React + TypeScript + Vite, CSS thuần, dữ liệu JSON có kiểm tra cấu trúc, Vercel Hobby cho trang tĩnh**. React phù hợp tách bốn tính năng; TypeScript hỗ trợ phát hiện sai cấu trúc chỉ số; Vite tạo bản dựng tĩnh. Không cần máy chủ chạy thường trực cho game, kiến thức, trắc nghiệm hay hỏi–đáp soạn sẵn. Cách dựng dự án theo [tài liệu Vite](https://vite.dev/guide/); quản lý chuyển trạng thái bằng reducer thuần theo [React useReducer](https://react.dev/reference/react/useReducer).

Vercel Hobby hiện là gói miễn phí dành cho mục đích cá nhân, phi thương mại và có hạn mức. Dự kiến dùng tài khoản cá nhân của người triển khai cho bài học này, tên miền được cấp sẵn; không mua tên miền hoặc nâng gói. Cần kiểm tra lại điều kiện/hạn mức tại ngày phát hành. Đây là lựa chọn cho phạm vi bài tập, không phải cam kết dịch vụ miễn phí vô hạn. [Tài liệu Vercel Hobby](https://vercel.com/docs/plans/hobby).

Luồng hệ thống: điện thoại tải HTML/CSS/JavaScript + JSON + minh họa từ hosting → game/quiz/FAQ chạy tại thiết bị → tiến trình ghi vào bộ nhớ cục bộ. Sau này, chỉ tính năng AI mới gửi yêu cầu tới `/api/chat` → hàm máy chủ kiểm tra điều kiện → dịch vụ AI. [Vercel Functions](https://vercel.com/docs/functions) là phần máy chủ có thể bổ sung trong cùng dự án.

Trạng thái cấp ứng dụng gồm `game`, `quiz`, `reading`, `chat`, `navigation`; đổi tab không hủy các phần này. Game và quiz lưu riêng, có phiên bản. Nội dung tách khỏi component; sửa một câu hỏi hoặc điểm không đòi chỉnh giao diện. Không dùng Redux, CMS, vector database hoặc tài khoản nếu chưa có yêu cầu mới.

Cấu trúc thư mục dự kiến, chưa tạo mã nguồn trong bước lập kế hoạch:

```text
src/
  app/                điều hướng, trạng thái chung, khôi phục bản lưu
  components/         thanh chỉ số, nút, thẻ nguồn, thông báo
  features/
    game/             màn chơi, kết quả, lịch sử
    knowledge/        danh mục và bài đọc
    quiz/             câu hỏi, phản hồi, tổng kết
    chat/             giao diện và tìm hỏi–đáp
  domain/             luật điểm, sự kiện, kết cục, chọn và chấm câu hỏi
  content/
    stages.json       6 màn × 3 lựa chọn
    endings.json      ngưỡng và ưu tiên
    articles.json     12 bài học
    questions.json    24 câu trắc nghiệm
    faq.json          40 cặp hỏi–đáp
    sources.json      URL, tác giả, tình trạng kiểm chứng
    content-meta.json phiên bản và trạng thái duyệt
  lib/                lưu dữ liệu, kiểm tra schema, sao chép văn bản
  styles/             bố cục, màu, chữ, chuyển động
public/illustrations/ 6 minh họa; bổ sung tài nguyên ngoại tuyến khi hoàn thiện
api/chat.ts           chỉ bổ sung khi triển khai AI thật
tests/                luật game, dữ liệu, quiz, luồng trình duyệt
docs/                 nguồn, quyết định tạm, kết quả nghiệm thu, hướng dẫn demo
README.md             cách chạy, sửa nội dung, dựng và phát hành
```

Schema tối thiểu để thống nhất trước khi lập trình:

| Đối tượng | Trường bắt buộc và ví dụ quy ước |
|---|---|
| Bộ chỉ số | `capital`, `marketShare`, `welfare`, `marketPower`: 4 số; thay đổi có thể âm, giá trị trạng thái nằm trong 0–100 |
| Màn | `id: stage-03`, `order`, `yearLabel`, `title`, `context`, `decision`, `choices[3]`, `historyText`, `sourceIds`, `theorySummary`, `articleIds`, `illustration`, `editorialStatus` |
| Lựa chọn | `id: stage-03-b`, `label`, `text`, `delta` đủ 4 số, `feedback`, `eventId?`, `setFlags?`, `assumptionIds` |
| Sự kiện | `id: risk-stage-03-b`, `type: chance hoặc certain`, `probability: 0.5 hoặc 1`, `trigger: after-choice-cost`, `effect: set capital 0 hoặc add capital -30`, `message` |
| Nhánh lời dẫn | `flag: invited-to-cartel`, `targetStageId: stage-05`, `introVariant`; đặt tại 4C, không thay đổi điểm hay bỏ màn |
| Kết cục | `id`, `priority`, `conditions` gồm `all` và các so sánh rõ ràng, `title`, `summary`, `articleIds`; kết cục cuối có điều kiện luôn đúng |
| Bài học | `id: k03-accumulation`, `title`, `summary`, `sections`, `gameStageIds`, `sourceIds`, `textbookReference`, `approved` |
| Câu hỏi | `id: q-001`, `prompt`, `options[4]` mỗi đáp án có ID cố định, `correctOptionId`, `explanation`, `articleId`, `topicId`, `approved` |
| Hỏi–đáp | `id: faq-001`, `question`, `aliases`, `keywords`, `answer`, `articleIds`, `sourceIds`, `approved` |
| Nguồn | `id`, `title`, `publisher`, `url`, `eventDate?`, `publishedAt?`, `checkedAt`, `verificationStatus`, `license?` |
| Bản lưu game | `schemaVersion`, `contentVersion`, `runId`, `revision`, `phase`, `stageId`, `stats`, `flags`, `history`, `endingId?` |
| Bản ghi lựa chọn | `stageId`, `choiceId`, `before`, `after`, `eventOutcome`, `randomDraw?`, `nextPhase`; một bản ghi/màn |
| Bản lưu quiz | `questionIds[10]`, thứ tự `optionIds` từng câu, `selectedOptionIds`, câu hiện tại, trạng thái đã phản hồi |

Dùng ID ổn định để game → bài học → câu hỏi → FAQ cùng chỉ về một chủ đề. Không dùng tiêu đề tiếng Việt hoặc vị trí A/B/C làm khóa chấm điểm. Không lưu biểu thức dạng mã để chạy bằng `eval`; điều kiện kết cục dùng dữ liệu so sánh được kiểm tra cấu trúc.

Kiểm tra nội dung lúc dựng: đủ 6 màn, 18 lựa chọn, mỗi thay đổi đủ 4 số hữu hạn, ID duy nhất, liên kết tồn tại, xác suất trong [0,1], ≥10 câu quiz, 4 đáp án/câu, đúng một đáp án chuẩn, 40 FAQ đã duyệt và không bỏ trống giải thích. Trạng thái `provisional` phải xuất hiện trong báo cáo nội dung; chỉ chuyển bản lớp học khi người duyệt chốt các giả định.

Trắc nghiệm: xáo trộn bản sao ngân hàng bằng Fisher–Yates rồi lấy 10 ID đầu; xáo độc lập danh sách đáp án của từng câu, giữ `correctOptionId`. Chốt và lưu thứ tự khi bắt đầu lượt, không xáo khi render/đổi tab/tải lại. Sau lần chọn đầu khóa câu; tính điểm từ các ID đã chọn, không cộng một biến điểm nhiều lần. Làm lại tạo bộ ngẫu nhiên mới; giữa hai lượt vẫn có thể trùng câu, chỉ yêu cầu không trùng trong cùng lượt.

Ngân hàng 24 câu dự kiến có khoảng 12 câu nhận biết/phân biệt khái niệm và 12 câu tình huống/giải thích. Mỗi bài có ít nhất một câu; ưu tiên các nhầm lẫn tích tụ–tập trung, độc quyền–vi phạm, điều tra–kết luận và điều tiết–độc quyền nhà nước. Người duyệt kiểm tra không có hai đáp án đồng thời hợp lý theo cách đặt câu.

**8. Hỏi đáp, AI có điều kiện và chi phí**

Chế độ mặc định dùng 40 cặp hỏi–đáp đã biên tập, phân bổ dự kiến: 6 câu về cơ chế game; 8 câu về cạnh tranh và hình thành độc quyền; 6 câu về các hình thức tổ chức; 6 câu về tư bản tài chính/xuất khẩu tư bản/phân chia thị trường; 6 câu về độc quyền nhà nước; 8 câu về tình huống và lịch sử trong game. Mỗi câu trả lời khoảng 60–120 từ, tối đa khoảng 150 từ, có liên kết bài và 1–2 câu hỏi tiếp theo.

Tìm kiếm cục bộ: chuẩn hóa chữ hoa/thường, dấu tiếng Việt, khoảng trắng; so khớp câu hỏi mẫu, từ đồng nghĩa và cụm chủ đề. Nếu không đủ khớp, hiển thị tối đa 3 câu gần nhất để người dùng chọn, hoặc mời mở danh mục; không ghép vài từ khóa rồi tự khẳng định một câu trả lời không phù hợp. Câu ngoài phạm vi nhận thông báo ngắn và gợi ý về Chương 4. Thông báo này là nội dung soạn sẵn.

Nhãn hiển thị cố định: “Hỏi đáp theo tài liệu soạn sẵn”. Nếu AI đang bật rồi lỗi, tin mới ghi “Đang dùng nội dung soạn sẵn vì dịch vụ AI chưa khả dụng”. Không lấy câu trả lời từ FAQ nhưng gắn tên “AI đang suy nghĩ”.

Nếu có nguồn API miễn phí đã xác nhận đủ hạn mức, có thể bổ sung máy chủ tối thiểu:

1. Trình duyệt gửi `question`, `articleId?`, `stageId?` và tối đa 2 cặp hỏi–đáp gần nhất đến một endpoint cùng website. Máy chủ kiểm tra dữ liệu; không nhận prompt hệ thống/tài liệu tùy ý từ trình duyệt.
2. Chấp nhận POST JSON, chặn yêu cầu quá 8 KB, câu hỏi tối đa 500 ký tự, từ chối chuỗi trống; kiểm tra ID chủ đề theo danh sách cho phép. Không cần dữ liệu định danh cá nhân.
3. Máy chủ giữ API key trong biến môi trường, không dùng biến có tiền tố đưa vào gói frontend, không commit `.env`; chỉ cung cấp `.env.example` không có bí mật. Tách môi trường thử và production. [Quản lý biến môi trường Vercel](https://vercel.com/docs/environment-variables).
4. Prompt yêu cầu tiếng Việt, khoảng tối đa 150 từ, chỉ kiến thức đã duyệt; phân biệt mô phỏng và lịch sử; không đủ dữ liệu thì nói rõ. Câu ngoài chủ đề được hướng về bài liên quan. Lệnh “bỏ qua tài liệu” trong câu hỏi không được coi là chỉ dẫn hệ thống.
5. Đưa bộ bài tóm tắt đã duyệt vào ngữ cảnh, kèm dữ liệu màn liên quan do máy chủ chọn. Không gửi HTML/Markdown thô do người dùng tự cung cấp làm nguồn tin cậy. Trả về ID nguồn chỉ thuộc bộ nguồn được phép; frontend mở liên kết từ bản đồ nguồn nội bộ.
6. Giới hạn đầu ra của API, kiểm tra độ dài trước khi hiển thị, render văn bản an toàn; không đưa HTML mô hình trả về vào trang. Timeout toàn yêu cầu 12 giây; hủy yêu cầu quá hạn; tránh thử lại tự động liên tiếp gây tốn lượt.
7. Khi timeout, mất mạng, thiếu key, trả lỗi 429/5xx, câu trả lời không đạt cấu trúc hoặc hết ngân sách: chuyển sang bộ FAQ và nêu rõ chế độ. Các tab khác vẫn hoạt động.

| Cách đưa kiến thức vào AI | Điểm phù hợp | Chi phí/phức tạp | Quyết định |
|---|---|---|---|
| Đưa tài liệu tóm tắt trực tiếp | Bộ nguồn nhỏ, ít thay đổi, dễ biết đoạn nào được gửi | Mỗi lượt gửi lại một phần ngữ cảnh; cần giới hạn độ dài | Chọn nếu bật AI; ngân sách ngữ cảnh dự kiến 3.000–6.000 token, phải đo sau biên tập |
| RAG: tìm đoạn rồi đưa vào ngữ cảnh | Hữu ích khi tài liệu nhiều, cần tìm kiếm theo nội dung | Thêm tách đoạn, tìm kiếm, đánh giá truy hồi và có thể có kho vector | Chưa cần cho 6 màn và 12 bài ngắn |

Giới hạn không đăng nhập, nếu triển khai AI: mã phiên do máy chủ cấp bằng cookie ký, tối đa 20 yêu cầu/giờ/phiên; bộ đếm dùng chung có cập nhật nguyên tử; hạn mức tổng dự kiến 300 yêu cầu/buổi học và giới hạn token. Kiểm tra trước khi gọi nhà cung cấp. Bổ sung kiểm soát tốc độ theo IP ở ngưỡng cho phép cả lớp dùng chung Wi-Fi; không áp 20/giờ cho một IP rồi vô tình khóa 60 sinh viên.

Cookie có thể bị xóa và IP có thể thay đổi hoặc dùng chung, nên đây chỉ là giảm lạm dụng, không phải nhận diện chắc chắn một người. Bộ đếm trong bộ nhớ một serverless instance hoặc `localStorage` không đủ bảo vệ chi phí. Nếu chưa có kho bộ đếm dùng chung phù hợp hạn mức miễn phí, giữ AI tắt; lỗi kho bộ đếm cũng phải ngừng gọi AI và dùng FAQ. Có cờ tắt toàn hệ thống, không chỉ ẩn nút ở giao diện.

Ngân sách hiện tại:

| Hạng mục | Quyết định cho bản lớp học | Chi tiền dự kiến |
|---|---|---:|
| Frontend và lưu tiến trình | Hosting miễn phí trong hạn mức; localStorage | 0 đồng |
| Tên miền | Dùng địa chỉ được hosting cấp | 0 đồng |
| Minh họa | Nhóm tự tạo SVG | 0 đồng |
| Hỏi đáp | 40 cặp soạn sẵn, chạy tại trình duyệt | 0 đồng |
| AI sinh câu trả lời | Tắt; chỉ xem xét khi có tài nguyên miễn phí có giới hạn cứng | 0 đồng trong cấu hình hiện tại |

Để ước tính khi có tài nguyên AI: giả sử 60 người × 5 câu = 300 lượt/buổi, trung bình 2.500 token đầu vào và 250 token đầu ra mỗi lượt. Tổng khoảng 750.000 token vào và 75.000 token ra; nếu giá theo một triệu token là Pin và Pout thì chi phí ước tính = 0,75 × Pin + 0,075 × Pout, chưa tính thuế hoặc dịch vụ phụ. Đây là giả định khối lượng, không phải giá API hiện hành. Nếu ai cũng dùng 20 lượt thì nhu cầu là 1.200 lượt, gấp bốn lần kịch bản cơ sở; hạn mức tổng 300 sẽ chuyển các lượt còn lại sang FAQ.

Chưa chọn nhà cung cấp hoặc hứa có API miễn phí. Chỉ bật khi đã đối chiếu hạn mức thực, ngày hết tín dụng, giới hạn tốc độ và cơ chế dừng trước phát sinh phí. Có API key không đồng nghĩa có ngân sách miễn phí. Không đưa việc tích hợp AI vào đường găng của bản 0 đồng.

**9. Các giai đoạn triển khai theo phụ thuộc**

Ước lượng dưới đây là giờ làm tập trung của một sinh viên đã biết JavaScript cơ bản và có thể sửa React, không bao gồm thời gian chờ người duyệt trả lời. Tổng bản hoàn chỉnh không AI: **42–65 giờ**, thêm khoảng 20% dự phòng thành **51–78 giờ**. Người mới học web có thể cần gấp 1,5–2 lần; điều chỉnh sau buổi đầu. Chưa có hạn nộp nên không gán ngày hoàn thành giả định.

Thứ tự chính: G0 → G1/G2 → G3 → G4 → G5 → G6 → G7. Một người làm tuần tự từng đầu việc; G2 có thể làm lúc chờ duyệt G1 bằng dữ liệu mẫu có nhãn tạm. Không cần thêm nhân sự phát triển hoặc triển khai công việc bằng nhiều agent.

| Giai đoạn và công việc | Đầu vào/phụ thuộc | Đầu ra bàn giao | Tiêu chí hoàn thành | Giờ | Rủi ro và xử lý |
|---|---|---|---|---:|---|
| G0 — Chốt phạm vi và quy tắc: rà bảng 18 lựa chọn, A01–A12, kết cục, vai trò duyệt | 5 tài liệu hiện có và kế hoạch này | Bảng luật v1; danh sách điểm đã/chưa duyệt; quyết định hỏi đáp 0 đồng | Mỗi ô điểm có nguồn hoặc mã giả định; mọi luật có thời điểm áp dụng; rõ người duyệt và việc còn thiếu | 4–6 | Người duyệt chưa trả lời: cho dựng bản nội bộ với nhãn tạm, không ghi là đã chốt |
| G1 — Biên tập 6 màn, 12 bài, 24 câu, 40 FAQ; tạo 6 minh họa; ghi nguồn | G0, giáo trình khi có | Bộ dữ liệu nội dung và danh mục nguồn/quyền dùng | Mỗi màn có 3 lựa chọn, phản hồi, thực tế, lý luận; câu hỏi có đáp án và giải thích; các nguồn chưa kiểm chứng được bỏ hoặc đánh dấu trong bản nội bộ | 10–16 | Nội dung quá dài/sai thuật ngữ: biên tập theo lớp ngắn–đọc thêm, duyệt bởi người thứ hai |
| G2 — Khởi tạo dự án; cấu trúc dữ liệu; giao diện chung và 4 tab | G0, bản nháp G1 | Khung chạy cục bộ, style, điều hướng, kiểm tra nội dung | Bốn tab mở được ở 360 px, nút rõ, không tràn ngang; build thành công | 3–5 | Phụ thuộc công nghệ quá nhiều: giữ CSS và reducer đơn giản, khóa phiên bản thư viện |
| G3 — Làm bộ máy game và giao diện chơi/kết thúc | G2, luật G0, dữ liệu màn | Game đủ 6 màn, sự kiện, nhánh lời dẫn, lịch sử, lưu tiến trình, sao chép | Điểm đúng bảng; bấm nhanh chỉ ghi một lần; tải lại không bốc rủi ro/cộng điểm lại; mọi kết cục có đường tới | 7–10 | Sai thứ tự điểm/phạt: kiểm thử hàm luật trước nối hoạt ảnh |
| G4 — Kiến thức và trắc nghiệm | G2, bài và câu hỏi G1; liên kết từ G3 | 12 bài, tìm nội dung, 10 câu/lượt, phản hồi, tổng kết | Không trùng câu trong lượt; đáp án đúng giữ nguyên sau đảo; link từ câu sai/game mở đúng bài; quay lại không mất trạng thái | 5–8 | ID gãy hoặc chấm theo vị trí: kiểm tra tham chiếu lúc build và chấm theo ID |
| G5 — Hỏi đáp dự phòng và nối luồng học | G2, 40 FAQ đã duyệt | Chat theo tài liệu, gợi ý, tìm câu, thông báo chế độ | Hoạt động khi không có key/mất API; ngoài chủ đề không trả bừa; nút Hỏi về mục này chọn đúng chủ đề | 4–6 | Từ khóa khớp sai: đưa câu ứng viên để người dùng chọn khi chưa chắc |
| G6 — Kiểm thử tích hợp, điện thoại, cân bằng, ngoại tuyến và tải | G3–G5 ổn định, nội dung đã duyệt | Báo cáo test; bản sửa lỗi; cache tài nguyên; bản demo đóng gói | Qua toàn bộ P0; không lỗi tính điểm; hoàn thành lượt khoảng 5–6 phút trong thử nghiệm; 60 phiên tải không lỗi ứng dụng | 7–10 | Wi-Fi yếu/cache cũ: giảm tài nguyên, tải trước, quản lý phiên bản cache và thử trên thiết bị thật |
| G7 — Phát hành, QR, diễn tập và bàn giao | G6 đạt; tài khoản hosting cá nhân | URL HTTPS, QR PNG/SVG, README, gói build dự phòng, checklist ngày học | Điện thoại chưa đăng nhập vẫn truy cập được; QR đúng URL; chạy một lượt và một quiz trên bản production; người khác tự làm theo README | 2–4 | Nhầm URL preview/hết hạn mức: kiểm tra ẩn danh và mạng di động; giữ bản ổn định để quay lại |

Mốc quản lý: sau G3 có bản game chơi thử; sau G5 có đủ bốn tính năng; sau G7 có bản để nộp và trình bày. Không phát hành chỉ vì đã dựng được giao diện. Nâng cấp AI nếu đủ điều kiện ước lượng riêng 6–10 giờ tích hợp và kiểm thử, chưa tính thời gian cấu hình tài khoản/hạn mức; không nằm trong tổng 42–65 giờ.

Nếu thời hạn rất ngắn, giảm hoạt ảnh, trang trí và tìm kiếm nâng cao; giữ nguyên 6 màn, 4 chỉ số, xử lý rủi ro, trắc nghiệm, 40 FAQ và kiểm thử luật. Không dùng khoản thời gian tiết kiệm để bỏ duyệt nội dung hoặc giấu lỗi bảng điểm.

**10. Checklist nghiệm thu có thể kiểm tra**

Các mục dưới đây là kiểm thử sẽ thực hiện khi có ứng dụng. Chưa có ứng dụng nên chưa có kết quả pass/fail thực tế ở bước lập kế hoạch.

| Nhóm | Ca kiểm thử | Tiêu chí đạt |
|---|---|---|
| Dữ liệu | Đọc đủ 6 màn, 18 lựa chọn, 12 bài, 24 câu, 40 FAQ; kiểm tra ID và liên kết | Không thiếu trường, không trùng ID; không có câu thiếu đáp án chuẩn; phần tạm được duyệt trước bản lớp học |
| Điểm | Đối chiếu từng lựa chọn với bảng v1; thử trần 100, sàn 0 | Kết quả đúng; chỉ số luôn hữu hạn trong 0–100 |
| Thứ tự | V 95 chọn 5A; V 15 chọn 3B | Lần lượt V 85 và phá sản tức thời; không có cộng/phạt lặp |
| Xác suất | Giả lập số bốc 0; 0,4999; 0,5; 0,9999 tại M3B còn đủ V | Hai số đầu phá sản; hai số sau sống theo điểm cơ bản; không dùng kiểm thử ngẫu nhiên dễ chập chờn làm cổng duy nhất |
| Ngẫu nhiên và lưu | Tải lại trước/sau thẻ sự kiện; đổi tab rồi quay lại | Giữ nguyên lựa chọn, số đã bốc, chỉ số và pha; không “bốc lại” để đổi kết quả |
| Chọn nhiều lần | Bấm nhanh A rồi B; bấm Next liên tục | Mỗi màn chỉ có một lựa chọn; không bỏ qua màn |
| Nhánh | Chọn 4C và so với 4A/4B | Cùng đến M5, khác đúng lời dẫn theo cờ; không bỏ thẻ lý luận, không cộng điểm ngầm |
| Kết cục | Các đường ví dụ mục 4; giá trị ngay dưới/bằng/trên ngưỡng; nhiều điều kiện cùng đúng | Đúng thứ tự ưu tiên; mọi lượt có kết cục; bốn kết cục bắt buộc có ít nhất một đường đạt |
| Lịch sử | So sánh trước/sau, phạt và chỉ số kết thúc | Khớp giao dịch; tổng kết phản ánh lựa chọn gây tranh luận dù nhãn kết cục tích cực |
| Quiz | Nhiều lượt 10 câu; đảo đáp án của cùng một câu | Không trùng ID trong lượt; chấm theo đáp án chuẩn bất kể vị trí; tổng đúng 0–10 |
| Quiz liên tục | Bấm nhiều đáp án, tải lại, chuyển tab sau phản hồi | Không tăng điểm lặp; phản hồi và thứ tự giữ nguyên; chỉ Làm lại mới tạo lượt mới |
| Điều hướng | Game → Kiến thức → Hỏi đáp → quay lại; câu sai → bài học | Mở đúng bài; giữ màn chơi và tiến độ quiz; không tự gửi API khi chỉ đổi tab |
| Bản lưu | Dữ liệu hỏng, phiên bản cũ, trình duyệt chặn storage | Không trắng trang; giải thích và cho bắt đầu mới/chơi tạm; không âm thầm ghi đè tiến trình hợp lệ |
| Chơi lại | Khởi động lại ở giữa và cuối game | Bốn chỉ số trở lại 50; xóa lịch sử/cờ game; dữ liệu quiz không bị xóa ngoài ý muốn |
| FAQ | Câu gợi ý, từ không dấu, câu ngoài chủ đề, câu không có trong kho, chuỗi giống HTML | Có câu đúng hoặc danh sách gợi ý; không tự bịa; hiển thị văn bản an toàn; luôn rõ chế độ |
| AI nếu bật | Ngoài chủ đề, thiếu dữ liệu, chỉ dẫn bỏ tài liệu, timeout, mất mạng, hết quota | Không lộ key/prompt bí mật; không gọi vượt quota; chuyển FAQ rõ ràng; game không bị ảnh hưởng |
| AI dùng chung Wi-Fi | Nhiều phiên hợp lệ từ một IP; nhiều instance máy chủ | Không khóa nhầm cả lớp theo quota của một người; hạn mức tổng vẫn không bị vượt do bộ đếm cục bộ |
| Điện thoại | Android Chrome, iPhone Safari nếu có; 360/390/430 px; zoom 200%; bàn phím chat | Đọc và bấm được, không tràn ngang, không che nội dung; đúng/sai có chữ và ký hiệu |
| Tiếp cận | Tab/Enter, focus, chỉ số đọc được; chế độ giảm chuyển động | Hoàn tất được luồng chính mà không cần chuột/nhận biết màu |
| Ngoại tuyến | Tải bản hoàn chỉnh một lần rồi tắt mạng và tải lại | Game, bài học, quiz và FAQ chạy từ cache; lần đầu chưa tải được không hứa hoạt động ngoại tuyến |
| QR/HTTPS | Quét QR trên điện thoại chưa dùng trước; mở bài trực tiếp; thử Wi-Fi và 4G/5G | URL production công khai, chứng chỉ hợp lệ, không đòi tài khoản người triển khai |
| Tải 60 người | 60 phiên tải tài nguyên gần đồng thời; thử qua mạng lớp; không kiểm thử tải lên dịch vụ AI trả phí | Không lỗi 4xx/5xx bất thường hoặc lỗi ứng dụng; báo rõ cấu hình và số đo thay vì chỉ ghi “chịu được 60 người” |

Dùng Vitest cho hàm luật game, chấm quiz, kiểm tra dữ liệu; Playwright cho các luồng quan trọng và tải lại trạng thái; kiểm tra thủ công trên điện thoại thật cho bố cục, cảm giác bấm và mạng. Mục tiêu là kiểm thử hành vi có thể sai, không kiểm tra chi tiết triển khai vô nghĩa.

Mục tiêu hiệu năng đề xuất: tổng tài nguyên cho cả bộ học ≤2 MB sau nén/tối ưu; 60 lượt tải đầu tương đương khoảng 120 MB dữ liệu trước phần phát sinh, là phép ước tính chứ chưa đo. Mục tiêu sẵn sàng thao tác trong 5 giây cho ít nhất 95% lượt đo trên mạng thử đã ghi cấu hình. Sau khi có bản dựng, đo tối thiểu 30 lượt tải mới trên thiết bị đại diện; phép thử HTTP 60 phiên kiểm tra tải hosting, không thay thế kiểm tra Wi-Fi và thao tác trên điện thoại.

Thử học với 5 sinh viên trước khi mở cả lớp: đo thời gian hoàn thành, chỗ hiểu sai thuật ngữ, nút khó bấm và chất lượng giải thích. Chốt nội dung sau phản hồi rồi chạy lại các test bị ảnh hưởng. Không tiếp tục mở rộng kiểm thử không liên quan sau khi cổng nghiệm thu đã đạt.

**11. Quy trình hosting, QR và demo trên lớp**

1. Người triển khai tạo kho mã riêng và commit cấu trúc/nội dung đã duyệt; thêm file khóa dependency. README ghi phiên bản Node tương thích với Vite được chọn, cách cài, chạy, kiểm thử và dựng.
2. Dựng bản production tại máy; kiểm tra cấu trúc dữ liệu, test luật và luồng chính; kiểm tra không có `.env`, key hoặc token bí mật trong bản dựng. Bản FAQ không cần biến bí mật.
3. Kết nối kho mã với tài khoản Vercel Hobby cá nhân; cấu hình lệnh build và thư mục `dist`. Chọn điều hướng theo hash để link bài như `/#/kien-thuc/k03-accumulation` tải lại được mà không cần cấu hình nhiều đường dẫn máy chủ.
4. Xem bản preview trên máy tính và điện thoại. Khi đạt nghiệm thu, phát hành bản production, ghi commit và `contentVersion` tương ứng; giữ bản trước để có thể quay lại khi có lỗi.
5. Mở URL production trong cửa sổ ẩn danh và điện thoại không đăng nhập. Kiểm tra HTTPS, truy cập công khai, đường dẫn bài trực tiếp và tải lại giữa lượt.
6. Tạo QR PNG và SVG từ URL HTTPS production ổn định; in kèm URL chữ ngắn trên slide. Tránh QR của localhost, địa chỉ preview có bảo vệ hoặc liên kết bị đổi sau mỗi bản dựng.
7. Tải ứng dụng một lần trên máy trình chiếu và vài điện thoại dự phòng. Bản hoàn chỉnh cache trước bộ HTML/CSS/JS/JSON/minh họa dùng cho buổi học; cache có phiên bản, không cập nhật dữ liệu giữa lượt chơi và không cache endpoint AI.
8. Trước buổi học 1–2 ngày: chạy thử mạng lớp, kiểm tra hạn mức hosting, QR, đường quay lại bài; lưu gói build và nội dung dự phòng trên máy trình chiếu. Chốt phiên bản, tránh đổi điểm sát giờ.
9. Trước giờ học khoảng 15 phút: quét QR bằng Wi-Fi và mạng di động, chơi một lượt, làm quiz, hỏi một câu FAQ, kiểm tra chế độ AI đang tắt nếu chưa có hạn mức phù hợp. Mở sẵn phương án trình chiếu dự phòng.

| Sự cố | Kịch bản tiếp tục buổi học |
|---|---|
| API không có/lỗi/hết quota | FAQ 40 câu tiếp tục phục vụ; hiện rõ câu trả lời soạn sẵn |
| Mạng chập chờn sau khi đã tải và cache đủ | Bốn phần chạy cục bộ; người học dùng tiếp trên thiết bị, không phụ thuộc yêu cầu gửi máy chủ |
| Mất mạng trước lần truy cập đầu | Máy chưa tải ứng dụng không thể tự truy cập chỉ nhờ QR; dùng máy trình chiếu đã chuẩn bị và cho lớp biểu quyết lựa chọn |
| Hosting gặp sự cố | Dùng bản build chạy qua máy chủ cục bộ đã thử trên laptop để trình chiếu; QR Internet không tự trỏ sang bản này |
| Lỗi bản phát hành mới | Quay lại bản production đã nghiệm thu; nếu bản lưu không tương thích thì thông báo và bắt đầu lượt mới |
| Máy người học chặn lưu | Cho chơi trong phiên hiện tại với thông báo; vẫn làm được hoạt động học, không cam kết giữ khi đóng trang |

Bản cục bộ phải được phục vụ qua máy chủ HTTP đã chuẩn bị, không mặc định mở trực tiếp file HTML của bản Vite sẽ hoạt động đầy đủ. Cache ngoại tuyến chỉ bảo vệ thiết bị đã tải trước; yêu cầu này phải được kiểm tra thực tế, không chỉ có biểu tượng “offline”.

**12. Công việc ngay trong buổi đầu tiên**

Mục tiêu buổi đầu khoảng 3–4 giờ là khóa các quyết định có ảnh hưởng lớn và dựng một luồng mỏng để kiểm chứng, sau khi chuyển sang bước lập trình:

1. Dành 30 phút chốt hạn nộp, trình độ, người duyệt nội dung; ghi rõ bản lớp học dùng FAQ và không có chi phí API.
2. Dành 45–60 phút rà bảng 18 lựa chọn, duyệt hoặc sửa A01–A12, nhất là 5C và thứ tự phạt/giới hạn; chốt ngưỡng kết cục tạm thành phiên bản v1.
3. Dành 45–60 phút hoàn thiện nội dung mẫu Màn 1, một bài K01, hai câu trắc nghiệm và bốn FAQ, theo đúng schema và quy tắc nguồn. Đây là mẫu biên tập cho toàn bộ phần còn lại.
4. Dành 60–90 phút khởi tạo khung 4 tab và một màn chơi dùng dữ liệu mẫu; kiểm tra trên điện thoại việc chọn một lần, thay đổi chỉ số và khôi phục khi tải lại.
5. Cuối buổi ghi lại việc đã đạt/chưa đạt và cập nhật ước lượng từ tốc độ thực tế. Đầu ra tối thiểu của buổi đầu: bảng luật v1 có trạng thái duyệt, bộ nội dung mẫu và luồng thử chạy được; nếu chưa có đủ thời gian, ưu tiên hoàn thành bảng luật cùng mẫu nội dung trước.

Các cổng không được bỏ qua trước khi đưa vào lớp: nội dung đã được duyệt; luật tính điểm đúng; đủ bốn phần; chạy được trên điện thoại; QR công khai đúng URL; hỏi đáp không phát sinh chi phí ngoài ngân sách; có kịch bản tiếp tục khi mạng gặp sự cố.
