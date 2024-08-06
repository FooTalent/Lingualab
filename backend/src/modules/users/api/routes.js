import { Router } from "express";
import Controller from "./controller.js";
import { clients, handleAuth, users } from "../../../middleware/handlePolicies.js";
import { uploader } from "../../../middleware/multer.js";

const router = Router();
const controller = new Controller()

// http://localhost:8080/api/users/

// sesions
router
.post   ('/register',                           controller.register)
.post   ('/login',                              controller.login)
.post   ('/userrecovery',                       controller.userRecovery)
.put    ('/userrecovery',  handleAuth(users),   controller.userRecoveryPassword)
.get    ('/google/login',                       controller.googleAuth)
.get    ('/google/redirect',                    controller.googleRedirect)

// user
router
.get    ('/current',       handleAuth(users),   controller.getUserSession)
.put    ('/current/update',handleAuth(users),   controller.currentUpdate)
.put    ('/current/uploadphoto',  
        handleAuth(users), 
        uploader('profiles', 5, ['image/jpeg', 'image/png']).single('photo'),
        controller.uploadPhoto)

// TODO sacar de aqui
router
.post   ('/google/events', handleAuth(users),   controller.createEvent) // TODO FALTA TESTEAR

// students
router
.get    ('/students/', handleAuth(clients), controller.getStudent)
.put    ('/students/:sid', handleAuth(clients), controller.updateStudent)
.post   ('/inviteStudent', handleAuth(clients), controller.inviteStudent)

// Admins
.get('/', handleAuth(['ADMIN']), controller.get)

export default router