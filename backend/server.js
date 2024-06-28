import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth_routes.js";
import conectMongoDB from "./database/conectToMoongoDB.js";
import messageRoutes from "./routes/message_routes.js";
import usersRoutes from "./routes/user_routes.js";
import { app, server } from "./socket/socket.js";


const __dirname = path.resolve();
const PORT = process.env.PORT || 8000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", usersRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
	conectMongoDB();
	console.log(`Server Running on port ${PORT}`);
});