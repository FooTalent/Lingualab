import { Router } from "express";
import Controller from "./controller.js";

const router = Router();
const controller = new Controller()

router
.get    ("/",     controller.get)
.get    ("/:eid", controller.getById)
.post   ("/",     controller.create)
.put    ("/:eid", controller.updateId)
.delete ("/:eid", controller.deleteId)

export default router