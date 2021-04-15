// Sample Config
const env = process.env.NODE_ENV; // 'dev' or 'test'

const dev = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || 8080
    },
    db: {
        host: process.env.DEV_DB_HOST || 'mongo',
        port: parseInt(process.env.DEV_DB_PORT) || 27017,
        name: process.env.DEV_DB_NAME || 'Projects',
        url: "mongodb://mongo:27017",
        username: "",
        password: ""
    },
    audio_db: {
        host: process.env.DEV_DB_HOST || 'mongo',
        port: parseInt(process.env.DEV_DB_PORT) || 27017,
        name: process.env.DEV_DB_NAME || 'Audio',
        url: "mongodb://mongo:27017",
        username: "",
        password: ""
    }
};

const prod = {
    // app: {
    //     port: parseInt(process.env.DEV_APP_PORT) || 8080
    // },
    // db: {
    //     host: process.env.DEV_DB_HOST || 'mongo',
    //     port: parseInt(process.env.DEV_DB_PORT) || 27017,
    //     db: process.env.DEV_DB_NAME || 'Projects',
    //     url: "mongodb://mongo:27017",
    //     username: "",
    //     password: ""
    // }
}

const sample_config = {
    dev,
    prod
};

exports.config = sample_config[env];