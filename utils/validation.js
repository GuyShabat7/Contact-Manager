function validationError(message, field) {
  const error = new Error(message);
  error.name = "validationError";
  error.field = field;
  return error;
}

function validateArguments(command, inputs) {
  const validCommands = ["add", "delete", "list", "search", "help"];

  if (!command) {
    throw validationError("No command provided.", "command");
  }

  if (!validCommands.includes(command)) {
    throw validationError(
      `Unknown command '${command}'\nUsage: node contacts.js [add|list|search|delete|help] [arguments]`,
      "command"
    );
  }

  if (command === "add" && inputs.length !== 3) {
    throw validationError(
      'Missing arguments for add command\nUsage: node contacts.js add "name" "email" "phone"',
      "arguments"
    );
  }

  if (command === "delete" && inputs.length !== 1) {
    throw validationError("Missing arguments for delete command", "arguments");
  }

  if (command === "search" && inputs.length !== 1) {
    throw validationError(
      'Missing arguments for search command\nUsage: node contacts.js search "query"',
      "arguments"
    );
  }
}

function validateEmail(email) {
  if (!email || !email.includes("@")) {
    throw validationError("Email must contain @ symbol", "email");
  }

  const parts = email.split("@");

  if (parts.length != 2 || parts[0].trim() === "" || parts[1].trim() === "") {
    throw validationError(
      "Email must have text before and after the @ symbol",
      "email"
    );
  }
}

function validatePhone(phone) {
  if (!phone || phone.trim() === "") {
    throw validationError("Phone cannot be empty", "phone");
  }
}

function validateName(name) {
  if (!name || name.trim() === "") {
    throw validationError("Name cannot be empty", "name");
  }
}

function validateContact(name, email, phone) {
  validateName(name);
  validateEmail(email);
  validatePhone(phone);
}

function validate(command, args) {
  try {
    validateArguments(command, args);

    if (command === "add") {
      validateContact(args[0], args[1], args[2]);
    }

    return { status: true, err: "" };
  } catch (error) {
    return { status: false, err: error.message };
  }
}

module.exports = { validate };
