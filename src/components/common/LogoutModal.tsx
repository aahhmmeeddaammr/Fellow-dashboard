import { useNavigate } from "react-router-dom";
import { useModal } from "../../Hooks/useModal";
import SidebarLink from "../layouts/SidebarLink";
import DashboardModal from "./Modal";

const LogoutModal = ({
  showName,
  variant = "student",
  className,
}: {
  showName?: boolean;
  variant?: "student" | "admin";
  className?: string;
}) => {
  const { openModal, openModals, closeModal } = useModal();
  const modalName = "LogoutModal";
  const navigate = useNavigate();

  const logout = {
    name: "Log out",
    icon: (
      <svg
        className="fill-primarySubtle"
        width={25}
        height={24}
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.4"
          d="M9.5 7.2V16.79C9.5 20 11.5 22 14.7 22H17.29C20.49 22 22.49 20 22.49 16.8V7.2C22.5 4 20.5 2 17.3 2H14.7C11.5 2 9.5 4 9.5 7.2Z"
        />
        <path d="M6.07141 8.11999L2.72141 11.47C2.43141 11.76 2.43141 12.24 2.72141 12.53L6.07141 15.88C6.36141 16.17 6.84141 16.17 7.13141 15.88C7.42141 15.59 7.42141 15.11 7.13141 14.82L5.06141 12.75H15.7514C16.1614 12.75 16.5014 12.41 16.5014 12C16.5014 11.59 16.1614 11.25 15.7514 11.25H5.06141L7.13141 9.17999C7.28141 9.02999 7.35141 8.83999 7.35141 8.64999C7.35141 8.45999 7.28141 8.25999 7.13141 8.11999C6.84141 7.81999 6.37141 7.81999 6.07141 8.11999Z" />
      </svg>
    ),
  };

  const logoutUser = async () => {
    closeModal(modalName);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <SidebarLink
        isButton
        className={`mt-auto ${className}`}
        icon={logout.icon}
        name={logout.name}
        showName={showName}
        onClick={() => {
          openModal(modalName);
        }}
      />
      {openModals[modalName] && (
        <DashboardModal
          onConfirm={logoutUser}
          buttonText="Yes, log me out"
          title="Are you sure you want to log out ?!"
          modalName={modalName}
          icon={"/images/clock.svg"}
        ></DashboardModal>
      )}
    </>
  );
};

export default LogoutModal;
