
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Conversations } from "./Conversations";
import { SearchInput } from "./SearchInput";
import { LogoutButton } from "./LogoutButton";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Toggle (Mobile Only) */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Panel */}
      <div
        className={` h-[66%] fixed lg:static  left-0 z-40  lg:h-[75%] w-[280px] lg:w-[320px] backdrop-blur-xl rounded-md  overflow-y-hidden
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="p-4 h-full flex flex-col">
          <SearchInput />
          <div className="divider px-3"></div>
          <div className="flex-1 overflow-y-auto">
            <Conversations />
          </div>
          <LogoutButton />
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
