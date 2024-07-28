import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { fetchClassRoomById } from '../../services/programs.services';
import { LEVELS_MAP } from '../../utils/valueLists';

const ClassRoomDetail = () => {
  const { eid } = useParams();
  const { user } = useAppStore();
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [classRoom, setClassRoom] = useState(null);
  const [classDetail, setClassDetail] = useState(null);

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
  }, [eid, refresh]);

  useEffect(() => {
    if (classRoom) {
      setClassDetail(classRoom?.class_detail);
    }
  }, [classRoom?.class_detail, refresh]);

  console.log("classRoom: ", classRoom);
  console.log("classDetail: ", classDetail);

  if (loading) return <p className="text-center">Cargando datos...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <>
      <div className="container mx-auto p-4">
      <div className='flex items-center mb-2'>
        <span className="text-white px-2 py-1 rounded mr-2" style={{backgroundColor: LEVELS_MAP[classRoom.level]}}>{classRoom.level}</span>
        <h1 className="text-3xl font-bold mb-4">{classRoom.title}</h1>
      </div>
      <p>{classRoom.description}</p>
      </div>
      <br />
      <hr />    
      {
        classDetail 
        ? (
          <div>
            <p>tiene clase detail</p>
          </div>)
        : (<div>
            <p>aaaaaaaaaaaaaa</p>
          </div>)
      }
    </>
  )
}

export default ClassRoomDetail