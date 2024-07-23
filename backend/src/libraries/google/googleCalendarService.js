import { google } from 'googleapis'
import { googleEnv, googleSA } from '../../config/env.js';

// Cuentas de servicio (servidor(backend) a servidor)
// https://www.geeksforgeeks.org/how-to-integrate-google-calendar-in-node-js/

const GOOGLE_PROJECT_NUMBER  = googleEnv.projectNumber
const GOOGLE_CALENDAR_ID = googleEnv.calendarId

const SCOPES = 'https://www.googleapis.com/auth/calendar';

const auth = new google.auth.JWT(
  googleSA.clientEmail,
  null,
  googleSA.privateKey,
  SCOPES
);


export const calendar = google.calendar({
  version: 'v3',
  // project: GOOGLE_PROJECT_NUMBER,
  auth: auth,
});

export async function listEvent() {
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
    return { message: 'No hay eventos encontrados' };
  }
}

export async function insertEvent(newEvent) {
  const response = await calendar.events.insert({
    calendarId: GOOGLE_CALENDAR_ID,
    resource: newEvent,
  });
  return { message: "Event successfully created!", event: response.data };
}