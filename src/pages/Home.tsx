import { Outlet, useLocation } from "react-router-dom";

import { IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";
import Sections from "@features/Home/Sections/Sections";

const Home = () => {
  const location = useLocation();

  return (
    <div className="flex justify-center bg-neutral-800 h-svh min-w-[220px]">
      <div className="relative overflow-hidden w-full max-w-[1300px] h-svh sm:px-1 md:px-6 lg:px-10 sm:py-5  ">
        <div className="flex justify-center  gap-x-3 h-[90.5vh] sm:h-[85vh] mb-1 overflow-hidden ">
          {/* section list */}
          <div
            className={`${
              location.pathname === "/forms" ? "block" : "hidden sm:block"
            } px-2 border-2 sm:rounded-lg w-full  sm:w-[300px] h-[90.5vh] sm:h-[85vh]  overflow-auto no-scrollbar bg-black text-white border-pink-500 `}
          >
            <Sections />
          </div>
          {/* form */}
          <div
            className={`${
              location.pathname !== "/forms" ? "block" : "hidden sm:block"
            }  sm:rounded-lg flex-1 w-full h-[90.5vh] sm:h-[85vh] max overflow-auto no-scrollbar bg-black border-2 border-pink-500`}
          >
            <Outlet />
          </div>
        </div>
        <Link
          to={"/template"}
          className=" sticky bottom-0 mt-6 w-full flex bg-[#b00f51] text-white py-2 h-[60px] max-w-[1205.66px] text-xl sm:rounded  items-center justify-center gap-x-2 active:scale-95 transition-all"
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
