import { Router } from "express";
import Controller from "./controller.js";
import { handleAuth, clients } from "../../../middleware/handlePolicies.js";

const router = Router();
const controller = new Controller()
// http://localhost:8080/api/virtual

router
.get    ("/",     handleAuth(clients), controller.get)
.post   ("/",     handleAuth(clients), controller.create )

export default router