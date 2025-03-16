const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const stream = require('./ws/stream');
const path = require('path');
const favicon = require('serve-favicon');
const cors = require('cors');
const compression = require('compression');

// Production optimizations
app.use(compression()); // Compress all responses
app.use(cors()); // Enable CORS for all requests

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// Static files
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Main route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Socket.IO configuration
io.of('/stream').on('connection', stream);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});