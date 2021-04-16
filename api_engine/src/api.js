const fs = require("fs");
const path = require("path");
var base64 = require('base64-arraybuffer');
const pako = require('pako');
const {notes} = require("./utils");
const {retrieveSoundSrc} = require("./dal");
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
    retrieveSoundMetadata((err,  metadata) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.json(metadata)
        }
    })
    return res;
}

function loadSoundLibrary(req, res) {
    const soundID = req.query.soundID

    // Retrieve file location & type from DB
    retrieveSoundSrc(soundID, (err, metadata) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            if (metadata === null) {
                console.log("No such sound ID: " + soundID);
                res.sendStatus(400);
                return;
            }
            switch (metadata.sound_type) {
                case "toned":
                    let buffers = []
                    try {
                    notes.forEach(note => {
                        // TODO abstract out
                        const fp = config.app.loc + metadata.src  +  "/" + note + "." + metadata.file_type
                        const buffer = fs.readFileSync(path.resolve(__dirname, fp));
                        const compressed = pako.deflate(buffer);
                        const arrayBuffer = base64.encode(toArrayBuffer(compressed));

                        buffers.push({
                            buffer: arrayBuffer,
                            note: note,
                        })
                    })} catch (e) {
                        console.log("Unable to read sound file: " + e);
                        break;
                    }
                    res.json({
                        type: metadata.type,
                        buffers: buffers
                    })
                    return;
                case "perc":
                case "sfx":
                    try {
                        const fp = config.app.loc + metadata.src + "." + metadata.file_type
                        const buffer = fs.readFileSync(path.resolve(__dirname, fp));
                        const compressed = pako.deflate(buffer); // Compression -
                        const arrayBuffer = base64.encode(toArrayBuffer(compressed));
                        res.json({
                            type: metadata.type,
                            buffer: arrayBuffer,
                        })
                        return;
                    } catch (e) {
                        console.log("Unable to read sound file: " + e);
                    }
                    break;
                default:
                    console.log("Invalid audio metadata sound type: " + metadata.sound_type)
            }
        }
        res.sendStatus(500);
    })

    // const buffer = fs.readFileSync(path.resolve(__dirname, config.app.loc + "/acoustic_grand_piano"));
    // const buffer = fs.readFileSync(path.resolve(__dirname, config.app.loc + "/hats/hat1.wav"));

    // Sound.create({
    //     instrument: 'Piano',
    //     audio: buffer,
    //     note: 'C4'
    // });


    return res;
}

module.exports = {
    saveProject: saveProject,
    loadProject: loadProject,
    loadAllSoundMetadata: loadAllSoundMetadata,
    loadSoundLibrary: loadSoundLibrary,
}