export const getTimezone = () => {
    const offset = new Date().getTimezoneOffset()
    const absOffset = Math.abs(offset)
    const hours = String(Math.floor(absOffset / 60)).padStart(2, '0')
    const minutes = String(absOffset % 60).padStart(2, '0')
    const sign = offset > 0 ? '-' : '+'
    return `${sign}${hours}:${minutes}`
}