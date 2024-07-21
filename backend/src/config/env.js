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

const googleServiceAcount = {
  type: process.env.GOOGLE_SA_TYPE,
  project_id: process.env.GOOGLE_SA_PROJECT_ID,
  private_key_id: process.env.GOOGLE_SA_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_SA_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_SA_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_SA_CLIENT_ID,
  auth_uri: process.env.GOOGLE_SA_AUTH_URI,
  token_uri: process.env.GOOGLE_SA_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GOOGLE_SA_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.GOOGLE_SA_CLIENT_X509_CERT_URL,
  universe_domain: process.env.GOOGLE_SA_UNIVERSE_DOMAIN,
}

export const googleEnv = {
  clienId : process.env.GOOGLE_CLIENT_ID,
  clientSecret : process.env.GOOGLE_CLIENT_SECRET,
  origin : process.env.GOOGLE_ORIGIN,
  redirec : process.env.GOOGLE_REDIREC,
  projectNumber : process.env.GOOGLE_PROJECT_NUMBER,
  calendarId : process.env.GOOGLE_CALENDAR_ID,
  testUser: process.env.USUARIO_PRUEBA,
  googleServiceAcount
}
export default configEnv;
