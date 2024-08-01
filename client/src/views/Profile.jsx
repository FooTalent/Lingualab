//Componente Perfil
import { useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Select from 'react-select';
import countryList from 'country-list';
import countryCodes from 'country-codes-list';
import PropTypes from 'prop-types';
import { BsCameraFill } from "react-icons/bs";
import { useAppStore } from '../store/useAppStore';

const Profile = () => {
  const countries = countryList.getData();
  const countryOptions = countries.map(country => ({ value: country.code, label: country.name }));

  const countryPhoneCodes = countryCodes.customList('countryCode', '{countryCallingCode}');
  const countryPhoneOptions = Object.keys(countryPhoneCodes).map(code => ({
    value: countryPhoneCodes[code],
    label: `${countryPhoneCodes[code]}`
  }));
  const { userDetail } = useAppStore()

  return (
    <div className=" relative bg-white gap-[20px] flex items-center justify-center flex-col mx-auto mt-20 max-w-[1210px]">
      <div className="absolute top-[-50px] bg-white gap-[20px] flex items-center justify-center">
        {userDetail.photo ? (
          <img
            className='h-[200px] w-[200px] rounded-full'
            src={userDetail.photo} />
        ) :
          <div className='flex items-center justify-center border rounded-full p-2 gap-2 h-[200px] w-[200px]'>
            <BsCameraFill
              className='h-[100px] w-[100px] text-Grey' />
          </div>
        }

      </div>
      <div className="border p-6 gap-12 rounded-xl w-full mt-20">
        <div className="text-center mt-20">
          <h2 className="text-lg font-semibold">Patricia López, Profesora: Inglés</h2>
          <button className="bg-purple-500 text-white rounded-full p-2 absolute top-28 right-6">
            <EditIcon />
          </button>
        </div>
        <div className="px-6 py-4 flex justify-center">
          <textarea
            className="shadow appearance-none border rounded w-[600px] h-[120px] py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
            style={{ textAlign: 'left' }}
            id="about"
            placeholder="Acerca de mí..."
          />
        </div>
        <div className="px-6 pb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Dropdown title="Datos personales" countryOptions={countryOptions} countryPhoneOptions={countryPhoneOptions} />
          <Dropdown title="Formación" />
        </div>
        <div className="px-6 py-4 flex justify-center">
          <button className="bg-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Confirmar edición
          </button>
        </div>
      </div>
    </div>
  );
};

const Dropdown = ({ title, countryOptions, countryPhoneOptions }) => {
  const [educationLinks, setEducationLinks] = useState([]);
  const [certificateLinks, setCertificateLinks] = useState([]);

  const addEducationLink = () => {
    setEducationLinks([...educationLinks, '']);
  };

  const addCertificateLink = () => {
    setCertificateLinks([...certificateLinks, '']);
  };

  return (
    <details className="mb-4">
      <summary className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded cursor-pointer flex justify-between items-center">
        <span>{title}</span>
        <span className="ml-2">&#9660;</span>
      </summary>
      <div className="mt-2 ml-4 text-gray-600">
        {title === "Datos personales" && (
          <div>
            <div className="flex items-center mt-2">
              <EmailIcon className="mr-2" />
              <span className="font-bold">Email</span>
            </div>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-1"
              style={{ textAlign: 'left' }}
              type="email"
              placeholder="Email"
            />
            <div className="flex items-center mt-4">
              <PublicIcon className="mr-2" />
              <span className="font-bold">País</span>
            </div>
            <Select
              className="w-full mt-1"
              options={countryOptions}
              placeholder="Seleccione un país"
            />
            <div className="flex items-center mt-4">
              <PhoneIcon className="mr-2" />
              <span className="font-bold">Teléfono</span>
            </div>
            <div className="flex mt-1">
              <Select
                className="w-1/3"
                options={countryPhoneOptions}
                placeholder="Código"
              />
              <input
                className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                style={{ textAlign: 'left' }}
                type="tel"
                placeholder="Teléfono"
              />
            </div>
          </div>
        )}
        {title === "Formación" && (
          <div>
            <div className="flex items-center mt-2">
              <SchoolIcon className="mr-2" />
              <span className="font-bold">Estudios</span>
            </div>
            {educationLinks.map((link, index) => (
              <input
                key={index}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-1"
                style={{ textAlign: 'left' }}
                type="text"
                placeholder="Agregar link"
              />
            ))}
            <button
              className="flex items-center mt-2 text-blue-500"
              onClick={addEducationLink}
            >
              <AddIcon className="mr-1" />
              <span>Agregar link</span>
            </button>
            <div className="flex items-center mt-4">
              <SchoolIcon className="mr-2" />
              <span className="font-bold">Certificados</span>
            </div>
            {certificateLinks.map((link, index) => (
              <input
                key={index}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-1"
                style={{ textAlign: 'left' }}
                type="text"
                placeholder="Agregar link"
              />
            ))}
            <button
              className="flex items-center mt-2 text-blue-500"
              onClick={addCertificateLink}
            >
              <AddIcon className="mr-1" />
              <span>Agregar link</span>
            </button>
          </div>
        )}
      </div>
    </details>
  );
};

// Define las validaciones de las props
Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  countryOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  countryPhoneOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default Profile;