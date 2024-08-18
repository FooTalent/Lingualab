import React, { useEffect, useState } from 'react';
import { LEVELS_MAP } from '../../../../utils/valueLists';
import IconSvg from '../../../../utils/SvgWrapper';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../../../store/useAppStore';
import { fetchResourceById } from '../../../../services/resources.services';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Options from '../../../../components/user/classes/Options';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

const ClassroomCard = ({ classroom, editFunction, deleteFunction, editContentFunction }) => {
  const { level, title, students, daytime, duration_hours, _id } = classroom;
  const [resourcesClass, setResourcesClass] = useState([])
  const [openResources, setOpenResources] = useState(true)
  const [state, setState] = useState(false)
  const { user } = useAppStore();

  useEffect(() => {
    const fetchSelectedResources = async () => {
      if (classroom?.resources?.length > 0) {
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

  const links = [
    { path: ``, label: <><NoteAddIcon />Agregar contenido</>, function: editContentFunction },
    { label: <><EditIcon /> Editar clase</>, function: editFunction },
    { path: ``, label: <><DeleteIcon />Eliminar clase</>, function: deleteFunction },
  ]
  
  const handleOptions = () => {
    setState(!state)
  }

  return (
    <div className="flex flex-col p-4 gap-4 rounded-xl shadow-cardContainer text-card relative">
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-6 text-lg'>
          <span className="text-white py-2 px-4 rounded-lg font-medium" style={{ backgroundColor: LEVELS_MAP[level] }}>{level}</span>
          <h2 className="font-bold">{title}</h2>
        </div>
        <button onClick={handleOptions}>
          <MoreVertIcon className='text-Purple' />
        </button>
        <Options id={_id} state={state} links={links} />
      </div>
      <span className='border-t border-Grey'></span>

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
