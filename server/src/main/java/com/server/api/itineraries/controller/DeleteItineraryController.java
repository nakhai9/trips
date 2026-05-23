package com.server.api.itineraries.controller;

import java.util.UUID;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.api.itineraries.ItineraryService;
import com.server.lib.BaseApiResponse;
import com.server.lib.ResponseId;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "Itineraries", description = "")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/itineraries")
public class DeleteItineraryController {
    private final ItineraryService itineraryService;

    @DeleteMapping("/{id}")
    public BaseApiResponse<ResponseId> deleteById(@PathVariable UUID id) {
        return BaseApiResponse.success(itineraryService.delete(id));
    }
}
