import { ArrowRight, Clock, Plane } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Flight } from "../data/flights";

interface FlightCardProps {
  flight: Flight;
}

function FlightCard({ flight }: FlightCardProps) {
  const navigate = useNavigate();

  return (
    <article className="flight-card">

      <div className="flight-main">

        <div className="airline-info">

          <div className="airline-icon">
            <Plane size={22} />
          </div>

          <div>
            <h3>{flight.airline}</h3>

            <span>
              {flight.flightNumber}
            </span>
          </div>

        </div>

        <div className="flight-route">

          <div>
            <strong>
              {flight.departure}
            </strong>

            <span>
              {flight.from}
            </span>
          </div>

          <div className="flight-duration">

            <span>
              <Clock size={14} />
              {flight.duration}
            </span>

            <div className="route-line">
              <span></span>
            </div>

            <small>
              {flight.stops === 0
                ? "Direct"
                : `${flight.stops} stop`}
            </small>

          </div>

          <div>
            <strong>
              {flight.arrival}
            </strong>

            <span>
              {flight.to}
            </span>
          </div>

        </div>

        <div className="flight-price">

          <span>From</span>

          <strong>
            ${flight.price}
          </strong>

          <button
            onClick={() =>
              navigate(`/flights/${flight.id}`)
            }
          >
            Select

            <ArrowRight size={16} />
          </button>

        </div>

      </div>

    </article>
  );
}

export default FlightCard;