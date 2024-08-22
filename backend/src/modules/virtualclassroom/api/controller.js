import AppError from "../../../config/AppError.js";
import { toUTC } from "../../../libraries/utils/convertToUTC.js";
import validateFields from "../../../libraries/utils/validatefiels.js";
import Service from "../logic/service.js";
import { COUNTRY_TIMEZONES } from "../logic/timezoneMapping.js";

export default class Controller {
  constructor() {
    this.service = new Service()
    this.requieredfield = {
      event: [
        'summary',    // titulo
        'start',      // fecha hora de inicio
        'end',        // fecha hora fin
        'country',    // pais, usado para el timezone del horario
        'students'    // Un array de {email} Lista de asistentes
      ],
    }
  }
  create = async (req, res, next) => {
    try {
      let { title, templateId, studentIds, first_class, daysOfWeek} = req.body;

      if (first_class) { first_class = toUTC(first_class); }

      const newProgram = await this.service.createCustomProgram(
        title,
        templateId,
        studentIds,
        first_class,
        daysOfWeek,
        req.user
      );
      res.sendSuccess(newProgram)
    } catch (error) {
      next(error);
    }
  };

  updateId = async (req, res, next) => {
    try {
      const { eid } = req.params;
      let newElement = req.body;
      if (newElement.first_class) {
        newElement.first_class = toUTC(newElement.first_class);
      }
      const element = await this.service.update(eid, newElement);
      res.sendSuccess(element);
    } catch (error) {
      next(error);
    }
  }

  duplicateProgram = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const newProgram = await this.service.createProgram(pid, [], req.user, true )
      res.sendSuccess(newProgram)
    } catch (error) {
      next(error);
    }
  }

  // CREAR EVENTO GOOGLE (se puede usar Clase)
  createEventHelper = async (userId, eventDetails, req, meet) => {
    const timeZone = COUNTRY_TIMEZONES[eventDetails.country];
    if (!timeZone) {
      throw new AppError(`País invalido: ${eventDetails.country}`, 400);
    }
    if (!eventDetails.idevent && meet) {
      throw new AppError(`Falta Agregar "idevent" = id Meet`, 400);
    }
  
    const { description, location, reminders } = req.body;
  
    const newEvent = {
      summary: eventDetails.summary,
      location: location || '',
      description: description || '',
      start: {
        dateTime: new Date(eventDetails.start).toISOString(),
        timeZone,
      },
      end: {
        dateTime: new Date(eventDetails.end).toISOString(),
        timeZone,
      },
      reminders: {
        useDefault: false,
        overrides: reminders || [
          { method: 'email', minutes: 15 },
          { method: 'popup', minutes: 15 },
        ],
      },
      attendees: [{ email: req.user.email }, ...eventDetails.students],
    };
  
    if (meet) {
      newEvent.conferenceData = {
        createRequest: {
          requestId: eventDetails.idevent,
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      };
    }
  
    return newEvent;
  }

  createEvent = async (req, res, next) => {
    try {
      const userId = req.user._id;
      let eventDetails = validateFields(req.body, this.requieredfield.event);
      const { meet } = req.body;
  
      const newEvent = await this.createEventHelper(userId, eventDetails, req, meet);
  
      try {
        const event = await this.service.createEvent(userId, newEvent, meet);
        res.sendSuccess(event, 'Event created successfully');
      } catch (error) {
        next(new AppError(`Error al crear el evento: ${error.message}`, 500));
      }
    } catch (error) {
      next(error);
    }
  }

  createEventClass = async (req, res, next) => {
    try {
      const idevent = req.params.cid;
      const userId = req.user._id;
      let eventDetails = validateFields(req.body, this.requieredfield.event);
      const { meet } = req.body;
  
      eventDetails.idevent = idevent || eventDetails.idevent;
  
      const newEvent = await this.createEventHelper(userId, eventDetails, req, meet);
      await this.service.updateClassEvent(req.params.cid, newEvent.id)

      try {
        const event = await this.service.createEvent(userId, newEvent, meet);
        res.sendSuccess(event, 'Event created successfully');
      } catch (error) {
        next(new AppError(`Error al crear el evento: ${error.message}`, 500));
      }
    } catch (error) {
      next(error);
    }
  }
}