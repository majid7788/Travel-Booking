import { Link } from "react-router-dom";
import { Heart, Plane, User } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";

function Navbar() {
  const { isLoggedIn } = useAuth();

  const {
    favoriteHotels,
    favoriteDestinations,
  } = useFavorites();

  const favoritesCount =
    favoriteHotels.length +
    favoriteDestinations.length;

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}

        <Link
          to="/"
          className="logo"
        >
          <Plane size={28} />

          <span>
            TravelBook
          </span>
        </Link>


        {/* Navigation */}

        <nav className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/flights">
            Flights
          </Link>

          <Link to="/hotels">
            Hotels
          </Link>

        </nav>


        {/* Actions */}

        <div className="nav-actions">

          {/* Favorites */}

          <Link
            to="/favorites"
            className="nav-icon favorites-nav-icon"
            aria-label="Favorites"
          >
            <Heart size={21} />

            {favoritesCount > 0 && (
              <span className="favorites-badge">
                {favoritesCount}
              </span>
            )}
          </Link>


          {/* Account */}

          <Link
            to={
              isLoggedIn
                ? "/profile"
                : "/login"
            }
            className="nav-icon"
            aria-label={
              isLoggedIn
                ? "Profile"
                : "Login"
            }
          >
            <User size={21} />
          </Link>

        </div>

      </div>
    </header>
  );
}

export default Navbar;