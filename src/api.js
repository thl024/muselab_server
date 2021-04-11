function configureRespHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // TODO -- config
    res.setHeader('Content-Type', 'application/json');
}

function saveProject(req, res) {
    configureRespHeaders(res);
    console.log(req.body);
    return res.json(req.body);
}

function loadProject(req, res) {
    configureRespHeaders(res);

    return res.json({
        "resp": "yes!"
    })
}

exports.saveProject = saveProject;
exports.loadProject = loadProject;