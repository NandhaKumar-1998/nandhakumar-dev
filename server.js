import koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import MongoClient from 'mongodb';
import User from './User.js';
import cors from '@koa/cors';
import jwt from 'jsonwebtoken';
import authMiddleware from './authMiddleware.js';
import Item from './models/Item.js';
dotenv.config();
const app = new koa();
const router = new Router();
const db = new MongoClient.MongoClient(process.env.MONGO_URI);
// const  Item = require('./models/Item');
app.use(bodyParser());
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

router.get('/', async (ctx) => {
    ctx.body = { message: 'Hello from Koa backend!' };
});

router.post('/signup', async (ctx) => {
    try {
        const { name, email, password } = ctx.request.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            ctx.status = 400;
            ctx.body = { message: 'User already exists' };
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        ctx.status = 201;
        ctx.body = { message: 'User created successfully' };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { message: error.message };
    }
});

router.post('/login', async (ctx) => {
    try {
        const { email, password } = ctx.request.body;
        const user = await User.findOne({ email });
        if (!user) {
            ctx.status = 400;
            ctx.body = { message: 'User not found' };
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            ctx.status = 401;
            ctx.body = { message: 'Invalid credentials' };
            return;
        }
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        ctx.status = 200;
        ctx.body = { message: 'Login successful', token };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { message: error.message };
    }
});

router.get('/protected', authMiddleware, async (ctx) => {
    try {
        const users = await User.find();
        ctx.body = { users };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { message: 'Error getting users' };
    }
});

router.post('/items', authMiddleware, async (ctx) => {
    try {
        const { name, description } = ctx.request.body;
        const userId = ctx.state.user.userId;
        const newItem = new Item({ name, description, userId });
        await newItem.save();
        ctx.body = { message: 'Item created successfully', item: newItem };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { message: 'Error creating item', error: error.message };
    }
});

router.get('/items', authMiddleware, async (ctx) => {
    try {
        const { name, id } = ctx.query;
        let query = {};
        if (id) {
            if (mongoose.Types.ObjectId.isValid(id)) {
                ctx.status = 400;
                ctx.body = { message: 'Invalid id' };
                return;
            }
            query._id = id;
        }
        if (name) {
            query.name = new RegExp(`^${name}$`, "i");
        }
        const items = await User.find(query);
        if (items.length === 0) {
            ctx.status = 404;
            ctx.body = { message: 'No items found' }
            return;
        }
        ctx.body = { items };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { message: 'Error fetching items', error: error.message };
    }
});

router.put('/items/:id', authMiddleware, async (ctx) => {
    try {
        // const existingItem = await Item.findById(itemId);
        const { name } = ctx.request.body;
        // const itemId = new mongoose.Types.ObjectId(ctx.params.id);
        const itemId = ctx.params.id;
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            ctx.status = 400;
            ctx.body = { message: 'Invalid item id' };
            return;
        }
        if (!name) {
            ctx.status = 400;
            ctx.body = { message: 'Name is required' };
            return;
        }
        const updatedItem = await User.findByIdAndUpdate(
            itemId,
            { $set: { name } },
            { new: true, runValidators: true }
        );
        if (!updatedItem) {
            ctx.status = 404;
            ctx.body = { message: 'Item not found' };
            return;
        }
        ctx.body = { message: 'Item updated successfully', user: updatedItem };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { message: 'Error updating item', error: error.message };
    }
});


router.delete("/items/:id", authMiddleware, async (ctx) => {
    try {
      const userId = ctx.params.id;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        ctx.status = 400;
        ctx.body = { message: "Invalid user ID" };
        return;
      }
      const userExists = await User.findById(userId);
    console.log("User found before delete:", userExists);
    if (!userExists){
        ctx.status = 404;
        ctx.body = {message: "User not found"};
        return;
    }
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        ctx.status = 404;
        ctx.body = { message: "User not found" };
        return;
      }
      ctx.status = 200;
      ctx.body = { message: "User deleted successfully", user: deletedUser };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "Error deleting user", error: error.message };
    }
  });

app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

mongoose.connect(MONGO_URI).then(() => {
    console.log(' Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error(' MongoDB connection error:', err);
});