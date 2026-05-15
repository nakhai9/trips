package com.server.api.locations.controller;

import java.util.List;
import java.util.Map;

import com.server.api.locations.LocationService;
import com.server.api.locations.dto.LocationFilter;
import com.server.api.locations.dto.LocationResponseDto;
import com.server.lib.BaseApiResponse;
import org.springframework.web.bind.annotation.*;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/locations")
@AllArgsConstructor
public class ListLocationController {
    private final LocationService locationService;

    @GetMapping()
    public BaseApiResponse<List<LocationResponseDto>> list(LocationFilter filters) {
        return BaseApiResponse.success(locationService.list(filters));
    }
}
