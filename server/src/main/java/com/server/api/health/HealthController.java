package com.server.api.health;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Health", description = "")
@RestController
@RequestMapping("/health")
public class HealthController {
    @GetMapping
    public String health() {
        return "OK - Application is running!";
    }
}
