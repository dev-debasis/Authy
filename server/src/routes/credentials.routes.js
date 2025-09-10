import { Router } from "express";
import { clerkAuth } from "../middlewares/auth.middleware.js";
import {
  createCredential,
  deleteCredential,
  getAllCredentials,
  getCredential,
  updateCredential,
} from "../controller/credentials.controller.js";

const router = Router();

router.route("/").post(clerkAuth, createCredential);
router.route("/").get(clerkAuth, getAllCredentials);
router.route("/:id").get(clerkAuth, getCredential);
router.route("/:id").patch(clerkAuth, updateCredential);
router.route("/:id").delete(clerkAuth, deleteCredential);

export default router;
