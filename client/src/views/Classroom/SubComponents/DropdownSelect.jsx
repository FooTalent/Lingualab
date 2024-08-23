import { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import ErrorMessage from '../../../components/ErrorMessage';

export default function DropdownSelect({ name, label, icon, options, selectedOption, onSelect, errors, register, setValue, clearErrors }) {
  const [isOpen, setIsOpen] = useState(false);
  const isObjectArray = options.length > 0 && typeof options[0] === 'object';

  const handleSelect = (value) => {
    onSelect(value);
    setValue(name, value);
    clearErrors(name);
    setIsOpen(false);
  };

  return (
    <div className="relative flex flex-wrap justify-between gap-3 w-full">
      <label className="text-lg md:text-custom p-0 w-full">
        {label}
      </label>

      <div className='w-full flex justify-between'>
        <div
          className={`relative border ${icon ? 'w-11/12' : 'w-full'} flex justify-between items-center border-Grey ${selectedOption !== `Seleccionar ${label.toLowerCase()}` ? 'text-card' : 'text-Grey'} rounded-lg py-3 px-4 cursor-pointer  focus:border-card hover:border-card`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedOption}</span>
          {!isOpen ? <ExpandMoreIcon fontSize='medium' /> : <ExpandLessIcon fontSize='medium' />}
          {isOpen && (
            <div className={`absolute top-full left-0 w-full rounded-b-md bg-white ring-1 ring-black ring-opacity-5 z-10`}>
              <div className="p-1 text-card">
                {options.map((option) => {
                  const displayValue = isObjectArray ? option.label : option;
                  const optionValue = isObjectArray ? option.value : option;

                  return (
                    <div
                      key={optionValue}
                      onClick={() => handleSelect(optionValue)}
                      className={`cursor-pointer hover:bg-blue-100 ${selectedOption === displayValue ? 'bg-blue-100' : ''} rounded-md p-2`}
                    >
                      {displayValue}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {icon && (
          <button
            className={`flex items-center gap-4 bg-card hover:bg-Yellow font-extrabold text-Yellow hover:text-card border-2 border-card hover:border-Yellow rounded-lg py-3 px-4 ease-linear duration-150`}
          >
            <AddIcon />
          </button>
        )}
      </div>

      {errors[name] && (
        <ErrorMessage>{errors[name].message}</ErrorMessage>
      )}
    </div>
  );
}