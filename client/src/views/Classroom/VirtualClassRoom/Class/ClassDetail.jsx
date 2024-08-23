import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppStore } from '../../../../store/useAppStore';
import { getClassById, updateClass } from '../../../../services/programs.services';
import TextEditor from '../../../../components/TextEditor/TextEditor';
import BackButton from '../../../../components/BackButtom';
import Resources from '../../../Resources/Resources';
import IconSvg from '../../../../utils/SvgWrapper';
import ButtonModal from '../../../../components/Form/ButtonModal';
import Spinner from '../../../../components/Spinner/Spinner';

const VCRClassDetail = () => {
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

  if (loading) return <Spinner />
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto text-card flex flex-col">
      <div className="flex flex-row justify-between items-center mb-5">
        <BackButton />
      </div>

      <div className='flex flex-col gap-5'>
        <h2 className="text-2xl font-semibold">Edita el contenido de la clase</h2>
        <div>
          <TextEditor value={richText} onChange={setRichText} />
        </div>

        {
          selectedResources.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium">Recursos:</p>
              <ul className="list-disc pl-4 flex flex-col gap-6">
                {selectedResources.map((resource, index) => (
                  <li key={index} className='flex items-center'>
                    <IconSvg category={resource.type} className={"h-6"} />
                    <Link to={resource.url}>{resource.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        }
        <div className="flex flex-col xl:flex-row justify-between items-center gap-y-5">
          <div className='grid grid-cols-2 gap-6 md:self-start'>
            <button
              className='bg-card hover:bg-Yellow text-Yellow hover:text-card rounded-lg py-3 px-8 text-xl font-extrabold ease-linear duration-150'
              onClick={handleOpenResourceModal}
            >
              Ir a recursos
            </button>

            <button
              className='bg-card rounded-lg py-3 px-8 text-xl font-extrabold ease-linear duration-150 opacity-50 !cursor-not-allowed border-card bg-opacity-50 text-black'
              onClick={handleOpenResourceModal}
              disabled
            >
              Ir al Drive
            </button>
          </div>

          <div className='grid grid-cols-2 w-full md:w-3/4 lg:w-fit gap-6'>
            <ButtonModal buttonAction={handleCancelClass} type='prev' label='Cancelar' />
            <ButtonModal buttonAction={handleSaveChanges} type='next' label='Guardar cambios' />
          </div>
        </div>
      </div>

      {
        showResourceModal && (
          <div className="modal">
            <div className="modal-content">
              <Resources onSelect={handleSelectResources} selected={selectedResources} />
              <button onClick={() => setShowResourceModal(false)} className="bg-red-600 text-white px-4 py-2 rounded-md mt-4 shadow-md hover:bg-red-700">
                Cerrar
              </button>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default VCRClassDetail;
