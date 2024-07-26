import { google } from 'googleapis'
import { googleEnv, googleSA } from '../../config/env.js';

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
  auth: auth,
});

export async function listEvent() {
  const response = await calendar.events.list({
    calendarId: 'primary',
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