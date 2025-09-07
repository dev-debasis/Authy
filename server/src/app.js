import express, { urlencoded } from "express";
import cors from "cors";
import { clerkWebhook } from "./controller/webhook.controller.js";

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
app.use(express.json());
app.use("/", (req, res) => {
  res.send("API Working");
});
app.use("/api/v1/webhooks", clerkWebhook);

export { app };
