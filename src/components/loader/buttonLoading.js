import React from "react";

function ButtonLoading() {
  return (
    <div>
      <button
      disabled
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded flex items-center cursor-not-allowed"
      >
        <div
          className="w-6 h-6 rounded-full animate-spin
          border-2 border-solid border-white border-t-transparent"
        ></div>
      &nbsp;  Loading...
      </button>
    </div>
  );
}

export default ButtonLoading;
