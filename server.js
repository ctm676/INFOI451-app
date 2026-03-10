const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const dataService = require("./data-service.js");
const app = express();
const multer = require("multer");
const fs = require("fs");
dotenv.config();
// set HTTP_PORT
const HTTP_PORT = process.env.PORT || 8080;
// configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/uploaded");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage })
// set static folder
app.use(express.static(path.join(__dirname, "public")));
// Middleware for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// home route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
});
// about route
app.get("/about.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
});
// employees route
app.get("/employees.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "employees.html"));
});
// managers route
app.get("/managers.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "managers.html"));
});
// departments route
app.get("/departments.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "departments.html"));
});
// GET /employees/add
app.get("/addEmployee.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "addEmployee.html"));
});
// POST /employees/add
app.post("/addEmployee.html", upload.none(), async (req, res) => {
    try {
        await dataService.addEmployee(req.body);
        res.redirect("/employees.html");
    } catch (err) {
        res.status(500).send("Error adding employee");
    }
});
// GET /images/add
app.get("/addImage.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "addImage.html"));
});
// POST /images/add
app.post("/addImage.html", upload.single("imageFile"), (req, res) => {
    console.log("Uploaded file details: ", req.file);
    res.redirect("/images.html");
});
// GET /images
const imagesDir = "./public/images/uploaded";
app.get("/images", (req, res) => {
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Unable to scan directory" });
        }
        res.json({ images: files });
    });
});

// API routes
app.get("/api/employees", async (req, res) => {
    try {
        let employees;
        if (req.query.status) {
            employees = await dataService.getEmployeesByStatus(req.query.status);
        } else if (req.query.department) {
            employees = await dataService.getEmployeesByDepartment(req.query.department);
        } else if (req.query.manager) {
            employees = await dataService.getEmployeesByManager(req.query.manager);
        } else {
            employees = await dataService.getAllEmployees();
        }
        res.json(employees);
    } catch (err) {
        console.error("Error fetching employees:", err);
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/managers", async (req, res) => {
    try {
        const managers = await dataService.getManagers();
        res.json(managers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/departments", async (req, res) => {
    try {
        const departments = await dataService.getDepartments();
        res.json(departments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 404 error handler for undefined routes
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
// setup server
app.listen(HTTP_PORT, () => {
    console.log(`Express http server listening on port ${HTTP_PORT}`);
});
