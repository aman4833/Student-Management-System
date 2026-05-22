package com.example.student_management.dto;

import java.time.LocalDate;

import com.example.student_management.entity.Gender;
import com.example.student_management.entity.StudentStatus;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record StudentRequestDto(

        @NotBlank(message = "Scholar number is required")
        String scholarNo,



        @NotBlank(message = "Student name is required")
        @Pattern(
                regexp = "^[A-Za-z ]+$",
                message = "Student name must contain only alphabets and spaces"
        )
        String studentName,

        @NotBlank(message = "Email is required")
        @Email(message = "Enter valid email")
        String email,

        @Pattern(
                regexp = "^[0-9]{10}$",
                message = "Contact number must be exactly 10 digits"
        )
        String contactNo,

        @NotBlank(message = "Address is required")
        String address,

        @NotBlank(message = "Course name is required")
        String courseName,

        @NotBlank(message = "Department is required")
        String department,

        @Min(value = 1)
        @Max(value = 8)
        Integer currentSemester,

        @DecimalMin(value = "0.0")
        @DecimalMax(value = "10.0")
        Double sgpa,

        @NotBlank(message = "College name is required")
        String collegeName,

        Integer passingYear,

        Integer admissionYear,

        Gender gender,

        LocalDate dateOfBirth,

        StudentStatus status,

        String guardianName,

        @Pattern(
                regexp = "^[0-9]{10}$",
                message = "Guardian contact must be exactly 10 digits"
        )
        String guardianContact,

        String section

) {
}