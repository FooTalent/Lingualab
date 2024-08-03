import React from 'react';
import { LEVELS_MAP } from '../../utils/valueLists';

const ProgramCard = ({ program, buttonFunction }) => {
  return (
    <div className="program-card border p-4 rounded-lg shadow-lg flex flex-col space-y-2 w-4/5">
      <div className="flex items-center mb-2">
        <div
          className="text-white px-2 py-1 rounded-md"
          style={{ backgroundColor: LEVELS_MAP[program.level] }}
        >
          {program.level}
        </div>
        <h2 className="text-xl font-semibold ml-2">{program.title}</h2>
      </div>
      <p>Language: {program.language}</p>
      <p>Reference ID: {program._id}</p>
      {program.students.length > 0 && (
        <div>
          <h3 className="font-semibold">Alumnos:</h3>
          <ul>
            {program.students.map((student) => (
              <li key={student._id}>{student.last_name}, {student.first_name}</li>
            ))}
          </ul>
        </div>
      )}
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded-md w-1/6 self-end"
        onClick={() => buttonFunction(program._id)}
      >
        Ver Clases
      </button>
    </div>
  );
};

export default ProgramCard;
