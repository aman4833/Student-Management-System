package com.example.student_management.dto;

public record DashboardStatsDto(

        long totalStudents,

        long activeStudents,

        long departments,

        double averageSgpa

) {
}