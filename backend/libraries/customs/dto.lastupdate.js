class LastUpdateDTO {
  constructor(element) {
    this.things = {};
    Object.assign(this.things, element);
    this.things.updated = Date();
    }
}

export default LastUpdateDTO