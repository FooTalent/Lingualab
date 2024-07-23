import { Router } from "express";
import Controller from "./controller.js";
import { handleAuth } from "../../../middleware/handlePolicies.js";
import wrapRoutesWithCatchAsync from "../../../libraries/utils/wrapRoutesWithCatchAsync.js";

const router = Router();
const controller = new Controller()

// http://localhost:8080/api/classroom/
router
.get    ("/",     handleAuth(["TEACHER", "STUDENT"]), controller.getByTeacherAndDate)
.get    ("/:eid", handleAuth(["TEACHER", "STUDENT"]), controller.getById)
.post   ("/",     handleAuth(["TEACHER", "STUDENT"]), controller.create)
.put    ("/:eid", handleAuth(["TEACHER", "STUDENT"]), controller.updateId)
.delete ("/:eid", handleAuth(["TEACHER", "STUDENT"]), controller.deleteId)

wrapRoutesWithCatchAsync(router)

export default router