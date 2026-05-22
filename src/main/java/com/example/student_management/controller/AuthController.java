package com.example.student_management.controller;

import java.util.HashMap;

import java.util.Map;

import org.springframework.boot.CommandLineRunner;

import org.springframework.context.annotation.Bean;

import org.springframework.web.bind.annotation.*;

import com.example.student_management.entity.User;

import com.example.student_management.repository.UserRepository;

import com.example.student_management.security.JwtService;

import com.example.student_management.service.OtpService;

@RestController

@RequestMapping("/auth")

@CrossOrigin("*")

public class AuthController {

    private final UserRepository
            userRepository;

    private final OtpService
            otpService;

    private final JwtService
            jwtService;

    public AuthController(

            UserRepository userRepository,

            OtpService otpService,

            JwtService jwtService
    ) {

        this.userRepository =
                userRepository;

        this.otpService =
                otpService;

        this.jwtService =
                jwtService;
    }

    @Bean
    CommandLineRunner createAdmin() {

        return args -> {

            if (

                userRepository
                .findByEmail(
                    "admin@gmail.com"
                )
                .isEmpty()
            ) {

                User admin =
                    User.builder()

                    .name("Administrator")

                    .email(
                        "admin@gmail.com"
                    )

                    .password("admin123")

                    .role("ADMIN")

                    .build();

                userRepository.save(admin);

                System.out.println(
                    "Admin created"
                );
            }
        };
    }

    @PostMapping("/send-otp")
    public Map<String, Object>
    sendOtp(
            @RequestBody Map<String, String>
            request
    ) {

        String email =
                request.get("email");

        Map<String, Object> response =
                new HashMap<>();

        if (

            userRepository
            .findByEmail(email)
            .isPresent()
        ) {

            response.put(
                    "success",
                    false
            );

            response.put(
                    "message",
                    "Email already exists"
            );

            return response;
        }

        otpService.sendOtp(email);

        response.put(
                "success",
                true
        );

        response.put(
                "message",
                "OTP sent successfully"
        );

        return response;
    }

    @PostMapping("/register")
    public Map<String, Object>
    register(

            @RequestBody Map<String, String>
            request
    ) {

        Map<String, Object> response =
                new HashMap<>();

        String name =
                request.get("name");

        String email =
                request.get("email");

        String password =
                request.get("password");

        String otp =
                request.get("otp");

        boolean verified =
                otpService.verifyOtp(
                        email,
                        otp
                );

        if (!verified) {

            response.put(
                    "success",
                    false
            );

            response.put(
                    "message",
                    "Invalid OTP"
            );

            return response;
        }

        User user =
                User.builder()

                .name(name)

                .email(email)

                .password(password)

                .role("STUDENT")

                .build();

        userRepository.save(user);

        response.put(
                "success",
                true
        );

        response.put(
                "message",
                "Registration successful"
        );

        return response;
    }

    @PostMapping("/login")
    public Map<String, Object>
    login(
            @RequestBody User loginData
    ) {

        Map<String, Object> response =
                new HashMap<>();

        User user =
            userRepository
            .findByEmail(
                loginData.getEmail()
            )
            .orElse(null);

        if (

            user == null

            ||

            !user.getPassword()
            .equals(
                loginData.getPassword()
            )
        ) {

            response.put(
                "success",
                false
            );

            response.put(
                "message",
                "Invalid credentials"
            );

            return response;
        }

        String token =
                jwtService.generateToken(

                        user.getEmail(),

                        user.getRole()
                );

        response.put(
            "success",
            true
        );

        response.put(
            "token",
            token
        );

        response.put(
            "role",
            user.getRole()
        );

        response.put(
            "name",
            user.getName()
        );

        return response;
    }
}