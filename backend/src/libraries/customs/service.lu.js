import LastUpdateDTO from './dto.lastupdate.js';

class CustomServiceLU {
  constructor(dao) {
    this.dao = dao;
  }
  get    = async (filter)             => await this.dao.get(filter)
  getBy  = async (filter)             => await this.dao.getBy(filter)
  create = async (newElement)         => await this.dao.create(newElement)
  update = async (filter, elementUpdate) => {
    const elementToUpdate = (new LastUpdateDTO(elementUpdate)).things;
    return await this.dao.update(filter, elementToUpdate)}
  delete = async (filter)                => await this.dao.delete(filter)
  exists = async (filter)             => await this.dao.exists(filter)
}

export default CustomServiceLU