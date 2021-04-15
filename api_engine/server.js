const express = require('express');
const api = require("./src/api");
const bodyParser = require('body-parser');
const allowCrossDomain = require("./src/middleware");
const {config} = require('./config/config')

const app = express();

// Middleware
app.use(allowCrossDomain)
app.use(bodyParser.json());

// Project API
app.get('/project', api.loadProject);
app.post('/project', api.saveProject);

// Sound File API
app.get('/sounds', api.loadAllSoundMetadata)
app.get('/sound', api.loadSoundLibrary);

// Ping for health
app.get('/health', function (req, res) {
    return res.send('healthy!');
});

console.log("Listening on port 8080");
app.listen(process.env.PORT || config.app.port);