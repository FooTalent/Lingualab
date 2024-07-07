import { Router } from "express";
import Controller from "./controller.js";
import { clients, handleAuth, users } from "../../../middleware/handlePolicies.js";
import catchAsync from "../../../middleware/catchAsync.js";

const router = Router();
const controller = new Controller()

// http://localhost:8080/api/users/
router
.get    ("/",             handleAuth(clients),  catchAsync(controller.get))     // TODO actualizar para permitir filtros
.delete ("/:eid",         handleAuth(clients),  catchAsync(controller.del))     // TODO falta eliminar usuario

router
.get    ('/current',      handleAuth(users),    catchAsync(controller.getUserSession))
.post   ('/register',                           catchAsync(controller.register))
.post   ('/login',                              catchAsync(controller.login))
.post   ('/logout',       handleAuth(users),    catchAsync(controller.logout))
.post   ('/userrecovery',                       catchAsync(controller.userRecovery))
.put    ('/userrecovery', handleAuth(users),    catchAsync(controller.userRecoveryPassword))

export default router