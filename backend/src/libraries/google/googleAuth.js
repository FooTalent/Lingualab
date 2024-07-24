import { google } from 'googleapis'
import { googleEnv } from '../../config/env.js';
const OAuth2 = google.auth.OAuth2;

// Configura el cliente Google OAuth2 con credenciales de variables de entorno
export const oauth2Client = new OAuth2(
  googleEnv.clienId,
  googleEnv.clientSecret,
  googleEnv.redirecUri
);

export const SCOPES = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'];