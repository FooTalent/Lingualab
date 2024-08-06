import { google } from 'googleapis'
import CustomController from "../../../libraries/customs/controller.js";
import validateFields from "../../../libraries/utils/validatefiels.js";
import { googleEnv } from "../../../config/env.js";
import { oauth2Client, SCOPES } from "../../../libraries/google/googleAuth.js";
import Service from "../logic/service.js";
import { COUNTRY_TIMEZONES } from '../logic/timezoneMapping.js';
import AppError from '../../../config/AppError.js';

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

  currentUpdate = async (req, res, next) => {
    try{
      let { updateUser } = req.body
      const updatedUser = await this.service.update(req.user._id, updateUser)
      res.sendSuccess(updatedUser)
    } catch(error) {
      next(error)
    }
  }

  // SESSION TRADICIONAL
  register = async (req, res, next) => {
    try{
      const userData = validateFields(req.body, this.requieredfield.register);
      await this.service.register(userData)
      res.sendCreated({}, "Registro exitoso")
    } catch(error) {
      next(error)
    }
  }

  login = async (req, res, next) => {
    try{
      const userData = validateFields(req.body, this.requieredfield.login);

      const {name, token} = await this.service.login(userData)
      res.sendSuccess({token}, `Log In exitoso con: ${name}`);
    } catch(error) {
      next(error)
    }
  }

  // RECUPERACION DE CONTRASEÑA
  userRecovery = async (req, res, next) => {   
    try{
      const { email } = req.body
      const resp = await this.service.userRecovery(email)
      res.sendSuccess(resp)
    } catch(error) {
      next(error)
    }
  }

  userRecoveryPassword = async (req, res, next) => {
    try{
      let { password } = req.body
      await this.service.updatePassword(req.user._id, password)
      res.sendSuccess("User updated")
    } catch(error) {
      next(error)
    }
  }

    // GOOGLE
  googleAuth = (req, res) => {  
    try{ 
      // Generar URL de autenticación
      const url = oauth2Client.generateAuthUrl({
        access_type: 'offline', // Solicitar acceso sin conexión para recibir un token de actualización
        scope: SCOPES,
        redirect_uri: googleEnv.redirecUri
      });
      res.redirect(url);
    } catch(error) {
      next(error)
    }
  }

  googleRedirect = (req, res, next) => {
    try{

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
    } catch(error) {
      next(error)
    }
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

  // CREAR EVENTO GOOGLE
  createEvent = async (req, res, next) => {
    try{
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
    } catch(error) {
      next(error)
    }
    // const result = await insertEvent(newEvent);
    // res.sendSuccess(result.event, result.message);
  }

  // ESTUDIANTES
  getStudent = async (req, res, next) => {
    try{
      const tid = req.user._id

      const element = await this.service.get({role: 'Student'});
      // TODO
      //const element = await this.service.get({teacher: tid});
      res.sendSuccessOrNotFound(element);
    } catch(error) {
      next(error)
    }
  }
  updateStudent = async (req, res, next) => {
    try{
      const {sid} = req.params
      const updateUser = req.body
      const exist = await this.service.getBy({_id: sid, teacher: req.user._id})
      if (!exist) throw new AppError("Id de Estudiante no hallado en este profesor",400)

      const updatedUser = await this.service.update({_id: sid}, updateUser)
      res.sendSuccess(updatedUser)
    } catch(error) {
      next(error)
    }
  }
}