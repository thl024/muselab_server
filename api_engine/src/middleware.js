function allowCrossDomain(req, res, next) {
    // Establish CORS only to muselab client, should be configurable
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Establish only GET and POST requests
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');

    // Allow following header types
    res.setHeader('Access-Control-Allow-Headers', 'Accept,Origin,Content-Type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
}

module.exports = allowCrossDomain