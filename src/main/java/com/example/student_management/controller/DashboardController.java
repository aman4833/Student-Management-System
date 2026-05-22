package com.example.student_management.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.student_management.repository.StudentRepository;

@RestController
@CrossOrigin("*")
public class DashboardController {

    private final StudentRepository
            studentRepository;

    public DashboardController(
            StudentRepository studentRepository
    ) {

        this.studentRepository =
                studentRepository;
    }

    @GetMapping("/dashboard/stats")
    public Map<String, Object>
    getDashboardStats() {

        Map<String, Object> stats =
                new HashMap<>();

        long totalStudents =
                studentRepository.count();

        long activeStudents =
                studentRepository
                .countByStatus("ACTIVE");

        long departments =
                studentRepository
                .countDepartments();

        Double averageSgpa =
                studentRepository
                .getAverageSgpa();

        stats.put(
                "totalStudents",
                totalStudents
        );

        stats.put(
                "activeStudents",
                activeStudents
        );

        stats.put(
                "departments",
                departments
        );

        stats.put(
                "averageSgpa",

                averageSgpa != null

                        ? Math.round(
                        averageSgpa * 100.0
                ) / 100.0

                        : 0
        );

        return stats;
    }
}