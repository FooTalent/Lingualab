export default class CustomController {
  constructor(service, fieldAllowed = []) {
    this.service = service;
    this.fieldAllowed = fieldAllowed;
  }

  get    = async (req, res) => {
    const element = await this.service.get();
    res.sendSuccessOrNotFound(element);
  }

  getBy  = async (req, res) => {
    const {ekey, evalue} = req.query
    const filter = {}
    filter[ekey] = evalue;
    const element = await this.service.getBy(filter);
    res.sendSuccessOrNotFound(element);
  }
  getById  = async (req, res) => {
    const {eid} = req.params
    const element = await this.service.getBy({_id: eid});
    res.sendSuccessOrNotFound(element);
  }

  create = async (req, res) => {
    const newElement = req.body
    const element = await this.service.create(newElement);
    res.sendSuccess(element)
  }

  updateId = async (req, res) => {
    const {eid} = req.params
    const newElement = req.body
    const element = await this.service.update({_id: eid}, newElement);
    res.sendSuccess(element);
  }

  deleteId = async (req, res) => {
    const {eid} = req.params
    const element = await this.service.delete({_id: eid});
    res.sendSuccessOrNotFound(element);
  }

  getUniqueValue = async (req, res) => {
    const { field } = req.params;

    const allowedValue = this.fieldAllowed == [] ? true : this.fieldAllowed.includes(field)
    
    if (!allowedValue) {
      res.sendUserError('The searched field is not allowed');
    } else {
      const uniqueValues = await this.service.getUniquesValues(field);
      res.sendSuccess(uniqueValues);
    }
  }
}