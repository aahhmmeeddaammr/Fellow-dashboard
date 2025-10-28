import calendar from "../../assets/images/calendar.svg";
import freeze from "../../assets/images/freeze.svg";

const text = {
  absent: "absent",
  attended: "attended",
  late: "late",
  tbd: "TBD",
  high: "High",
  Medium: "Medium",
  Low: "Low",
  "almost-there": "Almost There!🧭",
  "rising-champ": "Rising Champ!🏆",
  "trail-blazer": "Trailblazer!🚀",
  trailblazer: "Trailblazer! 🚀",
  "hero-learner": "Hero Learner!💡",
  superstar: "Superstar💫",
  freeze: "freeze",
  pending: "Pending",
  received: "Received",
  rejected: "Rejected",
  accepted: "Accepted",
};

export default function StatusPill({ variant, isFuture, isFreeze }: StatusPillProps) {
  if (isFuture) {
    return (
      <div className="flex flex-col items-center">
        {isFreeze ? (
          <span className="size-7 rounded-full bg-[#66c1d1] flex items-center justify-center">
            <img src={freeze} alt="" />
          </span>
        ) : (
          <span className="size-7 rounded-full bg-[#66c1d1] flex items-center justify-center">
            <img src={calendar} alt="" />
          </span>
        )}
      </div>
    );
  }
  console.log("variant", variant);

  const safeVariant = variant.replace(/\s|!|🚀|🏆/g, "").toLowerCase();

  return (
    <div
      className={`${safeVariant} w-fit text-[13px] font-medium leading-6 rounded-[30px] px-3 flex items-center justify-center`}
    >
      {text[safeVariant as keyof typeof text] ?? variant}
    </div>
  );
}
