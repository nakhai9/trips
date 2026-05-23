import { Itinerary, Trip } from "@/types/common";

export const DATE_FORMAT = "DD/MM/YYYY";

export const TRIP: Trip = {
  title: "Lịch trình du lịch 3 ngày 2 đêm tại Hà Nội và Vịnh Hạ Long",
  startDate: new Date("10/05/2026"),
  endDate: new Date("10/08/2026"),
  isPublic: true,
};

export const SCHEDULE: Itinerary[] = [
  // {
  //   dayNumber: 1,
  //   destination: "Hà Nội",
  //   location: null,
  //   planId: "",
  //   activities: [
  //     {
  //       sequence: 1,
  //       startTime: "08:00",
  //       endTime: "09:30",
  //       description:
  //         "Đón sân bay Nội Bài hoặc ga Hà Nội, check-in khách sạn khu phố cổ. Ăn sáng phở truyền thống",
  //       addressLine: null,
  //       isCompleted: false,
  //     },
  //     {
  //       sequence: 2,
  //       startTime: "09:30",
  //       endTime: "12:00",
  //       description:
  //         "Thăm Hồ Hoàn Kiếm, Tháp Rùa, Đền Ngọc Sơn. Chụp hình check-in cầu Thê Húc",
  //       addressLine: "Hồ Hoàn Kiếm, Phường Hàng Trống, Quận Hoàn Kiếm, Hà Nội",
  //       isCompleted: true,
  //     },
  //     {
  //       sequence: 3,
  //       startTime: "12:30",
  //       endTime: "14:00",
  //       description:
  //         "Ăn trưa tại Nhà hàng Ngon hoặc ẩm thực phố cổ (bún chả, nem cuốn)",
  //       addressLine:
  //         "59 P. Nguyễn Du, Tràng Tiền, Hoàn Kiếm, Hà Nội (Nhà Hàng Ngon)",
  //       isCompleted: false,
  //     },
  //     {
  //       sequence: 4,
  //       startTime: "14:00",
  //       endTime: "17:00",
  //       description:
  //         "Thăm Văn Miếu - Quốc Tử Giám, Chùa Một Cột. Ngắm cảnh và chụp hình",
  //       addressLine: "58 Quốc Tử Giám, Văn Miếu, Đống Đa, Hà Nội",
  //       isCompleted: false,
  //     },
  //     {
  //       sequence: 5,
  //       startTime: "18:00",
  //       endTime: "22:00",
  //       description:
  //         "Dạo phố cổ, cà phê vỉa hè, ăn tối (bún đậu mắm tôm hoặc lẩu Hà Nội). Xem múa rối nước hoặc dạo phố đi bộ",
  //       addressLine: "Phố Cổ Hà Nội, Quận Hoàn Kiếm",
  //       isCompleted: false,
  //     },
  //     {
  //       sequence: 6,
  //       startTime: "08:00",
  //       endTime: "09:30",
  //       description:
  //         "Đón sân bay Nội Bài hoặc ga Hà Nội, check-in khách sạn khu phố cổ. Ăn sáng phở truyền thống",
  //       addressLine: null,
  //       isCompleted: false,
  //     },
  //     {
  //       sequence: 7,
  //       startTime: "08:00",
  //       endTime: "09:30",
  //       description:
  //         "Đón sân bay Nội Bài hoặc ga Hà Nội, check-in khách sạn khu phố cổ. Ăn sáng phở truyền thống",
  //       addressLine: null,
  //       isCompleted: false,
  //     },
  //   ],
  // },
  // {
  //   dayNumber: 2,
  //   destination: "Vịnh Hạ Long",
  //   location: null,
  //   planId: "",
  //   activities: [
  //     {
  //       sequence: 1,
  //       startTime: "07:00",
  //       endTime: "10:00",
  //       description: "Ăn sáng, check-out khách sạn, di chuyển đến Hạ Long",
  //       addressLine: null,
  //       isCompleted: false,
  //     },
  //     {
  //       sequence: 2,
  //       startTime: "11:30",
  //       endTime: "12:30",
  //       description: "Check-in cảng, lên du thuyền. Ăn trưa buffet trên thuyền",
  //       addressLine:
  //         "Cảng tàu du lịch Hạ Long, Bãi Cháy, Thành phố Hạ Long, Quảng Ninh",
  //       isCompleted: false,
  //     },
  //     {
  //       sequence: 3,
  //       startTime: "13:30",
  //       endTime: "16:30",
  //       description:
  //         "Thăm động Thiên Cung hoặc Sửng Sốt, chèo kayak, chụp hình đảo Titop",
  //       addressLine: "Vịnh Hạ Long, Quảng Ninh",
  //       isCompleted: false,
  //     },
  //     {
  //       sequence: 4,
  //       startTime: "17:00",
  //       endTime: "19:00",
  //       description: "Ngắm hoàng hôn, bơi lội, ăn tối hải sản tươi trên thuyền",
  //       addressLine: null,
  //       isCompleted: false,
  //     },
  //     {
  //       sequence: 5,
  //       startTime: "19:30",
  //       endTime: "22:00",
  //       description:
  //         "Thưởng thức chương trình ca múa nhạc, thả đèn hoa đăng. Nghỉ đêm trên du thuyền",
  //       addressLine: null,
  //       isCompleted: false,
  //     },
  //   ],
  // },
  // {
  //   dayNumber: 3,
  //   location: null,
  //   planId: "",
  //   destination: "Vịnh Hạ Long",
  //   activities: [
  //     {
  //       sequence: 1,
  //       startTime: "07:00",
  //       endTime: "10:00",
  //       description:
  //         "Ăn sáng trên thuyền. Thăm làng chài hoặc đảo Cát Bà, chụp hình ngắm cảnh vịnh",
  //       addressLine: "Làng chài Vung Viêng, Vịnh Hạ Long, Quảng Ninh",
  //       isCompleted: false,
  //     },
  //     {
  //       sequence: 2,
  //       startTime: "10:30",
  //       endTime: "12:00",
  //       description: "Trả phòng du thuyền, ăn brunch",
  //       addressLine: null,
  //       isCompleted: false,
  //     },
  //     {
  //       sequence: 3,
  //       startTime: "12:00",
  //       endTime: "15:00",
  //       description: "Di chuyển về Hà Nội. Dừng mua quà lưu niệm hải sản khô",
  //       addressLine: null,
  //       isCompleted: false,
  //     },
  //     {
  //       sequence: 4,
  //       startTime: "15:30",
  //       endTime: "18:00",
  //       description: "Tự do mua sắm tại Hà Nội hoặc ra sân bay về",
  //       addressLine: "Phố Cổ Hà Nội, Quận Hoàn Kiếm",
  //       isCompleted: false,
  //     },
  //   ],
  // },
];
//   notes: [
//     "Nên đặt tour du thuyền Hạ Long 4-5 sao trước.",
//     "Mang kem chống nắng, thuốc say sóng nếu cần.",
//     "Chi phí ước tính: 8-15 triệu VND/người (tùy loại du thuyền & khách sạn).",
//     "Mùa đẹp nhất: Tháng 3-5 hoặc 9-11.",
//   ],
