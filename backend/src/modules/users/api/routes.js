import { Router } from "express";
import Controller from "./controller.js";
import { clients, handleAuth, users } from "../../../middleware/handlePolicies.js";
import { uploader } from "../../../middleware/multer.js";
import catchAsync from "../../../libraries/utils/catchAsync.js";

const router = Router();
const controller = new Controller()

// http://localhost:8080/api/users/
router
.get    ("/",              handleAuth(clients), catchAsync(controller.get))     // TODO actualizar para permitir filtros
.get    ('/current',       handleAuth(users),   catchAsync(controller.getUserSession))
.post   ('/register',                           catchAsync(controller.register))
.post   ('/login',                              catchAsync(controller.login))
.post   ('/logout',        handleAuth(users),   catchAsync(controller.logout))
.post   ('/userrecovery',                       catchAsync(controller.userRecovery))
.put    ('/userrecovery',  handleAuth(users),   catchAsync(controller.userRecoveryPassword))
.get    ('/google/login',                       controller.googleAuth)
.get    ('/google/redirect',                    controller.googleRedirect)
.post   ('/google/events', handleAuth(users),   catchAsync(controller.createEvent)) // TODO FALTA TESTEAR
.post   ('/uploadphoto',  
        handleAuth(users), 
        uploader('profiles', 5, ['image/jpeg', 'image/png']).single('photo'),
        catchAsync(controller.uploadPhoto)),
router
.get    ('/students/:tid', handleAuth(clients), controller.getStudent)

export default router

// http://localhost:8080/api/users/google/login
// http://localhost:8080/api/users/google/redirect