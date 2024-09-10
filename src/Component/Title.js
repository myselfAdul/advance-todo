import React from 'react'
import moon from '../assets/night-mode.png'

const Title = () => {
  return (
    <div className='flex items-center justify-between font-bold text-4xl  '>
        <p className='text-white'>T O D O</p>
        <img src={moon} alt="" className='w-1/12' />

      
    </div>
  )
}

export default Title
