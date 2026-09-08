import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plane,
  Clock,
  Calendar,
  Users,
  Check,
} from "lucide-react";
import { flights } from "../data/flights";

function FlightDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const flight = flights.find(
    (item) => item.id === Number(id)
  );

  if (!flight) {
    return (
      <main className="no-flights">
        <h2>Flight not found</h2>

        <p>
          The flight you are looking for does not exist.
        </p>

        <button
          onClick={() => navigate("/flights")}
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
          Back to Flights
        </button>
      </main>
    );
  }

  return (
    <main className="flight-details-page">

      {/* Header */}

      <section className="flight-details-header">
        <div>
          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            Back to Flights
          </button>

          <span>Flight details</span>

          <h1>
            {flight.from} → {flight.to}
          </h1>

          <p>
            {flight.airline} · {flight.flightNumber}
          </p>
        </div>
      </section>

      {/* Details */}

      <section className="flight-details-content">

        <div className="flight-details-card">

          {/* Airline */}

          <div className="details-airline">

            <div className="airline-icon">
              <Plane size={24} />
            </div>

            <div>
              <h2>{flight.airline}</h2>
              <p>{flight.flightNumber}</p>
            </div>

          </div>

          {/* Route */}

          <div className="details-route">

            <div className="route-point">
              <span>Departure</span>

              <strong>
                {flight.departure}
              </strong>

              <small>
                {flight.from}
              </small>
            </div>

            <div className="route-middle">

              <div className="route-duration">
                <Clock size={16} />
                {flight.duration}
              </div>

              <div className="route-line"></div>

              <span>
                {flight.stops === 0
                  ? "Direct flight"
                  : `${flight.stops} stop`}
              </span>

            </div>

            <div className="route-point">
              <span>Arrival</span>

              <strong>
                {flight.arrival}
              </strong>

              <small>
                {flight.to}
              </small>
            </div>

          </div>

          {/* Information */}

          <div className="flight-info-grid">

            <div className="flight-info-item">
              <Calendar size={20} />

              <div>
                <span>Date</span>
                <strong>20 Sep 2026</strong>
              </div>
            </div>

            <div className="flight-info-item">
              <Users size={20} />

              <div>
                <span>Passengers</span>
                <strong>1 Passenger</strong>
              </div>
            </div>

            <div className="flight-info-item">
              <Plane size={20} />

              <div>
                <span>Class</span>
                <strong>Economy</strong>
              </div>
            </div>

          </div>

        </div>

        {/* Booking Summary */}

        <aside className="booking-summary">

          <h2>Booking summary</h2>

          <div className="summary-row">
            <span>Flight</span>
            <strong>
              {flight.airline}
            </strong>
          </div>

          <div className="summary-row">
            <span>Route</span>
            <strong>
              {flight.from} → {flight.to}
            </strong>
          </div>

          <div className="summary-row">
            <span>Class</span>
            <strong>Economy</strong>
          </div>

          <div className="summary-row">
            <span>Passenger</span>
            <strong>1</strong>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total</span>

            <strong>
              ${flight.price}
            </strong>
          </div>

          <button
            className="continue-booking-btn"
            onClick={() =>
              navigate(`/booking?flight=${flight.id}`)
            }
          >
            Continue to Booking
          </button>

          <div className="booking-safe">
            <Check size={16} />
            Secure booking
          </div>

        </aside>

      </section>

    </main>
  );
}

export default FlightDetails;