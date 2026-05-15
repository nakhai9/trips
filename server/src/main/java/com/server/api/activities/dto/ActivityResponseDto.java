package com.server.api.activities.dto;

import lombok.*;

import java.util.UUID;

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

}
