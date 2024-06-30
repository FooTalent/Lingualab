class LastUpdateDTO {
  constructor(element) {
    this.things = {};
    Object.assign(this.things, element);
    this.things.lastupdated = Date();
    }
}

export default LastUpdateDTO