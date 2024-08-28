export default function convertToUTC (dateString, isEndOfDay = false) {
  const time = isEndOfDay ? 'T23:59:59-03:00' : 'T00:00:00-03:00';
  const date = new Date(`${dateString}${time}`);
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
}

export const toUTC = (date, aux) => {
  if (date) {
    console.log("inicial: " + date);
    if (aux === "new") {
      return new Date(date).toISOString();
      // const localDate = new Date(date)
      // const UTCDate = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000)
      // const stringDate = UTCDate.toISOString();
      // console.log('Helper: ', stringDate)
      // return stringDate
    } else {
      return new Date(date);
    }
  }
  return date;
};