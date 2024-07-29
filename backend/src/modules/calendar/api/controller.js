import { listEvent } from "../../../libraries/google/googleCalendarService.js";

export default class Controller {
  constructor() {
    
  }

  // https://developers.google.com/calendar/api/v3/reference/events?hl=es-419#resource-representations
  // Formato esperado desde el front-end:
  // {
  //   "summary": "Evento en Córdoba, Argentina",
  //   "description": "Este es un evento de prueba.",
  //   "start": "2024-07-21T13:00:00",
  //   "end": "2024-07-21T15:00:00",
  //   "country": "Argentina", // de aqui optiene el timezone
  //   "location": "Córdoba, Argentina",
  // ?  VER COLORID
  //   "reminders": [
  //     { "method": "email", "minutes": 15 },
  //     { "method": "popup", "minutes": 15 }
  //   ],
  //   "attendees": [
  //     { "email": 'profesor@example.com' },
  //     { "email": 'alumno@example.com' },
  //   ],
  // }

  get = async (req, res) => {
    const result = await listEvent();
    res.sendSuccess(result);
  }

}