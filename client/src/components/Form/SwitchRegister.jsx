
export default function SwitchRegister({ inputName, register }) {
  const roles = ['Teacher', 'Student']

  return (
    <div className='flex flex-row md:w-[404px] md:gap-[32px] gap-[10px]'>
      {
        roles.map((role) => (
          <div key={role} className='flex py-[15px]'>
            <input
              id={role}
              type="radio"
              className='hidden peer'
              value={role}
              {...register(inputName)}
            />
            <label
              htmlFor={role}
              className={`md:w-[186px] w-[140px] rounded-lg text-center bg-white peer-checked:bg-Purple text-Purple font-semibold peer-checked:text-white py-3 border border-Purple peer-checked:border-transparent transition-all duration-700 ease-in-out`}
            >
              {role === 'Teacher' ? 'Teacher' : 'Student'}
            </label>
          </div>
        ))
      }
    </div>
  )
}
