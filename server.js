const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const dataService = require("./data-service.js");
const app = express();
dotenv.config();
// set HTTP_PORT
const HTTP_PORT = process.env.PORT || 8080;
// set static folder
app.use(express.static(path.join(__dirname, "public")));
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
res.send("Employees route");
});
// managers route
app.get("/managers.html", (req, res) => {
res.send("Managers route");
});
// departments route
app.get("/departments.html", (req, res) => {
res.send("Departments route");
});
// 404 error handler for undefined routes
app.use((req, res) => {
res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
// setup server
Promise.resolve(0).then(() => {
    app.listen(HTTP_PORT, () => {
    console.log(`Express http server listening on port ${HTTP_PORT}`);
    });
}).catch(() => {
    console.log("An error occured");
});