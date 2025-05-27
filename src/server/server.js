"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_url_1 = require("node:url");
var express_1 = require("express");
var app = (0, express_1.default)();
var port = 3000;
express_1.default.static("../client/dist");
app.get('/', function (req, res) {
    res.sendFile((0, node_url_1.fileURLToPath)(new node_url_1.URL('index.html', import.meta.url)));
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
