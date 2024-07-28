import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { createClassDetail, fetchClassDetailList, fetchClassRoomById, updateClassroom } from '../../services/programs.services';
import { LEVELS_MAP } from '../../utils/valueLists';
import ClassDetailList from './ClassDetailList';
import CreateClassDetailForm from './CreateClassDetailForm';
import TextEditor from '../../components/TextEditor';

const ClassRoomDetail = () => {
  const { eid } = useParams();
  const { user, userDetail } = useAppStore();
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [classRoom, setClassRoom] = useState(null);
  const [classDetail, setClassDetail] = useState(null);

  const [classDetailList, setClassDetailList] = useState([]);
  const [selectedClassDetail, setSelectedClassDetail] = useState('');
  const [newClassDetail, setNewClassDetail] = useState({
    teacher: userDetail._id,
    title: '',
    level: '',
    language: '',
    description: '',
    duration_hours: 0,
  });

  const [richText, setRichText] = useState('');

  // carga Classroom
  useEffect(() => {
    if (user && user.token) {
      const getProgram = async () => {
        try {
          setLoading(true);
          const response = await fetchClassRoomById(user.token, eid);
          setClassRoom(response);
        } catch (error) {
          console.error('Error fetching program', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      getProgram();
    } else {
      setLoading(false);
    }
  }, [eid, refresh, user]);

  // Carga classdetail (desde classroom)
  useEffect(() => {
    if (classRoom) {
      setClassDetail(classRoom?.class_detail);
      setNewClassDetail({
        teacher: userDetail._id,
        title: '',
        level: classRoom.level,
        language: classRoom.language,
        description: '',
        duration_hours: classRoom.duration_hours,
      })
    }
  }, [classRoom?.class_detail, userDetail, refresh]);

  // Carga lista de clases del profesor
  useEffect(() => {
    if (user?.token && userDetail?._id) {
      const getClassDetailList = async () => {
        try {
          const response = await fetchClassDetailList(user.token, userDetail._id);
          setClassDetailList(response);
        } catch (error) {
          console.error('Error fetching class detail list', error);
          setError(error.message);
        }
      };

      getClassDetailList();
    }
  }, [refresh, user, userDetail]);

  const handleCreateClassDetail = async () => {
    try {
      setLoading(true);
      const data = { ...newClassDetail, idClassroom: classRoom._id };
      await createClassDetail(data, user.token);
    } catch (error) {
      console.error('Error creating class detail', error);
      setError(error.message);
    } finally {
      setLoading(false);
      setRefresh(!refresh);
    }
  };

  const handleAssignClassDetail = async () => {
    if (selectedClassDetail) {
      try {
        setLoading(true);
        await updateClassroom({class_detail: selectedClassDetail}, user.token, classRoom._id);
      } catch (error) {
        console.error('Error update classrom', error);
        setError(error.message);
      } finally {
        setLoading(false);
        setRefresh(!refresh);
      }
    }
  };

  const handleRemoveClassDetail = async () => {
    try {
      setLoading(true);
      await updateClassroom({class_detail: null}, user.token, classRoom._id);
    } catch (error) {
      console.error('Error update classrom', error);
      setError(error.message);
    } finally {
      setLoading(false);
      setRefresh(!refresh);
    }
  };
  
  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const updatedClassDetail = { ...classDetail, content: richText };
      console.log(updatedClassDetail);
      //await updateClassroom({ class_detail: updatedClassDetail }, user.token, classRoom._id);
    } catch (error) {
      console.error('Error updating class detail', error);
      setError(error.message);
    } finally {
      setLoading(false);
      setRefresh(!refresh);
    }
  };

  if (loading) return <p className="text-center">Cargando datos...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="text-white px-2 py-1 rounded mr-2" style={{ backgroundColor: LEVELS_MAP[classRoom?.level] }}>{classRoom?.level}</span>
          <h1 className="text-3xl font-bold">{classRoom?.title}</h1>
        </div>
        {classDetail && (
          <button onClick={handleRemoveClassDetail} className="bg-red-500 text-white px-4 py-2 rounded-md">Eliminar selección de clase</button>
        )}
      </div>
      <p>{classRoom?.description}</p>
      <hr className="my-4" />    
      {!classDetail ? (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Seleccionar o crear una nueva clase</h2>
          <ClassDetailList
            classDetailList={classDetailList}
            selectedClassDetail={selectedClassDetail}
            setSelectedClassDetail={setSelectedClassDetail}
            handleAssignClassDetail={handleAssignClassDetail}
          />
          <CreateClassDetailForm
            newClassDetail={newClassDetail}
            setNewClassDetail={setNewClassDetail}
            handleCreateClassDetail={handleCreateClassDetail}
          />
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Detalles de la clase</h2>
          <p><strong>Título:</strong> {classDetail.title}</p>
          <p><strong>Descripción:</strong> {classDetail.description}</p>
          <div>
            <h3 className="text-xl font-semibold mb-2">Desarrolla en contenido de tu clase:</h3>
            <TextEditor value={richText} onChange={setRichText} />
            <button onClick={handleSaveChanges} className="bg-green-500 text-white px-4 py-2 rounded-md mt-2">Guardar cambios</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClassRoomDetail