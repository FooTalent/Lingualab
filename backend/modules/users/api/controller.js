import CustomController from "../../../libraries/customs/controller.js";
import validateFields from "../../../libraries/validatefiels.js";
import Service from "../logic/service.js";

export default class Controller extends CustomController {
  constructor() {
    super(new Service);
    this.requieredfield = {
      register: ['first_name', 'last_name', 'email', 'password'],
      login: ['email', 'password']
    }
  }

  del    = (req, res) => { res.sendSuccess({}, "DELETE"); }

  register = async (req, res) => {
    try {
      const userData = validateFields(req.body, this.requieredfield.register);
      await this.service.register(userData)
      res.sendSuccess({}, "Registro exitoso")
    } catch (error) { 
      req.logger.error(error);
      res.sendCatchError(error) }
  }

  login = async (req, res) => {
    const userData = validateFields(req.body, this.requieredfield.login);
    try {
      const {name, token} = await this.service.login(userData)
      res.sendSuccess({token}, "Log In exitoso con: " + name);
    } catch (error) {
      req.logger.error(error);
      res.sendCatchError(error)
    }
  }

  logout = async (req, res) => {
    this.service.logout()
    res.sendSuccess({},"Cerrado de Sesión existoso")
  }

  getUserSession = (req, res) => res.sendSuccess(req.user)

  userRecovery = async (req, res, next) => {
    try {    
      const { email } = req.body
      const resp = await this.service.userRecovery(email)
      res.sendSuccess(resp)
    } catch (error) {
      req.logger.error(error);
      next(error);
    }
  }

  userRecoveryPassword = async (req, res, next) => {
    try {
      let { password } = req.body
      await this.service.updatePassword(req.user.id, password)
      res.sendSuccess("User updated")
    } catch (error) {
      req.logger.error(error);
      next(error);
    }
  }
}