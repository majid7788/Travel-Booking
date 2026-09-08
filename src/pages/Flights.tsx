import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import FlightCard from "../components/FlightCard";
import { flights } from "../data/flights";

function Flights() {
  const [searchParams] = useSearchParams();

  const searchFrom =
    searchParams.get("from") || "CAI";

  const searchTo =
    searchParams.get("to") || "DXB";

  const departure =
    searchParams.get("departure") ||
    "20 Sep 2026";

  const passengers =
    searchParams.get("passengers") || "1";

  const travelClass =
    searchParams.get("class") || "Economy";

  const [from, setFrom] =
    useState(searchFrom);

  const [to, setTo] =
    useState(searchTo);

  const [stops, setStops] =
    useState("all");

  const [maxPrice, setMaxPrice] =
    useState(1000);

  const [sort, setSort] =
    useState("recommended");

  const filteredFlights = useMemo(() => {
    let result = flights.filter(
      (flight) => {
        const matchesFrom =
          from === "all" ||
          flight.from === from;

        const matchesTo =
          to === "all" ||
          flight.to === to;

        const matchesStops =
          stops === "all" ||
          (stops === "direct" &&
            flight.stops === 0) ||
          (stops === "stops" &&
            flight.stops > 0);

        const matchesPrice =
          flight.price <= maxPrice;

        return (
          matchesFrom &&
          matchesTo &&
          matchesStops &&
          matchesPrice
        );
      }
    );

    if (sort === "price-low") {
      result = [...result].sort(
        (a, b) =>
          a.price - b.price
      );
    }

    if (sort === "price-high") {
      result = [...result].sort(
        (a, b) =>
          b.price - a.price
      );
    }

    if (sort === "duration") {
      result = [...result].sort(
        (a, b) => {
          const getDurationInMinutes =
            (duration: string) => {
              const hoursMatch =
                duration.match(
                  /(\d+)h/
                );

              const minutesMatch =
                duration.match(
                  /(\d+)m/
                );

              const hours =
                hoursMatch
                  ? Number(
                      hoursMatch[1]
                    )
                  : 0;

              const minutes =
                minutesMatch
                  ? Number(
                      minutesMatch[1]
                    )
                  : 0;

              return (
                hours * 60 +
                minutes
              );
            };

          return (
            getDurationInMinutes(
              a.duration
            ) -
            getDurationInMinutes(
              b.duration
            )
          );
        }
      );
    }

    return result;
  }, [
    from,
    to,
    stops,
    maxPrice,
    sort,
  ]);

  const resetFilters = () => {
    setFrom(searchFrom);
    setTo(searchTo);
    setStops("all");
    setMaxPrice(1000);
    setSort("recommended");
  };

  return (
    <main className="flights-page">

      {/* Header */}

      <section className="flights-header">
        <div>
          <span className="section-eyebrow">
            Flight search
          </span>

          <h1>
            Find your perfect flight
          </h1>

          <p>
            Compare flights and choose
            the best option for your trip.
          </p>
        </div>
      </section>

      {/* Search Summary */}

      <section className="flight-search-summary">

        <div className="search-summary-item">
          <span>
            From
          </span>

          <strong>
            {from}
          </strong>
        </div>

        <div className="search-summary-item">
          <span>
            To
          </span>

          <strong>
            {to}
          </strong>
        </div>

        <div className="search-summary-item">
          <span>
            Departure
          </span>

          <strong>
            {departure}
          </strong>
        </div>

        <div className="search-summary-item">
          <span>
            Passengers
          </span>

          <strong>
            {passengers}
          </strong>
        </div>

        <div className="search-summary-item">
          <span>
            Class
          </span>

          <strong>
            {travelClass}
          </strong>
        </div>

      </section>

      {/* Filters */}

      <section className="flight-filters">

        <div className="filter-title">
          <SlidersHorizontal
            size={19}
          />

          <span>
            Filters
          </span>
        </div>

        {/* From */}

        <div className="filter-group">
          <label htmlFor="flight-from">
            From
          </label>

          <select
            id="flight-from"
            value={from}
            onChange={(event) =>
              setFrom(
                event.target.value
              )
            }
          >
            <option value="all">
              All airports
            </option>

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
          </select>
        </div>

        {/* To */}

        <div className="filter-group">
          <label htmlFor="flight-to">
            To
          </label>

          <select
            id="flight-to"
            value={to}
            onChange={(event) =>
              setTo(
                event.target.value
              )
            }
          >
            <option value="all">
              All airports
            </option>

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
          </select>
        </div>

        {/* Stops */}

        <div className="filter-group">
          <label htmlFor="flight-stops">
            Stops
          </label>

          <select
            id="flight-stops"
            value={stops}
            onChange={(event) =>
              setStops(
                event.target.value
              )
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

        {/* Price */}

        <div className="filter-group">
          <label htmlFor="max-price">
            Max price: ${maxPrice}
          </label>

          <input
            id="max-price"
            type="range"
            min="100"
            max="1000"
            step="10"
            value={maxPrice}
            onChange={(event) =>
              setMaxPrice(
                Number(
                  event.target.value
                )
              )
            }
          />
        </div>

        {/* Reset */}

        <button
          type="button"
          className="reset-filters-btn"
          onClick={resetFilters}
        >
          Reset Filters
        </button>

      </section>

      {/* Results Header */}

      <section className="flights-results-header">

        <div>
          <h2>
            Available flights
          </h2>

          <p>
            {filteredFlights.length}{" "}
            {filteredFlights.length === 1
              ? "flight"
              : "flights"}{" "}
            found
          </p>
        </div>

        {/* Sort */}

        <div className="flight-sort">
          <label htmlFor="flight-sort">
            Sort by
          </label>

          <select
            id="flight-sort"
            value={sort}
            onChange={(event) =>
              setSort(
                event.target.value
              )
            }
          >
            <option value="recommended">
              Recommended
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

            <option value="duration">
              Shortest Duration
            </option>
          </select>
        </div>

      </section>

      {/* Results */}

      {filteredFlights.length === 0 ? (
        <section className="no-flights">

          <div className="empty-state-icon">
            ✈️
          </div>

          <h2>
            No flights found
          </h2>

          <p>
            We couldn't find any flights
            matching your current filters.
            Try changing your search criteria.
          </p>

          <button
            type="button"
            className="reset-filters-btn"
            onClick={resetFilters}
          >
            Reset Filters
          </button>

        </section>
      ) : (
        <section className="flights-list">

          {filteredFlights.map(
            (flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
              />
            )
          )}

        </section>
      )}

    </main>
  );
}

export default Flights;