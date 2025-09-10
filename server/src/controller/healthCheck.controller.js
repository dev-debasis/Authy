import mongoose from "mongoose";
import os from "os";
import { messageInRaw } from "svix";

const healthCheck = async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const dbStatus =
      dbState === 1
        ? "connected"
        : dbState === 2
        ? "connecting"
        : dbState === 3
        ? "disconnecting"
        : "disconnected";

    const requiredEnv = [
      "PORT",
      "MONGODB_URI",
      "CLERK_WEBHOOK_SIGNING_SECRET",
      "CREDENTIALS_ENCRYPTION_KEY",
    ];
    const missingEnv = requiredEnv.filter((env) => !process.env[env]);

    const memoryUsage = process.memoryUsage();
    const cpuLoad = os.loadavg();

    if (dbStatus !== "connected") {
      return res.status(500).json({
        success: false,
        message: "Database not connected",
        database: dbStatus,
        envStatus:
          missingEnv.length === 0
            ? "all set"
            : `missing: ${missingEnv.join(", ")}`,
        timestamp: new Date(),
      });
    }
    return res.status(200).json({
      success: true,
      message: "API is healthy",
      uptime: process.uptime(),
      timestamp: new Date(),
      database: dbStatus,
      envStatus:
        missingEnv.length === 0
          ? "all set"
          : `missing: ${missingEnv.join(", ")}`,
      system: {
        memory: {
          rss: memoryUsage.rss,
          heapUsed: memoryUsage.heapUsed,
          heapTotal: memoryUsage.heapTotal,
        },
        cpuLoad: {
          "1min": cpuLoad[0],
          "5min": cpuLoad[1],
          "15min": cpuLoad[2],
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Health check failed",
      error: error.message,
    });
  }
};

export { healthCheck };
