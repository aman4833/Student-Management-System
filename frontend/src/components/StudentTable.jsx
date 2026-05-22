import {

  FaEdit,

  FaTrash,

  FaUserGraduate

} from "react-icons/fa";

import "../styles/table.css";

function StudentTable({

  students,

  loading,

  onEdit,

  onDelete,

  onView,

  isAdmin
}) {

  if (loading) {

    return (

      <div className="table__empty">

        Loading students...

      </div>
    );
  }

  if (!students.length) {

    return (

      <div className="table__empty">

        No students found

      </div>
    );
  }

  return (

    <div className="table">

      <table>

        <thead>

          <tr>

            <th>Student</th>

            <th>Scholar No</th>

            <th>Department</th>

            <th>Semester</th>

            <th>SGPA</th>

            <th>Status</th>

            {isAdmin && (
              <th>Actions</th>
            )}

          </tr>

        </thead>

        <tbody>

          {students.map((student) => (

            <tr

              key={student.id}

              onClick={() =>
                onView(student)
              }

              style={{
                cursor: "pointer"
              }}
            >

              <td>

                <div className="table__student">

                  <div className="table__avatar">

                    <FaUserGraduate />

                  </div>

                  <div>

                    <h4>
                      {student.studentName}
                    </h4>

                    <p>
                      {student.email}
                    </p>

                  </div>

                </div>

              </td>

              <td>
                {student.scholarNo}
              </td>

              <td>
                {student.department}
              </td>

              <td>
                Semester {student.currentSemester}
              </td>

              <td>

                <span className="table__sgpa">

                  {student.sgpa}

                </span>

              </td>

              <td>

                <span
                  className={`table__status
                  table__status--${student.status?.toLowerCase()}`}
                >

                  {student.status}

                </span>

              </td>

              {isAdmin && (

                <td>

                  <div className="table__actions">

                    <button
                      className="table__edit"

                      onClick={(e) => {

                        e.stopPropagation();

                        onEdit(student);
                      }}
                    >

                      <FaEdit />

                    </button>

                    <button
                      className="table__delete"

                      onClick={(e) => {

                        e.stopPropagation();

                        onDelete(student);
                      }}
                    >

                      <FaTrash />

                    </button>

                  </div>

                </td>
              )}

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default StudentTable;