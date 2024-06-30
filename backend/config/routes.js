import { Router } from "express";
import usersRouter from "../modules/users/api/routes.js";
const router = Router()

router
  .get('/', (req, res) => {   res.send('Hello, World!')})
  .use('/api/users/', usersRouter)
  .get('*', (req, res) => {res.sendNotFound()})

export default router