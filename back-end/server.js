import express, { urlencoded } from "express";
import cors from "cors";
import "dotenv/config";
import appRoutes from "./routes/apiRoutes.js";
import cookieParser from "cookie-parser";
import connectDb from "./config/mongodb.js";
import morgan from "morgan";

const PORT = process.env.PORT || 5000;
connectDb();

const app = express();

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

app.use(morgan("dev"));
app.use(express.json({ limit: "150mb" }));
app.use(express.urlencoded({ limit: "150mb", extended: true }));
app.use(cookieParser());
app.use("/api", appRoutes);

app.get("/", (req, res) => {
	res.json({ message: "Servor is running" });
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});