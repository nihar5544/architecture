import React from "react";

function ButtonLoading() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="w-5 h-5 rounded-full animate-spin border-2 border-solid border-white border-t-transparent" />
      Loading...
    </div>
  );
}

export default ButtonLoading;
