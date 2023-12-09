import React from 'react'
import Icons from '../icons'

function ButtonLight({name,handlesubmit}) {
  return (
    <div>
        <button onClick={handlesubmit} className="flex items-center text-white bg-[#CDA274] text-lg rounded-xl p-6 px-12 w-fit">
           {name}
          <Icons name="Arrow-dark" />
          </button>
    </div>
  )
}

export default ButtonLight
