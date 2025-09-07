import express, { urlencoded } from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  if(req.originalUrl.startsWith("/api/v1/webhooks")){
    next();
  } else {
    express.json()(req, res, next);
  }
})
app.use("/", (req, res) => {
  res.send("API Working");
});
app.use("/api/v1/webhooks", webhookRoutes);

export { app };
