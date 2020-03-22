// Create and configure the server
const express = require("express");
const server = express();
const cors = require("cors");
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
};

// Request handling, utils
const utils = require("./utils/utils");

// Add user
server.post("/api/users", (req, res) => {
  // Check for missing fields, if any
  const actualFields = Object.keys(req.body);
  const required = ["id", "name", "bio"];
  const missingFields = utils.validateHasFields(required, actualFields); 
  // If there are missing fields, alert the user and send back a 400 code
  if (missingFields.length > 0) {
    const missingString = utils.formatFieldString(missingFields);
    res.status(400).json({
      errorMessage: "Please provide the " + missingString + " for the user"
    });
    return;
  } 
  
  // Attempt to save the data
  try {
    data.users.push(req.body); // Add to the data object in this project
    res.status(201).json(req.body); // Let user know success
  } catch (err) {
    // If the save attempt fails, alert the user
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database"
    }); // notify user of the unexpected failure to save
  }
});

// Get all users
server.get("/api/users", (req, res) => {
  try {
    res.status(200).json(data.users);
  } catch (err) {
    res.status(500).json({
      errorMessage: "The users information could not be retrieved."
    });
  }
});

// Get one user
server.get("/api/users/:id", (req, res) => {
  // Check if the user with the specified is found, and if not, send back a 404
  const user = data.users.find(
    item => String(item.id) === String(req.params.id)
  );
  if (user) {
    // Notify user if there's an error in retrieving the user from the database
    try {
      res.status(200).json(user);
    } catch (err) {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    }
  } else {
    res
    .status(404)
    .json({ message: "The user with the specified ID does not exist." });
  }
});

// Delete user
server.delete("/api/users/:id", (req, res) => {
  // Check if the user with the specified is found, and if not, send back a 404
  const user = data.users.find(
    item => String(item.id) === String(req.params.id)
  );
  if (user) {
    // Notify user if there's an error in retrieving the user from the database
    try {
      data.users = data.users.filter(
        item => String(item.id) !== String(req.params.id)
      );
      res.status(200).json(data.users);
    } catch (err) {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    }
  } else {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
});

// Update a single user
server.put("/api/users/:id", (req, res) => {
  // Check for missing fields, if any
  const actualFields = Object.keys(req.body);
  const required = ["name", "bio"];
  const missingFields = utils.validateHasFields(required, actualFields);
  // If there are missing fields, alert the user and send back a 400 code
  if (missingFields.length > 0) {
    const missingString = utils.formatFieldString(missingFields);
    res.status(400).json({
      errorMessage: "Please provide " + missingString + " for the user"
    });
    return;
  }

  // Check if the user with the specified is found, and if not, send back a 404
  const user = data.users.find(
    item => String(item.id) === String(req.params.id)
  );
  if (user) {
    // Notify user if there's an error in retrieving the user from the database
    try {
      data.users = [
        ...data.users.filter(user => String(user.id) !== String(req.params.id)),
        req.body
      ];
      res.status(200).json(data.users);
    } catch (err) {
      res.status(500).json({
        errorMessage: "The user information could not be retrieved."
      });
    }
  } else {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
});

// Listen to port
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
