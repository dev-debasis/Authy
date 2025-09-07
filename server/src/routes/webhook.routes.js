import { Router } from "express";
import express from "express";
import { clerkWebhook } from "../controller/webhook.controller.js";

const router = Router();

router.post(
    "/clerk", 
    express.raw({ type: "application/json" }), 
    clerkWebhook
);

export default router;
