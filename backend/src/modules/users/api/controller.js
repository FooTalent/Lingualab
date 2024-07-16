import CustomController from "../../../libraries/customs/controller.js";
import validateFields from "../../../libraries/utils/validatefiels.js";
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

  register = async (req, res, next) => {
    const userData = validateFields(req.body, this.requieredfield.register);
    await this.service.register(userData)
    res.sendCreated({}, "Registro exitoso")
  }

  login = async (req, res, next) => {
    const userData = validateFields(req.body, this.requieredfield.login);

    const {name, token} = await this.service.login(userData)
    res.sendSuccess({token}, `Log In exitoso con: ${name}`);
  }

  logout = async (req, res) => {
    this.service.logout()
    res.sendSuccess({},"Cerrado de Sesión existoso")
  }

  getUserSession = (req, res) => res.sendSuccess(req.user)

  userRecovery = async (req, res, next) => {   
    const { email } = req.body
    const resp = await this.service.userRecovery(email)
    res.sendSuccess(resp)
  }

  userRecoveryPassword = async (req, res, next) => {
    let { password } = req.body
    await this.service.updatePassword(req.user.id, password)
    res.sendSuccess("User updated")
  }

  uploadPhoto = async (req, res, next) => {
    try {
      const filePath = req.file ? req.file.path.split('join').join('') : null
      await this.service.updatePhoto(req.user.id, filePath)
      res.sendSuccess("Photo uploaded")
    } catch (error) {
      next(error)
    }
  }
}