let mongoose = require("mongoose")
let models = require("./models")
const {config} = require("../config/config");

// MongoDB CONNECTION EVENTS
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + config.db.url);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);

    // Stop process if DB fails
    process.exit(0);
});

mongoose.connect(config.db.url + "/" + config.db.name, {useNewUrlParser: true, useUnifiedTopology: true});

function storeProject(projectJSON, callback, notExistsCallback) {
    if (projectJSON.pid !== undefined && mongoose.isValidObjectId(projectJSON.pid)) {
        models.Project.findById(projectJSON.pid, (err, proj) => {
            if (err !== null) {
                callback(err, null);
                return;
            }

            // No record exists
            if (proj == null) {
                notExistsCallback("Project with pid " + projectJSON.pid +" does not exist");
            }

            // Update fields
            proj.instruments = projectJSON.instruments;
            proj.save(callback);
        });
    } else {
        const project = new models.Project(projectJSON);
        project.save(callback);
    }
}

function retrieveProject(pid, callback) {
    if (pid !== undefined && mongoose.isValidObjectId(pid)) {
        models.Project.findById(pid, callback);
    } else {
        callback("Invalid object ID");
    }
}


module.exports = {storeProject, retrieveProject};
