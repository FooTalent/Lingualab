//Componente Perfil
import { MenuItem, InputLabel, FormControl } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge'; // Para el icono de Alias
import CreditCardIcon from '@mui/icons-material/CreditCard'; // Para el icono de CBU
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // Para el icono de Banco
import Select from 'react-select';
import countryList from 'country-list';
import countryCodes from 'country-codes-list';


const Profile = () => {
  // Obtener la lista de países
  const countries = countryList.getData();
  const countryOptions = countries.map(country => ({ value: country.code, label: country.name }));

  // Obtener la lista de códigos de país
  const countryPhoneCodes = countryCodes.customList('countryCode', '{countryCallingCode}');
  const countryPhoneOptions = Object.keys(countryPhoneCodes).map(code => ({
    value: countryPhoneCodes[code],
    label: `${countryPhoneCodes[code]}`
  }));

  // Lista de bancos para el desplegable
  const banks = ["Banco A", "Banco B", "Banco C"]; // Reemplazar con nombres reales
  const bankOptions = banks.map(bank => ({ value: bank, label: bank }));

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex justify-center mt-6">
        <img
          className="w-24 h-24 rounded-full"
          src="https://thumbs.dreamstime.com/b/retrato-de-alegre-y-hermosa-ropa-ojos-mujer-con-aspecto-complaciente-lleva-su%C3%A9ter-casual-gris-modelos-en-estudio-contra-fondo-183224846.jpg"
          alt="Patricia López"
        />
      </div>
      <div className="text-center mt-2">
        <h2 className="text-lg font-semibold">Patricia López</h2>
        <p className="text-gray-600">Profesora: Inglés</p>
      </div>
      <div className="px-6 py-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="about">
          Acerca de mi...
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="about"
          type="text"
          placeholder="Acerca de mi..."
        />
      </div>
      <div className="px-6 pb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Dropdown title="Datos personales" countryOptions={countryOptions} countryPhoneOptions={countryPhoneOptions} />
        <Dropdown title="Datos bancarios" bankOptions={bankOptions} />
        <Dropdown title="Formación" />
      </div>
      <div className="px-6 py-4 flex justify-center">
        <button className="bg-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Guardar
        </button>
      </div>
    </div>
  );
};

const Dropdown = ({ title, countryOptions, countryPhoneOptions, bankOptions }) => {
  return (
    <details className="mb-4">
      <summary className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded cursor-pointer flex justify-between items-center">
        <span>{title}</span>
        <span className="ml-2">&#9660;</span> {/* Flecha hacia abajo */}
      </summary>
      <div className="mt-2 ml-4 text-gray-600">
        {title === "Datos personales" && (
          <div>
            <div className="flex items-center mt-2">
              <EmailIcon className="mr-2" />
              <span>Email</span>
            </div>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-1"
              type="email"
              placeholder="Email"
            />
            <div className="flex items-center mt-4">
              <PublicIcon className="mr-2" />
              <span>País</span>
            </div>
            <Select
              className="w-full mt-1"
              options={countryOptions}
              placeholder="Seleccione un país"
            />
            <div className="flex items-center mt-4">
              <PhoneIcon className="mr-2" />
              <span>Teléfono</span>
            </div>
            <div className="flex mt-1">
              <Select
                className="w-1/3"
                options={countryPhoneOptions}
                placeholder="Código"
              />
              <input
                className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                type="tel"
                placeholder="Teléfono"
              />
            </div>
          </div>
        )}
        {title === "Datos bancarios" && (
          <div>
            <div className="flex items-center mt-2">
              <BadgeIcon className="mr-2" />
              <span>Alias</span>
            </div>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-1"
              type="text"
              placeholder="Nombre del Alias"
            />
            <div className="flex items-center mt-4">
              <CreditCardIcon className="mr-2" />
              <span>CBU</span>
            </div>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-1"
              type="text"
              placeholder="CBU"
            />
            <div className="flex items-center mt-4">
              <AccountBalanceIcon className="mr-2" />
              <span>Banco</span>
            </div>
            <Select
              className="w-full mt-1"
              options={bankOptions}
              placeholder="Seleccione un banco"
            />
          </div>
        )}
        {/* Puedes agregar contenido similar para los otros desplegables si es necesario */}
      </div>
    </details>
  );
};

export default Profile;
