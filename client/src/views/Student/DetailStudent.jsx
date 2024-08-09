import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { getReviews, getStudentsById } from '../../services/students.services';
import { Link, useParams } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { crearURLCompleta } from '../../utils/urifoto';

const DetailStudent = () => {
    const { user } = useAppStore();
    const { studentId } = useParams()
    const [student, setStudent] = useState({});
    const [info, setInfo] = useState([])
    const [opcion, setOpcion] = useState("")
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        const fetchStudents = async () => {
            const filter = { eid: studentId }
            const res = await getReviews(user.token, filter)
            setInfo(res.data)
            const resStudent = await getStudentsById(user.token, studentId)
            setStudent(resStudent.data)
        }
        fetchStudents();
    }, [user, studentId]);

    const handleState = (e) => {
        setOpcion(e.target.value);
    };

    const handleScore = () => {
        setEdit(false)
    }

    return (
        <div className='flex flex-col'>
            <div className='flex justify-between'>
                <Link
                    to='/student'
                >
                    <button
                        className='flex rounded-md border-darkGray items-center font-medium text-lg w-28 h-12 border p-3 gap-4 text-darkGray'>
                        <FaLongArrowAltLeft className='w-6 h-6' />
                        Volver
                    </button>
                </Link>
                <div className='flex w-[254px] gap-4'>
                    {student.photo ? (
                        <img className='w-fit-[50px] h-fit-[50px] rounded-full' src={crearURLCompleta(student.photo)} />
                    ) : (
                        <span className='flex justify-center items-center font-bold w-[50px] h-[50px] rounded-full bg-Yellow uppercase'>{student?.first_name?.charAt(0) + student?.last_name?.charAt(0)}</span>
                    )}
                    <div className='flex flex-col'>
                        <span className='text-xl font-medium'>{student.first_name} {student.last_name}</span>
                        <span className='text-lg font-normal'>{student.level}</span>
                    </div>
                </div>
                {edit === true ? (
                    <button
                        onClick={handleScore}
                        className="ml-2 bg-black text-white px-4 py-2 rounded-lg flex items-center">
                        <EditIcon className="mr-2" />
                        Guardar
                    </button>
                ) : (
                    <button
                        onClick={() => setEdit(true)}
                        className="ml-2 bg-black text-white px-4 py-2 rounded-lg flex items-center">
                        <EditIcon className="mr-2" />
                        Editar
                    </button>
                )}
            </div>
            <table className="flex flex-col w-full bg-white gap-4 mx-auto mt-10">
                <thead className='border rounded-xl border-Purple mx-auto w-full gap-6'>
                    <tr className='flex justify-between w-full py-6 px-4'>
                        <th className='w-[160px]'>Clase/Examen</th>
                        <th className='w-[160px]'>Oral</th>
                        <th className='w-[160px]'>Escrito</th>
                        <th className='w-[160px]'>Lectura</th>
                        <th className='w-[170px]'>Estado</th>
                    </tr>
                </thead>
                <tbody className='border rounded-xl border-Purple mx-auto w-full gap-6 px-4'>
                    {info?.length > 0 ? (
                        info.map((classes, index) => (
                            <tr
                                key={classes._id}
                                className={`border-b ${index === 0 ? 'rounded-t-xl' : ''
                                    } ${index === classes.length - 1 ? 'border-none' : ''
                                    } flex justify-between items-center w-full py-6 border-Purple gap-6`}
                            >
                                {edit === true ? (
                                    <>
                                        <td className='w-[160px]'>{classes.level}</td>
                                        <input className='w-[160px]'>{classes.oral}</input>
                                        <input className='w-[160px]'>{classes.written}</input>
                                        <input className='w-[160px]'>{classes.reading}</input>
                                        <select
                                            value={classes.state ? classes.state : opcion}
                                            onChange={handleState}
                                            className='w-[90px]'
                                        >
                                            <option value="" disabled>
                                                Estado
                                            </option>
                                            <option value="Calificado">Calificado</option>
                                            <option value="Entregado">Entregado</option>
                                            <option value="Pendiente">Pendiente</option>
                                            <option value="No Entregado">No entregado</option>
                                        </select>
                                    </>
                                ) : (
                                    <>
                                        <td className='w-[160px]'>{classes.level}</td>
                                        <td className='w-[160px]'>{classes.oral}</td>
                                        <td className='w-[160px]'>{classes.written}</td>
                                        <td className='w-[160px]'>{classes.reading}</td>
                                        <td className='w-[90px]'>{classes.state ? classes.state : opcion}</td>
                                    </>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr className='flex justify-center items-center w-full py-6 px-4'>
                            <td>No se encontró ninguna clase asignada a este estudiante</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div >
    )
}

export default DetailStudent
