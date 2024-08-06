import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { getReviews } from '../../services/students.services';
import { Link, useParams } from "react-router-dom";

const DetailStudent = () => {
    const { user, userDetail } = useAppStore();
    const { studentId } = useParams()
    console.log(studentId)
    useEffect(() => {
        const fetchStudents = async () => {
            const filter = { eid: studentId }
            const response = await getReviews(user.token, filter)
            console.log(response)
        }
        fetchStudents();
    }, [user, userDetail]);
    return (
        <div>
            <div className='flex'>
                <Link
                    to='/student'
                >Volver</Link>
                {/* <td className='w-[250px] gap-6'>
                      {student.photo ? (
                        <img className='w-fit-[50px] h-fit-[50px] rounded-full' src={crearURLCompleta(student.photo)} />
                      ) : (
                        <span className='flex justify-center items-center font-bold w-[50px] h-[50px] rounded-full bg-Yellow uppercase'>{student?.first_name?.charAt(0) + student?.last_name?.charAt(0)}</span>
                      )}
                      <td className='w-[184px]'>{student.first_name} {student.last_name}</td>
                    </td> */}
                <button className="ml-2 bg-black text-white px-4 py-2 rounded-lg flex items-center">
                    <EditIcon className="mr-2" />
                    Editar
                </button>
            </div>
            <table className="flex flex-col w-full bg-white gap-4 mx-auto">
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

                </tbody>
            </table>
        </div>
    )
}

export default DetailStudent
