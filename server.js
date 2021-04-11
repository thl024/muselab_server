const express = require('express');
const path = require('path');
const api = require("./src/api");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Main API
app.get('/project', api.loadProject);
app.post('/project', api.saveProject);

// Ping for health
app.get('/health', function (req, res) {
    return res.send('healthy!');
});

console.log("Listening on port 8080");
app.listen(process.env.PORT || 8080);