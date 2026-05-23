package com.server.api.itineraries.controller;

import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.api.itineraries.ItineraryService;
import com.server.api.itineraries.dto.ItineraryResponseDto;
import com.server.lib.BaseApiResponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "Itineraries", description = "")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/itineraries")
public class GetItineraryController
{
    private final ItineraryService itineraryService;

    @GetMapping("/{id}")
    public BaseApiResponse<ItineraryResponseDto> get(@PathVariable UUID id) {
        return BaseApiResponse.success(itineraryService.get(id));
    }
}
