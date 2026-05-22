import { Link, useNavigate } from "react-router-dom";

import {

  FaTachometerAlt,

  FaUserGraduate,

  FaCog,

  FaSignOutAlt

} from "react-icons/fa";

import "../styles/sidebar.css";

function Sidebar() {

  const navigate = useNavigate();

  function handleLogout() {

    localStorage.removeItem(
      "isLoggedIn"
    );

    localStorage.removeItem(
      "userRole"
    );

    localStorage.removeItem(
      "userName"
    );

    navigate("/");
  }

  return (

    <div className="sidebar">

      <div className="sidebar__logo">

        ERP System

      </div>

      <ul className="sidebar__menu">

        <li>

          <Link to="/dashboard">

            <FaTachometerAlt />

            Dashboard

          </Link>

        </li>

        <li>

          <Link to="/students">

            <FaUserGraduate />

            Students

          </Link>

        </li>

        <li>

          <a href="#">

            <FaCog />

            Settings

          </a>

        </li>

        <li>

          <button
            className="sidebar__logout"

            onClick={handleLogout}
          >

            <FaSignOutAlt />

            Logout

          </button>

        </li>

      </ul>

    </div>
  );
}

export default Sidebar;