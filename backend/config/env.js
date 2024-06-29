import dotenv from 'dotenv';

dotenv.config({})

const configEnv = {
  port: process.env.PORT,
  cors_origin: process.env.CORS_ORIGIN,

  mongo_uri: process.env.MONGO_URI,

  jwt_code: process.env.JWT_SECRET_CODE,
}

export default configEnv;
