import "dotenv/config";
import express from "express";
import cors, { CorsOptions } from "cors";

import "./database";
import router from "./routes";

const app = express();
const port = process.env.PORT || 4000;

const whiteList = [
	"https://www.plantaodefarmacia.com.br",
	"https://api.plantaodefarmacia.com.br",
	"https://admin.plantaodefarmacia.com.br",
];

const corsOptions: CorsOptions = {
	origin: (origin, callback) => {
		if (whiteList.indexOf(origin!) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Invalid origin."));
		}
	},
	methods: ["GET", "POST", "PATCH", "DELETE"],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(router);

app.listen(port, () => console.log(`Server is running on port ${port}.`));
