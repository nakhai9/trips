package com.server.api.users.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.api.users.UserService;
import com.server.api.users.dto.UserResponseDto;
import com.server.lib.BaseApiResponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "")
public class ListUserController {
    private final UserService userService;

    @GetMapping
    public BaseApiResponse<List<UserResponseDto>> list() {
        return BaseApiResponse.success(userService.list());
    }
}