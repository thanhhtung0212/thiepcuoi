# Đối chiếu 8 ảnh tham chiếu và tài nguyên assets/theme

> Phạm vi: chỉ trang trí. Source main là bản chuẩn bất biến. Không sửa chữ, ngày giờ, địa điểm, HTML cấu trúc, JS, biểu mẫu, album hay đường dẫn gốc.

| Ảnh mẫu | Đặc điểm phải đạt | Asset có sẵn trong theme | Cách triển khai hiện tại | Cần kiểm chứng |
|---|---|---|---|---|
| 1. Lễ thành hôn | Thẻ giấy ivory, viền vàng mảnh; hoa rum trắng rủ từ góc trái trên, bó hoa ở góc phải dưới | `decor le thanh hon.png`, `Botanical calla lily frame transparent*.png` | CSS thay hình hoa hiển thị; nền kem, viền vàng | Kiểm tra hoa không che tên và nội dung; hướng hoa và vùng trong suốt |
| 2. Phong bì | Phong bì olive, con dấu vàng, ảnh cưới nghiêng, hoa lớn bên trái, cánh hoa rơi | `envelope-bouquet-long-olive-v4.png`, `Dark Green Lace Envelope with Golden Heart Seal.png`, `decor thiep dau trang*.png` | Giữ hình/animation gốc, tinh chỉnh bóng và vị trí | So hình phong bì mở/đóng và chuyển động |
| 3. Đếm ngược | Nền olive đậm, 4 ô số mờ, hoa góc trái dưới, cánh hoa bay | `decor dong ho dem nguoc.png`, `countdown-calla-bouquet-only-v1.png` | Ánh xạ hoa, màu nền và ô số | Kiểm tra hoa che số trên mobile |
| 4. Tiệc cưới | Panel olive viền champagne, hoa chân khung, bản đồ và RSVP hoạt động | `decor thong tin tiec cuoi.png` | Ánh xạ ảnh hoa, đổi màu nền và viền | Không che bản đồ/nút |
| 5. Album | Thẻ ivory, ảnh trung tâm lớn, hai ảnh bên nghiêng, hoa hai góc chân | `decor album.png`, `Elegant Calla Lily Floral Corner.png` | Ánh xạ hoa hai góc, giữ carousel gốc | Không che nút chuyển ảnh và thumbnail |
| 6. Quà mừng | Thẻ kem, hình phong bì xanh olive, hoa trắng | `decor hop qua mung.png`, `Elegant Green Botanical Envelope.png` | Ánh xạ hoa, giữ nút mở quà gốc | Kiểm tra dialog vẫn mở |
| 7. Lịch trình | Thẻ ivory viền vàng, trục dọc, icon vàng, hoa ở chân | `decor lich trinh ngay cuoi.png` | Ánh xạ hoa, nền giấy, viền vàng | Kiểm tra timeline và icon gốc |
| 8. Lời chúc | Thẻ ivory viền vàng, ô nhập trắng, nút xanh olive, hoa chân phải | `decor loi chuc.png` | Ánh xạ hoa, màu nền, form | Kiểm tra gửi lời chúc vẫn hoạt động |

## Nguyên tắc kiểm định

1. Đối chiếu trực quan với từng ảnh mẫu ở desktop và mobile.
2. Kiểm tra ảnh PNG thực sự trong suốt, không chứa nền checkerboard hoặc khung vuông thừa.
3. Đối chiếu màu olive/ivory/champagne, tỉ lệ hoa, vị trí, hướng, độ chồng lớp và khoảng trống.
4. Không xác nhận đạt mẫu khi chưa có ảnh chụp website sau triển khai để so trực tiếp.
5. Mọi commit chỉ thêm/chỉnh CSS decor và tài liệu kiểm tra. Nhánh `main` bất biến.
