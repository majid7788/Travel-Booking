import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle,
  Home,
  Hotel as HotelIcon,
  Users,
} from "lucide-react";
import { hotels } from "../data/hotels";

function HotelBookingSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const hotelId = Number(searchParams.get("hotel"));

  const hotel = hotels.find(
    (item) => item.id === hotelId
  );

  if (!hotel) {
    return (
      <main className="no-hotels">
        <h2>Booking not found</h2>

        <p>
          The booking information could not be found.
        </p>

        <button
          type="button"
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

  const bookingReference = `TBH-${hotel.id}926`;

  return (
    <main className="hotel-booking-success-page">
      <section className="hotel-success-card">

        <div className="hotel-success-icon">
          <CheckCircle size={58} />
        </div>

        <span className="hotel-success-label">
          Booking Confirmed
        </span>

        <h1>
          Your Hotel Is Booked!
        </h1>

        <p className="hotel-success-message">
          Your reservation has been successfully
          confirmed. We look forward to welcoming you.
        </p>

        <div className="hotel-booking-reference">
          <span>Booking Reference</span>

          <strong>
            {bookingReference}
          </strong>
        </div>

        <div className="hotel-success-info">

          <div className="hotel-success-hotel">
            <div className="hotel-success-image">
              <img
                src={hotel.image}
                alt={hotel.name}
              />
            </div>

            <div>
              <div className="hotel-success-title">
                <HotelIcon size={18} />

                <h2>
                  {hotel.name}
                </h2>
              </div>

              <p>
                {hotel.city}, {hotel.country}
              </p>
            </div>
          </div>

          <div className="hotel-success-details">

            <div className="hotel-success-detail">
              <CalendarDays size={20} />

              <div>
                <span>Check-in</span>

                <strong>
                  Your selected date
                </strong>
              </div>
            </div>

            <div className="hotel-success-detail">
              <CalendarDays size={20} />

              <div>
                <span>Check-out</span>

                <strong>
                  Your selected date
                </strong>
              </div>
            </div>

            <div className="hotel-success-detail">
              <Users size={20} />

              <div>
                <span>Guests</span>

                <strong>
                  Your selected guests
                </strong>
              </div>
            </div>

          </div>
        </div>

        <div className="hotel-success-actions">

          <button
            className="hotel-success-home-btn"
            type="button"
            onClick={() => navigate("/")}
          >
            <Home size={18} />
            Back to Home
          </button>

          <button
            className="hotel-success-explore-btn"
            type="button"
            onClick={() => navigate("/hotels")}
          >
            Explore More Hotels
            <ArrowRight size={18} />
          </button>

        </div>

      </section>
    </main>
  );
}

export default HotelBookingSuccess;