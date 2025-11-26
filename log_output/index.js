const crypto = require('crypto');

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

// Log immediately on startup
logString();

// Log every 5 seconds
setInterval(logString, 5000);
