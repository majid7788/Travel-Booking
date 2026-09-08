import { Heart, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useFavorites } from "../context/FavoritesContext";
import type { Hotel } from "../data/hotels";

interface HotelCardProps {
  hotel: Hotel;
}

function HotelCard({ hotel }: HotelCardProps) {
  const navigate = useNavigate();

  const {
    toggleHotelFavorite,
    isHotelFavorite,
  } = useFavorites();

  const isFavorite = isHotelFavorite(hotel.id);

  return (
    <article className="hotel-card">
      <div className="hotel-image">
        <img
          src={hotel.image}
          alt={hotel.name}
        />

        <button
          className={`hotel-favorite-btn ${
            isFavorite ? "active" : ""
          }`}
          onClick={() =>
           toggleHotelFavorite(hotel.id)
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

      <div className="hotel-info">
        <div className="hotel-title-row">
          <div>
            <h3>{hotel.name}</h3>

            <div className="hotel-location">
              <MapPin size={14} />

              <span>
                {hotel.city}, {hotel.country}
              </span>
            </div>
          </div>

          <div className="hotel-rating">
            <Star
              size={15}
              fill="currentColor"
            />

            <span>{hotel.rating}</span>
          </div>
        </div>

        <p className="hotel-description">
          {hotel.description}
        </p>

        <div className="hotel-footer">
          <div>
            <span>From</span>

            <strong>
              ${hotel.price}
            </strong>

            <small>/ night</small>
          </div>

          <button
            className="hotel-view-btn"
            onClick={() =>
              navigate(`/hotels/${hotel.id}`)
            }
          >
            View Hotel
          </button>
        </div>
      </div>
    </article>
  );
}

export default HotelCard;