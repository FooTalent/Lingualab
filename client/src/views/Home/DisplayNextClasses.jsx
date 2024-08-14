import React from 'react';
import CardClass from './CardClass';

const DisplayNextClasses = ({ classes, loading, error }) => {
  if (loading) return <p className="text-center">Cargando Datos...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (classes.length === 0) return <p className="text-center">No hay Próximas clases</p>;

  return (
    <div className="flex flex-col justify-between lg:grid lg:grid-cols-2 gap-14">
      {classes.length >= 1 && (
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl leading-7 font-semibold">Tu clase ahora</h3>
          <CardClass thisclass={classes[0]}/>
        </div>
      )}
      {classes.length === 2 && (
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl leading-7 font-semibold">Tu próxima clase</h3>
          <CardClass thisclass={classes[1]}/>
        </div>
      )}
    </div>
  );
};

export default DisplayNextClasses;
