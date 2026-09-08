import {
  Heart,
  Hotel,
  MapPin,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import DestinationCard from "../components/DestinationCard";
import HotelCard from "../components/HotelCard";

import { destinations } from "../data/destinations";
import { hotels } from "../data/hotels";

import { useFavorites } from "../context/FavoritesContext";

function Favorites() {
  const navigate = useNavigate();

  const {
    favoriteHotels,
    favoriteDestinations,
    toggleHotelFavorite,
    toggleDestinationFavorite,
  } = useFavorites();

  const savedHotels = hotels.filter(
    (hotel) =>
      favoriteHotels.includes(hotel.id)
  );

  const savedDestinations =
    destinations.filter(
      (destination) =>
        favoriteDestinations.includes(
          destination.id
        )
    );

  const totalFavorites =
    savedHotels.length +
    savedDestinations.length;

  const clearFavorites = () => {
    savedHotels.forEach((hotel) => {
      toggleHotelFavorite(
        hotel.id
      );
    });

    savedDestinations.forEach(
      (destination) => {
        toggleDestinationFavorite(
          destination.id
        );
      }
    );
  };

  return (
    <main className="favorites-page">

      {/* Header */}

      <section className="favorites-header">

        <div>

          <span className="section-eyebrow">
            Saved places
          </span>

          <h1>
            Your Favorites
          </h1>

          <p>
            Keep your favorite hotels
            and destinations in one place.
          </p>

        </div>

        {totalFavorites > 0 && (
          <button
            type="button"
            className="favorites-clear-btn"
            onClick={clearFavorites}
          >
            <Trash2 size={17} />

            Clear All
          </button>
        )}

      </section>

      {/* Empty State */}

      {totalFavorites === 0 ? (
        <section className="favorites-empty">

          <div className="empty-state-icon">
            ❤️
          </div>

          <h2>
            No favorites yet
          </h2>

          <p>
            Save your favorite destinations
            and hotels to find them easily later.
          </p>

          <div className="empty-state-actions">

            <button
              type="button"
              onClick={() =>
                navigate("/hotels")
              }
            >
              <Hotel size={17} />

              Explore Hotels
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/")
              }
            >
              <MapPin size={17} />

              Explore Destinations
            </button>

          </div>

        </section>
      ) : (
        <>

          {/* Destinations */}

          {savedDestinations.length >
            0 && (
            <section className="favorites-section">

              <div className="favorites-section-header">

                <div>
                  <span>
                    Explore
                  </span>

                  <h2>
                    Favorite Destinations
                  </h2>
                </div>

                <div className="favorites-section-icon">
                  <MapPin size={20} />
                </div>

              </div>

              <div className="favorites-grid">

                {savedDestinations.map(
                  (destination) => (
                    <DestinationCard
                      key={
                        destination.id
                      }
                      destination={
                        destination
                      }
                    />
                  )
                )}

              </div>

            </section>
          )}

          {/* Hotels */}

          {savedHotels.length > 0 && (
            <section className="favorites-section">

              <div className="favorites-section-header">

                <div>
                  <span>
                    Stay
                  </span>

                  <h2>
                    Favorite Hotels
                  </h2>
                </div>

                <div className="favorites-section-icon">
                  <Hotel size={20} />
                </div>

              </div>

              <div className="favorites-grid">

                {savedHotels.map(
                  (hotel) => (
                    <HotelCard
                      key={hotel.id}
                      hotel={hotel}
                    />
                  )
                )}

              </div>

            </section>
          )}

          {/* Summary */}

          <section className="favorites-summary">

            <Heart size={20} />

            <div>
              <strong>
                {totalFavorites}{" "}
                saved{" "}
                {totalFavorites === 1
                  ? "place"
                  : "places"}
              </strong>

              <span>
                Your saved travel
                inspiration
              </span>
            </div>

          </section>

        </>
      )}

    </main>
  );
}

export default Favorites;