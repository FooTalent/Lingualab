import { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add';

const Dropdown = ({ title, countryOptions, languageOptions, profileData, handleInputChange, handleSelectChange }) => {
  const [educationLinks, setEducationLinks] = useState(profileData?.studies || []);
  const [certificateLinks, setCertificateLinks] = useState(profileData?.certificate || []);
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
  };

  const saveCertificateLink = () => {
    setCertificateLinks([...certificateLinks, newCertificateLink]);
    setShowCertificateInputs(false);
    handleInputChange({ target: { name: 'certificate', value: [...certificateLinks, newCertificateLink] } });
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
                  <button className="bg-blue-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={saveEducationLink}>Guardar</button>
                </div>
              )}
              {!showEducationInputs && (
                <button className="bg-green-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mt-2" onClick={() => setShowEducationInputs(true)}>
                  <AddIcon className="mr-1" /> Añadir nuevo
                </button>
              )}
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
                  <button className="bg-blue-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={saveCertificateLink}>Guardar</button>
                </div>
              )}
              {!showCertificateInputs && (
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
};

export default Dropdown;