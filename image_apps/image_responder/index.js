const http = require('http');
const fs = require('fs');

const IMAGE_PATH = '/usr/src/app/files/image.jpg';

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (fs.existsSync(IMAGE_PATH)) {
            const image = fs.readFileSync(IMAGE_PATH);
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(image);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Image not found');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Image responder started on port ${PORT}`);
});