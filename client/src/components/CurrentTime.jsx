import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const CurrentTime = () => {
    const now = new Date();
    const formatDate = format(now, "EEEE d 'de' MMMM, yyyy - HH:mm 'hs'", { locale: es })

    return (
        <div className='flex font-normal text-[14px] justify-end px-28 py-5'>
            {formatDate}
        </div>
    )
}

export default CurrentTime
