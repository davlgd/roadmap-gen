// Cards Theme - Loads shared script with theme-specific extensions
// Import shared functionality to avoid code duplication

// Load shared script first
const sharedScript = document.createElement('script');
sharedScript.src = '../shared/script.js';
document.head.appendChild(sharedScript);

// Cards-specific enhancements can be added here if needed
// Currently, all functionality is shared across themes
