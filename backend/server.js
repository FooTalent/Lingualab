import express from 'express';
import configEnv from './config/env.js';
import __dirname from './libraries/dirname.js';
import { connectDb } from './config/connectMongo.js';
import { addLogger, logger } from './libraries/logger.js';
import handleResponses from './middleware/handleResponses.js';
import appRouter from './config/routes.js'

// App initialization ------------------------------
const app = express();

// App Configurations --------------------------------
const port = configEnv.port || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))

// App Data Source Configuration --------------------------------
connectDb()

// App Middleware --------------------------------
app.use(addLogger)
app.use(handleResponses)

// App Routes --------------------------------
app.use(appRouter);

// App Launch --------------------------------
app.listen(port, () => {
  logger.info(`Server running on port: ${port}`);
});