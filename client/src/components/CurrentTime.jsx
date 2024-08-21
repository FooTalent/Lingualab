import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const getUTCOffset = () => {
    const offsetMinutes = new Date().getTimezoneOffset() * -1;
    const sign = offsetMinutes >= 0 ? "+" : "-";
    const hours = Math.abs(offsetMinutes) / 60;
    const minutes = Math.abs(offsetMinutes) % 60;
    return `UTC${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

const CurrentTime = () => {
    const now = new Date();
    const formatDate = format(now, "EEEE d 'de' MMMM, yyyy - HH:mm", { locale: es });
    const adaptedDate = formatDate.split(' ').map((item, index) =>
        (index === 0 || index === 3 ? item.charAt(0).toUpperCase() + item.slice(1) : item)
    ).join(' ') + ' hs';

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const country = timeZone.split('/')[1].replace('_', ' ');
    const utcOffset = getUTCOffset();

    return (
        <div className='flex font-normal text-[14px] justify-end py-5'>
            {adaptedDate} / {country}
        </div>
    );
}

export default CurrentTime;