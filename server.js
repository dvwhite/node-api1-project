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

// Add user
server.post("/api/users", (req, res) => {
  const actualFields = Object.keys(req.body);
  const required = ['id', 'name', 'bio'];
  const missingFields = utils.validateHasFields(required, actualFields); // check for missing fields, if any
  // If there are missing fields, alert the user and send back a 400 code
  if (missingFields.length > 0) {
    const missingString = utils.formatFieldString(missingFields);
    res
      .status(400)
      .json({
        errorMessage: "Please provide the " + missingString + " for the user"
      });
  } else {
    // Attempt to save the data
    try {
      data.users.push(req.body); // Add to the data object in this project
      res.status(201).json(req.body); // Let user know success by sending back the object added
    } catch (err) {
      // If the save attempt fails, alert the user
      res
        .status(500)
        .json({
          errorMessage:
            "There was an error while saving the user to the database"
        }); // notify user of the unexpected failure to save
    }
  }
});

// Get all users
server.get("/api/users", (req, res) => {
  try {
    res.status(200).json(data.users);
  } catch (err) {
    res
      .status(500)
      .json({
        errorMessage: "The users information could not be retrieved."
      });
  }
});
// Listen to port
server.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
