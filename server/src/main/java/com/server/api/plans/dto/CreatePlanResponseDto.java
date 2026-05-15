package com.server.api.plans.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CreatePlanResponseDto {
    private UUID id;
    private String title;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
