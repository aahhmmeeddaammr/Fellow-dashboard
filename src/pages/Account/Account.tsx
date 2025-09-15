import AccountItem from "../../components/Fellow/AccountItem";
import ChangePasswordModal from "../../components/Fellow/ChangePasswordModal";
import EditImageIcon from "../../icons/EditImageIcon";
import arrow from "../../assets/images/arrow.png";
import user from "../../assets/images/2user.svg";
import { useFellowAccount } from "../../Hooks/useFellow";
const FellowAccount = () => {
  const { data } = useFellowAccount();

  const accountInfo = [
    { label: "Full Name", value: data?.fullName },
    { label: "Fellow ID", value: data?.id },
    { label: "Email Address", value: data?.email },
    { label: "Gender", value: data?.gender },
    { label: "National ID", value: data?.nationalId },
    { label: "Join Date", value: data?.joinDate },
  ];

  return (
    <>
      <div className="grid grid-cols-[300px_1fr] items-start gap-4">
        <div className="w-full h-full bg-primary flex flex-col items-center relative rounded-3xl overflow-hidden pt-5">
          <img src={data?.pictureUrl} className="rounded-full size-34 object-cover" alt="" />
          <label htmlFor="feedbackFile" className="cursor-pointer flex justify-end items-center mt-1 mb-3">
            <p className="text-[#C2F6FF] text-sm underline">Change Photo</p>
            <div className="ml-2">
              <EditImageIcon />
            </div>
            <input type="file" hidden id="feedbackFile" />
          </label>
          <p className="font-bold text-2xl text-white">{data?.fullName}</p>
          <p className="text-white font-medium">ID: {data?.id}</p>
          <div className="absolute -bottom-5 pe-6 w-full">
            <img src={arrow} alt="arrow" className="w-full" />
          </div>
        </div>
        <div className="w-full bg-white rounded-[20px] py-5 px-8">
          <h3 className="flex items-center gap-1 text-2xl tracking-[-0.02em] text-primary font-bold">
            <img src={user} alt="User Icon" />
            Personal Information
          </h3>
          <div className="h-px w-full bg-primary mt-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-[auto_auto] gap-y-4 mt-5">
            {accountInfo.map((item, index) => (
              <AccountItem key={index} label={item.label} value={item.value} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end w-full mt-3">
        <ChangePasswordModal />
      </div>
    </>
  );
};

export default FellowAccount;
