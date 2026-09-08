import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DestinationCard from "../components/DestinationCard";
import { destinations } from "../data/destinations";

function Home() {
  const navigate = useNavigate();

  const [from, setFrom] = useState("CAI");
  const [to, setTo] = useState("DXB");
  const [departure, setDeparture] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [classType, setClassType] = useState("Economy");

  const handleSearch = () => {
    if (!departure) {
      alert("Please select a departure date.");
      return;
    }

    navigate(
      `/flights?from=${from}&to=${to}&departure=${departure}&passengers=${passengers}&class=${classType}`
    );
  };

  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">
            ✈️ Explore the world
          </span>

          <h1>
            Travel the world,
            <br />
            <span>your way.</span>
          </h1>

          <p>
            Discover amazing destinations, book flights and hotels,
            and start your next adventure.
          </p>

          <div className="hero-buttons">
            <button onClick={() => navigate("/flights")}>
              Explore Flights
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/hotels")}
            >
              Explore Hotels
            </button>
          </div>
        </div>
      </section>

      <section className="search-section">
        <div className="search-box">
          <h2>Where do you want to go?</h2>

          <div className="search-fields">

            <div className="search-field">
              <label>From</label>

              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              >
                <option value="CAI">
                  Cairo (CAI)
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
              </select>
            </div>

            <div className="search-field">
              <label>To</label>

              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
              >
                <option value="CAI">
                  Cairo (CAI)
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
              </select>
            </div>

            <div className="search-field">
              <label>Departure</label>

              <input
                type="date"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
              />
            </div>

            <div className="search-field">
              <label>Passengers</label>

              <select
                value={passengers}
                onChange={(e) =>
                  setPassengers(Number(e.target.value))
                }
              >
                <option value={1}>1 Passenger</option>
                <option value={2}>2 Passengers</option>
                <option value={3}>3 Passengers</option>
                <option value={4}>4 Passengers</option>
                <option value={5}>5 Passengers</option>
                <option value={6}>6 Passengers</option>
              </select>
            </div>

            <div className="search-field">
              <label>Class</label>

              <select
                value={classType}
                onChange={(e) => setClassType(e.target.value)}
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

                <option value="First">
                  First Class
                </option>
              </select>
            </div>

            <button
              className="search-btn"
              onClick={handleSearch}
            >
              Search Flights
            </button>

          </div>
        </div>
      </section>

      <section className="destinations-section">
        <div className="section-header">
          <div>
            <span>Popular destinations</span>
            <h2>Explore the world</h2>
          </div>

          <button
            className="view-all-btn"
            onClick={() => navigate("/flights")}
          >
            View all
          </button>
        </div>

        <div className="destinations-grid">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;