const http = require('http');
const fs = require('fs');
const path = require('path');

const IMAGE_PATH = '/usr/src/app/files/image.jpg';
const FILES_DIR = '/usr/src/app/files';

// Ensure files directory exists
if (!fs.existsSync(FILES_DIR)) {
    fs.mkdirSync(FILES_DIR, { recursive: true });
}

const downloadRandomImage = async () => {
    try {
        const response = await fetch('https://picsum.photos/1200');
        const buffer = await response.arrayBuffer();
        fs.writeFileSync(IMAGE_PATH, Buffer.from(buffer));
        console.log('New image downloaded and saved');
    } catch (error) {
        console.error('Error downloading image:', error);
    }
};

const server = http.createServer(async (req, res) => {
    if (req.method === 'GET') {
        if (!fs.existsSync(IMAGE_PATH)) {
            await downloadRandomImage();
        } else {
            await downloadRandomImage(); // Always download new image on request
        }
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Image generated/updated');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Image finder started on port ${PORT}`);
});