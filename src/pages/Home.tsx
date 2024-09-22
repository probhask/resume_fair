import { Outlet, useLocation } from "react-router-dom";

import { IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";
import Sections from "@features/Home/Sections/Sections";

const Home = () => {
  const location = useLocation();

  return (
    <div className="flex justify-center bg-neutral-800 h-svh min-w-[220px]">
      <div className="relative overflow-hidden h-full w-full max-w-[1300px] max-h-svh sm:px-1 md:px-6 lg:px-10 sm:py-5  ">
        <div className="flex justify-center  gap-x-3  sm:h-[90vh] mb-1 overflow-hidden ">
          {/* section list */}
          <div
            className={`${
              location.pathname === "/forms" ? "block" : "hidden sm:block"
            } px-2 border-2 sm:rounded-lg w-full  sm:w-[300px] h-[94vh] sm:h-[90vh]  max-h-[95vh] overflow-auto no-scrollbar bg-black text-white border-pink-500 `}
          >
            <Sections />
          </div>
          {/* form */}
          <div
            className={`${
              location.pathname !== "/forms" ? "block" : "hidden sm:block"
            }  sm:rounded-lg flex-1  w-full h-[94vh] sm:h-[90vh]  max-h-[95vh] max overflow-auto no-scrollbar bg-black border-2 border-pink-500`}
          >
            <Outlet />
          </div>
        </div>
        <Link
          to={"/resume"}
          className="w-full bg-[#b00f51] text-white py-2   h-[40px] max-w-[1205.66px] text-xl sm:rounded flex items-center justify-center gap-x-2 active:scale-95 transition-all"
        >
          <span>
            <IoEye />
          </span>
          <button>View Resume</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
