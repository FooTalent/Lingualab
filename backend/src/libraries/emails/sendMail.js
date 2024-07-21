import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import __dirname from '../utils/dirname.js';
import configEnv from '../../config/env.js';

const user = configEnv.gmail_user_name;
const email = configEnv.gmail_user_app;
const password = configEnv.gmail_pass_app;

// Congiguración

const transport = nodemailer.createTransport({
  service: 'gmail', //host: smt.gmail.com
  port: 587,        // 465 + secure: true,
  auth: {
    user: email,
    pass: password
  },
  tls: {
      rejectUnauthorized: false
  }
})
  
const hbsoptions = {
  viewEngine: {
    extname: 'hbs',
    partialsDir: `${__dirname}/src/libraries/emails/templates/`,
    defaultLayout: false,
  },
  viewPath: `${__dirname}/src/libraries/emails/templates/`,
  extName: '.hbs',
}

transport.use('compile', hbs(hbsoptions))

// Funciones

export const sendMail = ( to, subject, template, context = {}) => {
  const mailOptions = {
    from: `${user} <${email}>`,
    to,
    subject,
    template, // nombre del archivo de la plantilla sin extensión
    context // otros datos que quieras pasar a la plantilla
  }

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error(error)
    } else {
      return `The email was sent: ${info.response}`
    }

  })
}