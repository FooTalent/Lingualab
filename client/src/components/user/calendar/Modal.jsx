import React, { useEffect, useState } from 'react';
import ClassList from '../classes/ClassList';
import ModalHeader from './ModalHeader';
import dayjs from 'dayjs';
import sinClases from '/ImagesCalendar/SinClasesCalendario.png'

export default function Modal({ open, setOpen, onNavigate, label, data, selectedDay }) {
  const [dayClasses, setDayClasses] = useState([]);
  const [openOptions, setOpenOptions] = useState(null);
  const now = dayjs();

  useEffect(() => {
    isToday(data);
  }, [selectedDay]);

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [open]);

  const handleDate = (item) => {
    const start = dayjs(item.daytime);
    const durationHours = Math.trunc(item.duration_hours);
    const durationMinutes = (item.duration_hours - durationHours) * 60;
    const end = start.add(durationHours, 'hour').add(durationMinutes, 'minute');

    return `${start.format('HH:mm')} hs : ${end.format('HH:mm')} hs`;
  };

  const isToday = (clases) => {
    let newClasses = [];

    if (clases.length) {
      clases.forEach((clase) => {
        let formattedDate = dayjs(clase.daytime).format('YYYY/MM/DD');
        let formattedSelectedDay = dayjs(selectedDay).format('YYYY/MM/DD');

        if (formattedDate === formattedSelectedDay) {
          const start = new Date(clase.daytime)
          const end = new Date(start)
          end.setHours(start.getHours() + 1)

          clase.duration_card = handleDate(clase);
          clase.isNow = checkIsNow;

          newClasses.push(clase);
        }

      });
    }

    setDayClasses(newClasses);
  };

  const handleOpen = () => {
    setOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
      setOpenOptions(null);
    }
  };

  const toggleOptions = (id) => {
    setOpenOptions(openOptions === id ? null : id);
  };

  if (!open) return null;

  return (
    <div className='fixed z-10 inset-0 flex items-center justify-center py-5'>
      <div
        className='absolute inset-0 bg-card bg-opacity-50'
        onClick={handleOutsideClick}
      ></div>
      <div className='m-auto z-10 p-6 bg-white shadow-modal rounded-2xl w-4/12 h-4/6'>
        <ModalHeader
          handleOpen={handleOpen}
          label={label}
          onNavigate={onNavigate}
        />

        <div className='px-4 py-2 flex flex-col gap-6 h-4/6 overflow-y-auto scrollbar'>
          {dayClasses && dayClasses.length > 0 ? (
            <ClassList
              dayClasses={dayClasses}
              toggleOptions={toggleOptions}
              stateOption={openOptions}
            />
          ) : (
            <img src={sinClases} alt="No tienes clases programadas" className='m-auto' />
          )}
        </div>
      </div>
    </div>
  );
}
