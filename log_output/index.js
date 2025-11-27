const crypto = require('crypto');
const http = require('http');

// Explicit memory storage
const memory = {
    storedString: null
};

// Generate a random UUID on startup and store it in memory
memory.storedString = crypto.randomUUID();

// Function to log the string with timestamp
const logString = () => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}: ${memory.storedString}`);
};

// HTTP server to serve current status
const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        const timestamp = new Date().toISOString();
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`${timestamp}: ${memory.storedString}`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// Log immediately on startup
logString();

// Log every 5 seconds
setInterval(logString, 5000);
