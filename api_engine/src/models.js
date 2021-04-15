let mongoose = require("mongoose");

let ProjectSchema = new mongoose.Schema({
    dateSaved: { type: Date, default: Date.now },
    instruments: [{
        name: String,
        data: [[[Number]]],
        id: String,
        color: String
    }],
});

let AudioMetadataSchema = new mongoose.Schema({
    name: String,
    src: String,
    type: String,
});

module.exports = {
    Project: mongoose.model("Project", ProjectSchema, "Project"),
    AudioMetadata: mongoose.model("AudioMetadata", AudioMetadataSchema, "AudioMetadata")
};
