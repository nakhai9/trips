package com.server.api.locations.controller;

import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.api.locations.LocationService;
import com.server.api.locations.dto.LocationResponseDto;
import com.server.lib.BaseApiResponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/locations")
@AllArgsConstructor
@Tag(name = "Locations", description = "")
public class GetLocationController {
    private final LocationService locationService;

    @GetMapping("/{id}")
    public BaseApiResponse<LocationResponseDto> get(@PathVariable UUID id) {
        return BaseApiResponse.success(locationService.get(id));
    }
}
