const http = require('http');
const fs = require('fs');

const LOG_FILE = '/usr/src/app/files/log.txt';

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        if (fs.existsSync(LOG_FILE)) {
            const content = fs.readFileSync(LOG_FILE, 'utf8');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(content);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Log file not found');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Log reader server started on port ${PORT}`);
});