package com.server.api.plans.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AccessCodeRequestDto {
    private String accessCode;
}
