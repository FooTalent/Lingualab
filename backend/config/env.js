import dotenv from 'dotenv';

dotenv.config({})

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

export default configEnv;
