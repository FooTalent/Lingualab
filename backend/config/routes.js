import { Router } from "express";
import usersRouter from "../modules/users/api/routes.js";
import emailRouter from "../modules/email/api/routes.js"
const router = Router()

router
  .get('/', (req, res) => {   res.send('Hello, World!')})
  .use('/api/users/', usersRouter)
  .use('/api/send-email', emailRouter)
  
  .get('*', (req, res) => {res.sendNotFound()})

export default router