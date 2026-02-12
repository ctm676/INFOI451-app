const fs = require("node:fs/promises");
var employees = [];
var departments = [];

function initialize() {
    const promise = Promise.resolve(0);

    promise.then(() => {
        employees = JSON.parse(fs.readFile("./data/employees.json", "utf8", (err, data) => {
            if (err) throw err;
            console.log(data);
        }));

        departments = JSON.parse(fs.readFile("./data/departments.json", "utf8", (err, data) => {
            if (err) throw err;
            console.log(data);
        }));
    });
}