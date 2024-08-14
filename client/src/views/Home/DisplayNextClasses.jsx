import React from 'react';

const DisplayNextClasses = ({ classes, loading, error }) => {
  console.log(loading);
  console.log(classes);
  console.log(classes.length);

  if (loading) return <p className="text-center">Cargando Datos...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (classes.length === 0) return <p className="text-center">No hay Próximas clases</p>;

  return (
    <div className="flex flex-col justify-between lg:grid lg:grid-cols-2 gap-14">
      {classes.length >= 1 && (
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl leading-7 font-semibold">Tu clase ahora</h3>
          <div className="shadow-home rounded-lg max-w-[357px] h-[145px] p-4 cursor-pointer">
            <div className="flex flex-col justify-between h-full">
              <p>{classes[0].title}</p>
              <p>{classes[0].language}</p>
            </div>
          </div>
        </div>
      )}
      {classes.length === 2 && (
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl leading-7 font-semibold">Tu próxima clase</h3>
          <div className="shadow-home rounded-lg max-w-[357px] h-[145px] p-4 cursor-pointer">
            <div className="flex flex-col justify-between h-full">
            <p>{classes[1].title}</p>
            <p>{classes[1].language}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayNextClasses;
