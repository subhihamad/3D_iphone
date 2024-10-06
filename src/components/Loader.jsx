import { useProgress } from '@react-three/drei'
import React from 'react'

const Loader = () => {
    const {progress}=useProgress()
  return (
    <div className='flex w-full h-full justify-center items-start text-center'>
        <h1 className='text-gray-600 font-semibold text-2xl'>
            {progress!==0 ? progress.toFixed(2)  : 'Loading' }
        </h1>
    </div>
  )
}

export default Loader