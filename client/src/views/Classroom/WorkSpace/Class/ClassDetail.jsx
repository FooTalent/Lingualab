import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppStore } from '../../../../store/useAppStore';
import { getClassById, updateClass } from '../../../../services/programs.services';
import { LEVELS_MAP } from '../../../../utils/valueLists';
import TextEditor from '../../../../components/TextEditor/TextEditor';
import BackButton from '../../../../components/BackButtom';
import Resources from '../../../Resources/Resources';
import IconImage from '../../../../utils/IconImage';
import ProgramInfo from '../Program/ProgramInfo';
import ButtonModal from '../../../../components/Form/ButtonModal';

const ClassDetail = () => {
  const { eid } = useParams();
  const { user } = useAppStore();
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [classData, setClassData] = useState(null);
  const [richText, setRichText] = useState('');
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [selectedResources, setSelectedResources] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.token) {
      const fetchClass = async () => {
        try {
          setLoading(true);
          const response = await getClassById(user.token, eid);
          setClassData(response);
          setSelectedResources(response.resources)
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

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      await updateClass(user.token, classData._id, { content: richText, resources: selectedResources.map(resource => resource._id) });
    } catch (error) {
      console.error('Error al actualizar la clase', error);
      setError(error.message);
    } finally {
      setLoading(false);
      setRefresh(!refresh);
    }
  };

  const handleOpenResourceModal = () => {
    setShowResourceModal(true);
  };

  const handleSelectResources = (resources) => {
    setSelectedResources(resources);
    setShowResourceModal(false);
  };

  const handleCancelClass = () => {
    navigate(-1);
  };

  if (loading) return <p className="text-center text-gray-500">Cargando datos...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto flex flex-col gap-5">
      <div className="flex items-center gap-12">
        <BackButton />

        <div className="flex items-center gap-6 truncate">
          <span
            className="text-white py-3 px-4 rounded-lg text-lg font-extrabold"
            style={{ backgroundColor: LEVELS_MAP[classData?.level] }}
          >
            {classData?.level}
          </span>
          <h1 className="text-customSubTitle font-semibold">{classData?.title}</h1>
        </div>
      </div>

      <ProgramInfo program={classData} />

      <div className='flex flex-col gap-5'>
        <h2 className="text-customSubTitle font-semibold">Edita el contenido de la clase</h2>

        <TextEditor value={richText} onChange={setRichText} />

        {selectedResources.length > 0 && (
          <div className="my-4">
            <p className="text-lg font-medium">Recursos:</p>
            <ul className="list-disc pl-5 text-gray-700">
              {selectedResources.map((resource, index) => (
                <div key={index} className='flex h-5'>
                  <IconImage category={resource.type} className={"fill-current"} />
                  <Link to={resource.url}>{resource.title}</Link>
                </div>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className='flex gap-6'>
            <button
              className='bg-card hover:bg-Yellow text-Yellow hover:text-card rounded-lg py-3 px-8 text-xl font-extrabold ease-linear duration-150'
              onClick={handleOpenResourceModal}
            >
              Ir a recursos
            </button>

            <button
              className='bg-card hover:bg-Yellow text-Yellow hover:text-card rounded-lg py-3 px-8 text-xl font-extrabold ease-linear duration-150'
              onClick={handleOpenResourceModal}
            >
              Ir al Drive
            </button>
          </div>

          <div className='flex gap-6'>
            <ButtonModal buttonAction={handleCancelClass} type='prev' label='Cancelar' />
            <ButtonModal buttonAction={handleSaveChanges} type='next' label='Guardar cambios' />
          </div>
        </div>
      </div>

      {showResourceModal && (
        <div className="modal">
          <div className="modal-content">
            <Resources onSelect={handleSelectResources} selected={selectedResources} />
            <button onClick={() => setShowResourceModal(false)} className="bg-red-600 text-white px-4 py-2 rounded-md mt-4 shadow-md hover:bg-red-700">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassDetail;
