package com.server.api.itineraries.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.api.itineraries.ItineraryService;
import com.server.api.itineraries.dto.ItineraryRequestDto;
import com.server.lib.BaseApiResponse;
import com.server.lib.ResponseId;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@Tag(name = "Itineraries", description = "")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/itineraries")
public class CreateItineraryController {
    private final ItineraryService itineraryService;

    @PostMapping
    public BaseApiResponse<ResponseId> create(@RequestBody @Valid ItineraryRequestDto payload) {
        return BaseApiResponse.success(itineraryService.create(payload));
    }
}