const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error");

// Enable CORS with specific origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:4000",
  "http://195.26.249.188",
  "http://dashboard.kyriosfxadvisory.com"
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no `origin` (like mobile apps or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`CORS error: Origin ${origin} not allowed`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true // Include cookies in CORS requests if needed
}));

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// Trust proxy for accurate client IP detection
app.set('trust proxy', 1);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports
const userRoutes = require("./routes/userRoute");
app.use("/api/v1", userRoutes);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
