const { readJSON, writeJSON } = require("../utils/fileUtils.js");

function processCommand(command, args) {
  const readResult = readJSON();
  let contacts = [];

  if (readResult.status === true) {
    contacts = readResult.data;
  }

  switch (command) {
    case "add": {
      const duplicate = contacts.find(
        (contact) =>
          contact.email === args[1] || contact.phone === args[2]
      );

      if (duplicate) {
        const field = duplicate.email === args[1] ? "email" : "phone";
        return { status: false, err: `Error: Contact with this ${field} already exists`, message: "" };
      }

      contacts.push({ name: args[0], email: args[1], phone: args[2] });
      const writeResult = writeJSON(contacts);

      if (writeResult.status === false) {
        return { status: false, err: writeResult.err, message: "" };
      }
      return { status: true, err: "", message: "" };
    }

    case "delete": {
      const identifier = args[0];
      const deleted = contacts.find(
        (contact) =>
          contact.name === identifier ||
          contact.email === identifier ||
          contact.phone === identifier
      );

      if (!deleted) {
        const type = identifier.includes("@")
          ? "email"
          : /^[\d\s\-()+]+$/.test(identifier)
          ? "phone"
          : "name";
        return { status: false, err: `Error: No contact found with ${type}: ${identifier}`, message: "" };
      }

      contacts = contacts.filter((contact) => contact !== deleted);
      const writeResult = writeJSON(contacts);

      if (writeResult.status === false) {
        return { status: false, err: writeResult.err, message: "" };
      }
      return { status: true, err: "", message: `Contact deleted: ${deleted.name}` };
    }

    case "list": {
      const lines = ["=== All Contacts ==="];
      contacts.forEach((contact, index) => {
        lines.push(`${index + 1}. ${contact.name} - ${contact.email} - ${contact.phone}`);
      });
      return { status: true, err: "", message: lines.join("\n") };
    }

    case "search": {
      const query = args[0];
      const results = contacts.filter(
        (contact) =>
          contact.name.includes(query) ||
          contact.email.includes(query) ||
          contact.phone.includes(query)
      );
      const lines = [`=== Search Results for "${query}" ===`];
      if (results.length === 0) {
        lines.push(`No contacts found matching "${query}"`);
      } else {
        results.forEach((contact, index) => {
          lines.push(`${index + 1}. ${contact.name} - ${contact.email} - ${contact.phone}`);
        });
      }
      return { status: true, err: "", message: lines.join("\n") };
    }

    case "help": {
      const lines = [
        "Commands:",
        '  add "name" "email" "phone"  - Add a new contact',
        "  list                        - List all contacts",
        '  search "query"              - Search contacts by name or email',
        '  delete "email"              - Delete contact by email',
        "  help                        - Show this help message",
        "",
        "Examples:",
        '  node contacts.js add "John Doe" "john@example.com" "555-123-4567"',
        '  node contacts.js search "john"',
        '  node contacts.js delete "john@example.com"',
      ];
      return { status: true, err: "", message: lines.join("\n") };
    }

    default:
      return { status: true, err: "", message: "" };
  }
}

module.exports = { processCommand };
