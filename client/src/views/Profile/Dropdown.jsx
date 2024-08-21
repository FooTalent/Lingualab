import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import deleteIcon from '/eliminar.svg'
import linkIcon from '/link.svg'
import linkIconDisabled from '/linkDisabled.svg'
import titleIcon from '/title.svg'
import titleIconDisabled from '/titleDisabled.svg'
import certificateIcon from '/certificate.svg'
import certificateIconDisabled from '/certificateDisabled.svg'

const Dropdown = ({ title, countryOptions, languageOptions, profileData, handleInputChange, handleSelectChange, isEditable }) => {
  const [educationLinks, setEducationLinks] = useState(profileData?.studies || []);
  const [certificateLinks, setCertificateLinks] = useState(profileData?.certificate || []);
  const [newEducationLink, setNewEducationLink] = useState({ title: '', link: '' });
  const [newCertificateLink, setNewCertificateLink] = useState({ title: '', link: '' });
  const [showEducationInputs, setShowEducationInputs] = useState(false);
  const [showCertificateInputs, setShowCertificateInputs] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [menuStyles, setMenuStyles] = useState({});

  useEffect(() => {
    const parentDiv = document.getElementById('parent-select');
    const selectElement = document.querySelector('.custom-select-container');

    if (parentDiv && selectElement) {
      const parentWidth = parentDiv.offsetWidth;
      const selectWidth = selectElement.offsetWidth;

      const leftOffset = (parentWidth - selectWidth) / 1.3;

      setMenuStyles({
        width: `${parentWidth}px`,
        left: `-${leftOffset}px`,
      });
    }
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    if (!validateEmail(value)) {
      setEmailError('Correo electrónico no válido');
    } else {
      setEmailError('');
    }
    handleInputChange(e);
  };

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
  };

  const saveCertificateLink = () => {
    setCertificateLinks([...certificateLinks, newCertificateLink]);
    setShowCertificateInputs(false);
    handleInputChange({ target: { name: 'certificate', value: [...certificateLinks, newCertificateLink] } });
    setNewCertificateLink({ title: '', link: '' });
  };

  const cancelEducationLink = () => {
    setShowEducationInputs(false);
    setNewEducationLink({ title: '', link: '' });
  };

  const cancelCertificateLink = () => {
    setShowCertificateInputs(false);
    setNewCertificateLink({ title: '', link: '' });
  };

  const customStylesSelect = {
    control: (base) => ({
      ...base,
      background: 'transparent',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      border: 'none',
      boxShadow: 'none',
      padding: 0,
      margin: 0,
    }),
    valueContainer: (base) => ({ ...base, padding: 0, }),
    placeholder: (base) => ({ ...base, padding: 0, color: '#9B9B9B', }),
    singleValue: (base) => ({ ...base, color: profileData.country ? '#444' : '#9B9B9B', }),
    indicatorSeparator: (base) => ({ ...base, display: 'none', }),
    dropdownIndicator: (base, state) => ({
      ...base,
      display: isEditable ? 'inline' : 'none',
      color: '#9B9B9B',
      padding: 0,
      svg: {
        width: 30,
        height: 30,
        transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      }
    }),
    menu: (base) => ({
      ...base,
      position: 'absolute',
      width: menuStyles.width || 'auto',
      left: menuStyles.left || '0',
      border: '1px solid #9B9B9B',
      BorderTop: 0,
      borderRadius: '0px 0px 8px 8px',
      padding: '8px 8px 16px 8px',
    }),
    menuList: (base) => ({ ...base, display: 'flex', flexDirection: 'column', gap: '4px', }),
    option: (base, state) => ({
      ...base,
      display: 'flex',
      padding: '8px',
      borderRadius: '6px',
      margin: 0,
      backgroundColor: state.isSelected
        ? '#6945FF'
        : state.isFocused
          ? '#6945FF'
          : 'transparent',
      color: state.isSelected
        ? '#fff'
        : state.isFocused
          ? '#fff'
          : '#444',
    }),
  }

  return (
    <details className='flex flex-col gap-[30px]'>
      <summary className="bg-Yellow text-card font-extrabold tracking-wide py-3 px-4 rounded-lg cursor-pointer flex justify-between items-center border border-Yellow">
        <span>{title}</span>
        <span
          className={`transform transition-transform ease-out duration-300 
            ${isEditable ? 'rotate-180' : 'rotate-0'}
            `}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </span>
      </summary>

      <div className='flex flex-col gap-2 mt-[30px] text-card'>
        {title === 'Datos personales' && (
          <>
            {
              isEditable && (
                <>
                  <div className="flex flex-col">
                    <label
                      htmlFor="first_name"
                      className='py-1 px-3 text-lg font-medium leading-5'
                    >
                      Nombre
                    </label>

                    <div className={`flex items-center gap-3 border ${profileData.first_name ? 'text-card border-card' : 'text-Grey border-Grey'} focus-within:text-card focus-within:border-Purple rounded-lg py-3 px-4 ease-out duration-300`}>
                      <PersonIcon />
                      <input
                        className="border-0 p-0 rounded-none appearance-none focus:outline-none bg-transparent"
                        type="text"
                        id='first_name'
                        name="first_name"
                        value={profileData.first_name || ''}
                        onChange={handleInputChange}
                        placeholder="Ingresa tu nombre"
                        disabled={!isEditable}
                        pattern="[A-Za-z ]+"
                        title="Solo se permiten letras y espacios"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="last_name"
                      className='py-1 px-3 text-lg font-medium leading-5'
                    >
                      Apellido
                    </label>

                    <div className={`flex items-center gap-3 border ${profileData.last_name ? 'text-card border-card' : 'text-Grey border-Grey'} focus-within:text-card focus-within:border-Purple rounded-lg py-3 px-4 ease-out duration-300`}>
                      <PersonIcon />
                      <input
                        className="border-0 p-0 rounded-none appearance-none focus:outline-none bg-transparent"
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={profileData.last_name || ''}
                        onChange={handleInputChange}
                        placeholder="Ingresa tu apellido"
                        disabled={!isEditable}
                        pattern="[A-Za-z ]+"
                        title="Solo se permiten letras y espacios"
                        required
                      />
                    </div>
                  </div>
                </>
              )
            }
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className='py-1 px-3 text-lg font-medium leading-5'
              >
                Email
              </label>

              <div className={`flex items-center gap-3 border ${profileData.email ? 'text-card border-card' : 'text-Grey border-Grey'} focus-within:text-card focus-within:border-Purple rounded-lg py-3 px-4 ease-out duration-300`}>
                <EmailIcon />
                <input
                  className="border-0 p-0 rounded-none appearance-none focus:outline-none disabled:bg-transparent cursor-not-allowed bg-transparent"
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email || ''}
                  onChange={handleEmailChange}
                  placeholder="Ingresa tu email"
                  // disabled={!isEditable}
                  disabled
                  required
                />
                {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="country"
                className='py-1 px-3 text-lg font-medium leading-5'
              >
                País
              </label>

              <div id='parent-select' className={`relative flex items-center gap-3 border ${profileData.country ? 'text-card border-card' : 'text-Grey border-Grey'} focus-within:text-card focus-within:border-Purple rounded-lg py-3 px-4 ease-out duration-300`}>
                <PublicIcon />
                <Select
                  id="country"
                  className="custom-select-container w-full h-6 flex items-center p-0 m-0 bg-transparent"
                  name="country"
                  value={countryOptions.find(option => option.value === profileData.country) || null}
                  options={countryOptions.map(option => ({ ...option, icon: PublicIcon }))}
                  onChange={(selectedOption) => handleSelectChange('country', selectedOption)}
                  placeholder="Selecciona un país"
                  isDisabled={!isEditable}
                  styles={customStylesSelect}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="phone"
                className='py-1 px-3 text-lg font-medium leading-5'
              >
                Teléfono
              </label>

              <div className={`flex items-center gap-3 border ${profileData.phone ? 'text-card border-card' : 'text-Grey border-Grey'} focus-within:text-card focus-within:border-Purple rounded-lg py-3 px-4 ease-out duration-300`}>
                <PhoneIcon />
                <input
                  className="border-0 p-0 rounded-none appearance-none focus:outline-none bg-transparent"
                  type="tel"
                  id='phone'
                  name="phone"
                  value={profileData.phone || ''}
                  onChange={handleInputChange}
                  placeholder="+54 - 11 - 1234 - 5678"
                  disabled={!isEditable}
                  pattern="[0-9]+"
                  title="Solo se permiten números"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="languages"
                className='py-1 px-3 text-lg font-medium leading-5'
              >
                Idioma
              </label>

              <div id='parent-select' className={`relative flex items-center gap-3 border ${profileData.country ? 'text-card border-card' : 'text-Grey border-Grey'} focus-within:text-card focus-within:border-Purple rounded-lg py-3 px-4 ease-out duration-300`}>
                <SchoolIcon />
                <Select
                  id="languages"
                  className="custom-select-container w-full h-6 flex items-center p-0 m-0"
                  name="languages"
                  value={languageOptions.find(option => option.value === profileData.languages[0]) || null}
                  options={languageOptions.map(option => ({ ...option, icon: SchoolIcon }))}
                  onChange={(selectedOption) => handleSelectChange('languages', selectedOption)}
                  placeholder="Selecciona un idioma"
                  isDisabled={!isEditable}
                  styles={customStylesSelect}
                />
              </div>
            </div>
          </>
        )}
        {title === 'Formación' && (
          <>
            <div className='flex flex-col'>
              <label
                className='py-1 px-3 text-lg font-medium leading-5'
              >
                Enlaces de educación
              </label>

              <div className='flex flex-col gap-4 py-2'>
                {
                  educationLinks.map((link, index) => (
                    <div key={index} className="w-full flex items-center py-3 px-4 gap-3">
                      <img src={linkIcon} alt='' />

                      <a
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-Purple underline decoration-1 focus:outline-none focus:shadow-outline"
                      >
                        {link.title}
                      </a>

                      <button>
                        <img src={deleteIcon} alt="Eliminar" />
                      </button>
                    </div>
                  ))
                }

                {showEducationInputs && isEditable && (
                  <div className='flex flex-col gap-4 py-2'>
                    <div className='space-y-2'>
                      <div className={`flex items-center gap-3 border ${newEducationLink.title ? 'text-card border-card' : 'text-Grey border-Grey'} focus-within:text-card focus-within:border-card rounded-lg py-3 px-4 ease-out duration-300`}>
                        <img src={newEducationLink.title ? titleIcon : titleIconDisabled} alt="" />

                        <input
                          className="border-0 p-0 rounded-none appearance-none focus:outline-none disabled:bg-transparent bg-transparent"
                          type="text"
                          placeholder="Título"
                          value={newEducationLink.title}
                          onChange={(e) => handleNewEducationChange('title', e.target.value)}
                          required
                        />
                      </div>

                      <div className={`flex items-center gap-3 border ${newEducationLink.link ? 'text-card border-card' : 'text-Grey border-Grey'} focus-within:text-card focus-within:border-card rounded-lg py-3 px-4 ease-out duration-300`}>
                        <img src={newEducationLink.link ? linkIcon : linkIconDisabled} alt="" />
                        <input
                          className="border-0 p-0 rounded-none appearance-none focus:outline-none disabled:bg-transparent bg-transparent"
                          type="url"
                          placeholder="Enlace de educación"
                          value={newEducationLink.link}
                          onChange={(e) => handleNewEducationChange('link', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                      <button
                        className="border border-Purple bg-white hover:bg-Purple text-Purple hover:text-white py-2 font-extrabold tracking-wide rounded-lg focus:outline-none focus:shadow-outline ease-out duration-300"
                        onClick={cancelEducationLink}
                      >
                        Cancelar
                      </button>

                      <button
                        className="border border-Purple bg-Purple hover:bg-PurpleHover text-white py-2 font-extrabold tracking-wide rounded-lg focus:outline-none focus:shadow-outline ease-out duration-300"
                        onClick={saveEducationLink}
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                )}
                {!showEducationInputs && isEditable && (
                  <button
                    className="self-start bg-Yellow hover:bg-card text-card hover:text-Yellow py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline ease-out duration-300"
                    onClick={() => setShowEducationInputs(true)}
                  >
                    <AddIcon />
                  </button>
                )}
              </div>
            </div>

            <div className='flex flex-col gap-4 py-2'>
              <label
                className='py-1 px-3 text-lg font-medium leading-5'
              >
                Certificados
              </label>

              {
                certificateLinks.map((link, index) => (
                  <div key={index} className="w-full flex items-center py-3 px-4 gap-3">
                    <img src={linkIcon} alt="" />

                    <a
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-Purple underline decoration-1 focus:outline-none focus:shadow-outline"
                    >
                      {link.title}
                    </a>

                    <button>
                      <img src={deleteIcon} alt="Eliminar" />
                    </button>
                  </div>
                ))
              }

              {
                showCertificateInputs && isEditable && (
                  <div className='flex flex-col gap-4 py-2'>
                    <div className='space-y-2'>
                      <div className={`flex items-center gap-3 border ${newCertificateLink.title ? 'text-card border-card' : 'text-Grey border-Grey'} focus-within:text-card focus-within:border-card rounded-lg py-3 px-4 ease-out duration-300`}>
                        <img src={newCertificateLink.title ? certificateIcon : certificateIconDisabled} alt="" />

                        <input
                          className="border-0 p-0 rounded-none appearance-none focus:outline-none disabled:bg-transparent bg-transparent"
                          type="text"
                          placeholder="Título"
                          value={newCertificateLink.title}
                          onChange={(e) => handleNewCertificateChange('title', e.target.value)}
                          required
                        />
                      </div>

                      <div className={`flex items-center gap-3 border ${newCertificateLink.title ? 'text-card border-card' : 'text-Grey border-Grey'} focus-within:text-card focus-within:border-card rounded-lg py-3 px-4 ease-out duration-300`}>
                        <img src={newCertificateLink.link ? linkIcon : linkIconDisabled} alt="" />

                        <input
                          className="border-0 p-0 rounded-none appearance-none focus:outline-none disabled:bg-transparent bg-transparent"
                          type="url"
                          placeholder="Enlace de educación"
                          value={newCertificateLink.link}
                          onChange={(e) => handleNewCertificateChange('link', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                      <button
                        className="border border-Purple bg-white hover:bg-Purple text-Purple hover:text-white py-2 font-extrabold tracking-wide rounded-lg focus:outline-none focus:shadow-outline ease-out duration-300"
                        onClick={cancelCertificateLink}
                      >
                        Cancelar
                      </button>

                      <button
                        className="border border-Purple bg-Purple hover:bg-PurpleHover text-white py-2 font-extrabold tracking-wide rounded-lg focus:outline-none focus:shadow-outline ease-out duration-300"
                        onClick={saveCertificateLink}
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                )
              }

              {
                !showCertificateInputs && isEditable && (
                  <button
                    className="self-start bg-Yellow hover:bg-card text-card hover:text-Yellow py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline ease-out duration-300"
                    onClick={() => setShowCertificateInputs(true)}
                  >
                    <AddIcon />
                  </button>
                )
              }
            </div>
          </>
        )}
      </div>
    </details >
  );
};



Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  countryOptions: PropTypes.array.isRequired,
  languageOptions: PropTypes.array.isRequired,
  profileData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  isEditable: PropTypes.bool.isRequired,
};

export default Dropdown;