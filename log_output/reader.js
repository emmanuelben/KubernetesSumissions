const http = require('http');
const fs = require('fs');

const LOG_FILE = '/usr/src/app/files/log.txt';
const COUNT_FILE = '/usr/src/app/files/count.txt';
const IMAGE_FILE = '/usr/src/app/files/current_image.jpg';
const TIMESTAMP_FILE = '/usr/src/app/files/image_timestamp.txt';

const downloadImage = async () => {
    try {
        const response = await fetch('https://picsum.photos/1200');
        const buffer = await response.arrayBuffer();
        fs.writeFileSync(IMAGE_FILE, Buffer.from(buffer));
        fs.writeFileSync(TIMESTAMP_FILE, Date.now().toString());
        console.log('New image downloaded');
    } catch (error) {
        console.error('Error downloading image:', error);
    }
};

const shouldUpdateImage = () => {
    if (!fs.existsSync(IMAGE_FILE) || !fs.existsSync(TIMESTAMP_FILE)) {
        return true;
    }
    const timestamp = parseInt(fs.readFileSync(TIMESTAMP_FILE, 'utf8'));
    const tenMinutes = 10 * 60 * 1000;
    return (Date.now() - timestamp) > tenMinutes;
};

const server = http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Check if image needs updating
        if (shouldUpdateImage()) {
            await downloadImage();
        }
        
        // Read latest log entry
        let latestEntry = '';
        if (fs.existsSync(LOG_FILE)) {
            const logContent = fs.readFileSync(LOG_FILE, 'utf8');
            const lines = logContent.trim().split('\n');
            latestEntry = lines[lines.length - 1] || '';
        }
        
        // Read ping-pong count
        let count = 0;
        if (fs.existsSync(COUNT_FILE)) {
            try {
                count = parseInt(fs.readFileSync(COUNT_FILE, 'utf8')) || 0;
            } catch (error) {
                count = 0;
            }
        }
        
        // Read image and convert to base64
        let imageBase64 = '';
        if (fs.existsSync(IMAGE_FILE)) {
            const imageBuffer = fs.readFileSync(IMAGE_FILE);
            imageBase64 = imageBuffer.toString('base64');
        }
        
        // Create HTML response
        const html = `
        <!DOCTYPE html>
        <html>
        <head><title>Log Output with Image</title></head>
        <body>
            ${imageBase64 ? `<img src="data:image/jpeg;base64,${imageBase64}" style="max-width: 600px;">` : ''}
            <p>${latestEntry}.</p>
            <p>Ping / Pongs: ${count}</p>
        </body>
        </html>
        `;
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Log reader server started on port ${PORT}`);
});