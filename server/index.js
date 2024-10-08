import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import chatRoutes from "./routes/chat.js";
import messageRoutes from './routes/message.js';
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import { Server } from "socket.io";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors({
    origin: process.env.CLIENT_URL,  
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true, 
  }));
app.options('*', cors()); 

app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
const server = app.listen(PORT, () => console.log(`Server Port: ${PORT}`));




mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(`MongoDB connected`);
        /* ADD DATA ONE TIME */
        /*  User.insertMany(users);
         Post.insertMany(posts); */

        // Now create the Socket.IO server using the same server instance
        const io = new Server(server, {
            cors: {
                origin: process.env.CLIENT_URL,
                methods: ["GET", "POST","PUT"],  // Specify allowed methods if needed
                credentials: true, 
            },
        });

        io.on("connection", (socket) => {
            console.log("Connected to socket.io");
            socket.on("setup", (id) => {
                console.log("room is "+id);
                socket.join(id);
                socket.emit("connected");
            });
            socket.on("join chat", (room) => {
                socket.join(room);
            });
            socket.on("typing", (room) => {
                console.log("Typing in Server"+room);
                socket.in(room).emit("userTyping")
            });
            socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));


            socket.on("new message", (newMessageRecieved) => {
                var chat = newMessageRecieved.chat;
                console.log("newmessageREcieved",newMessageRecieved);
                if (!chat.users) return console.log("chat.users not defined");

                newMessageRecieved.chat.users.forEach((user) => {
                    console.log("new message recieved emit");
                    if (user._id !== newMessageRecieved.sender._id) {
                        socket.in(user._id).emit("messagereceived", newMessageRecieved);
                    }
                });
            });
        });

    })
    .catch((error) => console.log(`${error} did not connect`));


