import React, { useEffect, useState } from 'react';
import { LEVELS_MAP } from '../../../../utils/valueLists';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../../../store/useAppStore';
import { fetchResourceById } from '../../../../services/resources.services';
import EditIcon from '@mui/icons-material/Edit';
import IconSvg from '../../../../utils/SvgWrapper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ClassroomCard = ({ classroom, buttonFunction, deleteButton }) => {
  const { level, title, students, daytime, duration_hours, _id } = classroom;
  const [openResources, setOpenResources] = useState(true)
  const [resourcesClass, setResourcesClass] = useState([])
  const { user } = useAppStore();

  useEffect(() => {
    const fetchSelectedResources = async () => {
      if (classroom.resources.length > 0) {
        try {
          const fetchedResources = await Promise.all(
            classroom.resources.map((id) => fetchResourceById(user.token, id))
          );
          setResourcesClass(fetchedResources.map((res) => res.data));
        } catch (error) {
          console.error('Error fetching selected resources:', error);
        }
      }
    };

    fetchSelectedResources();
  }, [classroom]);

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4 text-card">
      <div className="flex items-center justify-between">
        <div className='flex'>
          <span className="text-white px-2 py-1 rounded mr-2" style={{backgroundColor: LEVELS_MAP[level]}}>{level}</span>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div className='flex justify-between gap-4'>
          <button
            className={`flex items-center gap-2 bg-Yellow hover:bg-card font-extrabold text-card hover:text-Yellow border-2 border-Yellow hover:border-card rounded-lg py-2 px-3 ease-linear duration-150`}
            onClick={() => buttonFunction(_id)}
          >
            <EditIcon />Editar
          </button>
          <button
            onClick={() => deleteButton(_id)}
            className='flex items-center gap-2 bg-Yellow hover:bg-card font-extrabold text-card hover:text-Yellow border-2 border-Yellow hover:border-card rounded-lg py-2 px-3 ease-linear duration-150'>
            Eliminar
          </button>
        </div>
      </div>
      <div className="text-gray-700 mb-2">
        <strong>Fecha:</strong> {daytime ? new Date(daytime).toLocaleString('es-ES') : null }
      </div>
      <div className='flex items-center gap-6 text-sm'>
        <button
          onClick={() => setOpenResources(!openResources)}
          className={`self-start ease-linear duration-150 ${openResources ? '-rotate-90' : ''}`}
        >
          <ExpandMoreIcon />
        </button>

        <div>
          {
            openResources ? (
              <span className='block'>Recursos de la clase</span>
            ) : (
              resourcesClass?.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {resourcesClass.map((resource, index) => (
                    <div key={index} className='flex items-center truncate'>
                      <IconSvg category={resource.type} />
                      <Link to={resource.url}>{resource.title}</Link>
                    </div>
                  ))}
                </div>
              ) : (
                <span className='block'>Sin recursos</span>
              )
            )
          }
        </div>
      </div>
        
    </div>
  );
};

export default ClassroomCard;
