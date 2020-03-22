// Create and configure the server
const express = require('express');
const server = express();
const cors = require('cors');
server.use(express.json());
server.use(cors()); // For the stretch
const port = 5000;

// Initial data state
const data = {
  users: [
    {
      id: "1", // hint: use the shortid npm package to generate it
      name: "Jane Doe", // String, required
      bio: "Not Tarzan's Wife, another Jane" // String, required
    }
  ]
}

// Request handling, utils
const reqHandler = require('./serverRequests.js');
const utils = require("./utils/utils");

// Listen to port
server.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
