import fs from "fs";

const fileNmae = "contact.json:'";

export const readJSON = function () {
  let retValue = { status: false, data: null, err: null };
  try {
    const data = JSON.parse(fs.readFileSync(fileNmae, "utf8"));
    retValue = { status: true, data: data, err: null };
  } catch (err) {
    retValue.err = err;
  }
  return retValue;
};

export const writeJSON = function (data) {
  let retValue = { status: false, err: null };
  try {
    fs.writeFileSync(fileNmae, JSON.stringify(data));
    retValue .status = true;
  } catch (err) {
    retValue.err = err;
  }
  return retValue;
};
