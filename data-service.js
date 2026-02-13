const { resolve } = require("node:dns");
const fs = require("node:fs/promises");
export var employees = [];
export var departments = [];

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

function getAllEmployees() {
    return new Promise((resolve, reject) => {
        const employees = initialize();

        if (employees.length === 0) {
            reject("no results returned");
        } else {
            resolve(employees);
        }
    });
}

function getManagers() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const employees = initialize();
            const managers = employees.filter(employee => employee.isManager);

            if (managers.length > 0) {
                resolve(managers);
            } else {
                reject("no results returned");
            }
        }, 1000);
    });
}

function getDepartments() {
    return new Promise((resolve, reject) => {
        const departmentData = initialize();

        if (departmentData.length > 0) {
            resolve(departmentData);
        } else {
            reject("no results returned");
        }
    });
}