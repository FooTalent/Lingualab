import React from 'react';

export default function CardList({ data, CardComponent, buttonFunction, refresh }) {
    return (
        <div className="flex flex-col md:w-3/4 lg:w-full mx-auto lg:grid grid-cols-2 gap-4 lg:gap-8">
            {
                data.map((item) => (
                    <CardComponent
                        key={item._id}
                        program={item}
                        buttonFunction={buttonFunction}
                        refresh={refresh}
                    />
                ))
            }
        </div>
    );
}
