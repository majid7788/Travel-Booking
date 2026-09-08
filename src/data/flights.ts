export interface Flight {
  id: number;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  stops: number;
}

export const flights: Flight[] = [
  {
    id: 1,
    airline: "EgyptAir",
    flightNumber: "MS901",
    from: "CAI",
    to: "DXB",
    departure: "08:30",
    arrival: "13:45",
    duration: "3h 15m",
    price: 320,
    stops: 0,
  },
  {
    id: 2,
    airline: "Emirates",
    flightNumber: "EK928",
    from: "CAI",
    to: "DXB",
    departure: "10:15",
    arrival: "15:30",
    duration: "3h 15m",
    price: 450,
    stops: 0,
  },
  {
    id: 3,
    airline: "Turkish Airlines",
    flightNumber: "TK691",
    from: "CAI",
    to: "IST",
    departure: "16:20",
    arrival: "19:45",
    duration: "2h 25m",
    price: 290,
    stops: 0,
  },
  {
    id: 4,
    airline: "Qatar Airways",
    flightNumber: "QR1302",
    from: "CAI",
    to: "DOH",
    departure: "21:10",
    arrival: "00:20",
    duration: "3h 10m",
    price: 380,
    stops: 0,
  },
];