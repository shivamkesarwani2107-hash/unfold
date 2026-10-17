
export const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://YOUR-UNFOLD-BACKEND.onrender.com"
    : "http://localhost:5000");

export const UPI_ID = "9336991973@ptaxis";
export const PRICE_INR = 19;
