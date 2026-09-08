import { Heart, Star } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import type { Destination } from "../data/destinations";

interface DestinationCardProps {
  destination: Destination;
}

function DestinationCard({
  destination,
}: DestinationCardProps) {
  const {
    toggleDestinationFavorite,
    isDestinationFavorite,
  } = useFavorites();

  const isFavorite = isDestinationFavorite(
    destination.id
  );

  return (
    <article className="destination-card">
      <div className="destination-image">
        <img
          src={destination.image}
          alt={`${destination.city}, ${destination.country}`}
        />

        <button
          className={`favorite-btn ${
            isFavorite ? "active" : ""
          }`}
          onClick={() =>
            toggleDestinationFavorite(destination.id)
          }
          aria-label={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          <Heart
            size={20}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="destination-info">
        <div>
          <h3>{destination.city}</h3>
          <p>{destination.country}</p>
        </div>

        <div className="rating">
          <Star
            size={16}
            fill="currentColor"
          />
          <span>{destination.rating}</span>
        </div>
      </div>

      <div className="destination-footer">
        <span>From</span>
        <strong>${destination.price}</strong>
      </div>
    </article>
  );
}

export default DestinationCard;