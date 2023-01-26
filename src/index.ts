import "dotenv/config";
import express from "express";
import cors from "cors";

import "./database";
import router from "./routes";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(
	cors({
		origin: [
			`${process.env.FRONTEND_WWW_BASE_URL}`,
			`${process.env.FRONTEND_ADMIN_BASE_URL}`,
		],
	})
);
app.use(router);

app.listen(port, () => console.log(`Server is running on port ${port}.`));
