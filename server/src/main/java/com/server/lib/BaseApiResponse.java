package com.server.lib;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BaseApiResponse<T> {
    private boolean success;
    private String message;
    private T data;

    public static <T> BaseApiResponse<T> success(T data) {
        return BaseApiResponse.<T>builder()
                .success(true)
                .message("Thao tác thành công")
                .data(data)
                .build();
    }

    public static <T> BaseApiResponse<T> success(T data, String message) {
        return BaseApiResponse.<T>builder()
                .success(true)
                .message(message)
                .data(data)
                .build();
    }
}
