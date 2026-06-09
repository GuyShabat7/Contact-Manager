
const { validate } = require("../utils/validation.js");
const { processCommand } = require("../commands/commandHandler.js");

function executeCommand(command, args) {
  let cmdValidity = validate(command, args);

  if (cmdValidity.status === true) {
    cmdValidity= processCommand(command, args);
  }
  return cmdValidity;
}

module.exports = { executeCommand };

