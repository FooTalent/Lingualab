import { useState } from 'react';
import { BsCameraFill } from "react-icons/bs";
import Modal from '../../components/Modal';
import { crearURLCompleta } from '../../utils/urifoto';
import { userUpdatePhoto } from '../../services/index';
import EditIcon from '@mui/icons-material/Edit';
import { RingLoader } from 'react-spinners';

const ProfilePicture = ({ photo, token, refreshProfile, botonFunction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleImageChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadPhoto = async () => {
    if (!selectedFile) {
      console.error('No hay archivo seleccionado!');
      return;
    }

    setIsLoading(true);

    try {
      await userUpdatePhoto(token, selectedFile);
      setSelectedFile(null);
      setIsModalOpen(false);
      refreshProfile();
    } catch (error) {
      console.error('Error al actualizar la fotografía:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      <div className="bg-white gap-4 flex items-center justify-center">
        {photo ? (
          <button onClick={handleOpenModal}>
            <img
              className='h-[200px] w-[200px] rounded-full'
              src={crearURLCompleta(photo)}
              alt="Profile"
            />
          </button>
        ) : (
          <div className='flex items-center justify-center border rounded-full p-2 gap-2 h-[200px] w-[200px]'>
            <BsCameraFill className='h-[100px] w-[100px] text-gray-500' />
          </div>
        )}
        <button
          className="bg-purple-500 text-white rounded-full p-2 absolute top-28 right-6"
          onClick={botonFunction}
        >
          <EditIcon />
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose} title="Elegir nueva foto de perfil">
        <p>Solo se permite imagenes maximo 5 Mb y que sean ".jpeg" o ".png"</p>
        <div className="flex flex-col gap-6 items-center justify-center py-4">
          {selectedFile && (
            <img src={URL.createObjectURL(selectedFile)} alt="Selected Preview" className="w-48 h-48 object-cover rounded-full mb-4" />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} className="text-gray-700 py-2 px-3 rounded focus:outline-none focus:shadow-outline" />
          <button
            className="bg-purple-500 text-white font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleUploadPhoto}
          >
            Subir foto
          </button>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center mt-4">
            <RingLoader color="#6b21a8" size={60} />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProfilePicture;
