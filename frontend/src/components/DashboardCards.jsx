import { useEffect, useState } from "react";

import {

  FaUserGraduate,

  FaUniversity,

  FaBook,

  FaChartLine

} from "react-icons/fa";

import "../styles/dashboardCards.css";

function DashboardCards() {

  const [stats, setStats] =
    useState({

      totalStudents: 0,

      departments: 0,

      courses: 0,

      averageSgpa: 0
    });

  async function loadStats() {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response = await fetch(

        "http://localhost:8080/dashboard/stats",

        {

          headers: {

            Authorization:
              `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {

        throw new Error(
          "Unauthorized"
        );
      }

      const data =
        await response.json();

      setStats(data);

    } catch (error) {

      console.log(error);
    }
  }

  useEffect(() => {

    loadStats();

  }, []);

  return (

    <div className="dashboard-cards">

      <div className="dashboard-card">

        <div className="dashboard-card__icon">

          <FaUserGraduate />

        </div>

        <div>

          <h3>
            Total Students
          </h3>

          <p>
            {stats.totalStudents}
          </p>

        </div>

      </div>

      <div className="dashboard-card">

        <div className="dashboard-card__icon">

          <FaUniversity />

        </div>

        <div>

          <h3>
            Departments
          </h3>

          <p>
            {stats.departments}
          </p>

        </div>

      </div>

      <div className="dashboard-card">

        <div className="dashboard-card__icon">

          <FaBook />

        </div>

        <div>

          <h3>
            Courses
          </h3>

          <p>
            {stats.courses}
          </p>

        </div>

      </div>

      <div className="dashboard-card">

        <div className="dashboard-card__icon">

          <FaChartLine />

        </div>

        <div>

          <h3>
            Average SGPA
          </h3>

          <p>
            {stats.averageSgpa}
          </p>

        </div>

      </div>

    </div>
  );
}

export default DashboardCards;