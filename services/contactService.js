
import { validate } from "./utils/validation.js";
export const executeCommand = function(command, args){
    //utils validation
    const cmdValidity = validate(command, args);

    if (cmdValidity.status === false){
        return cmdValidity;
    }
    else
    {
        //call commands manager
        return cmdValidity;
    }
}

