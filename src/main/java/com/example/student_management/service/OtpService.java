package com.example.student_management.service;

import java.util.HashMap;

import java.util.Map;

import java.util.Random;

import org.springframework.mail.SimpleMailMessage;

import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.stereotype.Service;

@Service
public class OtpService {

    private final JavaMailSender
            mailSender;

    private final Map<String, String>
            otpStorage =
            new HashMap<>();

    public OtpService(
            JavaMailSender mailSender
    ) {

        this.mailSender =
                mailSender;
    }

    public void sendOtp(String email) {

        Random random = new Random();

        String otp =
                String.valueOf(

                        100000
                        +

                        random.nextInt(900000)
                );

        otpStorage.put(email, otp);

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(email);

        message.setSubject(
                "Student ERP OTP Verification"
        );

        message.setText(

                "Your OTP is: "

                + otp +

                "\n\nValid for registration."
        );

        mailSender.send(message);

        System.out.println(
                "OTP sent: " + otp
        );
    }

    public boolean verifyOtp(

            String email,

            String otp
    ) {

        String storedOtp =
                otpStorage.get(email);

        return storedOtp != null

                &&

                storedOtp.equals(otp);
    }
}