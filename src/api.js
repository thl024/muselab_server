const {retrieveProject} = require("./dal");
const {storeProject} = require("./dal");

function configureRespHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // TODO -- config
    res.setHeader('Content-Type', 'application/json');
}

function saveProject(req, res) {
    configureRespHeaders(res);
    try {
        storeProject(req.body, (err, proj) => {
            if (err) {
                console.log("Unable to save project to mongo: " + err)
                res.sendStatus(500);
                return;
            }
            res.json({pid: proj._id})
        }, (err) => {
            console.log("Unable to save project to mongo: " + err)
            res.sendStatus(400);
        })
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
    return res
}

function loadProject(req, res) {
    configureRespHeaders(res);
    const pid = req.query.pid

    // Non existent pid
    if (pid === null || pid === undefined) {
        res.sendStatus(400)
        return;
    }

    try {
        retrieveProject(pid, function (err, project) {
            if (err) {
                console.log("Unable to retrieve project from mongo: " + err)
                res.sendStatus(500);
                return;
            }
            res.json(project);
        })
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

    return res;
}

exports.saveProject = saveProject;
exports.loadProject = loadProject;