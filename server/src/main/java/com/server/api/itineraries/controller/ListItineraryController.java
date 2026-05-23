package com.server.api.itineraries.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
public class ListItineraryController {
    private final ItineraryService itineraryService;

    @GetMapping
    public BaseApiResponse<List<ItineraryResponseDto>> list(@RequestParam(required = false) UUID planId) {

        return BaseApiResponse.success(itineraryService.list(planId));
    }
}