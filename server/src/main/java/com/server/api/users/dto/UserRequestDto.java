package com.server.api.users.dto;

import com.server.api.users.UserRole;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestDto {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private UserRole role;
}