import { Router } from "express";
// import Controller from "./controller.js";
import { COUNTRIES, LANGUAGES } from "../../valueList.js";

const router = Router()
// const controller = new Controller()

// http://localhost:8080/api/values
router
.get('/countries', (req, res) => res.json(COUNTRIES))
.get('/languages', (req, res) => res.json(LANGUAGES))

export default router