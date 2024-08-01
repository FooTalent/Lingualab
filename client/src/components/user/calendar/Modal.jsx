import React, { useEffect, useState } from 'react'
import ClassList from '../classes/ClassList';
import ModalHeader from './ModalHeader';
import dayjs from 'dayjs'

export default function Modal({ open, setOpen, onNavigate, label, data, selectedDay }) {
  const [dayClasses, setDayClasses] = useState([])
  const now = dayjs()

  useEffect(() => {
    isToday(data)
  }, [selectedDay])

  const handleDate = (item) => {
    const start = dayjs(item.daytime);
    const durationHours = Math.trunc(item.duration_hours);
    const durationMinutes = (item.duration_hours - durationHours) * 60;
    const end = start.add(durationHours, 'hour').add(durationMinutes, 'minute');

    return `${start.format('h:mm')} hs : ${end.format('h:mm')} hs`
  }

  const isToday = (clases) => {
    let newClasses = []
    setDayClasses(newClasses)

    if (clases.length) {
      clases.map((clase) => {
        let adaptedDate = dayjs(clase.daytime).toDate()
        let formattedDate = dayjs(adaptedDate).format('DD/MM/YYYY');
        let formattedSelectedDay = dayjs(selectedDay).format('DD/MM/YYYY');
        let checkIsNow = dayjs(clase.daytime).diff(now, 'hours') < 1 ? true : false

        clase.duration_card = handleDate(clase)
        clase.isNow = checkIsNow

        if (formattedDate == formattedSelectedDay) {
          newClasses.push(clase)
          setDayClasses([...newClasses])
          return true

        } else {
          return false
        }
      })
    } else {
      return false
    }
  }

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className='fixed z-10 inset-0 flex clases-center justify-center py-5'>
      <div className='absolute inset-0 bg-card bg-opacity-50'></div>
      <div className='m-auto p-6 bg-white shadow-modal rounded-2xl w-4/12 h-4/6 z-10'>
        <ModalHeader handleOpen={handleOpen} label={label} onNavigate={onNavigate} />

        <div className='px-4 py-2 flex flex-col gap-6 h-4/6 overflow-y-scroll'>
          {
            dayClasses.length
              ? <ClassList dayClases={dayClasses} selectedDay={selectedDay} />
              : <h4 className='m-auto py-10'>No hay clases para el día seleccionado</h4>
          }
        </div>
      </div>
    </div>
  )
}
