import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

import StudentForm from "../components/StudentForm";

import StudentTable from "../components/StudentTable";

import StudentModal from "../components/StudentModal";

import * as studentApi from "../api/students";

import "../styles/dashboard.css";

import "../styles/students.css";

import "../styles/table.css";

import "../styles/modal.css";

function Students() {

  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  const userRole =
    localStorage.getItem("userRole");

  const userEmail =
    localStorage.getItem("userEmail");

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [editingStudent,
    setEditingStudent] =
    useState(null);

  const [selectedStudent,
    setSelectedStudent] =
    useState(null);

  const [deleteStudent,
    setDeleteStudent] =
    useState(null);

  const [searchTerm,
    setSearchTerm] =
    useState("");

  async function loadStudents() {

    try {

      const data =
        await studentApi.fetchStudents();

      if (userRole === "ADMIN") {

        setStudents(data);

      } else {

        const ownData =
          data.filter(

            (student) =>

              student.email
                ?.toLowerCase()

                ===

              userEmail
                ?.toLowerCase()
          );

        setStudents(ownData);
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {

    loadStudents();

  }, []);

  async function handleSubmit(studentData) {

    setSaving(true);

    try {

      if (editingStudent) {

        const updatedStudent =
          await studentApi.updateStudent(
            editingStudent.id,
            studentData
          );

        setStudents((prev) =>

          prev.map((student) =>

            student.id === updatedStudent.id

              ? updatedStudent

              : student
          )
        );

        setEditingStudent(null);

      } else {

        const newStudent =
          await studentApi.createStudent(
            studentData
          );

        setStudents((prev) => [

          ...prev,

          newStudent
        ]);
      }

    } catch (error) {

      console.log(error);

      alert("Failed to save student");

    } finally {

      setSaving(false);
    }
  }

  async function confirmDelete() {

    if (!deleteStudent) return;

    try {

      await studentApi.deleteStudent(
        deleteStudent.id
      );

      setStudents((prev) =>

        prev.filter(
          (student) =>
            student.id !== deleteStudent.id
        )
      );

      setDeleteStudent(null);

    } catch (error) {

      console.log(error);

      alert("Failed to delete student");
    }
  }

  function handleDelete(student) {

    setDeleteStudent(student);
  }

  function handleEdit(student) {

    setEditingStudent(student);

    window.scrollTo({

      top: 0,

      behavior: "smooth"
    });
  }

  const filteredStudents =
    students.filter((student) =>

      student.studentName
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )

      ||

      student.scholarNo
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    );

  if (!isLoggedIn) {

    return <Navigate to="/" />;
  }

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="dashboard__main">

        <Navbar />

        <div className="students-page">

          <div className="students-page__top">

            <h1>

              {userRole === "ADMIN"

                ? "Students Management"

                : "My Profile"}

            </h1>

            <input
              type="text"

              placeholder="Search by name or scholar number..."

              value={searchTerm}

              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
            />

          </div>

          <div className="students-page__content">

            {userRole === "ADMIN" && (

              <div className="students-page__form">

                <StudentForm

                  editingStudent={
                    editingStudent
                  }

                  onSubmit={
                    handleSubmit
                  }

                  onCancelEdit={() =>
                    setEditingStudent(null)
                  }

                  loading={saving}
                />

              </div>
            )}

            <div className="students-page__table">

              <StudentTable

                students={
                  filteredStudents
                }

                loading={loading}

                onEdit={handleEdit}

                onDelete={
                  handleDelete
                }

                onView={(student) =>
                  setSelectedStudent(
                    student
                  )
                }

                isAdmin={
                  userRole === "ADMIN"
                }
              />

            </div>

          </div>

        </div>

        <StudentModal

          student={selectedStudent}

          onClose={() =>
            setSelectedStudent(null)
          }
        />

        {deleteStudent && (

          <div className="modal">

            <div className="modal__content">

              <h2>
                Delete Student
              </h2>

              <p
                style={{
                  marginTop: "1rem",
                  color: "#cbd5e1"
                }}
              >

                Are you sure you want
                to delete

                {" "}

                <b>
                  {deleteStudent.studentName}
                </b>

                ?

              </p>

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  marginTop: "2rem"
                }}
              >

                <button

                  className="table__delete"

                  onClick={confirmDelete}
                >

                  Delete

                </button>

                <button

                  className="table__edit"

                  onClick={() =>
                    setDeleteStudent(null)
                  }
                >

                  Cancel

                </button>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default Students;