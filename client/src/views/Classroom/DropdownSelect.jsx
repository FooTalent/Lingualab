import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function DropdownSelect({ label, options, selectedOption, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const isObjectArray = options.length > 0 && typeof options[0] === 'object';

  const handleSelect = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative flex flex-wrap gap-3">
      <label className="text-xl p-0">
        {label}
      </label>
      <div
        className={`relative border w-full flex justify-between items-center border-gray-300 ${selectedOption !== `Seleccionar ${label.toLowerCase()}` ? 'text-black' : 'text-gray-400'} rounded-lg py-3 px-4 cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption}</span>
        {!isOpen ? <ExpandMoreIcon fontSize='medium' /> : <ExpandLessIcon fontSize='medium' />}
        {isOpen && (
          <div className="absolute top-full left-0 w-full rounded-b-md bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div className="p-1">
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
    </div>
  );
}
