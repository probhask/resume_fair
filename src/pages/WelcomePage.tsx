import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="h-svh w-full relative overflow-hidden bg-black  min-w-[220px] flex flex-col items-center justify-center">
      <div className=" flex justify-center items-center h-auto max-h-[550px] overflow-hidden">
        <img
          src="/logo-color.png"
          alt=""
          className="contain w-full aspect-[16/12] md:aspect-[16/9] "
        />
      </div>
      <Link
        to={"/forms"}
        className="bg-pink-600 z-10 px-4 py-2 sm:text-xl rounded cursor-pointer active:scale-90 text-white flex items-center justify-between gap-x-3 font-semibold"
      >
        <span>Build Resume</span>
        <span>
          <FaArrowRight />
        </span>
      </Link>
    </div>
  );
};

export default WelcomePage;
