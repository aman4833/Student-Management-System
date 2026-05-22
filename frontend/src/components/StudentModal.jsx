import {

  FaTimes,

  FaUserGraduate

} from "react-icons/fa";

import "../styles/modal.css";

function StudentModal({

  student,

  onClose

}) {

  if (!student) return null;

  return (

    <div className="modal">

      <div className="modal__content">

        <button
          className="modal__close"
          onClick={onClose}
        >

          <FaTimes />

        </button>

        <div className="modal__header">

          <div className="modal__avatar">

            <FaUserGraduate />

          </div>

          <div>

            <h2>
              {student.studentName}
            </h2>

            <p>
              {student.email}
            </p>

          </div>

        </div>

        <div className="modal__grid">

          <div>
            <span>Scholar No</span>
            <h4>{student.scholarNo}</h4>
          </div>

          <div>
            <span>Department</span>
            <h4>{student.department}</h4>
          </div>

          <div>
            <span>Semester</span>
            <h4>
              {student.currentSemester}
            </h4>
          </div>

          <div>
            <span>SGPA</span>
            <h4>{student.sgpa}</h4>
          </div>

          <div>
            <span>Status</span>
            <h4>{student.status}</h4>
          </div>

          <div>
            <span>Section</span>
            <h4>{student.section}</h4>
          </div>

          <div>
            <span>Contact</span>
            <h4>{student.contactNo}</h4>
          </div>

          <div>
            <span>Guardian</span>
            <h4>
              {student.guardianName}
            </h4>
          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentModal;