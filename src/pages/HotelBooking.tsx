import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CreditCard,
  Hotel as HotelIcon,
  Users,
} from "lucide-react";
import { hotels } from "../data/hotels";

function HotelBooking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const hotelId = Number(searchParams.get("hotel"));

  const hotel = hotels.find((item) => item.id === hotelId);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) {
      return 0;
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const difference =
      end.getTime() - start.getTime();

    const calculatedNights =
      Math.ceil(
        difference / (1000 * 60 * 60 * 24)
      );

    return calculatedNights > 0
      ? calculatedNights
      : 0;
  }, [checkIn, checkOut]);

  const roomTotal =
    hotel && nights > 0
      ? hotel.price * nights * rooms
      : 0;

  const taxes = Math.round(roomTotal * 0.1);

  const total = roomTotal + taxes;

  const handleBooking = (event: React.FormEvent) => {
    event.preventDefault();

    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    if (nights <= 0) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone
    ) {
      alert("Please complete your personal information.");
      return;
    }

    if (
      !cardNumber ||
      !expiry ||
      !cvv
    ) {
      alert("Please complete your payment information.");
      return;
    }

    alert(
      "Booking confirmed successfully! This is a frontend demo."
    );

    navigate("/hotels");
  };

  if (!hotel) {
    return (
      <main className="no-hotels">
        <h2>Hotel not found</h2>

        <p>
          The hotel you are trying to book does not exist.
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
    <main className="hotel-booking-page">
      {/* Header */}
      <section className="hotel-booking-header">
        <button
          className="hotel-booking-back-btn"
          onClick={() => navigate(-1)}
          type="button"
        >
          <ArrowLeft size={18} />
          Back to Hotel
        </button>

        <div>
          <span>Secure booking</span>

          <h1>Complete Your Booking</h1>

          <p>
            Reserve your stay at {hotel.name}
          </p>
        </div>
      </section>

      <form
        className="hotel-booking-content"
        onSubmit={handleBooking}
      >
        {/* Main Form */}
        <div className="hotel-booking-main">
          {/* Stay Details */}
          <section className="hotel-booking-card">
            <div className="hotel-booking-card-header">
              <div className="booking-section-icon">
                <CalendarDays size={21} />
              </div>

              <div>
                <h2>Stay Details</h2>

                <p>
                  Choose your dates and number of guests
                </p>
              </div>
            </div>

            <div className="hotel-booking-form-grid">
              <div className="form-group">
                <label htmlFor="checkIn">
                  Check-in
                </label>

                <input
                  id="checkIn"
                  type="date"
                  value={checkIn}
                  onChange={(event) =>
                    setCheckIn(event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="checkOut">
                  Check-out
                </label>

                <input
                  id="checkOut"
                  type="date"
                  value={checkOut}
                  min={checkIn || undefined}
                  onChange={(event) =>
                    setCheckOut(event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="guests">
                  Guests
                </label>

                <div className="booking-input-with-icon">
                  <Users size={18} />

                  <select
                    id="guests"
                    value={guests}
                    onChange={(event) =>
                      setGuests(
                        Number(event.target.value)
                      )
                    }
                  >
                    <option value={1}>
                      1 Guest
                    </option>

                    <option value={2}>
                      2 Guests
                    </option>

                    <option value={3}>
                      3 Guests
                    </option>

                    <option value={4}>
                      4 Guests
                    </option>

                    <option value={5}>
                      5 Guests
                    </option>

                    <option value={6}>
                      6 Guests
                    </option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="rooms">
                  Rooms
                </label>

                <select
                  id="rooms"
                  value={rooms}
                  onChange={(event) =>
                    setRooms(
                      Number(event.target.value)
                    )
                  }
                >
                  <option value={1}>
                    1 Room
                  </option>

                  <option value={2}>
                    2 Rooms
                  </option>

                  <option value={3}>
                    3 Rooms
                  </option>

                  <option value={4}>
                    4 Rooms
                  </option>
                </select>
              </div>
            </div>
          </section>

          {/* Guest Information */}
          <section className="hotel-booking-card">
            <div className="hotel-booking-card-header">
              <div className="booking-section-icon">
                <Users size={21} />
              </div>

              <div>
                <h2>Guest Information</h2>

                <p>
                  Enter the details of the main guest
                </p>
              </div>
            </div>

            <div className="hotel-booking-form-grid">
              <div className="form-group">
                <label htmlFor="firstName">
                  First Name
                </label>

                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(event) =>
                    setFirstName(event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">
                  Last Name
                </label>

                <input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(event) =>
                    setLastName(event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  placeholder="+20 100 000 0000"
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value)
                  }
                  required
                />
              </div>
            </div>
          </section>

          {/* Payment */}
          <section className="hotel-booking-card">
            <div className="hotel-booking-card-header">
              <div className="booking-section-icon">
                <CreditCard size={21} />
              </div>

              <div>
                <h2>Payment Information</h2>

                <p>
                  Enter your payment details
                </p>
              </div>
            </div>

            <div className="hotel-payment-note">
              <Check size={17} />

              <span>
                This is a frontend demo. No real payment
                will be processed.
              </span>
            </div>

            <div className="hotel-booking-form-grid">
              <div className="form-group full-width">
                <label htmlFor="cardNumber">
                  Card Number
                </label>

                <input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  value={cardNumber}
                  onChange={(event) =>
                    setCardNumber(event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="expiry">
                  Expiry Date
                </label>

                <input
                  id="expiry"
                  type="text"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={expiry}
                  onChange={(event) =>
                    setExpiry(event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cvv">
                  CVV
                </label>

                <input
                  id="cvv"
                  type="password"
                  placeholder="123"
                  maxLength={4}
                  value={cvv}
                  onChange={(event) =>
                    setCvv(event.target.value)
                  }
                  required
                />
              </div>
            </div>
          </section>
        </div>

        {/* Summary */}
        <aside className="hotel-booking-summary">
          <div className="hotel-summary-image">
            <img
              src={hotel.image}
              alt={hotel.name}
            />
          </div>

          <div className="hotel-summary-info">
            <div className="hotel-summary-title">
              <HotelIcon size={19} />

              <h2>{hotel.name}</h2>
            </div>

            <p>
              {hotel.city}, {hotel.country}
            </p>
          </div>

          <div className="hotel-summary-divider"></div>

          <div className="hotel-summary-row">
            <span>Check-in</span>

            <strong>
              {checkIn || "Select date"}
            </strong>
          </div>

          <div className="hotel-summary-row">
            <span>Check-out</span>

            <strong>
              {checkOut || "Select date"}
            </strong>
          </div>

          <div className="hotel-summary-row">
            <span>Guests</span>

            <strong>
              {guests}
            </strong>
          </div>

          <div className="hotel-summary-row">
            <span>Rooms</span>

            <strong>
              {rooms}
            </strong>
          </div>

          <div className="hotel-summary-row">
            <span>Price per night</span>

            <strong>
              ${hotel.price}
            </strong>
          </div>

          <div className="hotel-summary-row">
            <span>Nights</span>

            <strong>
              {nights || "-"}
            </strong>
          </div>

          <div className="hotel-summary-divider"></div>

          <div className="hotel-summary-row">
            <span>
              Room total
            </span>

            <strong>
              ${roomTotal}
            </strong>
          </div>

          <div className="hotel-summary-row">
            <span>
              Taxes & fees
            </span>

            <strong>
              ${taxes}
            </strong>
          </div>

          <div className="hotel-summary-total">
            <span>Total</span>

            <strong>
              ${total}
            </strong>
          </div>

          <button
            className="hotel-confirm-booking-btn"
            type="submit"
          >
            Confirm Booking
          </button>

          <div className="hotel-secure-note">
            <Check size={16} />
            Secure booking
          </div>
        </aside>
      </form>
    </main>
  );
}

export default HotelBooking;