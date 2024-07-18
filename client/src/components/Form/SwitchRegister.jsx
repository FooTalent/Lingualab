import React from 'react'

export default function SwitchRegister({ inputName, register }) {
  const roles = ['teacher', 'student']

  return (
    <div className="flex justify-center">
      {
        roles.map((role) => (
          <React.Fragment key={role}>
            <div className='w-full flex'>
              <input
                id={role}
                type="radio"
                className='hidden peer'
                value={role}
                {...register(inputName)}
              />
              <label
                htmlFor={role}
                className={`w-full text-center bg-transparent peer-checked:bg-PurpleHover text-zinc-800 font-semibold peer-checked:text-white py-3 px-4 border border-purple-500 peer-checked:border-transparent ${role === 'teacher' ? 'rounded-s' : 'rounded-e'} transition-all duration-700 ease-in-out`}
              >
                {role.toUpperCase()}
              </label>
            </div>

          </React.Fragment>
        ))
      }
    </div>
  )
}
