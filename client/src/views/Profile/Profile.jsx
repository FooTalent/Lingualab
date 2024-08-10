import { useEffect, useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { BsCameraFill } from "react-icons/bs";
import { useAppStore } from '../../store/useAppStore';
import Modal from '../../components/Modal';
import { userUpdate, userUpdatePhoto, getUserData, getCountries, getLanguages } from '../../services/index';
import { crearURLCompleta } from '../../utils/urifoto';

const Profile = () => {
  const { userDetail, user } = useAppStore();
  const [refresh, setRefresh] = useState(false);
  const [profileData, setProfileData] = useState(userDetail);
  const [selectedFile, setSelectedFile] = useState(null);
  const [countryOptionsState, setCountryOptionsState] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.token) {
        try {
          const data = await getUserData(user.token);
          setProfileData(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError(error.message);
        }
      }
    };
    fetchData();
  }, [user, refresh]);

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const countries = await getCountries();
        const languages = await getLanguages();
        setCountryOptionsState(countries.map(country => ({ value: country, label: country })));
        setLanguageOptions(languages.map(language => ({ value: language, label: language })));
      } catch (error) {
        console.error('Error fetching countries or languages:', error);
      }
    };

    fetchValues();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (name, selectedOption) => {
    setProfileData(prevState => ({
      ...prevState,
      [name]: selectedOption ? selectedOption.value : ''
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const updatedUser = await userUpdate(user.token, profileData);
      localStorage.setItem('userDetail', JSON.stringify(updatedUser))
      setProfileData(updatedUser);
      setRefresh(prevRefresh => !prevRefresh);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating user data:', error);
      setError(error.message);
    }
  };

  // Fotografía
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

    try {
      await userUpdatePhoto(user.token, selectedFile);
      setSelectedFile(null);
      setIsModalOpen(false);
      setRefresh(prevRefresh => !prevRefresh);
    } catch (error) {
      console.error('Error al actualizar la fotografía:', error);
      setError(error.message);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative bg-white gap-[20px] flex items-center justify-center flex-col mx-auto mt-20 max-w-[1210px]">
      <div className="absolute top-[-50px] bg-white gap-[20px] flex items-center justify-center">
        {profileData.photo ? (
          <img
            className='h-[200px] w-[200px] rounded-full'
            src={crearURLCompleta(profileData.photo)} />
        ) :
          <div className='flex items-center justify-center border rounded-full p-2 gap-2 h-[200px] w-[200px]'>
            <BsCameraFill
              className='h-[100px] w-[100px] text-Grey' />
          </div>
        }
      </div>
      <div className="border p-6 gap-12 rounded-xl w-full mt-20">
        <div className="text-center mt-20">
          <h2 className="text-lg font-semibold">{profileData.last_name} {profileData.first_name}, {profileData.role === "Teacher" ? "Profesor" : "Estudiante"}</h2>
          <button
            className="bg-purple-500 text-white rounded-full p-2 absolute top-28 right-6"
            onClick={handleOpenModal}
          >
            <EditIcon />
          </button>
        </div>
        <div className="px-6 py-4 flex justify-center">
          <textarea
            className="shadow appearance-none border rounded w-[600px] h-[120px] py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
            style={{ textAlign: 'left' }}
            id="presentation"
            name="presentation"
            value={profileData.presentation || ''}
            onChange={handleInputChange}
            placeholder="Acerca de mí..."
          />
        </div>
        <div className="px-6 pb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Dropdown
            title="Datos personales"
            countryOptions={countryOptionsState}
            languageOptions={languageOptions}
            profileData={profileData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
          />
          <Dropdown title="Formación" profileData={profileData} handleInputChange={handleInputChange} handleSelectChange={handleSelectChange} />
        </div>
        <div className="px-6 py-4 flex justify-center">
          <button
            className="bg-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleUpdateProfile}
          >
            Confirmar edición
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleModalClose} title="Elegir nueva foto de perfil">
        <div className="flex flex-col items-center justify-center py-4">
          {selectedFile && (
            <img src={URL.createObjectURL(selectedFile)} alt="Selected Preview" className="w-48 h-48 object-cover rounded-full mb-4" />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} className="text-gray-700 py-2 px-3 rounded focus:outline-none focus:shadow-outline" />
          <button
            className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            type="button"
            onClick={handleUploadPhoto}
          >
            Subir foto
          </button>
        </div>
      </Modal>
    </div>
  );
};

const Dropdown = ({ title, countryOptions, languageOptions, profileData, handleInputChange, handleSelectChange }) => {
  const [educationLinks, setEducationLinks] = useState(profileData.studies || []);
  const [certificateLinks, setCertificateLinks] = useState(profileData.certificate || []);
  const [newEducationLink, setNewEducationLink] = useState({ title: '', link: '' });
  const [newCertificateLink, setNewCertificateLink] = useState({ title: '', link: '' });
  const [showEducationInputs, setShowEducationInputs] = useState(false);
  const [showCertificateInputs, setShowCertificateInputs] = useState(false);

  const handleNewEducationChange = (field, value) => {
    setNewEducationLink({ ...newEducationLink, [field]: value });
  };

  const handleNewCertificateChange = (field, value) => {
    setNewCertificateLink({ ...newCertificateLink, [field]: value });
  };

  const saveEducationLink = () => {
    setEducationLinks([...educationLinks, newEducationLink]);
    setShowEducationInputs(false);
    handleInputChange({ target: { name: 'studies', value: [...educationLinks, newEducationLink] } });
    setNewEducationLink({ title: '', link: '' });
    setRefresh(prevRefresh => !prevRefresh);
  };

  const saveCertificateLink = () => {
    setCertificateLinks([...certificateLinks, newCertificateLink]);
    setShowCertificateInputs(false);
    handleInputChange({ target: { name: 'certificate', value: [...certificateLinks, newCertificateLink] } });
    setNewCertificateLink({ title: '', link: '' });
    setRefresh(prevRefresh => !prevRefresh);
  };

  return (
    <details className="mb-4">
      <summary className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded cursor-pointer flex justify-between items-center">
        <span>{title}</span>
        <span className="ml-2">&#9660;</span>
      </summary>
      <div className="py-4 px-6">
        {title === 'Datos personales' && (
          <>
            <div className="flex items-center mb-4">
              <EmailIcon className="mr-2" />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                value={profileData.email || ''}
                onChange={handleInputChange}
                placeholder="Correo electrónico"
              />
            </div>
            <div className="flex items-center mb-4">
              <PublicIcon className="mr-2" />
              <Select
                className="w-full"
                name="country"
                value={countryOptions.find(option => option.value === profileData.country)}
                options={countryOptions}
                onChange={(selectedOption) => handleSelectChange('country', selectedOption)}
                placeholder="Selecciona un país"
                styles={{ control: (provided) => ({ ...provided, borderColor: '#ccc', boxShadow: 'none' }) }}
              />
            </div>
            <div className="flex items-center mb-4">
              <PhoneIcon className="mr-2" />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="phone"
                value={profileData.phone || ''}
                onChange={handleInputChange}
                placeholder="Teléfono"
              />
            </div>
            <div className="flex items-center mb-4">
              <SchoolIcon className="mr-2" />
              <Select
                className="w-full"
                name="languages"
                value={languageOptions.find(option => option.value === profileData.languages[0]) || null}
                options={languageOptions}
                onChange={(selectedOption) => handleSelectChange('languages', selectedOption)}
                placeholder="Selecciona un idioma"
                styles={{ control: (provided) => ({ ...provided, borderColor: '#ccc', boxShadow: 'none' }) }}
              />
            </div>
          </>
        )}
        {title === 'Formación' && (
          <>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Enlaces de educación</h4>
              {educationLinks.map((link, index) => (
                <div key={index} className="mb-2">
                  <a href={link.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{link.title}</a>
                </div>
              ))}
              {showEducationInputs && (
                <div className="mb-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    type="text"
                    placeholder="Título"
                    value={newEducationLink.title}
                    onChange={(e) => handleNewEducationChange('title', e.target.value)}
                  />
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    type="text"
                    placeholder="Enlace de educación"
                    value={newEducationLink.link}
                    onChange={(e) => handleNewEducationChange('link', e.target.value)}
                  />
                  <button className="bg-blue-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline" type="button" onClick={saveEducationLink}>
                    Guardar
                  </button>
                </div>
              )}
              <button className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => setShowEducationInputs(true)}>
                <AddIcon />
              </button>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Enlaces de certificados</h4>
              {certificateLinks.map((link, index) => (
                <div key={index} className="mb-2">
                  <a href={link.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{link.title}</a>
                </div>
              ))}
              {showCertificateInputs && (
                <div className="mb-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    type="text"
                    placeholder="Título"
                    value={newCertificateLink.title}
                    onChange={(e) => handleNewCertificateChange('title', e.target.value)}
                  />
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    type="text"
                    placeholder="Enlace de certificado"
                    value={newCertificateLink.link}
                    onChange={(e) => handleNewCertificateChange('link', e.target.value)}
                  />
                  <button className="bg-blue-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline" type="button" onClick={saveCertificateLink}>
                    Guardar
                  </button>
                </div>
              )}
              <button className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => setShowCertificateInputs(true)}>
                <AddIcon />
              </button>
            </div>
          </>
        )}
      </div>
    </details>
  );
};


Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  countryOptions: PropTypes.array,
  languageOptions: PropTypes.array,
  profileData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
};

export default Profile;
