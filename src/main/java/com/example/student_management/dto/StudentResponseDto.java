package com.example.student_management.dto;

import java.time.LocalDate;

import com.example.student_management.entity.Gender;
import com.example.student_management.entity.StudentStatus;

public record StudentResponseDto(

        Long id,

        String scholarNo,

        String studentName,

        String email,

        String contactNo,

        String address,

        String courseName,

        String department,

        Integer currentSemester,

        Double sgpa,

        String collegeName,

        Integer passingYear,

        Integer admissionYear,

        Gender gender,

        LocalDate dateOfBirth,

        StudentStatus status,

        String guardianName,

        String guardianContact,

        String section

) {
}