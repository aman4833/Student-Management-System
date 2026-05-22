package com.example.student_management.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.student_management.entity.Student;
import com.example.student_management.exception.DuplicateResourceException;
import com.example.student_management.exception.StudentNotFoundException;
import com.example.student_management.repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository
            studentRepository;

    public StudentService(
            StudentRepository studentRepository
    ) {

        this.studentRepository =
                studentRepository;
    }

    public Student createStudent(
            Student student
    ) {

        if (
                studentRepository
                .existsByEmail(
                        student.getEmail()
                )
        ) {

            throw new DuplicateResourceException(
                    "Email already exists"
            );
        }

        if (
                studentRepository
                .existsByScholarNo(
                        student.getScholarNo()
                )
        ) {

            throw new DuplicateResourceException(
                    "Scholar number already exists"
            );
        }

        return studentRepository
                .save(student);
    }

    public List<Student>
    getAllStudents() {

        return studentRepository.findAll();
    }

    public Student getStudentById(
            Long id
    ) {

        return studentRepository
                .findById(id)

                .orElseThrow(() ->

                        new StudentNotFoundException(

                                "Student not found with ID: "
                                + id
                        ));
    }

    public Student updateStudent(

            Long id,

            Student updatedStudent
    ) {

        Student existingStudent =
                getStudentById(id);

        if (

                studentRepository
                .existsByEmailAndIdNot(

                        updatedStudent.getEmail(),

                        id
                )
        ) {

            throw new DuplicateResourceException(
                    "Email already exists"
            );
        }

        if (

                studentRepository
                .existsByScholarNoAndIdNot(

                        updatedStudent.getScholarNo(),

                        id
                )
        ) {

            throw new DuplicateResourceException(

                    "Scholar number already exists"
            );
        }

        existingStudent.setScholarNo(
                updatedStudent.getScholarNo()
        );

        existingStudent.setStudentName(
                updatedStudent.getStudentName()
        );

        existingStudent.setEmail(
                updatedStudent.getEmail()
        );

        existingStudent.setContactNo(
                updatedStudent.getContactNo()
        );

        existingStudent.setAddress(
                updatedStudent.getAddress()
        );

        existingStudent.setCourseName(
                updatedStudent.getCourseName()
        );

        existingStudent.setDepartment(
                updatedStudent.getDepartment()
        );

        existingStudent.setCurrentSemester(
                updatedStudent.getCurrentSemester()
        );

        existingStudent.setSgpa(
                updatedStudent.getSgpa()
        );

        existingStudent.setCollegeName(
                updatedStudent.getCollegeName()
        );

        existingStudent.setPassingYear(
                updatedStudent.getPassingYear()
        );

        existingStudent.setAdmissionYear(
                updatedStudent.getAdmissionYear()
        );

        existingStudent.setGender(
                updatedStudent.getGender()
        );

        existingStudent.setDateOfBirth(
                updatedStudent.getDateOfBirth()
        );

        existingStudent.setStatus(
                updatedStudent.getStatus()
        );

        existingStudent.setGuardianName(
                updatedStudent.getGuardianName()
        );

        existingStudent.setGuardianContact(
                updatedStudent.getGuardianContact()
        );

        existingStudent.setSection(
                updatedStudent.getSection()
        );

        return studentRepository
                .save(existingStudent);
    }

    public void deleteStudent(Long id) {

        Student student =
                getStudentById(id);

        studentRepository.delete(student);
    }

    public List<Student>
    searchStudents(String keyword) {

        return studentRepository
                .searchStudents(keyword);
    }
}