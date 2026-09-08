import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Heart,
  MapPin,
  Star,
} from "lucide-react";
import { hotels } from "../data/hotels";

function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const hotel = hotels.find(
    (item) => item.id === Number(id)
  );

  if (!hotel) {
    return (
      <main className="no-hotels">
        <h2>Hotel not found</h2>

        <p>
          The hotel you are looking for does not exist.
        </p>

        <button
          onClick={() => navigate("/hotels")}
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            border: "none",
            borderRadius: "8px",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
          }}
        >
          Back to Hotels
        </button>
      </main>
    );
  }

  return (
    <main className="hotel-details-page">

      {/* Header */}

      <section className="hotel-details-header">

        <div>

          <button
            className="hotel-back-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            Back to Hotels
          </button>

          <span>Hotel details</span>

          <h1>{hotel.name}</h1>

          <div className="hotel-header-location">
            <MapPin size={16} />

            <p>
              {hotel.city}, {hotel.country}
            </p>
          </div>

        </div>

      </section>

      {/* Content */}

      <section className="hotel-details-content">

        <div className="hotel-details-main">

          {/* Image */}

          <div className="hotel-details-image">

            <img
              src={hotel.image}
              alt={hotel.name}
            />

            <button className="hotel-details-favorite">
              <Heart size={21} />
            </button>

          </div>

          {/* Information */}

          <div className="hotel-details-info">

            <div className="hotel-details-title">

              <div>
                <h2>{hotel.name}</h2>

                <div className="hotel-details-rating">

                  <Star
                    size={17}
                    fill="currentColor"
                  />

                  <strong>
                    {hotel.rating}
                  </strong>

                  <span>
                    ({hotel.reviews} reviews)
                  </span>

                </div>
              </div>

            </div>

            <p className="hotel-details-description">
              {hotel.description}
            </p>

            {/* Amenities */}

            <div className="hotel-amenities">

              <h3>
                Why you'll love this place
              </h3>

              <div className="amenities-grid">

                <div>
                  <Check size={17} />
                  Free Wi-Fi
                </div>

                <div>
                  <Check size={17} />
                  Swimming pool
                </div>

                <div>
                  <Check size={17} />
                  Restaurant
                </div>

                <div>
                  <Check size={17} />
                  Room service
                </div>

                <div>
                  <Check size={17} />
                  Air conditioning
                </div>

                <div>
                  <Check size={17} />
                  24/7 reception
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Booking */}

        <aside className="hotel-booking-card">

          <span>
            Starting from
          </span>

          <div className="hotel-details-price">
            <strong>
              ${hotel.price}
            </strong>

            <small>
              / night
            </small>
          </div>

          <div className="hotel-booking-divider"></div>

          <div className="hotel-booking-row">
            <span>Guests</span>
            <strong>1 Guest</strong>
          </div>

          <div className="hotel-booking-row">
            <span>Rooms</span>
            <strong>1 Room</strong>
          </div>

          <button
            className="hotel-book-btn"
            onClick={() =>
              navigate(
                `/hotel-booking?hotel=${hotel.id}`
              )
            }
          >
            Book Now
          </button>

          <p className="hotel-booking-note">
            You won't be charged yet
          </p>

        </aside>

      </section>

    </main>
  );
}

export default HotelDetails;