import configEnv from "../../../config/env.js";
import CustomService from "../../../libraries/customs/service.js";
import createToken from "../../../libraries/sessions/createToken.js";
import { createHashAsync, isValidPasswordAsync } from "../../../libraries/sessions/passwords.js";
import ThisDaoMongo from "../data/dao.mongo.js";

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
    if (userFound) throw new Error(`Ya existe un usuario con ese email. pruebe con otro`)
    return await this.dao.create(userData)
  }

  
  login = async (userData) => {
    // Admin Verification
    if (this.admins.includes(userData.email)) {
      if (await isValidPasswordAsync(userData.password, {password: this.admin_pass})) {
        const token = createToken({id: 0, role: "admin"})
        return {name: "Admin", token}
      } else {
        throw new Error(`Email o contraseña equivocado`);
      }
    }
    // User Verification
    const userFound = await this.dao.getBy({email: userData.email}, false);
    if (!userFound || !isValidPasswordAsync(userData.password, userFound)) {
      throw new Error(`Email o contraseña equivocado`);
    }

    const token = createToken({id: userFound._id, role: userFound.role})
    await this.dao.update({_id: userFound._id}, {connection: new Date()})
    return {name: userFound.first_name, token}
  }

  logout = async () => {}

  
}