"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
if (process.argv.length !== 3) {
    console.log("Please, specify a file");
}
else {
    var filename_1 = process.argv[2];
    (0, fs_1.access)(filename_1, fs_1.constants.F_OK, function (err) {
        if (err) {
            console.log("File ".concat(filename_1, " does not exist"));
        }
        else {
            console.log("Starting to watch file ".concat(filename_1));
            var watcher = (0, fs_1.watch)(process.argv[2]);
            watcher.on("change", function () {
                console.log("File ".concat(filename_1, " has been modified somehow"));
            });
            console.log("File ".concat(filename_1, " is no longer watched"));
        }
    });
}
