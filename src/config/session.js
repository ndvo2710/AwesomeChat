import session from "express-session";
import connectMongo from "connect-mongo";
import mongoose from "mongoose";

const MongoStore = connectMongo(session);

/**
 * This variable is where save session, in this case is mongodb
 * @param app from exactly express module
 */
const sessionStore = new MongoStore({
    mongooseConnection: mongoose.connection,
    autoReconnect: true,
    autoRemove: "native"
});

/**
 * Config session for app
 * @param app from exactly express module
 */
const configSession = (app) => {
    app.use(session({
        key: "express.sid",
        secret: "mySecret",
        store: sessionStore,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 1 day
        }
    }))
};

module.exports = configSession;