import express, { urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import appRoutes from "./routes/apiRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", appRoutes);

mongoose
	.connect("mongodb://localhost:27017/active-edge")
	.then(() => console.log("Connected to MongoDB!"))
	.catch((err) => console.error("Error connecting to MongoDB:", err));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
