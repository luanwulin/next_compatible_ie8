"use strict";

exports.__esModule = true;
exports.printAndExit = printAndExit;

function printAndExit(message, code) {
  if (code === void 0) {
    code = 1;
  }

  if (code === 0) {
    console.log(message);
  } else {
    console.error(message);
  }

  process.exit(code);
}