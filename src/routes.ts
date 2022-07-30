import { Router } from "express";

import PharmacyController from "./controllers/PharmacyController";

const router = Router();

// Public
router.get("/", (req, res) => {
	res.status(200).json({});
});

// Private
router.post("/register/pharmacy", PharmacyController.create);

export default router;
