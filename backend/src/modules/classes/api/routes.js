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
.get    ("/calendar/next-clases", handleAuth(users), controller.getNextClasses)

// ! ERROR PENDIENTE QUE NO SE LLEGA A REVISAR: next-clases solo toma clases siguientes y actual (solo si dura 1 hora)
/* No se resuelve porque habria que modificar la logica de las aulas / clases y no da el tiempo */

export default router