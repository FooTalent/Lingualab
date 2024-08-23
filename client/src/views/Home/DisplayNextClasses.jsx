import React, { useState } from 'react';
import CardClass from './CardClass';
import Spinner from '../../components/Spinner/Spinner';

const DisplayNextClasses = ({ classes, loading, error, refresh, buttonFunction }) => {

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  
  if (!classes || classes.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-10 m-0 mt-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl leading-6 font-semibold mb-2">Tu clase ahora</h2>
          <div className="shadow-home rounded-xl py-6 px-8 flex flex-col gap-4 text-center items-center">
            <img
              src="/ImagesHome/campana.png"
              alt="Campana"
              className="h-auto rounded-lg"
            />
            <p className="font-bold">No tienes clases creadas</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl leading-6 font-semibold mb-2">Tu próxima clase</h2>
          <div className="shadow-home rounded-xl py-6 px-8 flex flex-col gap-4 text-center items-center">
            <img
              src="/ImagesHome/calendarioh.png"
              alt="Calendario"
              className="h-auto rounded-lg"
            />
            <p className="font-bold">No tienes clases programadas</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {classes.length === 1 && (
        <div className="order-3 flex flex-col md:grid grid-cols-2 px-2 lg:px-0 gap-10 m-0 mt-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl leading-6 font-semibold mb-2">Tu clase ahora</h2>
            <CardClass thisclass={classes[0]} />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-xl leading-6 font-semibold mb-2">Tu próxima clase</h2>
            <div className="shadow-home rounded-xl py-6 px-8 flex flex-col gap-4 text-center items-center">
              <img
                src="/ImagesHome/calendarioh.png"
                alt="Calendario"
                className="h-auto rounded-lg"
              />
              <p className="font-bold">No tienes clases programadas</p>
            </div>
          </div>
        </div>
      )}
      {classes.length === 2 && (
        <div className="order-3 flex flex-col md:grid grid-cols-2 px-2 lg:px-0 gap-10 m-0 mt-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl leading-6 font-semibold mb-2">Tu clase ahora</h2>
            <CardClass
              thisclass={classes[0]}
              buttonFunction={buttonFunction}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-xl leading-6 font-semibold mb-2">Tu próxima clase</h2>
            <CardClass
              thisclass={classes[1]}
              buttonFunction={buttonFunction}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayNextClasses;
