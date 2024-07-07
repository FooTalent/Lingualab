import { Router } from "express";
import usersRouter from "../modules/users/api/routes.js";
import resourcesRouter from "../modules/resource/api/routes.js";
import classroomsRouter from "../modules/classroom/api/routes.js";
import classRouter from "../modules/class/api/routes.js";
import emailRouter from "../modules/email/api/routes.js";

const router = Router()

router.use('/users/', usersRouter)
router.use('/classroom/', classroomsRouter)
router.use('/class/', classRouter)
router.use('/resources/', resourcesRouter)
router.use('/send-email', emailRouter)

export default router