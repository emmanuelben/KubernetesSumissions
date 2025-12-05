const http = require('http');
const fs = require('fs');

const LOG_FILE = '/usr/src/app/files/log.txt';
const COUNT_FILE = '/usr/src/app/files/count.txt';

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        let content = '';
        
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
        
        // Combine latest entry with ping-pong count
        const response = `${latestEntry}.\nPing / Pongs: ${count}`;
        
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(response);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Log reader server started on port ${PORT}`);
});