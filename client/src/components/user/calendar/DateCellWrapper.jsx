import React from 'react'

export default function DateCellWrapper({ children, view }) {
  let cellClassName = children.props.className

  return (
    <div className={`${cellClassName} 
      ${cellClassName.includes('today') && view === 'month' ? '!bg-Yellow' : ''} 
     hover:bg-yellowInput ease-out duration-600`}
    >
      {children}
    </div>
  )
}
