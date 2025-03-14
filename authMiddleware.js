import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "./User.js";
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;
const authMiddleware = async (ctx, next) => {
    const authHeader = ctx.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        ctx.status = 401;
        ctx.body = { message: "Token is required" };
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        ctx.state.user = decoded;
        await next();
    } catch (error) {
        console.error("JWT Error:", error.message);
        ctx.status = 401;
        ctx.body = { message: "Invalid or expired token" };
    }
};
export default authMiddleware;
