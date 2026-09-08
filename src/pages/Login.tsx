import { useState } from "react";
import type { FormEvent } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Lock,
  Mail,
  Plane,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [errors, setErrors] =
    useState({
      email: "",
      password: "",
    });

  const from =
    location.state?.from?.pathname ||
    "/profile";

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const newErrors = {
      email: "",
      password: "",
    };

    if (!email.trim()) {
      newErrors.email =
        "Email is required.";
    } else if (!email.includes("@")) {
      newErrors.email =
        "Please enter a valid email.";
    }

    if (!password) {
      newErrors.password =
        "Password is required.";
    } else if (password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    if (
      newErrors.email ||
      newErrors.password
    ) {
      return;
    }

    setIsSubmitting(true);

    login(email);

    setTimeout(() => {
      navigate(from, {
        replace: true,
      });
    }, 800);
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
            Welcome back
          </h1>

          <p>
            Sign in to continue your
            travel journey.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >

          {/* Email */}

          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <div className="input-wrapper">
              <Mail size={18} />

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                disabled={isSubmitting}
                onChange={(event) => {
                  setEmail(
                    event.target.value
                  );

                  setErrors((prev) => ({
                    ...prev,
                    email: "",
                  }));
                }}
              />
            </div>

            {errors.email && (
              <small className="form-error">
                {errors.email}
              </small>
            )}
          </div>

          {/* Password */}

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <div className="input-wrapper">
              <Lock size={18} />

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                disabled={isSubmitting}
                onChange={(event) => {
                  setPassword(
                    event.target.value
                  );

                  setErrors((prev) => ({
                    ...prev,
                    password: "",
                  }));
                }}
              />
            </div>

            {errors.password && (
              <small className="form-error">
                {errors.password}
              </small>
            )}
          </div>

          {/* Submit */}

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

        </form>

        <div className="auth-footer">
          <span>
            Don't have an account?
          </span>

          <Link
            to="/register"
            className={
              isSubmitting
                ? "disabled-link"
                : ""
            }
            onClick={(event) => {
              if (isSubmitting) {
                event.preventDefault();
              }
            }}
          >
            Create account
          </Link>
        </div>

      </section>
    </main>
  );
}

export default Login;