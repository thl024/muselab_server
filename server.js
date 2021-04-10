const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/health', function (req, res) {
    return res.send('healthy!');
});

console.log("Listening on port 8080");
app.listen(process.env.PORT || 8080);