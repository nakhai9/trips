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
    private UUID id;
    @NotNull(message = "Trường dayNumber không được để trống")
    private Long dayNumber;
    private UUID planId;
//    private UUID locId;
    @NotNull(message = "Trường destination không được để trống")
    private String destination;
}
