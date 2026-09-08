import { Link } from "react-router-dom";
import { Heart, Plane, User } from "lucide-react";

import { useFavorites } from "../context/FavoritesContext";

function Navbar() {
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

        <Link to="/" className="logo">
          <Plane size={28} />
          <span>TravelBook</span>
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/flights">Flights</Link>
          <Link to="/hotels">Hotels</Link>
        </nav>

        <div className="nav-actions">

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

          <Link
            to="/login"
            className="nav-icon"
            aria-label="Account"
          >
            <User size={21} />
          </Link>

        </div>

      </div>
    </header>
  );
}

export default Navbar;