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

      setTimeout(() => {
        setIsSuccessModalOpen(false)
      }, 2000);
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
        isEditing={isEditing}
      />

      <div className="flex flex-col gap-10 border border-inputBg shadow-customTable rounded-xl p-6 -mt-[100px]">
        <div className='flex flex-col items-center gap-6'>
          <h2 className="mt-32 text-[26px] leading-8 font-semibold">{profileData.last_name} {profileData.first_name}</h2>
          <textarea
            className="border border-card rounded-lg w-full h-[120px] py-3 px-4 text-card leading-custom text-justify scrollbar focus:outline-none resize-none"
            style={{ textAlign: 'left' }}
            id="presentation"
            name="presentation"
            value={profileData.presentation || ''}
            onChange={handleInputChange}
            placeholder="Acerca de mí..."
            disabled={!isEditing}
          />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12">
          <Dropdown
            title="Datos personales"
            countryOptions={countryOptionsState}
            languageOptions={languageOptions}
            profileData={profileData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            isEditable={isEditing}
          />

          <Dropdown
            title="Formación"
            countryOptions={[]}
            languageOptions={[]}
            profileData={profileData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            isEditable={isEditing}
          />
        </div>

        {
          isEditing
            ? (
              <div className="flex flex-col md:flex-row justify-center md:items-center gap-6">
                <button
                  className="min-w-52 bg-white hover:bg-Purple text-Purple hover:text-white border-Purple border font-extrabold tracking-wide leading-6 py-2 px-8 rounded-lg focus:outline-none focus:shadow-outline ease-out duration-300"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
                <button
                  className="min-w-52 bg-Purple hover:bg-PurpleHover text-white border-Purple border font-extrabold tracking-wide leading-6 py-2 px-8 rounded-lg focus:outline-none focus:shadow-outline ease-out duration-300"
                  type="button"
                  onClick={handleUpdateProfile}
                >
                  Guardar edición
                </button>
              </div>
            )
            : <></>
        }
        <SuccessModal isOpen={isSuccessModalOpen} />
      </div>
    </div>
  );
};

export default Profile;
