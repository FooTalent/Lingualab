import { Router } from "express";
import Controller from "./controller.js";
import { handleAuth } from "../../../middleware/handlePolicies.js";

const router = Router();
const controller = new Controller()

// http://localhost:8080/api/users/
router
.get    ("/",         handleAuth(['TEACHER']), controller.get)     // TODO actualizar para permitir filtros
.delete ("/:eid",     handleAuth(['TEACHER']), controller.del)     // TODO falta eliminar usuario

router
.get    ('/current',  handleAuth(["TEACHER", "STUDENT"]), controller.getUserSession)
.post   ('/register', controller.register)
.post   ('/login',    controller.login)
.post   ('/logout',   handleAuth(["TEACHER", "STUDENT"]), controller.logout)
.post   ('/userrecovery', controller.userRecovery)
.put    ('/userrecovery', handleAuth(["TEACHER", "STUDENT"]), controller.userRecoveryPassword)

export default router