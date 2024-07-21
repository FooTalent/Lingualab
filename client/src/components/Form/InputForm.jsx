import ErrorMessage from '../ErrorMessage';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

export default function InputForm({ inputName, register, errors, getInputConfig }) {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };
    const isPasswordInput = inputName === 'password' || inputName === 'rPassword'
    const validationRules = {
        required: 'Campo obligatorio',
        pattern: {
            value: getInputConfig(inputName).validations,
            message: getInputConfig(inputName).messageError,
        }
    };
    if (inputName === 'rPassword') {
        validationRules.validate = getInputConfig(inputName).validations.validate;
    }

    return (
        <div key={inputName} className="flex flex-col">
            <label>{getInputConfig(inputName).label}</label>
            <div className='relative w-full'>
                {inputName === 'email' ? <MailIcon className='icons' /> : isPasswordInput ? <VpnKeyIcon className='icons' /> : <PersonIcon className='icons' />}
                <input
                    id={inputName}
                    placeholder={getInputConfig(inputName).placeholder}
                    type={isPasswordInput ? showPassword ? 'text' : 'password' : getInputConfig(inputName).type}
                    {...register(inputName, validationRules)}
                />
                {isPasswordInput &&
                    (<button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-Purple"
                    >
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </button>)
                }
            </div>
            {errors[inputName] && (
                <ErrorMessage>{errors[inputName].message}</ErrorMessage>
            )}
        </div>
    );
}