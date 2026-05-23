package com.server.api.locations.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.api.locations.LocationService;
import com.server.api.locations.dto.LocationFilter;
import com.server.api.locations.dto.LocationResponseDto;
import com.server.lib.BaseApiResponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/locations")
@AllArgsConstructor
@Tag(name = "Locations", description = "")
public class ListLocationController {
    private final LocationService locationService;

    @GetMapping()
    public BaseApiResponse<List<LocationResponseDto>> list(LocationFilter filters) {
        return BaseApiResponse.success(locationService.list(filters));
    }
}
