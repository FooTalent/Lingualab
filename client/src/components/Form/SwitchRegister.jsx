
export default function SwitchRegister({ inputName, register }) {
  const roles = ['Student', 'Teacher']

  return (
    <div className='flex flex-row md:w-[404px] md:gap-[32px] gap-[10px]'>
      {
        roles.map((role) => {
          const isDisabled = role === 'Student';

          return (
            <div key={role} className='flex py-[15px]'>
              <input
                id={role}
                type="radio"
                className='hidden peer'
                value={role}
                {...register(inputName)}
                disabled={isDisabled}
                defaultChecked={role === 'Teacher'}
              />
              <label
                htmlFor={role}
                className={`flex flex-col text-lg justify-center items-center md:w-[186px] w-[140px] rounded-lg text-center bg-white ${isDisabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'peer-checked:bg-Purple text-Purple peer-checked:text-white'} font-semibold py-3 border border-Purple ${isDisabled ? 'border-gray-300' : 'peer-checked:border-transparent'} transition-all duration-700 ease-in-out flex`}
              >
                <span>{role === 'Teacher' ? 'Profesor/a' : 'Estudiante'}</span>
                {isDisabled && (<p className="text-sm">(Próximamente)</p>)}
              </label>
            </div>
          )
        })
      }
    </div>
  );
}
