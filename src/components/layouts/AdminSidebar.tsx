import { useEffect, useState } from "react";
import SidebarLink from "./SidebarLink";
import logo from "../../assets/images/logo.png";
import logoMd from "../../assets/images/nav-arrow.svg";
import LogoutModal from "../common/LogoutModal";
import { ChevronLeft } from "lucide-react";

export default function AdminSidebar({ pages }: { pages: SidebarRoute[] }) {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined);

  const toggleSidebar = () => {
    if (isOpen === undefined) {
      setIsOpen(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsOpen(undefined);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`${isOpen === false ? "max-w-[90px]" : "max-w-60"} bg-primary h-full ${
        isOpen === false ? "px-3 items-center" : "max-lg:px-3"
      } p-6 rounded-[20px] flex flex-col max-lg:items-center gap-5 transition-all duration-300`}
    >
      <div className="flex justify-end max-lg:hidden">
        <button
          onClick={toggleSidebar}
          className="size-8 bg-[#c2f6ff66] text-[#C2F6FF] rounded-lg flex justify-center items-center text-sm"
        >
          <ChevronLeft className={`${isOpen === false && "rotate-180"}`} />
        </button>
      </div>
      <div className="h-10 flex items-center justify-center">
        <img src={logoMd} alt="Innova's Mini-Logo" className={`${isOpen === false ? "block" : "lg:hidden"}`} />
        <img src={logo} alt="Innova's Logo" className={`max-lg:hidden ${isOpen === false && "hidden"}`} />
      </div>
      {pages.map((item, index) => {
        if (index == 4) return <div key={index} className="bg-[#E9F9FC80] h-px w-full" />;
        return (
          <SidebarLink
            key={index}
            showName={isOpen}
            name={item.name}
            icon={item.icon}
            iconActive={item.iconActive}
            link={item.link}
          />
        );
      })}
      <LogoutModal variant="admin" showName={isOpen} />
    </div>
  );
}
