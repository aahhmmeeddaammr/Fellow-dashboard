import { Link } from "react-router-dom";
import arrow from "../../assets/images/fellow-arrow.svg";
import shark from "../../assets/images/shark.png";
import { ClockIcon, UserIcon } from "lucide-react";
import PresentationChartIcon from "../../icons/PresentationChartIcon";

export default function FellowGroupCard({ data }: { data: FellowHomeGroup }) {
  return (
    <Link to={`/groups/${data.groupId}`} className="flex flex-col">
      <div className="bg-primary rounded-t-[20px] relative overflow-hidden">
        <p className="text-[#C2F6FF] text-xl font-bold m-5">Innova Mini-Sharks</p>
        <img src={arrow} className="-mb-6" alt="" />
        <div className="absolute top-5 right-11">
          <img src={shark} width={64} height={64} alt="" />
        </div>
      </div>
      <div className="bg-white rounded-b-[20px] flex items-center justify-center gap-x-10 py-5">
        <p className="text-primary text-[40px] font-bold">{data.groupName}</p>
        <div className="flex flex-col gap-1.5">
          <div className="text-primaryDark text-sm font-medium flex items-center gap-1">
            <PresentationChartIcon fill="fill-primary" />
            <span>Age: {data.ageGroup}</span>
          </div>
          <div className="text-primaryDark text-sm font-medium flex items-center gap-1">
            <ClockIcon className="text-primary" size={15}/>
            <span>{data.schedule}</span>
          </div>
          <div className="text-primaryDark text-sm font-medium flex items-center gap-1">
            <UserIcon className="text-primary" size={15} />
            <span>{data.studentsNumber} Students</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
