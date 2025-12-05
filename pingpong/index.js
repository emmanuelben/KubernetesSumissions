const http = require('http');
const fs = require('fs');

const COUNT_FILE = '/usr/src/app/files/count.txt';
const FILES_DIR = '/usr/src/app/files';

// Ensure files directory exists
if (!fs.existsSync(FILES_DIR)) {
    fs.mkdirSync(FILES_DIR, { recursive: true });
}

// Read counter from file or start at 0
let counter = 0;
if (fs.existsSync(COUNT_FILE)) {
    try {
        counter = parseInt(fs.readFileSync(COUNT_FILE, 'utf8')) || 0;
    } catch (error) {
        counter = 0;
    }
}

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && (req.url === '/' || req.url === '/pingpong')) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`pong ${counter}`);
        counter++;
        // Save counter to file
        fs.writeFileSync(COUNT_FILE, counter.toString());
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Pingpong server started on port ${PORT}`);
});