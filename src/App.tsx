import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

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

        {/* Public Routes */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/flights"
          element={<Flights />}
        />

        <Route
          path="/flights/:id"
          element={<FlightDetails />}
        />

        <Route
          path="/hotels"
          element={<Hotels />}
        />

        <Route
          path="/hotels/:id"
          element={<HotelDetails />}
        />

        <Route
          path="/favorites"
          element={<Favorites />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* Protected Routes */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/booking"
            element={<Booking />}
          />

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
            <main
              style={{
                minHeight: "70vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <h1>404</h1>

              <p>
                Page not found
              </p>
            </main>
          }
        />

      </Routes>
    </>
  );
}

export default App;