import { useState } from "react";
import type { FormEvent } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import {
  Lock,
  Mail,
  Plane,
  User,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (name.length < 2) {
      alert(
        "Please enter a valid name."
      );
      return;
    }

    if (!email.includes("@")) {
      alert(
        "Please enter a valid email address."
      );
      return;
    }

    if (password.length < 6) {
      alert(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (
      password !== confirmPassword
    ) {
      alert(
        "Passwords do not match."
      );
      return;
    }

    register(name, email);

    navigate("/profile");
  };

  return (
    <main className="auth-page">
      <section className="auth-card">

        <div className="auth-logo">
          <Plane size={28} />

          <span>
            TravelBook
          </span>
        </div>

        <div className="auth-header">
          <h1>
            Create account
          </h1>

          <p>
            Create your account and
            start planning your next trip.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >

          {/* Name */}

          <div className="form-group">

            <label htmlFor="name">
              Full Name
            </label>

            <div className="input-wrapper">

              <User size={18} />

              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(event) =>
                  setName(
                    event.target.value
                  )
                }
              />

            </div>

          </div>


          {/* Email */}

          <div className="form-group">

            <label htmlFor="register-email">
              Email
            </label>

            <div className="input-wrapper">

              <Mail size={18} />

              <input
                id="register-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
              />

            </div>

          </div>


          {/* Password */}

          <div className="form-group">

            <label htmlFor="register-password">
              Password
            </label>

            <div className="input-wrapper">

              <Lock size={18} />

              <input
                id="register-password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
              />

            </div>

          </div>


          {/* Confirm Password */}

          <div className="form-group">

            <label htmlFor="confirm-password">
              Confirm Password
            </label>

            <div className="input-wrapper">

              <Lock size={18} />

              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value
                  )
                }
              />

            </div>

          </div>


          {/* Submit */}

          <button
            type="submit"
            className="auth-submit-btn"
          >
            Create Account
          </button>

        </form>


        {/* Login */}

        <div className="auth-footer">

          <span>
            Already have an account?
          </span>

          <Link to="/login">
            Sign in
          </Link>

        </div>

      </section>
    </main>
  );
}

export default Register;