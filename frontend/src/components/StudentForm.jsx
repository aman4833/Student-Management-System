import { useState, useEffect } from "react";

import "../styles/students.css";

function StudentForm({

  onSubmit,

  editingStudent,

  onCancelEdit,

  loading
}) {

  const initialState = {

    scholarNo: "",

    studentName: "",

    email: "",

    contactNo: "",

    address: "",

    courseName: "",

    department: "",

    currentSemester: "",

    sgpa: "",

    collegeName: "",

    passingYear: "",

    admissionYear: "",

    gender: "MALE",

    dateOfBirth: "",

    status: "ACTIVE",

    guardianName: "",

    guardianContact: "",

    section: ""
  };

  const [formData, setFormData] =
    useState(initialState);

  useEffect(() => {

    if (editingStudent) {

      setFormData({

        ...initialState,

        ...editingStudent
      });

    } else {

      setFormData(initialState);
    }

  }, [editingStudent]);

  function handleChange(e) {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    });
  }

  async function handleFormSubmit(e) {

    e.preventDefault();

    await onSubmit({

      ...formData,

      currentSemester:
        Number(formData.currentSemester),

      sgpa:
        Number(formData.sgpa),

      passingYear:
        Number(formData.passingYear),

      admissionYear:
        Number(formData.admissionYear)
    });

    if (!editingStudent) {

      setFormData(initialState);
    }
  }

  return (

    <div className="student-form-container">

      <form
        className="student-form"

        onSubmit={handleFormSubmit}
      >

        <div className="student-form__header">

          <h2>

            {editingStudent

              ? "Edit Student"

              : "Add Student"
            }

          </h2>

        </div>

        <div className="student-form__grid">

          <input
            type="text"

            name="scholarNo"

            placeholder="Scholar Number"

            value={formData.scholarNo}

            onChange={handleChange}

            required
          />

          <input
            type="text"

            name="studentName"

            placeholder="Student Name"

            value={formData.studentName}

            onChange={handleChange}

            required
          />

          <input
            type="email"

            name="email"

            placeholder="Email"

            value={formData.email}

            onChange={handleChange}

            required
          />

          <input
            type="text"

            name="contactNo"

            placeholder="Contact Number"

            value={formData.contactNo}

            onChange={handleChange}
          />

          <input
            type="text"

            name="address"

            placeholder="Address"

            value={formData.address}

            onChange={handleChange}
          />

          <input
            type="text"

            name="courseName"

            placeholder="Course Name"

            value={formData.courseName}

            onChange={handleChange}
          />

          <input
            type="text"

            name="department"

            placeholder="Department"

            value={formData.department}

            onChange={handleChange}
          />

          <input
            type="number"

            name="currentSemester"

            placeholder="Current Semester"

            value={formData.currentSemester}

            onChange={handleChange}
          />

          <input
            type="number"

            step="0.01"

            name="sgpa"

            placeholder="SGPA"

            value={formData.sgpa}

            onChange={handleChange}
          />

          <input
            type="text"

            name="collegeName"

            placeholder="College Name"

            value={formData.collegeName}

            onChange={handleChange}
          />

          <input
            type="number"

            name="passingYear"

            placeholder="Passing Year"

            value={formData.passingYear}

            onChange={handleChange}
          />

          <input
            type="number"

            name="admissionYear"

            placeholder="Admission Year"

            value={formData.admissionYear}

            onChange={handleChange}
          />

          <select
            name="gender"

            value={formData.gender}

            onChange={handleChange}
          >

            <option value="MALE">
              Male
            </option>

            <option value="FEMALE">
              Female
            </option>

          </select>

          <input
            type="date"

            name="dateOfBirth"

            value={formData.dateOfBirth}

            onChange={handleChange}
          />

          <select
            name="status"

            value={formData.status}

            onChange={handleChange}
          >

            <option value="ACTIVE">
              Active
            </option>

            <option value="INACTIVE">
              Inactive
            </option>

          </select>

          <input
            type="text"

            name="guardianName"

            placeholder="Guardian Name"

            value={formData.guardianName}

            onChange={handleChange}
          />

          <input
            type="text"

            name="guardianContact"

            placeholder="Guardian Contact"

            value={formData.guardianContact}

            onChange={handleChange}
          />

          <input
            type="text"

            name="section"

            placeholder="Section"

            value={formData.section}

            onChange={handleChange}
          />

        </div>

        <div className="student-form__actions">

          <button
            type="submit"

            className="student-form__save"

            disabled={loading}
          >

            {loading

              ? "Saving..."

              : editingStudent

                ? "Update Student"

                : "Add Student"
            }

          </button>

          {editingStudent && (

            <button
              type="button"

              className="student-form__cancel"

              onClick={onCancelEdit}
            >

              Cancel

            </button>
          )}

        </div>

      </form>

    </div>
  );
}

export default StudentForm;