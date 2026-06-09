import { readJSON, writeJSON } from "../utils/fileUtils.js";

export const processCommand = function(command, args) {
    const readResult = readJSON();
    let contacts = [];

    if (readResult.status === true) {
        contacts = readResult.data;
    }

    switch (command) {
        case 'add': {
            contacts.push({ name: args[0], email: args[1], phone: args[2] });
            const writeResult = writeJSON(contacts);
            
            if (writeResult.status === false) {
                return { status: false, err: writeResult.err };
            }
            return { status: true, err: "" };
        }
            
        case 'delete': {
            const identifier = args[0];
            const initialLength = contacts.length;
            
            contacts = contacts.filter(contact => 
                contact.name !== identifier && 
                contact.email !== identifier && 
                contact.phone !== identifier
            );
            
            if (contacts.length === initialLength) {
                return { status: false, err: "Contact not found" };
            }
            
            const writeResult = writeJSON(contacts);
            
            if (writeResult.status === false) {
                return { status: false, err: writeResult.err };
            }
            return { status: true, err: "" };
        }
            
        case 'list': {
            console.log(contacts);
            return { status: true, err: "" };
        }
            
        case 'search': {
            const query = args[0];
            const results = contacts.filter(contact => 
                contact.name.includes(query) || 
                contact.email.includes(query) || 
                contact.phone.includes(query)
            );
            console.log(results);
            return { status: true, err: "" };
        }
            
        case 'help': {
            console.log("Available commands: add, delete, list, search, help");
            return { status: true, err: "" };
        }
            
        default:
            return { status: true, err: "" };
    }
}