package com.server.api.itineraries.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
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
public class ItineraryRequestDto {
    @NotNull(message = "Trường dayNumber không được để trống")
    private Long dayNumber;
    private UUID planId;
//    private UUID locId;
    private String destination;
    private String destinations;
    @NotNull(message = "Trường hoạt động (title) không được để trống")
    private String title;
}
