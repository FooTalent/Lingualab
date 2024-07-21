import { google } from 'googleapis'
import { googleEnv } from '../../config/env.js';

// Cuentas de servicio (servidor(backend) a servidor)
// https://www.geeksforgeeks.org/how-to-integrate-google-calendar-in-node-js/

// const GOOGLE_PROJECT_NUMBER  = googleEnv.projectNumber
// const GOOGLE_CALENDAR_ID     = googleEnv.calendarId
// const GOOGLE_PRIVATE_KEY     = googleEnv.googleServiceAcount.private_key
// const GOOGLE_CLIENT_EMAIL    = googleEnv.googleServiceAcount.client_email
// const GOOGLE_AUTH_KEYFILE    = JSON.stringify(googleEnv.googleServiceAcount, null, 2)

// El ÁMBITO define el nivel de autorización asociado con la llamada (restringe permisos)
const SCOPES = 'https://www.googleapis.com/auth/calendar';

export const oAuth2Client = new google.auth.OAuth2(
  googleEnv.clienId,
  googleEnv.clientSecret,
  googleEnv.redirec
)

// El cliente JWT se utilizará para emitir una solicitud a los servidores de Google.
// const jwtClient = new google.auth.JWT(
//   GOOGLE_CLIENT_EMAIL,
//   null,
//   GOOGLE_PRIVATE_KEY,
//   SCOPES
// )

// export const calendar = google.calendar({
//   version: 'v3',
//   project: GOOGLE_PROJECT_NUMBER,
//   auth: jwtClient // token de acceso
// });


export async function listEvent() {
  const url = oauthClient.generateAuthUrl({
    scope: SCOPES,
    access_type: 'offline',
  })
  console.log(oauthClient);
  return oauthClient;
  // const response = await calendar.events.list({
  //   calendarId: GOOGLE_CALENDAR_ID,
  //   timeMin: (new Date()).toISOString(),
  //   maxResults: 10,
  //   singleEvents: true,
  //   orderBy: 'startTime'
  // });
  // const events = response.data.items;

  // if (events.length) {
  //   return { events: events };
  // } else {
  //   return { message: 'No upcoming events found.' };
  // }
}

export async function insertEvent(newEvent) {
  const response = await calendar.events.insert({
    calendarId: GOOGLE_CALENDAR_ID,
    resource: newEvent,
  });
  return { message: "Event successfully created!", event: response.data };
}