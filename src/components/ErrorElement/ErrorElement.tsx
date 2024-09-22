import { Link } from "react-router-dom";
import React from "react";

const ErrorElement = React.memo(() => {
  return (
    <div className="w-screen h-screen flex justify-center items-start py-20 bg-black">
      <div className="w-full flex flex-col items-center ">
        <h2 className="font-bold text-4xl md:text7xl mb-4 text-[#f00b51]">
          Page Not Found
        </h2>
        <Link
          to={"/"}
          className="bg-[#f00b51] px-4 rounded-md py-2 text-lg text-[white]"
        >
          Go Back To HomePage
        </Link>
      </div>
    </div>
  );
});
ErrorElement.displayName = "ErrorElement";

export default ErrorElement;
