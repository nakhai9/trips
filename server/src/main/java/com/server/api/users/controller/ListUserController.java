package com.server.api.users.controller;

import com.server.api.users.UserService;
import com.server.api.users.dto.UserResponseDto;
import com.server.lib.BaseApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class ListUserController {
    private final UserService userService;

    @GetMapping
    public BaseApiResponse<List<UserResponseDto>> list() {
        return BaseApiResponse.success(userService.list());
    }
}