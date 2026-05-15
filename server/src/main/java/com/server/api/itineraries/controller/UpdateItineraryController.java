package com.server.api.itineraries.controller;

import com.server.api.itineraries.ItineraryService;
import com.server.api.itineraries.dto.ItineraryRequestDto;
import com.server.lib.BaseApiResponse;
import com.server.lib.ResponseId;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

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
