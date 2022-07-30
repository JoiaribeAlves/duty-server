import "dotenv/config";
import express from "express";
import cors from "cors";

import "./database";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.status(200).json({ msg: "Hello world" });
});

app.listen(port, () => console.log(`Server is running on port: ${port}`));
