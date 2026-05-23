package com.server.api.itineraries.controller;

import java.util.UUID;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
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
public class UpdateItineraryController {
    private final ItineraryService itineraryService;

    @PutMapping("/{id}")
    public BaseApiResponse<ResponseId> update(@PathVariable UUID id, @RequestBody @Valid ItineraryRequestDto payload) {
        return BaseApiResponse.success(itineraryService.update(id, payload));
    }

}
