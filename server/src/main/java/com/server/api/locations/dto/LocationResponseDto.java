package com.server.api.locations.dto;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LocationResponseDto {
    private UUID id;
    private String name;
    private String countryCode;
    private String codeName;
    private String mergedInto;
    @JsonProperty("isMerged")
    private Boolean isMerged;

}