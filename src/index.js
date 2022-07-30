"use strict";
exports.__esModule = true;
require("dotenv/config");
var express_1 = require("express");
var cors_1 = require("cors");
var app = (0, express_1["default"])();
var port = process.env.PORT || 4000;
app.use(express_1["default"].json());
app.use((0, cors_1["default"])());
app.get("/", function (req, res) {
    res.status(200).json({ msg: "Hello world" });
});
app.listen(port, function () { return console.log("Server is running on port: ".concat(port)); });
