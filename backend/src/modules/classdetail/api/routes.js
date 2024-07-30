import { Router } from "express";
import Controller from "./controller.js";
import { handleAuth, users } from "../../../middleware/handlePolicies.js";

const router = Router();
const controller = new Controller()

// http://localhost:8080/api/classdetail/
router
.get    ("/",     handleAuth(users), controller.get)
.get    ("/:eid", handleAuth(users), controller.getById)
.post   ("/",     handleAuth(users), controller.create)
.put    ("/:eid", handleAuth(users), controller.updateId)
.delete ("/:eid", handleAuth(users), controller.deleteId)
.get    ("/list/:uid", handleAuth(users), controller.list )

export default router