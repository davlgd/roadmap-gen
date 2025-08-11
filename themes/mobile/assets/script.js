// Mobile Theme - Loads shared script
// Import shared functionality to avoid code duplication

// Load shared script first
const sharedScript = document.createElement('script');
sharedScript.src = '../shared/script.js';
document.head.appendChild(sharedScript);
