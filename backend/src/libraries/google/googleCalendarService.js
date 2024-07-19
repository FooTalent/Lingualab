import { configDotenv } from 'dotenv'
import { google } from 'googleapis'

configDotenv();

const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL
const GOOGLE_PROJECT_NUMBER  = process.env.GOOGLE_PROJECT_NUMBER
const GOOGLE_CALENDAR_ID  = process.env.GOOGLE_CALENDAR_ID
const GOOGLE_APPLICATION_CREDENTIALS = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// El ÁMBITO define el nivel de autorización asociado con la llamada a la API mediante el cliente JWT. Dado que primero mostraremos los próximos eventos, el ÁMBITO es de “solo lectura”.
//const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const SCOPES = 'https://www.googleapis.com/auth/calendar';

// El cliente JWT se utilizará para emitir una solicitud a los servidores de Google.
const jwtClient = new google.auth.JWT(
  GOOGLE_CLIENT_EMAIL,
  null,
  GOOGLE_PRIVATE_KEY,
  SCOPES
)
// El servidor de Google devolverá un token de acceso.

// Este token de acceso se utilizará para llamar a la API de Google.
// Defina un objeto de calendario utilizando el número de proyecto y el cliente JWT.
export const calendar = google.calendar({
  version: 'v3',
  project: GOOGLE_PROJECT_NUMBER,
  auth: jwtClient
});

// Declarar ruta de inicio mostrará 10 eventos próximos agregados al calendario ordenados por hora de inicio. Si no hay ningún evento programado para una fecha futura o actual, se mostrará "No se encontraron eventos próximos".
// Se accede a los eventos mediante calendar.events.list. Los resultados devueltos a partir de esta llamada se devolverán al navegador mediante JSON.stringify.

export async function listEvent() {
  try {
    const response = await calendar.events.list({
      calendarId: GOOGLE_CALENDAR_ID,
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime'
    });
    const events = response.data.items;

    if (events.length) {
      return { events: events };
    } else {
      return { message: 'No upcoming events found.' };
    }
  } catch (error) {
    return { error: error.message };
  }
}

export async function insertEvent(newEvent) {
  try {
    const response = await calendar.events.insert({
      auth: jwtClient,
      calendarId: GOOGLE_CALENDAR_ID,
      resource: newEvent,
    });
    console.log('Event created: %s', response.data);
    return { message: "Event successfully created!", event: response.data };
  } catch (err) {
    console.error('There was an error contacting the Calendar service: ' + err);
    return { error: err.message };
  }
}