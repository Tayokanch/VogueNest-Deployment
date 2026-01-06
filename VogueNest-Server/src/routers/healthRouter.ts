import express from "express";

import { healthCheckController } from "../healthCheck/healthCheck";

const router = express.Router()

router.get("/health", healthCheckController);

export default router;
