require('dotenv').config();

const express = require('express');
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // your frontend origin
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3001, () => {
  console.log("Socket.IO server listening on port 3001");
});

app.use(cors()); // ✅ Enable CORS
app.use(express.json());


// Middleware
app.use(express.json());
//app.use(express.urlencoded({ extended: true })); // handles urlencoded forms just in case

// Route file
const authRoutes = require('./routes/auth.routes');
app.use('/api/', authRoutes); // instead of /api


console.log('MONGODB_URI:', process.env.MONGODB_URI);


// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(3001, () => console.log('Server running on port 3001'));
  });
