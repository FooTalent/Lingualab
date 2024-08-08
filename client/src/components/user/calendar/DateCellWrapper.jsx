import React from 'react'

export default function DateCellWrapper({ children }) {
  return (
    <div className={`${children.props.className} hover:bg-yellowInput ease-out duration-600`}>
      {children}
    </div>
  )
}
