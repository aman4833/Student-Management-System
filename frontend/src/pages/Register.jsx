import { useState } from "react";

import {

  useNavigate,

  Link

} from "react-router-dom";

import toast from "react-hot-toast";

import {

  FaUser,

  FaEnvelope,

  FaLock,

  FaEye,

  FaEyeSlash

} from "react-icons/fa";

import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [showConfirmPassword,
    setShowConfirmPassword] =
    useState(false);

  const [formData,
    setFormData] =
    useState({

      name: "",

      email: "",

      password: "",

      confirmPassword: "",

      otp: ""
    });

  const [otpSent,
    setOtpSent] =
    useState(false);

  function handleChange(e) {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    });
  }

  async function sendOtp() {

    try {

      const response = await fetch(

        `${import.meta.env.VITE_API_URL}/auth/send-otp`,

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            email: formData.email
          })
        }
      );

      const data =
        await response.json();

      if (data.success) {

        toast.success(
          "OTP sent to email 🚀"
        );

        setOtpSent(true);

      } else {

        toast.error(data.message);
      }

    } catch (error) {

      console.log(error);

      toast.error("Failed to send OTP");
    }
  }

  async function handleSubmit(e) {

    e.preventDefault();

    if (

      formData.password

      !==

      formData.confirmPassword
    ) {

      toast.error(
        "Passwords do not match"
      );

      return;
    }

    try {

      const response = await fetch(

       `${import.meta.env.VITE_API_URL}/auth/register`,

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            name:
              formData.name,

            email:
              formData.email,

            password:
              formData.password,

            otp:
              formData.otp
          })
        }
      );

      const data =
        await response.json();

      if (data.success) {

        toast.success(
          "Registration successful 🔥"
        );

        navigate("/");

      } else {

        toast.error(data.message);
      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Registration failed"
      );
    }
  }

  return (

    <div className="register">

      <div className="register__left">

        <div className="register__overlay">

          <h1>
            Join ERP Platform
          </h1>

          <p>
            Create your account and
            access smart student
            management tools.
          </p>

        </div>

      </div>

      <div className="register__right">

        <div className="register__card">

          <h2>
            Create Account
          </h2>

          <p className="register__subtitle">

            Register to continue

          </p>

          <form
            className="register__form"

            onSubmit={handleSubmit}
          >

            <div className="register__group">

              <label>
                Full Name
              </label>

              <div className="register__input">

                <FaUser />

                <input
                  type="text"

                  name="name"

                  placeholder="Enter full name"

                  value={formData.name}

                  onChange={handleChange}

                  required
                />

              </div>

            </div>

            <div className="register__group">

              <label>
                Email
              </label>

              <div className="register__input">

                <FaEnvelope />

                <input
                  type="email"

                  name="email"

                  placeholder="Enter email"

                  value={formData.email}

                  onChange={handleChange}

                  required
                />

              </div>

            </div>

            {!otpSent && (

              <button

                type="button"

                className="register__button"

                onClick={sendOtp}
              >

                Send OTP

              </button>
            )}

            {otpSent && (

              <>

                <div className="register__group">

                  <label>
                    OTP
                  </label>

                  <div className="register__input">

                    <input
                      type="text"

                      name="otp"

                      placeholder="Enter OTP"

                      value={formData.otp}

                      onChange={handleChange}

                      required
                    />

                  </div>

                </div>

                <div className="register__group">

                  <label>
                    Password
                  </label>

                  <div className="register__input">

                    <FaLock />

                    <input
                      type={
                        showPassword

                          ? "text"

                          : "password"
                      }

                      name="password"

                      placeholder="Password"

                      value={formData.password}

                      onChange={handleChange}

                      required
                    />

                    <span
                      className="register__eye"

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

                <div className="register__group">

                  <label>
                    Confirm Password
                  </label>

                  <div className="register__input">

                    <FaLock />

                    <input
                      type={
                        showConfirmPassword

                          ? "text"

                          : "password"
                      }

                      name="confirmPassword"

                      placeholder="Confirm password"

                      value={
                        formData.confirmPassword
                      }

                      onChange={handleChange}

                      required
                    />

                    <span
                      className="register__eye"

                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                    >

                      {showConfirmPassword

                        ? <FaEyeSlash />

                        : <FaEye />
                      }

                    </span>

                  </div>

                </div>

                <button
                  type="submit"

                  className="register__button"
                >

                  Create Account

                </button>

              </>
            )}

          </form>

          <div className="register__footer">

            <p>

              Already have an account?

              <Link to="/">
                {" "}Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;