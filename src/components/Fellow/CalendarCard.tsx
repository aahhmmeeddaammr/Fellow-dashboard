import Calendar from "react-calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";

function CalendarCard({ dates }: { dates: string[] }) {
  console.log([dates]);

  const eventDates = dates.map((item) => new Date(item).toLocaleDateString("en-CA"));
  const today = new Date();

  return (
    <>
      <Calendar
        className={` text-center border-hidden inter`}
        minDetail="month"
        next2Label={null}
        prev2Label={null}
        nextLabel={<ChevronRight className="text-[#6B7280] mb-1" />}
        prevLabel={<ChevronLeft className="text-[#6B7280] mb-1" />}
        calendarType="islamic"
        formatShortWeekday={(locale, date) => {
          console.log(locale);
          const customWeekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
          return customWeekdays[date.getDay()];
        }}
        tileClassName={({ date, activeStartDate }) => {
          if (activeStartDate.getMonth() == 0) {
            if (date.getMonth() == 1) {
              return "invisible";
            }
          } else if (date.getMonth() > activeStartDate.getMonth() || date.getFullYear() > activeStartDate.getFullYear()) {
            return "invisible";
          }

          const formattedDate = date.toLocaleDateString("en-CA");

          if (eventDates.includes(formattedDate) && date.toDateString() != today.toDateString()) {
            if (date < today) {
              return "old-class";
            } else if (date > today) {
              return "new-class";
            }
          }
        }}
      />
      <div className="flex justify-center gap-3 md:gap-6 text-xs leading-5 mt-3">
        <div className="flex items-center gap-[5px]">
          <div className="size-[10px] bg-[#CCFF02] rounded-full"></div>
          <p className="text-nowrap">Today</p>
        </div>
        <div className="flex items-center gap-[5px]">
          <div className="size-[10px] bg-[#065361] rounded-full"></div>
          <p className="text-nowrap">Old Class</p>
        </div>
        <div className="flex items-center gap-[5px]">
          <div className="size-[10px] bg-primary rounded-full"></div>
          <p className="text-nowrap">Upcoming Class</p>
        </div>
      </div>
    </>
  );
}

export default CalendarCard;
