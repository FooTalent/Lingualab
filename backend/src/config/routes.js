import { Router } from "express";
import usersRouter from "../modules/users/api/routes.js";
import resourcesRouter from "../modules/resource/api/routes.js";
import classroomsRouter from "../modules/classroom/api/routes.js";
import classRouter from "../modules/class/api/routes.js";
import emailRouter from "../modules/email/api/routes.js";
import { insertEvent, listEvent } from "../libraries/google/googleCalendarService.js";

const router = Router()



router.use('/users/', usersRouter)
router.use('/classroom/', classroomsRouter)
router.use('/class/', classRouter)
router.use('/resources/', resourcesRouter)
router.use('/send-email', emailRouter)
router.get('/pruebas', async (req, res, next) => {
  try {
    const result = await listEvent();
    res.json({
      status: "ok",
      result
    });
  } catch (err) {
    next(err);
  }
});
router.get('/pruebas2', async (req, res, next) => {
  try {
    // const newEvent = req.body; // Asegúrate de que `newEvent` tenga la estructura correcta
    const sunday = getNextSunday();
    const newEvent = {
      summary: 'Evento en Córdoba, Argentina',
      location: 'Córdoba, Argentina',
      description: 'Este es un evento de prueba.',
      start: {
        dateTime: sunday.setHours(13, 0, 0, 0),
        timeZone: 'America/Argentina/Cordoba',
      },
      end: {
        dateTime: sunday.setHours(15, 0, 0, 0),
        timeZone: 'America/Argentina/Cordoba',
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 15 },
          { method: 'popup', minutes: 15 },
        ],
      },
    }

    const result = await insertEvent(newEvent);
    res.json({
      status: "ok",
      result
    });
  } catch (err) {
    next(err);
  }
});

function getNextSunday() {
  const now = new Date();
  const nextSunday = new Date(now.setDate(now.getDate() + (7 - now.getDay()) % 7));
  return nextSunday;
}

export default router