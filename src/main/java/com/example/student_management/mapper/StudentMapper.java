package com.example.student_management.mapper;

import com.example.student_management.dto.StudentRequestDto;
import com.example.student_management.dto.StudentResponseDto;
import com.example.student_management.entity.Student;

public final class StudentMapper {

    private StudentMapper() {
    }

    public static Student toEntity(StudentRequestDto dto) {

        Student student = new Student();

        applyRequest(student, dto);

        return student;
    }

    public static void applyRequest(
            Student student,
            StudentRequestDto dto
    ) {

        student.setScholarNo(dto.scholarNo().trim());


        student.setStudentName(dto.studentName().trim());

        student.setEmail(
                dto.email()
                        .trim()
                        .toLowerCase()
        );

        student.setContactNo(dto.contactNo().trim());

        student.setAddress(dto.address().trim());

        student.setCourseName(dto.courseName().trim());

        student.setDepartment(dto.department().trim());

        student.setCurrentSemester(dto.currentSemester());

        student.setSgpa(dto.sgpa());

        student.setCollegeName(dto.collegeName().trim());

        student.setPassingYear(dto.passingYear());

        student.setAdmissionYear(dto.admissionYear());

        student.setGender(dto.gender());

        student.setDateOfBirth(dto.dateOfBirth());

        student.setStatus(dto.status());

        student.setGuardianName(dto.guardianName());

        student.setGuardianContact(dto.guardianContact());

        student.setSection(dto.section());
    }

    public static StudentResponseDto toResponse(
            Student student
    ) {

        return new StudentResponseDto(

                student.getId(),

                student.getScholarNo(),

                student.getStudentName(),

                student.getEmail(),

                student.getContactNo(),

                student.getAddress(),

                student.getCourseName(),

                student.getDepartment(),

                student.getCurrentSemester(),

                student.getSgpa(),

                student.getCollegeName(),

                student.getPassingYear(),

                student.getAdmissionYear(),

                student.getGender(),

                student.getDateOfBirth(),

                student.getStatus(),

                student.getGuardianName(),

                student.getGuardianContact(),

                student.getSection()
        );
    }
}