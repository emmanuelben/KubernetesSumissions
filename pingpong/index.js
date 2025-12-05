const http = require('http');

// In-memory counter
let counter = 0;

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && (req.url === '/' || req.url === '/pingpong')) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`pong ${counter}`);
        counter++;
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Pingpong server started on port ${PORT}`);
});