import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  CheckCircle,
  CreditCard,
  Mail,
  Phone,
  User,
} from "lucide-react";

import { flights } from "../data/flights";

function Booking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const flightId = Number(searchParams.get("flight"));

  const flight = flights.find(
    (item) => item.id === flightId
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  if (!flight) {
    return (
      <main className="no-flights">
        <h2>Flight not found</h2>

        <p>
          The flight you are trying to book does not exist.
        </p>

        <button
          onClick={() => navigate("/flights")}
        >
          Back to Flights
        </button>
      </main>
    );
  }

  const handleBooking = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !cardNumber ||
      !expiry ||
      !cvv
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (firstName.length < 2) {
      alert("Please enter a valid first name.");
      return;
    }

    if (lastName.length < 2) {
      alert("Please enter a valid last name.");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (phone.length < 8) {
      alert("Please enter a valid phone number.");
      return;
    }

    if (cardNumber.replace(/\s/g, "").length < 16) {
      alert("Please enter a valid card number.");
      return;
    }

    if (expiry.length < 5) {
      alert("Please enter a valid expiry date.");
      return;
    }

    if (cvv.length < 3) {
      alert("Please enter a valid CVV.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      navigate(
        `/booking-success?flight=${flight.id}`
      );
    }, 1500);
  };

  return (
    <main className="booking-page">

      <section className="booking-header">
        <span>Secure booking</span>

        <h1>Complete Your Booking</h1>

        <p>
          Enter your details to confirm your flight.
        </p>
      </section>

      <section className="booking-content">

        <form
          className="booking-form"
          onSubmit={handleBooking}
        >

          {/* Passenger Information */}

          <div className="booking-section">

            <div className="booking-section-header">
              <div className="booking-section-icon">
                <User size={20} />
              </div>

              <div>
                <h2>Passenger Information</h2>

                <p>
                  Enter the passenger details.
                </p>
              </div>
            </div>

            <div className="form-row">

              <div className="form-group">
                <label htmlFor="firstName">
                  First Name
                </label>

                <div className="input-wrapper">
                  <User size={17} />

                  <input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(event) =>
                      setFirstName(event.target.value)
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="lastName">
                  Last Name
                </label>

                <div className="input-wrapper">
                  <User size={17} />

                  <input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(event) =>
                      setLastName(event.target.value)
                    }
                  />
                </div>
              </div>

            </div>

            <div className="form-row">

              <div className="form-group">
                <label htmlFor="booking-email">
                  Email
                </label>

                <div className="input-wrapper">
                  <Mail size={17} />

                  <input
                    id="booking-email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  Phone
                </label>

                <div className="input-wrapper">
                  <Phone size={17} />

                  <input
                    id="phone"
                    type="tel"
                    placeholder="+20 100 000 0000"
                    value={phone}
                    onChange={(event) =>
                      setPhone(event.target.value)
                    }
                  />
                </div>
              </div>

            </div>

          </div>


          {/* Payment */}

          <div className="booking-section">

            <div className="booking-section-header">
              <div className="booking-section-icon">
                <CreditCard size={20} />
              </div>

              <div>
                <h2>Payment Information</h2>

                <p>
                  Enter your payment details.
                </p>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="cardNumber">
                Card Number
              </label>

              <div className="input-wrapper">
                <CreditCard size={17} />

                <input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  maxLength={19}
                  onChange={(event) =>
                    setCardNumber(event.target.value)
                  }
                />
              </div>
            </div>

            <div className="form-row">

              <div className="form-group">
                <label htmlFor="expiry">
                  Expiry Date
                </label>

                <input
                  id="expiry"
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  maxLength={5}
                  onChange={(event) =>
                    setExpiry(event.target.value)
                  }
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
                  value={cvv}
                  maxLength={4}
                  onChange={(event) =>
                    setCvv(event.target.value)
                  }
                />
              </div>

            </div>

            <div className="payment-demo-note">
              <CheckCircle size={17} />

              <span>
                Demo payment only — no real payment
                will be processed.
              </span>
            </div>

          </div>


          {/* Submit */}

          <button
            type="submit"
            className="booking-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Processing...
              </>
            ) : (
              "Confirm Booking"
            )}
          </button>

        </form>


        {/* Summary */}

        <aside className="booking-summary">

          <div className="booking-summary-header">
            <span>Your trip</span>
            <h2>Flight Summary</h2>
          </div>

          <div className="booking-airline">
            <div className="booking-airline-icon">
              ✈
            </div>

            <div>
              <strong>{flight.airline}</strong>

              <span>
                {flight.flightNumber}
              </span>
            </div>
          </div>

          <div className="booking-route">

            <div>
              <strong>{flight.departure}</strong>
              <span>{flight.from}</span>
            </div>

            <div className="booking-route-line">
              <span></span>
            </div>

            <div>
              <strong>{flight.arrival}</strong>
              <span>{flight.to}</span>
            </div>

          </div>

          <div className="booking-details">

            <div>
              <span>Date</span>
              <strong>20 Sep 2026</strong>
            </div>

            <div>
              <span>Class</span>
              <strong>Economy</strong>
            </div>

            <div>
              <span>Passengers</span>
              <strong>1 Passenger</strong>
            </div>

            <div>
              <span>Duration</span>
              <strong>{flight.duration}</strong>
            </div>

          </div>

          <div className="booking-total">
            <span>Total</span>

            <strong>
              ${flight.price}
            </strong>
          </div>

        </aside>

      </section>

    </main>
  );
}

export default Booking;