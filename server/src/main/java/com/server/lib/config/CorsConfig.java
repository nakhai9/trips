package com.server.lib.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${app.cors.allowed-origins:http://localhost:3000,http://127.0.0.1:3000}")
    private String[] allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns(Arrays.stream(allowedOrigins).map(String::trim).toArray(String[]::new))
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}

// Thêm file cấu hình mới: src/main/java/com/server/config/CorsConfig.java

// Áp dụng CORS cho toàn bộ endpoint: /**
// Cho phép methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
// Cho phép mọi header
// Bật allowCredentials(true) để hỗ trợ cookie/token theo nhu cầu FE
// Dùng allowedOriginPatterns lấy từ config để dễ đổi theo môi trường
