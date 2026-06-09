const fs = require("fs");

const fileName = "contact.json";

function readJSON() {
  let retValue = { status: false, data: null, err: null };
  try {
    const data = JSON.parse(fs.readFileSync(fileName, "utf8"));
    retValue = { status: true, data: data, err: null };
  } catch (err) {
    retValue.err = err;
  }
  return retValue;
}

function writeJSON(data) {
  let retValue = { status: false, err: null };
  try {
    fs.writeFileSync(fileName, JSON.stringify(data));
    retValue.status = true;
  } catch (err) {
    retValue.err = err;
  }
  return retValue;
}

module.exports = { readJSON, writeJSON };
