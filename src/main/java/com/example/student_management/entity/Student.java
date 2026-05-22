package com.example.student_management.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(
        name = "students",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_student_email",
                        columnNames = "email"
                ),
                @UniqueConstraint(
                        name = "uk_scholar_no",
                        columnNames = "scholar_no"
                )
        }
)
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Scholar number is required")
    @Size(max = 30)
    @Column(
            name = "scholar_no",
            nullable = false,
            unique = true,
            length = 30
    )
    private String scholarNo;



    @NotBlank(message = "Student name is required")
    @Pattern(
            regexp = "^[A-Za-z ]+$",
            message = "Student name must contain only alphabets and spaces"
    )
    @Size(max = 100)
    @Column(
            name = "student_name",
            nullable = false,
            length = 100
    )
    private String studentName;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter valid email")
    @Column(
            nullable = false,
            unique = true
    )
    private String email;

    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Contact number must be exactly 10 digits"
    )
    @Column(
            name = "contact_no",
            length = 10
    )
    private String contactNo;

    @NotBlank(message = "Address is required")
    @Size(max = 300)
    @Column(length = 300)
    private String address;

    @NotBlank(message = "Course name is required")
    @Column(name = "course_name")
    private String courseName;

    @NotBlank(message = "Department is required")
    private String department;

    @Min(
            value = 1,
            message = "Semester must be at least 1"
    )
    @Max(
            value = 8,
            message = "Semester cannot exceed 8"
    )
    @Column(name = "current_semester")
    private Integer currentSemester;

    @DecimalMin(
            value = "0.0",
            message = "SGPA cannot be less than 0"
    )
    @DecimalMax(
            value = "10.0",
            message = "SGPA cannot exceed 10"
    )
    private Double sgpa;

    @NotBlank(message = "College name is required")
    @Column(name = "college_name")
    private String collegeName;

    @Min(
            value = 2000,
            message = "Enter valid passing year"
    )
    @Max(
            value = 2100,
            message = "Enter valid passing year"
    )
    @Column(name = "passing_year")
    private Integer passingYear;

    @Min(
            value = 2000,
            message = "Enter valid admission year"
    )
    @Max(
            value = 2100,
            message = "Enter valid admission year"
    )
    @Column(name = "admission_year")
    private Integer admissionYear;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    private StudentStatus status;

    @Column(name = "guardian_name")
    private String guardianName;

    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Guardian contact must be exactly 10 digits"
    )
    @Column(
            name = "guardian_contact",
            length = 10
    )
    private String guardianContact;

    @Column(length = 10)
    private String section;

    public Student() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getScholarNo() {
        return scholarNo;
    }

    public void setScholarNo(String scholarNo) {
        this.scholarNo = scholarNo;
    }

    

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getCurrentSemester() {
        return currentSemester;
    }

    public void setCurrentSemester(Integer currentSemester) {
        this.currentSemester = currentSemester;
    }

    public Double getSgpa() {
        return sgpa;
    }

    public void setSgpa(Double sgpa) {
        this.sgpa = sgpa;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }

    public Integer getPassingYear() {
        return passingYear;
    }

    public void setPassingYear(Integer passingYear) {
        this.passingYear = passingYear;
    }

    public Integer getAdmissionYear() {
        return admissionYear;
    }

    public void setAdmissionYear(Integer admissionYear) {
        this.admissionYear = admissionYear;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public StudentStatus getStatus() {
        return status;
    }

    public void setStatus(StudentStatus status) {
        this.status = status;
    }

    public String getGuardianName() {
        return guardianName;
    }

    public void setGuardianName(String guardianName) {
        this.guardianName = guardianName;
    }

    public String getGuardianContact() {
        return guardianContact;
    }

    public void setGuardianContact(String guardianContact) {
        this.guardianContact = guardianContact;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }
}