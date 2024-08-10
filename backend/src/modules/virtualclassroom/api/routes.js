import { Router } from "express";
import Controller from "./controller.js";
import { handleAuth, clients, users } from "../../../middleware/handlePolicies.js";

const router = Router();
const controller = new Controller()
// http://localhost:8080/api/virtual

router
.post   ("/",     handleAuth(clients), controller.create )
// .put    ("/:eid", handleAuth(clients), controller.updateId) // --> En desarrollo
.post   ("/duplicate/:pid", handleAuth(clients), controller.duplicateProgram )

router
.post   ('/gevent/', handleAuth(users),   controller.createEvent) 
// .post   ('/gevent/class/:cid', handleAuth(users),   controller.createEventClass) // --> En desarrollo
//.post   ('/gevent/program/:pid', handleAuth(users),   controller.createEvent) 

export default router