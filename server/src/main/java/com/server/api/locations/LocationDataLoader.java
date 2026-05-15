package com.server.api.locations;

import java.util.List;

import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

/**
 * DataLoader để insert dữ liệu các tỉnh/thành phố Việt Nam vào bảng tb_locations
 * (Phiên bản không set id thủ công - để JPA tự sinh)
 */
@Component
@RequiredArgsConstructor
public class LocationDataLoader {

    private final LocationRepository locationRepository;

    @PostConstruct
    public void init() {
        // Kiểm tra nếu đã có dữ liệu thì bỏ qua
        if (locationRepository.count() > 0) {
            System.out.println("✅ Dữ liệu Location đã tồn tại, bỏ qua việc insert.");
            return;
        }

        System.out.println("🚀 Đang insert dữ liệu các tỉnh/thành Việt Nam...");

        List<Location> locations = List.of(
                createLocation("an_giang", "An Giang", "", false),
                createLocation("ba_ria_vung_tau", "Bà Rịa - Vũng Tàu", "ho_chi_minh", true),
                createLocation("bac_giang", "Bắc Giang", "bac_ninh", true),
                createLocation("bac_kan", "Bắc Kạn", "thai_nguyen", true),
                createLocation("bac_lieu", "Bạc Liêu", "ca_mau", true),
                createLocation("bac_ninh", "Bắc Ninh", "", false),
                createLocation("ben_tre", "Bến Tre", "vinh_long", true),
                createLocation("binh_dinh", "Bình Định", "gia_lai", true),
                createLocation("binh_duong", "Bình Dương", "ho_chi_minh", true),
                createLocation("binh_phuoc", "Bình Phước", "dong_nai", true),
                createLocation("binh_thuan", "Bình Thuận", "lam_dong", true),
                createLocation("ca_mau", "Cà Mau", "", false),
                createLocation("can_tho", "Cần Thơ", "", false),
                createLocation("cao_bang", "Cao Bằng", "", false),
                createLocation("da_nang", "Đà Nẵng", "", false),
                createLocation("dak_lak", "Đắk Lắk", "", false),
                createLocation("dak_nong", "Đắk Nông", "lam_dong", true),
                createLocation("dien_bien", "Điện Biên", "", false),
                createLocation("dong_nai", "Đồng Nai", "", false),
                createLocation("dong_thap", "Đồng Tháp", "", false),
                createLocation("gia_lai", "Gia Lai", "", false),
                createLocation("ha_giang", "Hà Giang", "tuyen_quang", true),
                createLocation("ha_nam", "Hà Nam", "ninh_binh", true),
                createLocation("ha_noi", "Hà Nội", "", false),
                createLocation("ha_tinh", "Hà Tĩnh", "", false),
                createLocation("hai_duong", "Hải Dương", "hai_phong", true),
                createLocation("hai_phong", "Hải Phòng", "", false),
                createLocation("hau_giang", "Hậu Giang", "can_tho", true),
                createLocation("ho_chi_minh", "Hồ Chí Minh", "", false),
                createLocation("hoa_binh", "Hoà Bình", "phu_tho", true),
                createLocation("hue", "Huế", "", false),
                createLocation("hung_yen", "Hưng Yên", "", false),
                createLocation("khanh_hoa", "Khánh Hòa", "", false),
                createLocation("kien_giang", "Kiên Giang", "an_giang", true),
                createLocation("kon_tum", "Kon Tum", "quang_ngai", true),
                createLocation("lai_chau", "Lai Châu", "", false),
                createLocation("lam_dong", "Lâm Đồng", "", false),
                createLocation("lang_son", "Lạng Sơn", "", false),
                createLocation("lao_cai", "Lào Cai", "", false),
                createLocation("long_an", "Long An", "tay_ninh", true),
                createLocation("nam_dinh", "Nam Định", "ninh_binh", true),
                createLocation("nghe_an", "Nghệ An", "", false),
                createLocation("ninh_binh", "Ninh Bình", "", false),
                createLocation("ninh_thuan", "Ninh Thuận", "khanh_hoa", true),
                createLocation("phu_tho", "Phú Thọ", "", false),
                createLocation("phu_yen", "Phú Yên", "dak_lak", true),
                createLocation("quang_binh", "Quảng Bình", "quang_tri", true),
                createLocation("quang_nam", "Quảng Nam", "da_nang", true),
                createLocation("quang_ngai", "Quảng Ngãi", "", false),
                createLocation("quang_ninh", "Quảng Ninh", "", false),
                createLocation("quang_tri", "Quảng Trị", "", false),
                createLocation("soc_trang", "Sóc Trăng", "can_tho", true),
                createLocation("son_la", "Sơn La", "", false),
                createLocation("tay_ninh", "Tây Ninh", "", false),
                createLocation("thai_binh", "Thái Bình", "hung_yen", true),
                createLocation("thai_nguyen", "Thái Nguyên", "", false),
                createLocation("thanh_hoa", "Thanh Hóa", "", false),
                createLocation("tien_giang", "Tiền Giang", "dong_thap", true),
                createLocation("tra_vinh", "Trà Vinh", "vinh_long", true),
                createLocation("tuyen_quang", "Tuyên Quang", "", false),
                createLocation("vinh_long", "Vĩnh Long", "", false),
                createLocation("vinh_phuc", "Vĩnh Phúc", "phu_tho", true),
                createLocation("yen_bai", "Yên Bái", "lao_cai", true)
        );

        locationRepository.saveAll(locations);

        System.out.println("✅ Đã insert thành công " + locations.size() + " bản ghi Location vào database!");
    }

    /**
     * Helper method để tạo Location object (không set id)
     */
    private Location createLocation(String codeName, String name, String mergedInto, boolean isMerged) {
        return Location.builder()
                .codeName(codeName)
                .name(name)
                .countryCode("vi")
                .mergedInto(mergedInto.isEmpty() ? null : mergedInto)
                .isMerged(isMerged)
                .build();
    }
}