import React from 'react'

function ButtonLight({name,handlesubmit}) {
  return (
    <div>
        <button onClick={handlesubmit} className="flex items-center text-white bg-[#CDA274] text-lg rounded-xl p-6 px-12 w-fit">
           {name}
           <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
  <path d="M1.92969 8.43542L15.6529 8.29857M10.5479 1.91138L17.0708 8.43436L10.4165 15.0887" stroke="#292F36" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
</svg>
          </button>
    </div>
  )
}

export default ButtonLight
