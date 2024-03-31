import React from 'react'
import "../css/loader.css"

const Loading = () => {
  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center bg-black'>
      <div>
      <div className='loader'></div>
      <div className='loaders'></div>
      </div>
  </div>
  )
}

export default Loading