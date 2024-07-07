import { Router } from "express";
import Controller from "./controller.js";

const router = Router();
const controller = new Controller()

router
.get    ("/",     controller.get)
.get    ("/:eid", controller.getBy)
.post   ("/",     controller.create)
.put    ("/:eid", controller.update)
.delete ("/:eid", controller.del)

export default router