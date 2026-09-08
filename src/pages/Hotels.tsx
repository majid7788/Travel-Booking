import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import HotelCard from "../components/HotelCard";
import { hotels } from "../data/hotels";

function Hotels() {
  const [search, setSearch] =
    useState("");

  const [city, setCity] =
    useState("all");

  const [minRating, setMinRating] =
    useState(0);

  const [maxPrice, setMaxPrice] =
    useState(500);

  const [sort, setSort] =
    useState("recommended");

  const cities = [
    ...new Set(
      hotels.map(
        (hotel) => hotel.city
      )
    ),
  ];

  const filteredHotels = useMemo(() => {
    let result = hotels.filter(
      (hotel) => {
        const searchValue =
          search.toLowerCase().trim();

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

    if (sort === "rating") {
      result = [...result].sort(
        (a, b) =>
          b.rating - a.rating
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

      {/* Header */}

      <section className="hotels-header">

        <div>
          <span className="section-eyebrow">
            Hotel search
          </span>

          <h1>
            Find your perfect stay
          </h1>

          <p>
            Discover comfortable hotels
            and resorts for your next trip.
          </p>
        </div>

      </section>

      {/* Search */}

      <section className="hotel-search-box">

        <Search size={20} />

        <input
          className="hotel-search-input"
          type="text"
          placeholder="Search hotels, cities or countries..."
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
        />

      </section>

      {/* Filters */}

      <section className="hotel-filters">

        <div className="hotel-filter-title">

          <SlidersHorizontal
            size={19}
          />

          <span>
            Filters
          </span>

        </div>

        {/* City */}

        <div className="hotel-filter-group">

          <label htmlFor="hotel-city">
            City
          </label>

          <select
            id="hotel-city"
            value={city}
            onChange={(event) =>
              setCity(
                event.target.value
              )
            }
          >
            <option value="all">
              All cities
            </option>

            {cities.map(
              (currentCity) => (
                <option
                  key={currentCity}
                  value={currentCity}
                >
                  {currentCity}
                </option>
              )
            )}

          </select>

        </div>

        {/* Rating */}

        <div className="hotel-filter-group">

          <label htmlFor="hotel-rating">
            Minimum rating:{" "}
            {minRating === 0
              ? "Any"
              : minRating}
          </label>

          <select
            id="hotel-rating"
            value={minRating}
            onChange={(event) =>
              setMinRating(
                Number(
                  event.target.value
                )
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

        {/* Price */}

        <div className="hotel-filter-group">

          <label htmlFor="hotel-price">
            Max price: ${maxPrice}
          </label>

          <input
            id="hotel-price"
            type="range"
            min="50"
            max="500"
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
          className="hotel-reset-btn"
          onClick={resetFilters}
        >
          Reset Filters
        </button>

      </section>

      {/* Results Header */}

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

        {/* Sort */}

        <div className="hotel-sort">

          <label htmlFor="hotel-sort">
            Sort by
          </label>

          <select
            id="hotel-sort"
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

            <option value="rating">
              Highest Rating
            </option>

          </select>

        </div>

      </section>

      {/* Results */}

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
            Reset Filters
          </button>

        </section>
      ) : (
        <section className="hotels-grid">

          {filteredHotels.map(
            (hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
              />
            )
          )}

        </section>
      )}

    </main>
  );
}

export default Hotels;