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

module.exports = mongoose.model("Project", ProjectSchema);
