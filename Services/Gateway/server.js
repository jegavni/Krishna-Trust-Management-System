import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: envFile });

const app = express();

app.set("trust proxy", 1);

/* ---------- DEBUG ENV ---------- */

console.log("NODE_ENV =", process.env.NODE_ENV);
console.log("AUTH_SERVICE_URL =", process.env.AUTH_SERVICE_URL);
console.log("MEMBERS_SERVICE_URL =", process.env.MEMBERS_SERVICE_URL);
console.log("PORT =", process.env.PORT);

/* ---------- REQUEST LOGGER ---------- */

app.use((req, res, next) => {
  console.log(
    `[GATEWAY REQUEST] ${new Date().toISOString()} ${req.method} ${req.originalUrl} IP=${req.ip}`
  );

  res.on("finish", () => {
    console.log(
      `[GATEWAY RESPONSE] ${req.method} ${req.originalUrl} -> ${res.statusCode}`
    );
  });

  next();
});

/* ---------- CORS ---------- */

const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:5173",
  "https://ktm-vg51.onrender.com",
];

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

/* ---------- HEALTH ---------- */

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "api-gateway",
    status: "healthy",
    time: new Date().toISOString(),
  });
});

/* ---------- AUTH PROXY ---------- */
app.use((req, res, next) => {
  res.on("finish", () => {
    if (res.statusCode === 429) {
      console.log("🚨 429 SOURCE DEBUG");
      console.log("Method:", req.method);
      console.log("URL:", req.originalUrl);
      console.log("IP:", req.ip);
      console.log("Headers:", res.getHeaders());
    }
  });

  next();
});
const authProxy = createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
  secure: false,
  xfwd: true,

  proxyTimeout: 120000,
  timeout: 120000,

  pathRewrite: (path) => {
    console.log("[AUTH PATH] Incoming:", path);

    const rewrittenPath = "/api/auth" + path;

    console.log("[AUTH PATH] Rewritten:", rewrittenPath);

    return rewrittenPath;
  },

  on: {
    proxyReq: (proxyReq, req) => {
      console.log(
        "[AUTH PROXY REQUEST]",
        req.method,
        req.originalUrl,
        "=>",
        process.env.AUTH_SERVICE_URL
      );
    },

    proxyRes: (proxyRes, req) => {
      console.log(
        "[AUTH PROXY RESPONSE]",
        req.method,
        req.originalUrl,
        "STATUS:",
        proxyRes.statusCode
      );
    },

    error: (err, req, res) => {
      console.error(
        "[AUTH PROXY ERROR]",
        req.method,
        req.originalUrl,
        err.message
      );

      if (!res.headersSent) {
        res.status(502).json({
          success: false,
          error: err.message,
        });
      }
    },
  },
});

app.use("/api/auth", authProxy);

/* ---------- MEMBERS PROXY ---------- */

const membersProxy = createProxyMiddleware({
  target: process.env.MEMBERS_SERVICE_URL,
  changeOrigin: true,
  secure: false,
  xfwd: true,

  onProxyReq: (proxyReq, req) => {
    console.log(
      "[MEMBERS PROXY REQUEST]",
      req.method,
      req.originalUrl,
      "=>",
      process.env.MEMBERS_SERVICE_URL
    );
  },

  onProxyRes: (proxyRes, req) => {
    console.log(
      "[MEMBERS PROXY RESPONSE]",
      req.method,
      req.originalUrl,
      "STATUS:",
      proxyRes.statusCode
    );
  },

  onError: (err, req, res) => {
    console.error(
      "[MEMBERS PROXY ERROR]",
      req.method,
      req.originalUrl,
      err.message
    );

    if (!res.headersSent) {
      res.status(502).json({
        success: false,
        error: err.message,
      });
    }
  },
});

app.use("/api/members", membersProxy);

/* ---------- 404 ---------- */

app.use((req, res) => {
  console.log("[GATEWAY 404]", req.method, req.originalUrl);

  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

/* ---------- START ---------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Gateway running on port ${PORT}`);
});