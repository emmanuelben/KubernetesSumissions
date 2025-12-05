const crypto = require('crypto');
const fs = require('fs');

const LOG_FILE = '/usr/src/app/files/log.txt';
const FILES_DIR = '/usr/src/app/files';

// Ensure files directory exists
if (!fs.existsSync(FILES_DIR)) {
    fs.mkdirSync(FILES_DIR, { recursive: true });
}

// Generate a random UUID on startup
const storedString = crypto.randomUUID();

// Function to write log to file
const writeLog = () => {
    const timestamp = new Date().toISOString();
    const logLine = `${timestamp}: ${storedString}\n`;
    fs.appendFileSync(LOG_FILE, logLine);
    console.log(`Written: ${timestamp}: ${storedString}`);
};

// Write immediately on startup
writeLog();

// Write every 5 seconds
setInterval(writeLog, 5000);