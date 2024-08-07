import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const CurrentTime = () => {
    const now = new Date();
    const formatDate = format(now, "EEEE d 'de' MMMM, yyyy - HH:mm 'hs'", { locale: es })
    const adaptedDate = formatDate.split(' ').map((item, index) => (index === 0 || index === 3 ? item.charAt(0).toUpperCase() + item.slice(1) : item)).join(' ')

    return (
        <div className='flex font-normal text-[14px] justify-end py-5'>
            {adaptedDate}
        </div>
    )
}

export default CurrentTime