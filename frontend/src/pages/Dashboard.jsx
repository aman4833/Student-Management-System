import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

import DashboardCards from "../components/DashboardCards";

import AnalyticsChart from "../components/AnalyticsChart";

import * as studentApi from "../api/students";

import "../styles/dashboard.css";

function Dashboard() {

  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  const [students, setStudents] =
    useState([]);

  useEffect(() => {

    async function loadStudents() {

      try {

        const data =
          await studentApi.fetchStudents();

        setStudents(data);

      } catch (error) {

        console.log(error);
      }
    }

    loadStudents();

  }, []);

  if (!isLoggedIn) {

    return <Navigate to="/" />;
  }

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="dashboard__main">

        <Navbar />

        <div className="dashboard__content">

          <div className="dashboard__hero">

            <div>

              <h1>
                Welcome Back 👋
              </h1>

              <p>
                Manage students,
                analytics and ERP system
                professionally.
              </p>

            </div>

          </div>

          <DashboardCards />

          <AnalyticsChart
            students={students}
          />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;