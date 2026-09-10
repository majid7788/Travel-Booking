import { useMemo, useState } from "react";
import {
  ArrowRightLeft,
  CalendarDays,
  ChevronDown,
  Plane,
  Search,
  Users,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import FlightCard from "../components/FlightCard";
import { flights } from "../data/flights";

function Flights() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [from, setFrom] = useState(
    searchParams.get("from") || "CAI"
  );

  const [to, setTo] = useState(
    searchParams.get("to") || "DXB"
  );

  const [departure, setDeparture] = useState(
    searchParams.get("departure") || "20 Sep 2026"
  );

  const [passengers, setPassengers] = useState(
    searchParams.get("passengers") || "1"
  );

  const [travelClass, setTravelClass] = useState(
    searchParams.get("class") || "Economy"
  );

  const [tripType, setTripType] = useState("one-way");

  const [stops, setStops] = useState("all");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState("recommended");

  const filteredFlights = useMemo(() => {
    let result = flights.filter((flight) => {
      const matchesFrom =
        from === "all" || flight.from === from;

      const matchesTo =
        to === "all" || flight.to === to;

      const matchesStops =
        stops === "all" ||
        (stops === "direct" && flight.stops === 0) ||
        (stops === "stops" && flight.stops > 0);

      const matchesPrice =
        flight.price <= maxPrice;

      return (
        matchesFrom &&
        matchesTo &&
        matchesStops &&
        matchesPrice
      );
    });

    if (sort === "price-low") {
      result = [...result].sort(
        (a, b) => a.price - b.price
      );
    }

    if (sort === "price-high") {
      result = [...result].sort(
        (a, b) => b.price - a.price
      );
    }

    if (sort === "duration") {
      const durationToMinutes = (duration: string) => {
        const hours =
          duration.match(/(\d+)h/)?.[1] || "0";

        const minutes =
          duration.match(/(\d+)m/)?.[1] || "0";

        return (
          Number(hours) * 60 +
          Number(minutes)
        );
      };

      result = [...result].sort(
        (a, b) =>
          durationToMinutes(a.duration) -
          durationToMinutes(b.duration)
      );
    }

    return result;
  }, [from, to, stops, maxPrice, sort]);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    params.set("from", from);
    params.set("to", to);
    params.set("departure", departure);
    params.set("passengers", passengers);
    params.set("class", travelClass);

    navigate(`/flights?${params.toString()}`);
  };

  return (
    <main className="flights-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="flight-hero">

        <div className="flight-hero-overlay" />

        <div className="flight-hero-content">

          {/* HERO HEADING */}

          <div className="flight-hero-heading">

            <span className="flight-brand-label">
              TRAVELBOOK
            </span>

            <h1>
              Your next journey
              <br />
              <strong>starts here.</strong>
            </h1>

            <p>
              Find the best flights, compare prices
              and travel with confidence.
            </p>

          </div>


          {/* =========================================
              SEARCH CARD
          ========================================= */}

          <div className="flight-search-card">

            {/* TOP ROW */}

            <div className="flight-search-top">

              {/* TABS */}

              <div className="flight-search-tabs">

                <button
                  type="button"
                  className="active"
                >
                  <Plane size={20} />
                  <span>Flights</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/hotels")}
                >
                  <span>Hotels</span>
                </button>

              </div>


              {/* TRIP TYPE */}

              <div className="flight-trip-types">

                <label>
                  <input
                    type="radio"
                    checked={tripType === "one-way"}
                    onChange={() =>
                      setTripType("one-way")
                    }
                  />

                  <span className="custom-radio" />

                  <span>One way</span>
                </label>


                <label>
                  <input
                    type="radio"
                    checked={tripType === "round-trip"}
                    onChange={() =>
                      setTripType("round-trip")
                    }
                  />

                  <span className="custom-radio" />

                  <span>Round trip</span>
                </label>

              </div>

            </div>


            {/* =========================================
                SEARCH FIELDS
            ========================================= */}

            <div className="flight-search-fields">

              {/* FROM */}

              <div className="flight-search-field">

                <label>
                  FROM
                </label>

                <div className="flight-field-value">

                  <Plane size={21} />

                  <select
                    value={from}
                    onChange={(e) =>
                      setFrom(e.target.value)
                    }
                  >
                    <option value="CAI">
                      Cairo (CAI)
                    </option>

                    <option value="IST">
                      Istanbul (IST)
                    </option>

                    <option value="DXB">
                      Dubai (DXB)
                    </option>

                    <option value="DOH">
                      Doha (DOH)
                    </option>

                    <option value="all">
                      Any airport
                    </option>
                  </select>

                  <ChevronDown size={17} />

                </div>

              </div>


              {/* SWAP */}

              <button
                type="button"
                className="flight-swap-btn"
                onClick={handleSwap}
                aria-label="Swap airports"
              >
                <ArrowRightLeft size={19} />
              </button>


              {/* TO */}

              <div className="flight-search-field">

                <label>
                  TO
                </label>

                <div className="flight-field-value">

                  <Plane size={21} />

                  <select
                    value={to}
                    onChange={(e) =>
                      setTo(e.target.value)
                    }
                  >
                    <option value="DXB">
                      Dubai (DXB)
                    </option>

                    <option value="IST">
                      Istanbul (IST)
                    </option>

                    <option value="DOH">
                      Doha (DOH)
                    </option>

                    <option value="CAI">
                      Cairo (CAI)
                    </option>

                    <option value="all">
                      Any destination
                    </option>
                  </select>

                  <ChevronDown size={17} />

                </div>

              </div>


              {/* DEPARTURE */}

              <div className="flight-search-field">

                <label>
                  DEPARTURE
                </label>

                <div className="flight-field-value">

                  <CalendarDays size={21} />

                  <input
                    type="text"
                    value={departure}
                    onChange={(e) =>
                      setDeparture(e.target.value)
                    }
                    placeholder="20 Sep 2026"
                  />

                </div>

              </div>


              {/* PASSENGERS */}

              <div className="flight-search-field">

                <label>
                  PASSENGERS
                </label>

                <div className="flight-field-value">

                  <Users size={21} />

                  <select
                    value={passengers}
                    onChange={(e) =>
                      setPassengers(e.target.value)
                    }
                  >
                    <option value="1">
                      1 Passenger
                    </option>

                    <option value="2">
                      2 Passengers
                    </option>

                    <option value="3">
                      3 Passengers
                    </option>

                    <option value="4">
                      4 Passengers
                    </option>

                    <option value="5">
                      5 Passengers
                    </option>
                  </select>

                  <ChevronDown size={17} />

                </div>

              </div>


              {/* CLASS */}

              <div className="flight-search-field">

                <label>
                  CLASS
                </label>

                <div className="flight-field-value">

                  <select
                    value={travelClass}
                    onChange={(e) =>
                      setTravelClass(e.target.value)
                    }
                  >
                    <option value="Economy">
                      Economy
                    </option>

                    <option value="Premium Economy">
                      Premium Economy
                    </option>

                    <option value="Business">
                      Business
                    </option>

                    <option value="First Class">
                      First Class
                    </option>
                  </select>

                  <ChevronDown size={17} />

                </div>

              </div>

            </div>


            {/* SEARCH BUTTON */}

            <button
              type="button"
              className="flight-search-btn"
              onClick={handleSearch}
            >
              <Search size={21} />
              <span>Search Flights</span>
            </button>

          </div>

        </div>

      </section>


      {/* =========================================
          RESULTS
      ========================================= */}

      <section className="flight-results-section">

        <div className="flight-results-top">

          <div>

            <span className="flight-section-label">
              FLIGHT RESULTS
            </span>

            <h2>
              Flights from{" "}
              <strong>{from}</strong> to{" "}
              <strong>{to}</strong>
            </h2>

            <p>
              {filteredFlights.length} flights
              available for your journey
            </p>

          </div>


          {/* SORT */}

          <div className="flight-sort-box">

            <label htmlFor="sort">
              Sort by
            </label>

            <div>

              <select
                id="sort"
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
              >
                <option value="recommended">
                  Recommended
                </option>

                <option value="price-low">
                  Lowest price
                </option>

                <option value="price-high">
                  Highest price
                </option>

                <option value="duration">
                  Shortest duration
                </option>
              </select>

              <ChevronDown size={15} />

            </div>

          </div>

        </div>


        {/* =========================================
            FILTER BAR
        ========================================= */}

        <div className="flight-filter-bar">

          <div className="flight-filter-item">

            <label>
              Stops
            </label>

            <select
              value={stops}
              onChange={(e) =>
                setStops(e.target.value)
              }
            >
              <option value="all">
                All flights
              </option>

              <option value="direct">
                Direct only
              </option>

              <option value="stops">
                With stops
              </option>
            </select>

          </div>


          <div className="flight-filter-item flight-price-filter">

            <div>

              <label>
                Maximum price
              </label>

              <strong>
                ${maxPrice}
              </strong>

            </div>

            <input
              type="range"
              min="100"
              max="1000"
              step="10"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(
                  Number(e.target.value)
                )
              }
            />

          </div>

        </div>


        {/* =========================================
            FLIGHTS LIST
        ========================================= */}

        {filteredFlights.length > 0 ? (

          <div className="flights-list">

            {filteredFlights.map((flight) => (

              <FlightCard
                key={flight.id}
                flight={flight}
              />

            ))}

          </div>

        ) : (

          <div className="no-flights">

            <div className="empty-state-icon">
              <Plane size={28} />
            </div>

            <h2>
              No flights found
            </h2>

            <p>
              Try changing your search or
              filter options.
            </p>

            <button
              type="button"
              onClick={() => {
                setStops("all");
                setMaxPrice(1000);
              }}
            >
              Reset filters
            </button>

          </div>

        )}

      </section>

    </main>
  );
}

export default Flights;