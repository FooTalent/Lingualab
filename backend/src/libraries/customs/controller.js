export default class CustomController {
  constructor(service, fieldAllowed = []) {
    this.service = service;
    this.fieldAllowed = fieldAllowed;
  }

  get    = async (req, res, next) => {
    try {
      const element = await this.service.get();
      res.sendSuccessOrNotFound(element);
    } catch (error) {
      next(error)
    }
  }

  getBy  = async (req, res, next) => {
    try {
      const {ekey, evalue} = req.query
      const filter = {}
      filter[ekey] = evalue;
      const element = await this.service.getBy(filter);
      res.sendSuccessOrNotFound(element);
    } catch (error) {
      next(error)
    }
  }

  getById  = async (req, res, next) => {
    try {
      const {eid} = req.params
      const element = await this.service.getBy({_id: eid});
      res.sendSuccessOrNotFound(element);
    } catch (error) {
      next(error)
    }
  }

  create = async (req, res, next) => {
    try {
      const newElement = req.body
      const element = await this.service.create(newElement);
      res.sendSuccess(element)
    } catch (error) {
      next(error)
    }
  }

  updateId = async (req, res, next) => {
    try {
      const {eid} = req.params
      const newElement = req.body
      const element = await this.service.update({_id: eid}, newElement);
      res.sendSuccess(element);
    } catch (error) {
      next(error)
    }
  }

  deleteId = async (req, res, next) => {
    try {
      const {eid} = req.params
      const element = await this.service.delete({_id: eid});
      res.sendSuccessOrNotFound(element);
    } catch (error) {
      next(error)
    }
  }

  getUniqueValue = async (req, res, next) => {
    try {
      const { field } = req.params;

      const allowedValue = this.fieldAllowed == [] ? true : this.fieldAllowed.includes(field)
      
      if (!allowedValue) {
        res.sendUserError('The searched field is not allowed');
      } else {
        const uniqueValues = await this.service.getUniquesValues(field);
        res.sendSuccess(uniqueValues);
      }
    } catch (error) {
      next(error)
    }
  }
}