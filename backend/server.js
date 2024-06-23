import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth_routes.js";
import conectMongoDB from "./database/conectToMoongoDB.js";
import messageRoutes from "./routes/message_routes.js";
import usersRoutes from "./routes/user_routes.js";

const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", usersRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello" });
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
  conectMongoDB();
});
