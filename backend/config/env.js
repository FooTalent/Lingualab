import dotenv from 'dotenv';

dotenv.config({})

const configEnv = {
  port: process.env.PORT,
  cors_origin: process.env.CORS_ORIGIN,

  mongo_uri: process.env.MONGO_URI,

  uadmins: process.env.USERS_ADMIN,
  uadmin_pass: process.env.USER_ADMIN_PASS,

  jwt_code: process.env.JWT_SECRET_CODE,
}

export default configEnv;
