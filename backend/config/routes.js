import { Router } from "express";
import usersRouter from "../modules/users/api/routes.js";
import resourcesRouter from "../modules/resource/api/routes.js";
import classroomsRouter from "../modules/classroom/api/routes.js";
import classRouter from "../modules/class/api/routes.js";
import emailRouter from "../modules/email/api/routes.js";
const router = Router()

router
  .get('/', (req, res) => {   res.send('Hello, World!')})
  .use('/api/users/', usersRouter)
  .use('/api/classroom/', classroomsRouter)
  .use('/api/class/', classRouter)
  .use('/api/resources/', resourcesRouter)
  .use('/api/send-email', emailRouter)
  
  .get('*', (req, res) => {res.sendNotFound()})

export default router