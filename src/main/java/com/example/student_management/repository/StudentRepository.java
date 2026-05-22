package com.example.student_management.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.student_management.entity.Student;

public interface StudentRepository
        extends JpaRepository<Student, Long> {

    Optional<Student>
    findByEmail(String email);

    Optional<Student>
    findByScholarNo(String scholarNo);

    boolean existsByEmail(String email);

    boolean existsByScholarNo(
            String scholarNo
    );

    boolean existsByScholarNoAndIdNot(
            String scholarNo,
            Long id
    );

    boolean existsByEmailAndIdNot(
            String email,
            Long id
    );

    List<Student>
    findByDepartment(String department);

    @Query("""
        SELECT s
        FROM Student s

        WHERE

        LOWER(s.studentName)
        LIKE LOWER(CONCAT('%', :keyword, '%'))

        OR

        LOWER(s.scholarNo)
        LIKE LOWER(CONCAT('%', :keyword, '%'))

        OR

        LOWER(s.email)
        LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    List<Student>
    searchStudents(String keyword);

    @Query("""
        SELECT COUNT(s)
        FROM Student s
        WHERE s.status = 'ACTIVE'
    """)
    long countByStatus(String status);

    @Query("""
        SELECT AVG(s.sgpa)
        FROM Student s
    """)
    Double getAverageSgpa();

    @Query("""
        SELECT COUNT(DISTINCT s.department)
        FROM Student s
    """)
    Long countDepartments();
}