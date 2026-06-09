
import { validate } from "../utils/validation.js";
import { processCommand } from "../commands/commandHandler.js";
export const executeCommand = function(command, args){
    //utils validation
    const cmdValidity = validate(command, args);

    if (cmdValidity.status === true)
    {
        cmdValidity.status = processCommand(command, args);
    }
    return cmdValidity;
}

