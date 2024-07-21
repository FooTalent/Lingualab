import AppError from "../../../config/AppError.js";
import { insertEvent, listEvent } from "../../../libraries/google/googleCalendarService.js";
import validateFields from "../../../libraries/utils/validatefiels.js";
import { COUNTRY_TIMEZONES } from "../../email/api/timezoneMapping.js";

COUNTRY_TIMEZONES
export default class Controller {
  constructor() {
    this.requieredfield = [
      'summary',    // titulo
      'start',      // fecha hora de inicio
      'end',        // fecha hora fin
      'country',    // pais, usado para el timezone del horario
      'teacher' ,   // Un email --> Lista de asistentes
      //'students'    // Un array de {email} Lista de asistentes
    ]
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
  // ?  VER CREATOR
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
    // const result = await listEvent();
    // res.sendSuccess(result);
  }

  redirect = async (req, res) => {};

  post = async (req, res) => {

    let addEvent = validateFields(req.body, this.requieredfield);

    const timeZone = COUNTRY_TIMEZONES[addEvent.country];
    if (!timeZone) {
      throw new AppError(`País invalido: ${addEvent.country}`, 400);
    }

    const { description, location, reminders, attendees } = req.body;

    const newEvent = {
      summary:      addEvent.summary,
      location:     location || '', // Ubicación por defecto vacía
      description:  description || '', // Descripción por defecto vacía
      start: {
        dateTime:   new Date(addEvent.start).toISOString(),
        timeZone,
      },
      end: {
        dateTime:   new Date(addEvent.end).toISOString(),
        timeZone,
      },
      reminders: {
        useDefault: false,
        overrides: reminders || [
          { method: 'email', minutes: 15 },
          { method: 'popup', minutes: 15 },
        ],
      },
      attendees: [{ email: addEvent.teacher }],  //...addEvent.students
    };

    const result = await insertEvent(newEvent);
    res.sendSuccess(result);
  }

}