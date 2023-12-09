import React from 'react'
import Icons from '../icons'

function ButtonDark({name,handlesubmit}) {
  return (
    <div>
        <button onClick={handlesubmit} className="flex items-center text-white bg-[#292F36] text-lg rounded-xl p-6 px-12 w-fit">
           {name}
          <Icons  name={"Arrow-light"} />
          </button>
    </div>
  )
}

export default ButtonDark
