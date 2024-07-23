import { google } from 'googleapis'
import { googleEnv } from '../../config/env.js';
const OAuth2 = google.auth.OAuth2;

export const oauth2Client = new OAuth2(
  googleEnv.clienId,
  googleEnv.clientSecret,
  googleEnv.redirec
);

// Generar URL de autenticación
export const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/calendar']
});
