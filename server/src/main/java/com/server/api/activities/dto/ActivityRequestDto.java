package com.server.api.activities.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.UUID;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ActivityRequestDto {
    @NotBlank(message = "Trường description không được để trống")
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
}
