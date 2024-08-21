import { useEffect, useState } from 'react';
import ProfilePicture from './ProfilePicture';
import Dropdown from './Dropdown';
import SuccessModal from './SuccessModal';
import { useAppStore } from '../../store/useAppStore';
import { userUpdate, getUserData, getCountries, getLanguages } from '../../services/index';

const Profile = ({ profile }) => {
  const { userDetail, user } = useAppStore();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(null);
  const [originalProfileData, setOriginalProfileData] = useState(userDetail);
  const [isEditing, setIsEditing] = useState(false);

  // edit
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(userDetail);
  const [countryOptionsState, setCountryOptionsState] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);

  // Modals
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      if (user && user.token) {
        try {
          const data = await getUserData(user.token);
          setProfileData(data);
          setOriginalProfileData(data);
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

  const handleOpenSuccessModal = () => {
    setIsSuccessModalOpen(true);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSelectChange = (name, selectedOption) => {
    setProfileData(prevState => ({
      ...prevState,
      [name]: selectedOption ? selectedOption.value : ''
    }));
  };

  const enableEditing = () => {
    setIsEditing(true);
  };

  const handleUpdateProfile = async () => {
    try {
      const updatedUser = await userUpdate(user.token, profileData);
      localStorage.setItem('userDetail', JSON.stringify(updatedUser))
      setProfileData(updatedUser);
      setIsSuccessModalOpen(true);
      setRefresh(prevRefresh => !prevRefresh);
      setIsEditing(false); 
    } catch (error) {
      console.error('Error updating user data:', error);
      setError(error.message);
    }
  };


  const handleCancel = () => {
    setProfileData(originalProfileData);
    setIsEditing(false); 
  };

  if (loading) { return <div>Loading...</div>; }
  if (error) { return <div>Ha ocurrido un error: {error}</div>; }

  return (
    <div className='relative'>
      <ProfilePicture
        photo={profileData.photo}
        token={user.token}
        refreshProfile={() => {
          setRefresh(prevRefresh => !prevRefresh);
          handleOpenSuccessModal();
        }}
        botonFunction={enableEditing}
      />

      <div className="flex flex-col items-center border-2 border-solid border-inputBg shadow-customTable rounded-2xl " style={{ marginTop: '-100px' }}>
        <h2 className="mt-36 text-lg font-semibold">{profileData.last_name} {profileData.first_name}</h2>
        <div className="px-6 py-4 flex justify-center">
          <textarea
            className="shadow appearance-none border rounded w-[600px] h-[120px] py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
            style={{ textAlign: 'left' }}
            id="presentation"
            name="presentation"
            value={profileData.presentation || ''}
            onChange={handleInputChange}
            placeholder="Acerca de mí..."
            disabled={!isEditing}
          />
        </div>
        <div className="w-full mt-4 px-6 pb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Dropdown
            title="Datos personales"
            countryOptions={countryOptionsState}
            languageOptions={languageOptions}
            profileData={profileData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            isEditable ={isEditing}
          />
          <Dropdown
            title="Formación"
            countryOptions={[]}
            languageOptions={[]}
            profileData={profileData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            isEditable ={isEditing}
          />
        </div>
        <div className="px-6 py-4 flex justify-center gap-6">
          <button
            className="w-52 bg-white text-purple-500 border-purple-500 border-solid border-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button
            className="w-52 bg-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleUpdateProfile}
          >
            Confirmar edición
          </button>
        </div>
        <SuccessModal isOpen={isSuccessModalOpen} onClose={handleCloseSuccessModal} />
      </div>
    </div>
  );
};

export default Profile;
