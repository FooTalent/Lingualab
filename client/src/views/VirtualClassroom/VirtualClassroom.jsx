import React, { useEffect, useState } from 'react'
import { useAppStore } from '../../store/useAppStore';
import ProgramCard from './ProgramCard';
import { fetchPrograms } from '../../services/programs.services';
import { useNavigate  } from 'react-router-dom';

const VirtualClasstoom = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAppStore()
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.token) {
      const getPrograms = async () => {
        try {
          setLoading(true);
          const response = await fetchPrograms(user.token);
          if (response.isError) {
            throw new Error(response.message);
          }
          setPrograms(response.data);
        } catch (error) {
          console.error('Error fetching programs', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      getPrograms();
    } else {
      setLoading(false);
    }
  }, [user]);

  function buttonFunction (idProgram) {
    navigate(`/programas/${idProgram}`)
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Programas</h1>
      {loading ? (
        <p className="text-center">Cargando Datos...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <div className="programs-container flex flex-wrap justify-center">
          {programs.map((program) => (
            <ProgramCard key={program._id} program={program} buttonFunction={buttonFunction} />
          ))}
        </div>
      )}
    </div>
  );
}

export default VirtualClasstoom