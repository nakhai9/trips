package com.server.api.itineraries.dto;

import java.util.List;
import java.util.UUID;

import com.server.api.activities.Activity;
import com.server.api.activities.dto.ActivityResponseDto;
import com.server.lib.ReferenceDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItineraryResponseDto {
    private Long dayNumber;
    private UUID id;
    private UUID planId;
    private String destination;
    List<ActivityResponseDto> activities;
}
