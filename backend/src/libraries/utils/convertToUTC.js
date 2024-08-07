export default function convertToUTC (dateString, isEndOfDay = false) {
  const time = isEndOfDay ? 'T23:59:59-03:00' : 'T00:00:00-03:00';
  const date = new Date(`${dateString}${time}`);
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
}

export const toUTC = (date) => {
  if (date) {
    return new Date(date).toISOString();
  }
  return date;
};