import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppStore } from '../../../../store/useAppStore';
import { getClassById, updateClass } from '../../../../services/programs.services';
import { LEVELS_MAP } from '../../../../utils/valueLists';
import TextEditor from '../../../../components/TextEditor/TextEditor';
import BackButton from '../../../../components/BackButtom';

const ClassDetail = () => {
  const { eid } = useParams();
  const { user } = useAppStore();
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [classData, setClassData] = useState(null);
  const [richText, setRichText] = useState('');

  useEffect(() => {
    if (user && user.token) {
      const fetchClass = async () => {
        try {
          setLoading(true);
          const response = await getClassById(user.token, eid);
          setClassData(response);
          setRichText(response.content || '');
        } catch (error) {
          console.error('Error al buscar la clase', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchClass();
    } else {
      setLoading(false);
    }
  }, [eid, refresh, user]);
  console.log(classData);

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      await updateClass(user.token, classData._id, { content: richText });
    } catch (error) {
      console.error('Error al actualizar la clase', error);
      setError(error.message);
    } finally {
      setLoading(false);
      setRefresh(!refresh);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Cargando datos...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="flex items-center">
          <span 
            className="text-white px-3 py-1 rounded mr-3" 
            style={{ backgroundColor: LEVELS_MAP[classData?.level] }}
          >
            {classData?.level}
          </span>
          <h1 className="text-4xl font-bold">{classData?.title}</h1>
        </div>
        <BackButton />
      </div>
      <div className="mb-4">
        <p className="text-lg font-medium">Descripción:</p>
        <p className="text-gray-700">{classData?.description}</p>
      </div>
      <div className="mb-4">
        <p className="text-lg font-medium">Duración:</p>
        <p className="text-gray-700">{classData?.duration_hours} hs</p>
      </div>
      <hr className="my-4" />

      <div>
        <h2 className="text-2xl font-semibold mb-2">Edita el contenido de la clase</h2>
        <TextEditor value={richText} onChange={setRichText} />
        <button 
          onClick={handleSaveChanges} 
          className="bg-green-600 text-white px-4 py-2 rounded-md mt-4 shadow-md hover:bg-green-700"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
};

export default ClassDetail;
