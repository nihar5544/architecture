import React from 'react'

function ButtonDark({name,handlesubmit}) {
  return (
    <div>
        <button onClick={handlesubmit} className="flex items-center text-white bg-[#292F36] text-lg rounded-xl p-6 px-12 w-fit">
           {name}
            <svg
            className="ml-2"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
            >
              <path
                d="M1 8.43542L14.7232 8.29857M9.61818 1.91138L16.1412 8.43436L9.48677 15.0887"
                stroke="#CDA274"
                stroke-width="2"
                stroke-linecap="square"
                stroke-linejoin="round"
              />
            </svg>
          </button>
    </div>
  )
}

export default ButtonDark