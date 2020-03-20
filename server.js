// Create and configure the server
const express = require('express');
const server = express.server();
server.use(express.json());
server.use(cors()); // For the stretch
const port = 5000;

// Request handlers
server.get('/')

// Listen to port
server.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
