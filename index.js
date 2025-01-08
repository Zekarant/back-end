const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Assurez-vous que cette ligne est présente

// Import de la connexion à la base de données
const connectDB = require('./db');

// Import des modèles
const Message = require('./models/message');

// Initialisation de l'application
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "https://coruscating-taiyaki-a097d7.netlify.app/", // Remplacez par l'URL de votre frontend
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true
    }
});

// Middlewares globaux
app.use(cors({
    origin: "https://coruscating-taiyaki-a097d7.netlify.app/", // Remplacez par l'URL de votre frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
app.use(bodyParser.json());

// Connexion à la base de données
connectDB();

// Import et utilisation des routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const pronosticsRoutes = require('./routes/pronostics');
const cyclistRoutes = require('./routes/cyclists');
const rankingRoutes = require('./routes/ranking');
const leagueRoutes = require('./routes/leagues');
const messageRoutes = require('./routes/messages');
const adminRoutes = require('./routes/admin');

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/pronostics', pronosticsRoutes);
app.use('/api/cyclists', cyclistRoutes);
app.use('/api/ranking', rankingRoutes);
app.use('/api/leagues', leagueRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/admin', adminRoutes);

// Socket.io configuration
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinLeague', (leagueId) => {
        socket.join(leagueId);
    });

    socket.on('sendMessage', async (message) => {
        const newMessage = new Message(message);
        await newMessage.save();
        io.to(message.leagueId).emit('receiveMessage', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Lancement du serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});