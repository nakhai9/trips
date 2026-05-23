package com.server.api.activities.dto;

import java.util.UUID;

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
public class ActivityResponseDto {
    private UUID id;
    private String description;
    private Long sequence;
    private String startTime;
    private String endTime;
    private UUID itineraryId;
    private Double latitude;
    private Double longitude;
    private Boolean isCompleted;
    private String addressLine;
    private String title;

}
