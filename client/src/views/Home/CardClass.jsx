import React from 'react'

const CardClass = ({thisclass}) => {
  console.log(thisclass);
  
  return (
    <div className="shadow-home rounded-lg max-w-[357px] h-[145px] p-4 cursor-pointer">
    <div className="flex flex-col justify-between h-full">
    <p>{thisclass.title}</p>
    <p>{thisclass.language}</p>
    </div>
  </div>
  )
}

export default CardClass