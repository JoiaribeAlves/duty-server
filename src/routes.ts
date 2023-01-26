import { Router } from "express";

import auth from "./middlewares/auth";
import PharmacyController from "./controllers/PharmacyController";
import DutyController from "./controllers/DutyController";
import SessionController from "./controllers/SessionController";
import UserController from "./controllers/UserController";

const router = Router();

/* Public Routes */
// Index
router.get("/", (req, res) => {
	res.status(200).json({ message: "OK!" });
});

// Pharmacy
router.get("/pharmacies", PharmacyController.read);
router.get("/pharmacies/:id", PharmacyController.search);

// Duty
router.get("/duties", DutyController.read);
router.get("/duties/date/:date", DutyController.searchByDate);
router.get("/duties/id/:id", DutyController.searchById);

// Session
router.post("/session", SessionController.index);

/* Private Routes */
router.use(auth);

// User
router.post("/register/user", UserController.create);
router.get("/users", UserController.read);
router.patch("/update/user/:id", UserController.update);
router.delete("/delete/user/:id", UserController.delete);

// Pharmacy
router.post("/pharmacies/register", PharmacyController.create);
router.patch("/pharmacies/update/:id", PharmacyController.update);
router.delete("/pharmacies/delete/:id", PharmacyController.delete);

// Duty
router.post("/duties/register", DutyController.create);
router.patch("/duties/update/:id", DutyController.update);
router.delete("/duties/delete/:id", DutyController.delete);

export default router;
