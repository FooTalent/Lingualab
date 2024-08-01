import { google } from 'googleapis'
import CustomController from "../../../libraries/customs/controller.js";
import AppError from "../../../config/AppError.js";
import validateFields from "../../../libraries/utils/validatefiels.js";
import { googleEnv } from "../../../config/env.js";
import { oauth2Client, SCOPES } from "../../../libraries/google/googleAuth.js";
import Service from "../logic/service.js";
import { COUNTRY_TIMEZONES } from '../logic/timezoneMapping.js';

export default class Controller extends CustomController {
  constructor() {
    super(new Service);
    this.requieredfield = {
      register: ['first_name', 'last_name', 'email', 'password'],
      login: ['email', 'password'],
      event: [
        'summary',    // titulo
        'start',      // fecha hora de inicio
        'end',        // fecha hora fin
        'country',    // pais, usado para el timezone del horario
        'students'    // Un array de {email} Lista de asistentes
      ]
    }
  }

  getUserSession = (req, res) => res.sendSuccess(req.user)

  // SESSION TRADICIONAL
  register = async (req, res, next) => {
    const userData = validateFields(req.body, this.requieredfield.register);
    await this.service.register(userData)
    res.sendCreated({}, "Registro exitoso")
  }

  login = async (req, res, next) => {
    const userData = validateFields(req.body, this.requieredfield.login);

    const {name, token} = await this.service.login(userData)
    res.sendSuccess({token}, `Log In exitoso con: ${name}`);
  }

  logout = async (req, res) => {
    this.service.logout()
    res.sendSuccess({},"Cerrado de Sesión existoso")
  }

  // RECUPERACION DE CONTRASEÑA
  userRecovery = async (req, res, next) => {   
    const { email } = req.body
    const resp = await this.service.userRecovery(email)
    res.sendSuccess(resp)
  }

  userRecoveryPassword = async (req, res, next) => {
    let { password } = req.body
    await this.service.updatePassword(req.user.id, password)
    res.sendSuccess("User updated")
  }

  // SUBIR FOTO PERFIL
  uploadPhoto = async (req, res, next) => {
    try {
      const filePath = req.file ? req.file.path.split('public').join('') : null
      await this.service.updatePhoto(req.user.id, filePath)
      res.sendSuccess("Photo uploaded")
    } catch (error) {
      next(error)
    }
  }

  // GOOGLE
  googleAuth = (req, res) => {   
    // Generar URL de autenticación
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline', // Solicitar acceso sin conexión para recibir un token de actualización
      scope: SCOPES,
      redirect_uri: googleEnv.redirecUri
    });
    res.redirect(url);
  }

  googleRedirect = (req, res, next) => {
    const code = req.query.code;

    oauth2Client.getToken(code, async (err, tokens) => {

      if (err) { return next(new AppError(`No se pudo obtener el token de google \n ${err}`,500)); }
      
      oauth2Client.setCredentials(tokens);
            
      try {
        // Obtener información del perfil de Google y manejar el registro/login
        const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
        const { data } = await oauth2.userinfo.get();
        const {name, token} =  await this.service.googleLoginOrRegister(data, tokens);
        res.send(`
          <html>
            <script>
              window.opener.postMessage({ token: "${token}" }, "*");
              window.close();
            </script>
          </html>
        `);
      } catch (error) {
        next(new AppError(`Error al obtener información del usuario de Google \n ${error}`, 500));
      }
    });
  }

  createEvent = async (req, res, next) => {
    const userId = req.user._id;
    let eventDetails = validateFields(req.body, this.requieredfield.event); // devuelve los campos valdiados sino un error indicando los faltantes - no incluye extras
    
    const timeZone = COUNTRY_TIMEZONES[eventDetails.country];
    if (!timeZone) {
      throw new AppError(`País invalido: ${eventDetails.country}`, 400);
    }

    const { description, location, reminders } = req.body;
    
    const newEvent = {
      summary:      eventDetails.summary,
      location:     location || '', // Ubicación por defecto vacía
      description:  description || '', // Descripción por defecto vacía
      start: {
        dateTime:   new Date(eventDetails.start).toISOString(),
        timeZone,
      },
      end: {
        dateTime:   new Date(eventDetails.end).toISOString(),
        timeZone,
      },
      reminders: {
        useDefault: false,
        overrides: reminders || [
          { method: 'email', minutes: 15 },
          { method: 'popup', minutes: 15 },
        ],
      },
      attendees: [{ email: req.user.email }],  //...eventDetails.students
    };

    console.log(req.user);
    try {
      const event = await this.service.createEvent(userId, newEvent);
      res.sendSuccess(event, 'Event created successfully');
    } catch (error) {
      next(new AppError(`Error al crear el evento: ${error.message}`, 500));
    }




    // const result = await insertEvent(newEvent);
    // res.sendSuccess(result.event, result.message);
  }

  //STUDIANTES
  getStudent = async (req, res, next) => {
    const {tid} = req.params

    const element = await this.service.get({role: 'Student'});
    res.sendSuccessOrNotFound(element);
  }
}