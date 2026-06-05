package com.server.api.plans.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class PlanResponseDto {
    private UUID id;
    private String title;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    // private String accessCode;
    private boolean canView;
    @JsonProperty("isPublic")
    private Boolean isPublic;
    private Long viewCount;
}
