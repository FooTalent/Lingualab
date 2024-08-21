const gettingHourClass = (date, duration) => {
  let startDate = new Date(date)

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  }

  const start = startDate.toLocaleTimeString('en-EN', options)
  startDate.setHours(startDate.getHours() + duration)
  const end = startDate.toLocaleTimeString('en-EN', options)

  return `${start} - ${end}`
}

export default gettingHourClass