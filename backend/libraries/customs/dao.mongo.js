export default class DaoMongo {
  constructor(model) {
    this.model = model;
  }

  get         = async (filter = {})           => await this.model.find(filter)
  getBy       = async (filter)                => await this.model.findOne(filter)
  getPaginate = async (filter, options)       => await this.model.paginate(filter, options);
  create      = async (newElement)            => await this.model.create(newElement)
  update      = async (filter, elementUpdate) => await this.model.findOneAndUpdate(filter, elementUpdate, {new: true})
  delete      = async (filter)                => await this.model.findOneAndDelete(filter, {new: true})
  exists      = async (filter)                => !!(await this.getBy(filter));
  getUniquesValues = async (field) => await this.model.distinct(field);
}