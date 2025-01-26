const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const http = require('http');
const initializeSocket = require('./socket');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const app = express();
const server = http.createServer(app);

// الاتصال بقاعدة البيانات
connectDB();

// Middleware
app.use(express.json());

app.use(helmet());
app.use(cors());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// تهيئة WebSocket
initializeSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});