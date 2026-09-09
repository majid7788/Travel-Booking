import { useMemo, useState } from "react";
import {
  Building2,
  ChevronDown,
  Coins,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Star,
} from "lucide-react";

import HotelCard from "../components/HotelCard";
import { hotels } from "../data/hotels";

function Hotels() {
  const [search, setSearch] = useState("");

  const [city, setCity] = useState("all");

  const [minRating, setMinRating] = useState(0);

  const [maxPrice, setMaxPrice] = useState(500);

  const [sort, setSort] = useState("recommended");

  const cities = [
    ...new Set(
      hotels.map((hotel) => hotel.city)
    ),
  ];

  const filteredHotels = useMemo(() => {
    let result = hotels.filter((hotel) => {
      const searchValue = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        hotel.name
          .toLowerCase()
          .includes(searchValue) ||
        hotel.city
          .toLowerCase()
          .includes(searchValue) ||
        hotel.country
          .toLowerCase()
          .includes(searchValue);

      const matchesCity =
        city === "all" ||
        hotel.city === city;

      const matchesRating =
        hotel.rating >= minRating;

      const matchesPrice =
        hotel.price <= maxPrice;

      return (
        matchesSearch &&
        matchesCity &&
        matchesRating &&
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

    if (sort === "rating") {
      result = [...result].sort(
        (a, b) => b.rating - a.rating
      );
    }

    return result;
  }, [
    search,
    city,
    minRating,
    maxPrice,
    sort,
  ]);

  const resetFilters = () => {
    setSearch("");
    setCity("all");
    setMinRating(0);
    setMaxPrice(500);
    setSort("recommended");
  };

  return (
    <main className="hotels-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="hotels-header">
        <div>
          <span className="section-eyebrow">
            HOTEL SEARCH
          </span>

          <h1>
            Find your{" "}
            <span>perfect stay</span>
          </h1>

          <p>
            Discover comfortable hotels and
            resorts for your next trip.
          </p>
        </div>
      </section>

      {/* =========================
          SEARCH
      ========================= */}

      <section className="hotel-search-box">

        <div className="hotel-search-field">
          <Search size={21} />

          <div>
            <span>Destination</span>

            <input
              className="hotel-search-input"
              type="text"
              placeholder="Search hotels, cities or countries..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>
        </div>

        <button
          type="button"
          className="hotel-search-btn"
        >
          <Search size={19} />
          Search Hotels
        </button>

      </section>

      {/* =========================
          FILTERS
      ========================= */}

      <section className="hotel-filters">

        {/* Filter button */}

        <div className="hotel-filter-title">

          <SlidersHorizontal size={19} />

          <span>
            Filters
          </span>

          <ChevronDown
            size={17}
            className="filter-title-arrow"
          />

        </div>

        {/* City */}

        <div className="hotel-filter-group">

          <div className="hotel-filter-icon">
            <Building2 size={20} />
          </div>

          <div className="hotel-filter-content">

            <label htmlFor="hotel-city">
              City
            </label>

            <select
              id="hotel-city"
              value={city}
              onChange={(event) =>
                setCity(event.target.value)
              }
            >
              <option value="all">
                All cities
              </option>

              {cities.map((currentCity) => (
                <option
                  key={currentCity}
                  value={currentCity}
                >
                  {currentCity}
                </option>
              ))}
            </select>

          </div>

          <ChevronDown
            size={17}
            className="hotel-filter-arrow"
          />

        </div>

        {/* Rating */}

        <div className="hotel-filter-group">

          <div className="hotel-filter-icon">
            <Star size={20} />
          </div>

          <div className="hotel-filter-content">

            <label htmlFor="hotel-rating">
              Minimum rating
            </label>

            <select
              id="hotel-rating"
              value={minRating}
              onChange={(event) =>
                setMinRating(
                  Number(event.target.value)
                )
              }
            >
              <option value="0">
                Any rating
              </option>

              <option value="4">
                4.0+
              </option>

              <option value="4.5">
                4.5+
              </option>

              <option value="4.7">
                4.7+
              </option>

              <option value="4.8">
                4.8+
              </option>

              <option value="4.9">
                4.9+
              </option>
            </select>

          </div>

          <ChevronDown
            size={17}
            className="hotel-filter-arrow"
          />

        </div>

        {/* Price */}

        <div className="hotel-filter-group price-filter">

          <div className="hotel-filter-icon">
            <Coins size={20} />
          </div>

          <div className="hotel-filter-content">

            <label htmlFor="hotel-price">
              Price range
            </label>

            <div className="price-filter-value">
              Up to{" "}
              <strong>
                ${maxPrice}
              </strong>
            </div>

            <input
              id="hotel-price"
              type="range"
              min="50"
              max="500"
              step="10"
              value={maxPrice}
              onChange={(event) =>
                setMaxPrice(
                  Number(event.target.value)
                )
              }
            />

          </div>

        </div>

        {/* Reset */}

        <button
          type="button"
          className="hotel-reset-btn"
          onClick={resetFilters}
        >
          <RotateCcw size={18} />

          <span>
            Reset filters
          </span>
        </button>

      </section>

      {/* =========================
          RESULTS HEADER
      ========================= */}

      <section className="hotels-results-header">

        <div>
          <h2>
            Available hotels
          </h2>

          <p>
            {filteredHotels.length}{" "}
            {filteredHotels.length === 1
              ? "hotel"
              : "hotels"}{" "}
            found
          </p>
        </div>

        <div className="hotel-sort">

          <label htmlFor="hotel-sort">
            Sort by
          </label>

          <select
            id="hotel-sort"
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
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

            <option value="rating">
              Highest Rating
            </option>
          </select>

          <ChevronDown
            size={17}
            className="sort-arrow"
          />

        </div>

      </section>

      {/* =========================
          RESULTS
      ========================= */}

      {filteredHotels.length === 0 ? (
        <section className="no-hotels">

          <div className="empty-state-icon">
            🏨
          </div>

          <h2>
            No hotels found
          </h2>

          <p>
            We couldn't find any hotels
            matching your current search.
            Try changing your filters.
          </p>

          <button
            type="button"
            className="hotel-reset-btn"
            onClick={resetFilters}
          >
            <RotateCcw size={17} />
            Reset Filters
          </button>

        </section>
      ) : (
        <section className="hotels-grid">

          {filteredHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
            />
          ))}

        </section>
      )}

    </main>
  );
}

export default Hotels;