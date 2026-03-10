const fs = require("node:fs/promises");
const { get } = require("node:http");
var employees = [];
var departments = [];

async function initialize() {
    try {
        return await Promise.all([
            fs.readFile("./data/employees.json", "utf8").then(data => employees = JSON.parse(data)),
            fs.readFile("./data/departments.json", "utf8").then(data => departments = JSON.parse(data))
        ]);
    } catch (err) {
        console.error("Error initializing data:", err);
        throw err;
    }
}

module.exports = {
    getAllEmployees: async () => {
        await initialize();
        return employees;
    },
    getEmployeesByStatus: async (status) => {
        await initialize();
        const filteredEmployees = employees.filter(employee => employee.status == status);
        return filteredEmployees;
    },
    getEmployeesByDepartment: async (department) => {
        await initialize();
        const filteredEmployees = employees.filter(employee => employee.department == department);
        return filteredEmployees;
    },
    getEmployeesByManager: async (manager) => {
        await initialize();
        const filteredEmployees = employees.filter(employee => employee.employeeManagerNum == parseInt(manager));
        return filteredEmployees;
    },
    getManagers: async () => {
        await initialize();
        const managers = employees.filter(employee => employee.isManager);
        return managers;
    },
    getDepartments: async () => {
        await initialize();
        return departments;
    },
    getDepartmentById: async (id) => {
	await initialize();
	return;
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
