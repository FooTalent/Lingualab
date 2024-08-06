import React from 'react';

export default function CardList({ data, CardComponent, buttonFunction, refresh }) {
    return (
        <div className="grid grid-cols-2 gap-8">
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
