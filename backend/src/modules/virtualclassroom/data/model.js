import { Schema, model} from 'mongoose'

const classSchema = new Schema({
  eventDetails: {
    id: String,
    htmlLink: String,
    hangoutLink: String,
    conferenceId: String,
    summary: String,
    description: String,
    start: {
      dateTime: Date,
      timeZone: String,
    },
    end: {
      dateTime: Date,
      timeZone: String,
    },
  }
});

const dataModel = model('event', classSchema);

export default dataModel
