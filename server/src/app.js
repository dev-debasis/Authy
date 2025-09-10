import express, { urlencoded } from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";
import credentialsRoutes from "./routes/credentials.routes.js";
import healthCheckRoutes from "./routes/healthCheck.routes.js";

const app = express();

const corsOrigin = process.env.CORS_ORIGIN;
if(!corsOrigin){
  console.warn("CORS_ORIGIN not set, using default localhost");
}
app.use(
  cors({
    origin: corsOrigin || "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  urlencoded({
    extended: true,
    limit: "10mb",
  })
);

app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/api/v1/webhooks")) {
    next();
  } else {
    express.json({ limit: "10mb" })(req, res, next);
  }
});

app.use("/api/v1/webhooks", webhookRoutes);
app.use("/api/v1/credentials", credentialsRoutes);
app.use("/api/v1/health", healthCheckRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export { app };
