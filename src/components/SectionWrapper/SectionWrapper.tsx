import { ReactNode } from "react";

const SectionWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full w- h-full bg-black text-white relative">
      {children}
    </div>
  );
};

export default SectionWrapper;
