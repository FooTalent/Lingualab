import { Router } from "express";
import Controller from "./controller.js";
import { handleAuth } from "../../../middleware/handlePolicies.js";

const router = Router();
const controller = new Controller()

// http://localhost:8080/api/users/
router
.get    ("/",         handleAuth(['USER']), controller.get)     // TODO actualizar para permitir filtros
.delete ("/:eid",     handleAuth(['USER']), controller.del)     // TODO falta eliminar usuario

router
.get    ('/current',  handleAuth(['USER']), controller.getUserSession)
.post   ('/register', controller.register)
.post   ('/login',    controller.login)
.post   ('/logout',   handleAuth(['USER']), controller.logout)
.post   ('/userrecovery', controller.userRecovery)
.put    ('/userrecovery', handleAuth(["USER"]), controller.userRecoveryPassword)

export default router