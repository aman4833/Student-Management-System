import { useState } from "react";

import {

  useNavigate,

  Link

} from "react-router-dom";

import toast from "react-hot-toast";

import {

  FaUserGraduate,

  FaEnvelope,

  FaLock,

  FaEye,

  FaEyeSlash

} from "react-icons/fa";

import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword,
    setShowPassword] =
    useState(false);

  async function handleLogin(e) {

    e.preventDefault();

    try {

      const response = await fetch(

       `${import.meta.env.VITE_API_URL}/auth/login`,

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            email,

            password
          })
        }
      );

      const data =
        await response.json();

      if (data.success) {

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "isLoggedIn",
          "true"
        );

        localStorage.setItem(
          "userRole",
          data.role
        );

        localStorage.setItem(
          "userName",
          data.name
        );

        localStorage.setItem(
          "userEmail",
          email
        );

        toast.success(
          "Login successful 🚀"
        );

        navigate("/dashboard");

      } else {

        toast.error(data.message);
      }

    } catch (error) {

      console.log(error);

      toast.error("Login failed");
    }
  }

  return (

    <div className="login">

      <div className="login__left">

        <div className="login__overlay">

          <h1>
            Student ERP System
          </h1>

          <p>
            Professional Student Management
            Platform for modern institutions.
          </p>

        </div>

      </div>

      <div className="login__right">

        <div className="login__card">

          <div className="login__logo">

            <FaUserGraduate />

          </div>

          <h2>
            Welcome Back
          </h2>

          <p className="login__subtitle">

            Login to continue

          </p>

          <form
            className="login__form"

            onSubmit={handleLogin}
          >

            <div className="login__group">

              <label>
                Email
              </label>

              <div className="login__input">

                <FaEnvelope />

                <input
                  type="email"

                  placeholder="Enter your email"

                  value={email}

                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }

                  required
                />

              </div>

            </div>

            <div className="login__group">

              <label>
                Password
              </label>

              <div className="login__input">

                <FaLock />

                <input
                  type={
                    showPassword

                      ? "text"

                      : "password"
                  }

                  placeholder="Enter your password"

                  value={password}

                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }

                  required
                />

                <span
                  className="login__eye"

                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >

                  {showPassword

                    ? <FaEyeSlash />

                    : <FaEye />
                  }

                </span>

              </div>

            </div>

            <button
              type="submit"

              className="login__button"
            >

              Login

            </button>

          </form>

          <div className="login__footer">

            <p>

              Don’t have an account?

              <Link to="/register">

                {" "}Register

              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;