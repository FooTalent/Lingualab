import { Router } from "express";
import Controller from "./controller.js";

const router = Router()
const controller = new Controller()

// http://localhost:8080/api/send-email/
router
.get('/', (req, res) => {   res.send('Hello, Emails!')})
.post('/send', controller.sendEmail)

export default router