import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";

const FormTitle = React.memo(
  ({ title, backRoute = "forms" }: { title: string; backRoute?: string }) => {
    return (
      <div className="sticky top-0 left-0 right-0 flex items-center text-white bg-gradient-to-r from-pink-600 via-pink-700 to-pink-800  text-lg text-center font-semibold uppercase py-1 px-3 h-10">
        <Link to={`/${backRoute}`} className="sm:hidden">
          <FaArrowLeft />
        </Link>
        <h3 className="w-full"> {title}</h3>
      </div>
    );
  }
);
FormTitle.displayName = "FormTitle";

export default FormTitle;
