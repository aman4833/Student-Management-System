import {

  FaBell,

  FaSearch,

  FaUserCircle

} from "react-icons/fa";

import "../styles/navbar.css";

function Navbar() {

  const userName =
    localStorage.getItem("userName");

  const userRole =
    localStorage.getItem("userRole");

  return (

    <div className="navbar">

      <div className="navbar__search">

        <FaSearch />

        <input
          type="text"
          placeholder="Search..."
        />

      </div>

      <div className="navbar__right">

        <div className="navbar__notification">

          <FaBell />

        </div>

        <div className="navbar__profile">

          <FaUserCircle />

          <div>

            <h4>
              {userName || "User"}
            </h4>

            <p>
              {userRole || "Student"}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Navbar;