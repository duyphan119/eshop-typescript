import express from "express";
import cors from "cors";
import routes from "./routes";
import cookieParser from "cookie-parser";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();
if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(
	cors({
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		origin: true,
		credentials: true,
	})
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../")));
app.use(routes);

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
