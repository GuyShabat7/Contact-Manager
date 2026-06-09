import { readJSON, writeJSON } from "../utils/fileUtils.js";

export const processCommand = function(command, args) {
    const readResult = readJSON();
    let contacts = [];

    if (readResult.status === true) {
        contacts = readResult.data;
    }

    switch (command) {
        case 'add': {
            const duplicate = contacts.find(contact =>
                contact.email === args[1] || contact.phone === args[2]
            );

            if (duplicate) {
                const field = duplicate.email === args[1] ? 'email' : 'phone';
                console.log(`Error: Contact with this ${field} already exists`);
                return { status: false, err: "" };
            }

            contacts.push({ name: args[0], email: args[1], phone: args[2] });
            const writeResult = writeJSON(contacts);

            if (writeResult.status === false) {
                return { status: false, err: writeResult.err };
            }
            return { status: true, err: "" };
        }
            
        case 'delete': {
            const identifier = args[0];
            const deleted = contacts.find(contact =>
                contact.name === identifier ||
                contact.email === identifier ||
                contact.phone === identifier
            );

            if (!deleted) {
                const type = identifier.includes('@') ? 'email' : /^[\d\s\-()+]+$/.test(identifier) ? 'phone' : 'name';
                console.log(`Error: No contact found with ${type}: ${identifier}`);
                return { status: false, err: "" };
            }

            contacts = contacts.filter(contact => contact !== deleted);
            const writeResult = writeJSON(contacts);

            if (writeResult.status === false) {
                return { status: false, err: writeResult.err };
            }
            console.log(`Contact deleted: ${deleted.name}`);
            return { status: true, err: "" };
        }
            
        case 'list': {
            console.log("=== All Contacts ===");
            contacts.forEach((contact, index) => {
                console.log(`${index + 1}. ${contact.name} - ${contact.email} - ${contact.phone}`);
            });
            return { status: true, err: "" };
        }
            
        case 'search': {
            const query = args[0];
            const results = contacts.filter(contact =>
                contact.name.includes(query) ||
                contact.email.includes(query) ||
                contact.phone.includes(query)
            );
            console.log(`=== Search Results for "${query}" ===`);
            if (results.length === 0) {
                console.log(`No contacts found matching "${query}"`);
            } else {
                results.forEach((contact, index) => {
                    console.log(`${index + 1}. ${contact.name} - ${contact.email} - ${contact.phone}`);
                });
            }
            return { status: true, err: "" };
        }
            
        case 'help': {
            console.log("Commands:");
            console.log('  add "name" "email" "phone"  - Add a new contact');
            console.log("  list                        - List all contacts");
            console.log('  search "query"              - Search contacts by name or email');
            console.log('  delete "email"              - Delete contact by email');
            console.log("  help                        - Show this help message");
            console.log("");
            console.log("Examples:");
            console.log('  node contacts.js add "John Doe" "john@example.com" "555-123-4567"');
            console.log('  node contacts.js search "john"');
            console.log('  node contacts.js delete "john@example.com"');
            return { status: true, err: "" };
        }
            
        default:
            return { status: true, err: "" };
    }
}