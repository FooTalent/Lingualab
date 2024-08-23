import { useState } from 'react';
import { BsCameraFill } from "react-icons/bs";
import Modal from '../../components/Modal';
import { crearURLCompleta } from '../../utils/urifoto';
import { userUpdatePhoto } from '../../services/index';
import EditIcon from '@mui/icons-material/Edit';
import { RingLoader } from 'react-spinners';
import Spinner from '../../components/Spinner/Spinner';

const ProfilePicture = ({ photo, token, refreshProfile, botonFunction, isEditing }) => {
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
    setSelectedFile(null)
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        {photo ? (
          <button onClick={handleOpenModal}>
            <img
              className='h-[200px] w-[200px] rounded-full'
              src={crearURLCompleta(photo)}
              alt="Profile"
            />
          </button>
        ) : (
          <div className='flex border border-Grey rounded-full p-2 gap-2 h-[200px] w-[200px]'>
            <BsCameraFill className='m-auto h-[100px] w-[100px] text-Grey' />
          </div>
        )}

        <button
          className={`hover:bg-PurpleHover text-white rounded-full p-3 absolute top-28 right-6 ease-out duration-300
              ${isEditing ? 'bg-Purple' : 'bg-Grey'}
            `}
          onClick={!isEditing ? botonFunction : handleOpenModal}
        >
          <EditIcon />
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose} title=" " modalSize={'medium'}>
        <div className='flex flex-col gap-4'>
          <h2 className='text-xl leading-6 font-extrabold'>Elegir nueva foto de perfil</h2>
          <p>Solo se permite imagenes maximo 5 Mb y que sean ".jpeg" o ".png"</p>
        </div>

        <div className="flex flex-col gap-6 items-center justify-center mt-2">
          {selectedFile && (
            <img src={URL.createObjectURL(selectedFile)} alt="Selected Preview" className="w-48 h-48 object-cover rounded-full" />
          )}

          <div className="w-full flex flex-col md:flex-row items-center gap-4 border border-Grey rounded-lg p-[14px] text-card">
            <label
              className="cursor-pointer text-lg font-medium leading-5 border border-card rounded text-card bg-inputFile p-3 hover:bg-card hover:text-inputFile ease-out duration-150"
            >
              Seleccionar archivo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <span className="">{selectedFile ? selectedFile.name : 'Sin archivos seleccionados'}</span>
          </div>

          <button
            className="bg-Purple hover:bg-PurpleHover text-white font-extrabold tracking-wide py-3 px-8 rounded-lg text-xl leading-6 ease-out duration-300"
            type="button"
            onClick={handleUploadPhoto}
          >
            Subir foto
          </button>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center mt-4">
            <Spinner />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProfilePicture;
