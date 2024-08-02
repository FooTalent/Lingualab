import { Router } from "express";
import Controller from "./controller.js";
import { clients, handleAuth, users } from "../../../middleware/handlePolicies.js";
import { uploader } from "../../../middleware/multer.js";

const router = Router();
const controller = new Controller()

// http://localhost:8080/api/users/
router
.get    ("/",              handleAuth(clients), controller.get)     // TODO actualizar para permitir filtros
.get    ('/current',       handleAuth(users),   controller.getUserSession)
.post   ('/register',                           controller.register)
.post   ('/login',                              controller.login)
.post   ('/logout',        handleAuth(users),   controller.logout)
.post   ('/userrecovery',                       controller.userRecovery)
.put    ('/userrecovery',  handleAuth(users),   controller.userRecoveryPassword)
.get    ('/google/login',                       controller.googleAuth)
.get    ('/google/redirect',                    controller.googleRedirect)
.post   ('/google/events', handleAuth(users),   controller.createEvent) // TODO FALTA TESTEAR
.get    ('/students/:tid', handleAuth(clients), controller.getStudent)
.post   ('/uploadphoto',  
        handleAuth(users), 
        uploader('profiles', 5, ['image/jpeg', 'image/png']).single('photo'),
        controller.uploadPhoto)

export default router

// http://localhost:8080/api/users/google/login
// http://localhost:8080/api/users/google/redirect