import { Router } from "express";
import Controller from "./controller.js";
import { handleAuth, users } from "../../../middleware/handlePolicies.js";

const router = Router();
const controller = new Controller()

// http://localhost:8080/api/classes
router
.get    ("/",     handleAuth(users), controller.get)
.get    ("/:eid", handleAuth(users), controller.getById)
.post   ("/",     handleAuth(users), controller.create)
.put    ("/:eid", handleAuth(users), controller.updateId)
.delete ("/:eid", handleAuth(users), controller.deleteId)
.get    ("/calendar/get",     handleAuth(users), controller.getClassCalendar)

export default router