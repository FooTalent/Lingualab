import { Router } from "express";
import Controller from "./controller.js";
import wrapRoutesWithCatchAsync from "../../../libraries/utils/wrapRoutesWithCatchAsync.js";

const router = Router()
const controller = new Controller()

// http://localhost:8080/api/calendar/
router
.get ('/', controller.get)
.post('/', controller.post)

wrapRoutesWithCatchAsync(router)

export default router