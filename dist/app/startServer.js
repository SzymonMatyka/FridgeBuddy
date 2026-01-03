"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const env_1 = require("../config/env");
const database_1 = require("../config/database");
const app_1 = require("./app");
const middlewares_1 = require("./middlewares");
const routes_1 = require("./routes");
const startServer = async () => {
    const config = (0, env_1.loadEnvConfig)();
    const app = (0, app_1.createApp)();
    (0, middlewares_1.registerMiddlewares)(app);
    (0, routes_1.registerRoutes)(app);
    try {
        await (0, database_1.connectDatabase)(config.mongoUri);
        app.listen(config.port, () => {
            console.log(`Server is running on http://localhost:${config.port}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
exports.startServer = startServer;
//# sourceMappingURL=startServer.js.map