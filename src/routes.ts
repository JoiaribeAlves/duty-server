import { Router } from "express";

import PharmacyController from "./controllers/PharmacyController";

const router = Router();

// Public
router.get("/", (req, res) => {
	res.status(200).json({});
});

router.get("/pharmacies", PharmacyController.read);
router.get("/pharmacy/:id", PharmacyController.search);

// Private
router.post("/register/pharmacy", PharmacyController.create);
router.patch("/update/pharmacy/:id", PharmacyController.update);
router.delete("/delete/pharmacy/:id", PharmacyController.delete);

export default router;
