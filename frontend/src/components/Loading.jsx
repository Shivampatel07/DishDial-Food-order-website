import React from 'react'
import "../css/loader.css"

const Loading = () => {
  return (
    <div className='w-full fixed z-30 h-full top-0 flex justify-center items-center bg-[#9e9c9c96]'>
      <div>
      <div className='loader'></div>
      </div>
  </div>
  )
}

export default Loading