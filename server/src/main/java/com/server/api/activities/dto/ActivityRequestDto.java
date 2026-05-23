package com.server.api.activities.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ActivityRequestDto {
    @NotBlank(message = "Trường hoạt động (title) không được để trống")
    private String title;
    private String description;
    @NotNull(message = "Trường sequence không được null")
    private Long sequence;
    private String startTime;
    private String endTime;
    @NotNull(message = "Trường itineraryId không được null")
    private UUID itineraryId;
    private Double latitude;
    private Double longitude;
    private Boolean isCompleted;
    private String addressLine;
}
