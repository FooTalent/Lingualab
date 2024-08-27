import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { dayjsLocalizer } from 'react-big-calendar';
import ClassCalendar from '../../components/user/calendar/ClassCalendar';
import ModalCalendar from '../../components/user/calendar/ModalCalendar';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { Toast } from '../../utils/toast';
import { deleteClass, getClassesByTeacherAndDate } from '../../services/programs.services'
import popUp from '/ImagesVCR/EliminarAula.png'
import ButtonModal from '../../components/Form/ButtonModal';
import Modal from '../../components/Modal';
import AddStudentForm from '../../components/AddStudentForm';
import { inviteStudent } from '../../services/students.services';
import NewStudent from '/ImagesStudent/AgregasteUnAlumno.png'
import Spinner from '../../components/Spinner/Spinner';

dayjs.locale('es');
const localizer = dayjsLocalizer(dayjs);

export default function Calendario() {
    const { user, userDetail } = useAppStore()
    const [classes, setClasses] = useState([])
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [inviteModal, setInviteModal] = useState(false);
    const [modalNewStudent, setModalNewStudent] = useState(false)
    const [classIdToDelete, setClassIdToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [classroomIdToInvite, setClassroomIdToInvite] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        fetchTeacherClasses()
    }, [])

    const fetchTeacherClasses = async () => {
        // startDate=2024-07-01&endDate=2024-08-01
        const newClasses = await getClassesByTeacherAndDate(user.token, userDetail._id, '')
        if (!newClasses.isError) {
            setClasses(newClasses.data);
            setIsLoading(false)
        } else {
            Toast.fire({
                title: 'No ha sido posible obtener las clases',
                icon: 'error'
            })
        }
    }

    const handleDate = (date) => {
        return dayjs(date).format('dddd D [-] MMMM [-] YYYY')
            .split(' ')
            .map((item, index) => (index === 0 || index === 3 ? item.charAt(0).toUpperCase() + item.slice(1) : item))
            .join(' ');
    };

    const handleNavigate = (action, view) => {
        const newDate = action === 'PREV' ? dayjs(date).subtract(1, view).toDate()
            : action === 'NEXT' ? dayjs(date).add(1, view).toDate()
                : new Date();
        setDate(newDate);
    };

    const handleSelectSlot = (e) => {
        setDate(dayjs(e.start).toDate());
        setOpen(true);
    };

    const handleDelete = (classId) => {
        setOpen(false);
        setDeleteModal(true);
        setClassIdToDelete(classId);
    }

    const handleInvite = (classroomId) => {
        setOpen(false);
        setInviteModal(true);
        setClassroomIdToInvite(classroomId)
    }

    const handleCancelDelete = () => {
        setDeleteModal(false)
        setOpen(true)
    }

    const handleCancelInvite = () => {
        setInviteModal(false)
        setOpen(true)
    }

    const handleConfirmDelete = async () => {
        if (!classIdToDelete) return;

        try {
            const response = await deleteClass(user.token, classIdToDelete);
            if (!response.isError) {
                Toast.fire({
                    title: 'Clase eliminada con éxito',
                    icon: 'success',
                });
                setDeleteModal(false);
                setOpen(true);
                fetchTeacherClasses();
            } else {
                Toast.fire({
                    title: 'No se pudo eliminar la clase',
                    icon: 'error',
                });
            }
        } catch (error) {
            Toast.fire({
                title: 'Error en la solicitud de eliminación',
                icon: 'error',
            });
        }
    }

    const handleAddOneMoreStudent = async (newStudent) => {
        if (!classroomIdToInvite) return
        const data = {...newStudent, clasroomId: classroomIdToInvite}
        try {
            const addedStudent = await inviteStudent(user.token, data);
            if (addedStudent.isError === false) {
                setModalNewStudent(true)
                setTimeout(() => {
                    setModalNewStudent(false)
                    setOpen(true)
                }, 2000)
            }
            setInviteModal(false);
        } catch (error) {
            console.error('Error al agregar al alumno', error);
        }
    };

    if (isLoading) return (
        <div className='flex justify-center items-center min-h-80'>
            <Spinner />
        </div>
    )

    return (
        <>
            <main className='container mx-auto flex flex-col gap-8 min-h-screen'>
                <ClassCalendar
                    localizer={localizer}
                    date={date}
                    handleNavigate={handleNavigate}
                    handleSelectSlot={handleSelectSlot}
                    handleDate={handleDate}
                    data={classes}
                />
            </main>

            <ModalCalendar
                open={open}
                setOpen={setOpen}
                onNavigate={handleNavigate}
                label={handleDate(date)}
                data={classes}
                selectedDay={date}
                openModalDelete={handleDelete}
                openModalInvite={handleInvite}
            />

            <Modal modalSize={'xsmall'} isOpen={deleteModal}>
                <div className='flex flex-col gap-8'>
                    <div className="flex justify-center ">
                        <img src={popUp} alt="Eliminar aula" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <ButtonModal buttonAction={handleCancelDelete} type={'prev'} label={'Cancelar'} />
                        <ButtonModal buttonAction={handleConfirmDelete} label={'Eliminar aula'} />
                    </div>
                </div>
            </Modal>

            <Modal isOpen={inviteModal} onClose={handleCancelInvite} title="Asignar Estudiante" modalSize='small'>
                <AddStudentForm
                    onSubmit={handleAddOneMoreStudent}
                    onClose={handleCancelInvite}
                />
            </Modal>

            <Modal isOpen={modalNewStudent} modalSize='xsmall'>
                <div className="flex justify-center">
                    <img src={NewStudent} alt="Agregaste un alumno" />
                </div>
            </Modal>
        </>
    );
}