import express from 'express';
import path from 'node:path'
import configEnv from './config/env.js';
import cors from 'cors'
import __dirname from './libraries/utils/dirname.js';
import { connectDb } from './config/connectMongo.js';
import { addLogger, logger } from './middleware/logger.js';
import handleResponses from './middleware/handleResponses.js';
import initializePassport from './modules/users/config/passport.config.js';
import passport from 'passport';
import appRouter from './config/routes.js'
import AppError from './config/AppError.js';
import { handleEspecificErrors, handleGenericErrors, handleMulterErrors } from './middleware/handleErrors.js';

// App initialization ------------------------------
const app = express();
app.use(cors({origin:configEnv.cors_origin}));

// App Configurations --------------------------------
const port = configEnv.port || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

// App Data Source Configuration --------------------------------
connectDb()

// App Middleware --------------------------------
app.use(addLogger)
app.use(handleResponses)

// passport
initializePassport()
app.use(passport.initialize())

// App Routes --------------------------------
app.get('/', (req, res) => {res.send({prueba: "texto de prueba del backend"})});
app.use('/api', appRouter);
app.all('*', (req, res, next) => { next(new AppError(`No se encuentra la url: ${req.originalUrl} en este servidor`, 404)); });
app.use(handleMulterErrors)
app.use(handleEspecificErrors)
app.use(handleGenericErrors)

// App Launch --------------------------------
app.listen(port, () => {
  logger.info(`Server running on port: ${port}`);
});