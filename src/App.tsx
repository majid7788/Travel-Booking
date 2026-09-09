import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AIChat from "./components/AIChat";

import Home from "./pages/Home";
import Flights from "./pages/Flights";
import FlightDetails from "./pages/FlightDetails";
import Booking from "./pages/Booking";
import BookingSuccess from "./pages/BookingSuccess";

import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import HotelBooking from "./pages/HotelBooking";
import HotelBookingSuccess from "./pages/HotelBookingSuccess";

import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Flights */}
        <Route path="/flights" element={<Flights />} />
        <Route path="/flights/:id" element={<FlightDetails />} />

        {/* Hotels */}
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />

        {/* Favorites */}
        <Route path="/favorites" element={<Favorites />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />

          <Route path="/booking" element={<Booking />} />

          <Route
            path="/booking-success"
            element={<BookingSuccess />}
          />

          <Route
            path="/hotel-booking"
            element={<HotelBooking />}
          />

          <Route
            path="/hotel-booking-success"
            element={<HotelBookingSuccess />}
          />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <div
              style={{
                minHeight: "70vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "10px",
                padding: "40px 20px",
                textAlign: "center",
              }}
            >
              <h1 style={{ fontSize: "64px", margin: 0 }}>404</h1>

              <h2 style={{ margin: 0 }}>
                Page not found
              </h2>

              <p style={{ color: "#64748b", margin: 0 }}>
                The page you are looking for does not exist.
              </p>
            </div>
          }
        />
      </Routes>

      {/* AI Travel Assistant */}
      <AIChat />
    </>
  );
}

export default App;