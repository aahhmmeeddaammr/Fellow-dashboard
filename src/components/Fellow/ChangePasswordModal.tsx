import { useForm } from "react-hook-form";
import { useModal } from "../../Hooks/useModal";
import DashboardModal from "../common/Modal";
import lockImg from "../../assets/images/lock.svg";
import { useFellowMutations } from "../../Hooks/useFellow";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ChangePasswordModal() {
  const { openModal, openModals, closeModal } = useModal();
  const { updatePassword } = useFellowMutations();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      currentPass: "",
      newPass: "",
      confirmPass: "",
    },
  });

  const [strength, setStrength] = useState<"Weak" | "Medium" | "Strong" | "">("");
  const [newPass, setNewPass] = useState("");
  const [visibleFields] = useState({
    currentPass: false,
    newPass: false,
    confirmPass: false,
  });

  const checkPasswordStrength = (pwd: string) => {
    if (pwd.length < 6) return "Weak";
    if (pwd.length < 10) return "Medium";
    return /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd) ? "Strong" : "Medium";
  };

  const onSubmit = (data: { currentPass: string; newPass: string; confirmPass: string }) => {
    updatePassword(
      { data },
      {
        onSuccess: (data) => {
          if (data.data.errors.length) {
            toast.error(data.data.errors[0]);
          } else {
            toast.success("Password updated successfully");
            reset();
            closeModal("ChangePassword");
          }
        },
      }
    );
  };

  return (
    <>
      <button onClick={() => openModal("ChangePassword")} className="cursor-pointer flex items-center gap-1">
        <span className="text-primary font-medium text-sm leading-6 tracking-[-0.02em]">Change Password</span>
        <img src={lockImg} width={24} height={24} alt="" />
      </button>

      {openModals["ChangePassword"] && (
        <DashboardModal
          icon={lockImg}
          title="Change Password"
          buttonText="Change"
          modalName="ChangePassword"
          onConfirm={handleSubmit(onSubmit)}
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-primaryDark text-sm font-semibold leading-5">Enter Old Password</label>
            </div>
            <div className="relative">
              <input
                {...register("currentPass", { required: true })}
                type={visibleFields.currentPass ? "text" : "password"}
                className="peer w-full p-3 pe-10 text-primaryDark bg-white border-2 border-gray-400 rounded-lg font-medium outline-none placeholder:text-[#979797] focus:border-primary focus:bg-primarySubtle hover:border-primary hover:bg-primarySubtle hover:placeholder:text-primaryDark focus:placeholder:text-primaryDark"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-primaryDark text-sm font-semibold leading-5">Enter New Password</label>
              {newPass.length > 0 && (
                <span
                  className={`flex items-center gap-1 text-sm ${
                    strength === "Weak" ? "text-[#FF002F]" : strength === "Medium" ? "text-[#FFC700]" : "text-[#04CD00]"
                  }`}
                >
                  {strength}
                </span>
              )}
            </div>
            <div className="relative">
              <input
                {...register("newPass", { required: true })}
                type={visibleFields.newPass ? "text" : "password"}
                value={newPass}
                onChange={(e) => {
                  setNewPass(e.target.value);
                  setStrength(checkPasswordStrength(e.target.value));
                }}
                className="peer w-full p-3 pe-10 text-primaryDark bg-white border-2 border-gray-400 rounded-lg font-medium outline-none placeholder:text-[#979797] focus:border-primary focus:bg-primarySubtle hover:border-primary hover:bg-primarySubtle hover:placeholder:text-primaryDark focus:placeholder:text-primaryDark"
              />
            </div>
          </div>

          {/* 🔹 Confirm Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-primaryDark text-sm font-semibold leading-5">Confirm New Password</label>
            </div>
            <div className="relative">
              <input
                {...register("confirmPass", { required: true })}
                type={visibleFields.confirmPass ? "text" : "password"}
                className="peer w-full p-3 pe-10 text-primaryDark bg-white border-2 border-gray-400 rounded-lg font-medium outline-none placeholder:text-[#979797] focus:border-primary focus:bg-primarySubtle hover:border-primary hover:bg-primarySubtle hover:placeholder:text-primaryDark focus:placeholder:text-primaryDark"
              />
            </div>
          </div>
        </DashboardModal>
      )}
    </>
  );
}
