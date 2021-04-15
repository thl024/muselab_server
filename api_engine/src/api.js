const fs = require("fs");
const path = require("path");
var base64 = require('base64-arraybuffer');
const {retrieveSoundMetadata} = require("./dal");

const {toArrayBuffer} = require("./utils");
const {retrieveProject} = require("./dal");
const {storeProject} = require("./dal");
const {config} = require("../config/config")

function saveProject(req, res) {
    // Save project to DB
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
    const pid = req.query.pid

    // Non existent pid
    if (pid === null || pid === undefined) {
        res.sendStatus(400)
        return;
    }

    // Load project from DB
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

function loadAllSoundMetadata(req, res) {
    retrieveSoundMetadata((users) => {
        res.json(users);
    }, (error) => {
        console.log(error);
        res.sendStatus(500);
    })
    return res;
}

function loadSoundLibrary(req, res) {
    // TODO -- parse req
    // TODO -- store audio types and metadata in db and query
    // const buffer = fs.readFileSync(path.resolve(__dirname, config.app.loc + "/acoustic_grand_piano"));
    const buffer = fs.readFileSync(path.resolve(__dirname, config.app.loc + "/hats/hat1.wav"));

    // Sound.create({
    //     instrument: 'Piano',
    //     audio: buffer,
    //     note: 'C4'
    // });

    const arrayBuffer = base64.encode(toArrayBuffer(buffer));
    return res.json({
        instrument: null,
        type: "wav",
        buffer: arrayBuffer,
        note: null,
    })
}

module.exports = {
    saveProject: saveProject,
    loadProject: loadProject,
    loadAllSoundMetadata: loadAllSoundMetadata,
    loadSoundLibrary: loadSoundLibrary,
}