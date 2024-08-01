import dotenv from 'dotenv';

dotenv.config()

const configEnv = {
  port: process.env.PORT,
  cors_origin: process.env.CORS_ORIGIN,
  mongo_uri: process.env.MONGO_URI,

  // users module
  jwt_code: process.env.JWT_SECRET_CODE,
  uadmins: process.env.USERS_ADMIN,
  uadmin_pass: process.env.USER_ADMIN_PASS,

  // email module
  gmail_user_name: process.env.GMAIL_USER_NAME,
  gmail_user_app: process.env.GMAIL_USER_APP,
  gmail_pass_app: process.env.GMAIL_PASS_APP,
}

export const googleEnv = {
  clientId : process.env.GOOGLE_CLIENT_ID,
  clientSecret : process.env.GOOGLE_CLIENT_SECRET,
  origin : process.env.GOOGLE_ORIGIN,
  redirecUri : process.env.GOOGLE_REDIREC,
  projectNumber : process.env.GOOGLE_PROJECT_NUMBER,
  calendarId : process.env.GOOGLE_CALENDAR_ID,
  testUser: process.env.USUARIO_PRUEBA,
}

export const googleSA = {
  privateKey: process.env.GOOGLE_SA_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.GOOGLE_SA_CLIENT_EMAIL,
  projectId: process.env.GOOGLE_SA_PROJECT_ID,
}
export default configEnv;
