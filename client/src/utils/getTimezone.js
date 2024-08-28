import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const getClientTimezone = () => {
    return dayjs.tz.guess()
}

export const convertToClientTimezone = (dateTime) => {
    const timezone = getClientTimezone()
    const zonedTime = dayjs(dateTime).tz(timezone)
    return zonedTime.format()
}

export const formatDatetime = (date, time) => {
    const localDateTime = `${date}T${time}`
    return convertToClientTimezone(localDateTime)
}