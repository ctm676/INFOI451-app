const fs = require("node:fs/promises");
const { get } = require("node:http");
var employees = [];
var departments = [];

async function initialize() {
    try {
        return await Promise.all([
            fs.readFile("./data/employees.json", "utf8").then(data => employees = JSON.parse(data)),
            fs.readFile("./data/departments.json", "utf8").then(data_1 => departments = JSON.parse(data_1))
        ]);
    } catch (err) {
        console.error("Error initializing data:", err);
        throw err;
    }
}

module.exports = {
    getAllEmployees: async () => {
        await initialize();
        if (employees.length === 0) {
            throw new Error("no results returned");
        }
        return employees;
    },
    getEmployeesByStatus: async (status) => {
        await initialize();
        const filteredEmployees = employees.filter(employee => employee.status === status);
        if (filteredEmployees.length === 0) {
            throw new Error("no results returned");
        }
        return filteredEmployees;
    },
    getEmployeesByDepartment: async (department) => {
        await initialize();
        const filteredEmployees = employees.filter(employee => employee.department === department);
        if (filteredEmployees.length === 0) {
            throw new Error("no results returned");
        }
        return filteredEmployees;
    },
    getEmployeesByManager: async (manager) => {
        await initialize();
        const filteredEmployees = employees.filter(employee => employee.employeeManagerNum === parseInt(manager));
        if (filteredEmployees.length === 0) {
            throw new Error("no results returned");
        }
        return filteredEmployees;
    },
    getManagers: async () => {
        await initialize();
        const managers = employees.filter(employee => employee.isManager);
        if (managers.length === 0) {
            throw new Error("no results returned");
        }
        return managers;
    },
    getDepartments: async () => {
        await initialize();
        if (departments.length === 0) {
            throw new Error("no results returned");
        }
        return departments;
    },
    addEmployee: async (employeeData) => {
        try {
            await initialize();
            if (employeeData.isManager === undefined) {
                employeeData.isManager = false;
            } else {
                employeeData.isManager = true;
            }
            employeeData.employeeNum = employees.length + 1;
            employees.push(employeeData);
            return await fs.writeFile("./data/employees.json", JSON.stringify(employees));
        } catch (err) {
            throw new Error("unable to write to file");
        }
    }
};



