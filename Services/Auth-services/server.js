import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cloudinary from "./config/cloudinary.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

console.log("NODE_ENV =", process.env.NODE_ENV);
console.log("PORT =", process.env.PORT);

const app = express();

/* ---------- BASIC MIDDLEWARE ---------- */

app.use(express.json());
app.use(cookieParser());

/* ---------- CORS ---------- */

const allowedOrigins = [
  "http://localhost:5173",
  "https://ktm-vg51.onrender.com",
];
app.use((req, res, next) => {
  console.log("🔥 GATEWAY RECEIVED:", req.method, req.originalUrl);

  res.on("finish", () => {
    console.log(
      "🔥 GATEWAY SENT:",
      req.method,
      req.originalUrl,
      "STATUS:",
      res.statusCode
    );
  });

  next();
});
app.get("/test", (req, res) => {
  console.log("🔥 TEST ROUTE HIT");
  res.status(200).json({
    success: true,
    message: "Gateway is working"
  });
});
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("CORS BLOCKED:", origin);

      return callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
  })
);

/* ---------- DEBUG ---------- */

app.use((req, res, next) => {
  console.log(
    `[AUTH REQUEST] ${new Date().toISOString()} ${req.method} ${req.originalUrl}`
  );

  res.on("finish", () => {
    console.log(
      `[AUTH RESPONSE] ${req.method} ${req.originalUrl} -> ${res.statusCode}`
    );
  });

  next();
});

/* ---------- RATE LIMIT ---------- */



/* ---------- CLOUDINARY ---------- */

app.delete("/delete-cloudinary-images", (req, res) => {
  cloudinary.api.delete_resources_by_prefix(
    "profiles/",
    (error, result) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(200).json({
        success: true,
        result,
      });
    }
  );
});

/* ---------- AUTH ROUTES ---------- */

app.use("/api/auth", authRoutes);

/* ---------- HEALTH ---------- */

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "auth-service",
    status: "healthy",
    time: new Date().toISOString(),
  });
});

/* ---------- START ---------- */

const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Auth service running on port ${PORT}`);

  try {
    await connectDB();
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:");
    console.error(err);
  }


  // Keep service warm
  const KEEP_ALIVE_INTERVAL = 10 * 60 * 1000; // 10 minutes

  setInterval(async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:${PORT}/health`
      );

      console.log(
        `[KEEP-ALIVE] Auth service ping: ${response.status}`
      );
    } catch (error) {
      console.error("[KEEP-ALIVE] Failed:", error.message);
    }
  }, KEEP_ALIVE_INTERVAL);
});