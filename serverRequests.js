const data = require("./data");
const utils = require("./utils/utils");

/**
 * @function addUser: Process a POST request to /api/users to add a user to the API's data
 * @param {*} server: The express server executing requests
 * @returns: none
 */
const addUser = server => {
  server.post("/api/users", (req, res) => {
    const actualFields = Object.keys(req.body);
    const missingFields = utils.validateHasFields(actualFields); // check for missing fields, if any
    // If there are missing fields, alert the user and send back a 400 code
    if (missingFields.length > 0) {
      const missingString = utils.formatFieldString(missingFields);
      req
        .status(400)
        .json({
          errorMessage: "Please provide " + missingString + " for the user"
        });
    }
    // Attempt to save the data
    try {
      data.push(req.body); // Add to the data object in this project
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
  });
};

/**
 * @function getUsers: Process a GET request to /api/users
 * @param {*} server: The express server executing requests
 * @returns: none
 */
const getUsers = server => {
  return server.get("/users", (req, res) => {
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
};

/**
 * @function getUsers: Process a GET request to /api/users for a specific id
 * @param {*} server: The express server executing requests
 * @returns: none
 */
const getUser = server => {
  server.get('/api/users/:id', (req, res) => {
    // Check if the user with the specified is found, and if not, send back a 404
    const user = users.find(user => user.id === req.body.id);
    if (!user) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }

    // Notify user if there's an error in retrieving the user from the database
    try {
      res.status(200).json(user);
    } catch (err) {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    }
  });
};

/**
 * @function deleteUser: Process a DELETE request to /api/users
 * @param {*} server: The express server executing requests
 * @returns: none
 */
const deleteUser = server => {
  server.delete('/api/users', (req, res) => {
    // Check if the user with the specified is found, and if not, send back a 404
    const user = users.find(user => user.id === req.body.id);
    if (!user) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }

    // Notify user if there's an error in retrieving the user from the database
    try {
      users = users.filter(user => user.id !== req.body.id);
      res.status(200).json(users);
    } catch (err) {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    }
  });
};

/**
 * @function updateUser: Process a PUT request to /api/users to edit one user
 * @param {*} server: The express server executing requests
 * @returns: none
 */
const updateUser = server => {
  server.put('/api/users/:id', (req, res) => {
    // Check if the user with the specified is found, and if not, send back a 404
    const user = users.find(user => user.id === req.body.id);
    if (!user) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }

    const actualFields = Object.keys(req.body);
    const missingFields = utils.validateHasFields(actualFields); // check for missing fields, if any
    // If there are missing fields, alert the user and send back a 400 code
    if (missingFields.length > 0) {
      const missingString = utils.formatFieldString(missingFields);
      req
        .status(400)
        .json({
          errorMessage: "Please provide " + missingString + " for the user"
        });
    }

    // Notify user if there's an error in retrieving the user from the database
    try {
      users = [...users.filter(user => user.id !== req.body.id), req.body];
      res.status(200).json(users);
    } catch (err) {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    }
  });
};

module.exports = { addUser, getUsers, getUser, deleteUser, updateUser };
