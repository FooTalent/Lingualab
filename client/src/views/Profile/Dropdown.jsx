import { useState } from 'react';
import PropTypes from 'prop-types';
import Select  from 'react-select';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BadgeIcon from '@mui/icons-material/Badge';

const Dropdown = ({ title, countryOptions, languageOptions, profileData, handleInputChange, handleSelectChange, isEditable }) => {
  const [educationLinks, setEducationLinks] = useState(profileData?.studies || []);
  const [certificateLinks, setCertificateLinks] = useState(profileData?.certificate || []);
  const [newEducationLink, setNewEducationLink] = useState({ title: '', link: '' });
  const [newCertificateLink, setNewCertificateLink] = useState({ title: '', link: '' });
  const [showEducationInputs, setShowEducationInputs] = useState(false);
  const [showCertificateInputs, setShowCertificateInputs] = useState(false);
  const [emailError, setEmailError] = useState('');

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

  return (
    <details className="mb-4">
      <summary className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded cursor-pointer flex justify-between items-center">
        <span>{title}</span>
        <span className="ml-2">&#9660;</span>
      </summary>
      <div className="py-4 px-6">
        {title === 'Datos personales' && (
          <>
            { 
              isEditable && (
                <>
                  <div className="relative  flex items-center mb-4">
                    <PersonIcon className="absolute left-3 text-gray-700" />
                    <input
                      className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="first_name"
                      value={profileData.first_name || ''}
                      onChange={handleInputChange}
                      placeholder="Nombre"
                      disabled={!isEditable}
                      pattern="[A-Za-z ]+"
                      title="Solo se permiten letras y espacios"
                      required
                    />
                  </div>
                  <div className="relative flex items-center mb-4">
                    <PersonIcon className="absolute left-3 text-gray-700" />
                    <input
                      className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="last_name"
                      value={profileData.last_name || ''}
                      onChange={handleInputChange}
                      placeholder="Apellido"
                      disabled={!isEditable}
                      pattern="[A-Za-z ]+"
                      title="Solo se permiten letras y espacios"
                      required
                    />
                  </div>
                </>
              )
            }
            <div className="relative flex items-center mb-4">
              <EmailIcon className="absolute left-3 text-gray-700" />
              <input
                className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                value={profileData.email || ''}
                onChange={handleEmailChange}
                placeholder="Correo electrónico"
                disabled={!isEditable}
                required
              />
              {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
            </div>
            <div className="flex items-center mb-4">
              <PublicIcon className="mr-2" />
              <Select
                className="w-full"
                name="country"
                value={countryOptions.find(option => option.value === profileData.country) || null}
                options={countryOptions.map(option => ({ ...option, icon: PublicIcon }))}
                onChange={(selectedOption) => handleSelectChange('country', selectedOption)}
                placeholder="Selecciona un país"
                isDisabled={!isEditable}
                styles={{ control: (provided) => ({ ...provided, borderColor: '#ccc', boxShadow: 'none' }) }}
              />
            </div>
            <div className="relative flex items-center mb-4">
              <PhoneIcon className="absolute left-3 text-gray-700" />
              <input
                className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="tel"
                name="phone"
                value={profileData.phone || ''}
                onChange={handleInputChange}
                placeholder="Teléfono"
                disabled={!isEditable}
                pattern="[0-9]+"
                title="Solo se permiten números"
                required
              />
            </div>
            <div className="flex items-center mb-4">
              <SchoolIcon className="mr-2" />
              <Select
                className="w-full"
                name="languages"
                value={languageOptions.find(option => option.value === profileData.languages[0]) || null}
                options={languageOptions.map(option => ({ ...option, icon: SchoolIcon }))}
                onChange={(selectedOption) => handleSelectChange('languages', selectedOption)}
                placeholder="Selecciona un idioma"
                isDisabled={!isEditable}
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
                <div key={index} className="flex items-center mb-2">
                  <div className="relative w-full">
                    <MenuBookIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-700" />
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      style={{ display: 'inline-block', textDecoration: 'none' }}
                    >
                      {link.title}
                    </a>
                  </div>
                </div>
              ))}
              {showEducationInputs && isEditable && (
                <div className="mb-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    type="text"
                    placeholder="Título"
                    value={newEducationLink.title}
                    onChange={(e) => handleNewEducationChange('title', e.target.value)}
                    required
                  />
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    type="url"
                    placeholder="Enlace de educación"
                    value={newEducationLink.link}
                    onChange={(e) => handleNewEducationChange('link', e.target.value)}
                    required
                  />
                  <button className="bg-blue-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={saveEducationLink}>
                    Guardar
                  </button>
                  <button className="bg-red-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={cancelEducationLink}>
                    <CancelIcon className="mr-1" /> Cancelar
                  </button>
                </div>
              )}
              {!showEducationInputs && isEditable && (
                <button className="bg-green-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mt-2" onClick={() => setShowEducationInputs(true)}>
                  <AddIcon className="mr-1" /> Añadir nuevo
                </button>
              )}
            </div>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Enlaces de certificados</h4>
              {certificateLinks.map((link, index) => (
                <div className="relative w-full">
                  <div key={index} className="flex items-center mb-2">
                    <BadgeIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-700" />
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      style={{ display: 'inline-block', textDecoration: 'none' }}
                    >
                      {link.title}
                    </a>
                  </div>
                </div>
              ))}
              {showCertificateInputs && isEditable && (
                <div className="mb-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    type="text"
                    placeholder="Título"
                    value={newCertificateLink.title}
                    onChange={(e) => handleNewCertificateChange('title', e.target.value)}
                    required
                  />
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    type="url"
                    placeholder="Enlace del certificado"
                    value={newCertificateLink.link}
                    onChange={(e) => handleNewCertificateChange('link', e.target.value)}
                    required
                  />
                  <button className="bg-blue-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={saveCertificateLink}>
                    Guardar
                  </button>
                  <button className="bg-red-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick=  {cancelEducationLink}>
                    <CancelIcon className="mr-1" /> Cancelar
                  </button>
                </div>
              )}
              {!showCertificateInputs && isEditable && (
                <button className="bg-green-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mt-2" onClick={() => setShowCertificateInputs(true)}>
                  <AddIcon className="mr-1" /> Añadir nuevo
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </details>
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