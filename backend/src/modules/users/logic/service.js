import configEnv from "../../../config/env.js";
import CustomService from "../../../libraries/customs/service.js";
import createToken from "./createToken.js";
import { createHashAsync, isValidPasswordAsync } from "./passwords.js";
import ThisDaoMongo from "../data/dao.mongo.js";
import { sendMail } from "../../../libraries/emails/sendMail.js";
import AppError from "../../../config/AppError.js";

export default class Service extends CustomService {
  constructor() {
    super(new ThisDaoMongo);
    this.admins = configEnv.uadmins || []
    this.admin_pass = configEnv.uadmin_pass
  }

  get = async (filter, excludePassword = true )  => await this.dao.get   (filter, excludePassword)
  getBy = async (filter, excludePassword = true) => await this.dao.getBy (filter, excludePassword)

  register = async (userData) => {
    userData.password = await createHashAsync(userData.password)
    const userFound = await this.dao.getBy({email: userData.email});
    if (userFound) throw new AppError(`Ya existe un usuario con ese email. pruebe con otro`, 400)
    return await this.dao.create(userData)
  }

  
  login = async (userData) => {
    // Admin Verification
    if (this.admins.includes(userData.email)) {
      if (await isValidPasswordAsync(userData.password, this.admin_pass)) {
        const token = createToken({id: 0, role: "admin"})
        return {name: "Admin", token}
      } else {
        throw new AppError(`Email o contraseña equivocado`, 203);
      }
    }
    // User Verification
    const userFound = await this.dao.getBy({email: userData.email}, false);
    if (!userFound || !(await isValidPasswordAsync(userData.password, userFound.password))) {
      throw new AppError(`Email o contraseña equivocado`, 203);
    }

    const token = createToken({id: userFound._id, role: userFound.role})
    await this.dao.updateConection({_id: userFound._id})
    return {name: userFound.first_name, token}
  }

  logout = async () => {}

  userRecovery = async (email) => {    
    const userFound = await this.dao.getBy({email});
    const token = createToken({id: userFound._id, role: userFound.role}, '1h')

    const to = email
    const subject  = 'Recuperar Contraseña'
    const template = 'recoveryUser'
    const context = {
      user: { first_name: userFound.first_name, email: userFound.email},
      url: `${configEnv.cors_origin}/auth/new-password`,
      token
    }
    return sendMail( to, subject, template, context)
  }

  updatePassword = async (uid, password) => {
    password = await createHashAsync(password)
    return await this.dao.update({_id: uid}, {password, update: Date.now()})
  }

  updatePhoto = async (uid, path) => {
    return await this.dao.update({_id: uid}, {photo: path})
  }
}