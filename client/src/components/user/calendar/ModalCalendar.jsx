import React, { useEffect, useState } from 'react';
import ClassList from '../classes/ClassList';
import ModalHeader from './ModalHeader';
import dayjs from 'dayjs';
import sinClases from '/ImagesCalendar/SinClasesCalendario.png'

export default function ModalCalendar({ open, setOpen, onNavigate, label, data, selectedDay, openModalDelete, confirmDelete }) {
  const [dayClasses, setDayClasses] = useState(null);
  const [openOptions, setOpenOptions] = useState(null);

  useEffect(() => {
    const filterClassesByDate = () => {
      let newClasses = [];

      if (data && data.length) {
        newClasses = data.filter((clase) => {
          const formattedDate = dayjs(clase.daytime).format('YYYY/MM/DD');
          const formattedSelectedDay = dayjs(selectedDay).format('YYYY/MM/DD');
          return formattedDate === formattedSelectedDay;
        }).map((clase) => {
          const start = new Date(clase.daytime);
          const end = new Date(start);
          end.setHours(start.getHours() + 1);
          return {
            ...clase,
            duration_card: handleDate(start, end),
          };
        });
      }

      setDayClasses(newClasses);
    };

    filterClassesByDate();
  }, [data, selectedDay]);

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [open]);

  const handleDate = (start, end) => {
    let formattedStart = dayjs(start)
    let formattedEnd = dayjs(end)

    return `${formattedStart.format('HH:mm')} hs : ${formattedEnd.format('HH:mm')} hs`;
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
    <div className='fixed z-20 inset-0 flex items-center justify-center py-5'>
      <div
        className='absolute inset-0 bg-card bg-opacity-50'
        onClick={handleOutsideClick}
      ></div>
      <div className='m-auto flex flex-col gap-6 z-20 p-6 bg-white shadow-modal rounded-2xl w-4/12 h-4/6'>
        <ModalHeader
          handleOpen={handleOpen}
          label={label}
          onNavigate={onNavigate}
        />

        <div className='px-4 py-2 flex flex-col gap-6 h-4/6 overflow-y-auto scrollbar'>
          {dayClasses && dayClasses.length > 0 ? (
            <ClassList
              data={dayClasses}
              toggleOptions={toggleOptions}
              stateOption={openOptions}
              openModal={openModalDelete}
              confirmDelete={confirmDelete}
            />
          ) : (
            <img src={sinClases} alt="No tienes clases programadas" className='m-auto' />
          )}
        </div>
      </div>
    </div>
  );
}
