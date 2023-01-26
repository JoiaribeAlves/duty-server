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
		origin: "*",
		methods: ["GET", "POST", "PATCH", "DELETE"],
	})
);
app.use(router);

app.listen(port, () => console.log(`Server is running on port ${port}.`));
