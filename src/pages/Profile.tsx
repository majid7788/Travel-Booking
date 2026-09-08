import {
  CalendarDays,
  Mail,
  User,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Profile() {
  const navigate = useNavigate();

  const {
    userName,
    userEmail,
    logout,
  } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <main className="profile-page">
      <section className="profile-header">
        <div>
          <span className="section-eyebrow">
            Account
          </span>

          <h1>
            My Profile
          </h1>

          <p>
            Manage your account and
            travel information.
          </p>
        </div>
      </section>

      <section className="profile-grid">
        {/* Profile Information */}
        <div className="profile-card">
          <div className="profile-card-header">
            <div className="profile-avatar">
              <User size={30} />
            </div>

            <div>
              <h2>
                {userName || "Traveler"}
              </h2>

              <span>
                TravelBook Member
              </span>
            </div>
          </div>

          <div className="profile-info-list">
            <div className="profile-info-item">
              <div className="profile-info-icon">
                <User size={18} />
              </div>

              <div>
                <span>
                  Full Name
                </span>

                <strong>
                  {userName || "Not provided"}
                </strong>
              </div>
            </div>

            <div className="profile-info-item">
              <div className="profile-info-icon">
                <Mail size={18} />
              </div>

              <div>
                <span>
                  Email Address
                </span>

                <strong>
                  {userEmail || "Not provided"}
                </strong>
              </div>
            </div>

            <div className="profile-info-item">
              <div className="profile-info-icon">
                <CalendarDays size={18} />
              </div>

              <div>
                <span>
                  Account Status
                </span>

                <strong>
                  Active
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="profile-card profile-actions-card">
          <div className="profile-card-title">
            <h2>
              Account Settings
            </h2>

            <p>
              Manage your TravelBook
              account.
            </p>
          </div>

          <div className="profile-action-list">
            <button
              type="button"
              className="profile-action-btn"
              onClick={() =>
                navigate("/favorites")
              }
            >
              <span>
                ❤️
              </span>

              <div>
                <strong>
                  My Favorites
                </strong>

                <small>
                  View your saved
                  destinations and hotels
                </small>
              </div>
            </button>

            <button
              type="button"
              className="profile-action-btn logout-action"
              onClick={handleLogout}
            >
              <LogOut size={19} />

              <div>
                <strong>
                  Logout
                </strong>

                <small>
                  Sign out of your
                  TravelBook account
                </small>
              </div>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Profile;