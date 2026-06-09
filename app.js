const { executeCommand } = require("./services/contactService.js");
const promptSync = require("prompt-sync");
const prompt = promptSync();

const args = process.argv.slice(2);

let command = args[0];
let cmdArgs = args.slice(1);

console.log(command);

console.log(cmdArgs);

const cmdStatus = executeCommand(command, cmdArgs)

if (cmdStatus.status === false){
    console.log(`***ERROR*** ${cmdStatus.err}`)
}
else{
    console.log("command successided")
}



