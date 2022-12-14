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
router.get("/pharmacy/:id", PharmacyController.search);

// Duty
router.get("/duties", DutyController.read);
router.get("/duty/:date", DutyController.search);

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
router.post("/register/pharmacy", PharmacyController.create);
router.patch("/update/pharmacy/:id", PharmacyController.update);
router.delete("/delete/pharmacy/:id", PharmacyController.delete);

// Duty
router.post("/register/duty", DutyController.create);
router.patch("/update/duty/:id", DutyController.update);
router.delete("/delete/duty/:id", DutyController.delete);

export default router;
