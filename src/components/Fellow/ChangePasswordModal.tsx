import { useModal } from "../../Hooks/useModal";
import InputField from "../common/InputField";
import DashboardModal from "../common/Modal";
import lockImg from "../../assets/images/lock.svg";
export default function ChangePasswordModal() {
  const { openModal, openModals } = useModal();
  const fields = [
    { label: "Enter Old Password", type: "password", name: "currentPass", hideStrength: true },
    { label: "Enter New Password", type: "password", name: "newPass" },
    { label: "Confirm New Password", type: "password", name: "confirmPass" },
  ];
  return (
    <>
      <button
        onClick={() => {
          openModal("ChangePassword");
        }}
        className="cursor-pointer flex items-center gap-1"
      >
        <span className="text-primary font-medium text-sm leading-6 tracking-[-0.02em]">Change Password</span>
        <img src={lockImg} width={24} height={24} alt="" />
      </button>
      {openModals["ChangePassword"] && (
        <DashboardModal icon={lockImg} buttonText="Change" title="Change Password" modalName={"ChangePassword"}>
          <form className="flex flex-col gap-4 my-2">
            {fields.map(({ label, name, type, hideStrength }, index) => {
              return <InputField key={index} label={label} name={name} type={type} hideStrength={hideStrength} />;
            })}
          </form>
        </DashboardModal>
      )}
    </>
  );
}
