import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="h-svh w-full relative overflow-hidden bg-black  min-w-[220px] flex flex-col items-center">
      <div className=" flex justify-center items-center h-auto max-h-[550px]">
        <img
          src="/logo-color.png"
          alt=""
          className="cover  w-full aspect-[16/9]"
        />
      </div>
      <Link
        to={"/forms"}
        className="bg-pink-600 z-10 px-4 py-2 text-xl rounded cursor-pointer active:scale-90 text-white s"
      >
        Build Resume
      </Link>
    </div>
  );
};

export default WelcomePage;
