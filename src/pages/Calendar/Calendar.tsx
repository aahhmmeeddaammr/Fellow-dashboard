import React, { memo, useMemo, useCallback, Suspense, useState, useEffect } from "react";
import { useFellowUpcomingSessions } from "../../Hooks/useFellow";
import { useFellowCalendar } from "../../Hooks/useFellowCalendar";
import BookIcon from "../../icons/BookIcon";
import ClockIcon from "../../icons/ClockIcon";
import PresentationChartIcon from "../../icons/PresentationChartIcon";
import UserIcon from "../../icons/UserIcon";
import type { DashboardCalendarProps } from "../../components/common/DashboardCalender";

const DashboardCalendar = React.lazy(() => import("../../components/common/DashboardCalender"));

type FellowCalendarCardProps = {
  packageName: string;
  ageGroup: string;
  sessionTime: string;
  studentsNumber: number;
  groupName: string;
};

const FellowCalendarCard = memo(({ ageGroup, groupName, packageName, sessionTime, studentsNumber }: FellowCalendarCardProps) => {
  const formatToAmPm = useCallback((time: string): string => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  }, []);

  const cardItems = useMemo(
    () => [
      { icon: <BookIcon fill="fill-primary" aria-hidden="true" />, text: packageName },
      { icon: <PresentationChartIcon fill="fill-primary" aria-hidden="true" />, text: `Age Group: ${ageGroup}` },
      { icon: <ClockIcon fill="fill-primary" aria-hidden="true" />, text: formatToAmPm(sessionTime) },
      { icon: <UserIcon fill="fill-primary" aria-hidden="true" />, text: `${studentsNumber} Students` },
    ],
    [packageName, ageGroup, sessionTime, studentsNumber, formatToAmPm]
  );

  return (
    <article className="w-full bg-white rounded-xl p-3 text-center shadow-sm">
      <h3 className="text-primary text-lg font-bold">{groupName}</h3>
      <ul className="mt-2 space-y-1">
        {cardItems.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {item.icon}
            <span className="text-primaryDark text-xs font-medium">{item.text}</span>
          </li>
        ))}
      </ul>
    </article>
  );
});

export default function FellowCalendar() {
  const { data: upcomingSessions } = useFellowUpcomingSessions();

  // 🧠 Keep month/year persistent — don’t reset
  const [month, setMonth] = useState(() => new Date().getMonth() + 1);
  const [year, setYear] = useState(() => new Date().getFullYear());

  const { data: calendarData, refetch } = useFellowCalendar({
    month: month.toString(),
    year: year.toString(),
  });

  useEffect(() => {
    refetch();
  }, [month, year, refetch]);

  const calendarProps = useMemo(
    () => ({
      data: calendarData,
      onMonthChange: (newMonth: number) => setMonth(newMonth),
      onYearChange: (newYear: number) => setYear(newYear),
      selectedMonth: month,
      selectedYear: year,
    }),
    [calendarData, month, year]
  );

  return (
    <section className="grid grid-cols-[minmax(0,auto)_220px] gap-4">
      <Suspense fallback={<p className="text-center text-gray-500">Loading Calendar...</p>}>
        <DashboardCalendar {...(calendarProps as DashboardCalendarProps)} />
      </Suspense>

      <aside className="bg-primary px-3 py-5 rounded-xl flex flex-col items-center gap-5">
        <h2 className="text-white text-xl font-semibold">Today's Sessions</h2>

        {upcomingSessions?.todays?.length ? (
          <ul className="space-y-4 w-full">
            {upcomingSessions.todays.map((item, index) => (
              <li key={index}>
                <FellowCalendarCard
                  ageGroup={item.ageGroup}
                  groupName={item.groupName}
                  packageName={item.packageName}
                  sessionTime={item.startTime}
                  studentsNumber={item.sessionOrder}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white text-sm">No sessions scheduled for today.</p>
        )}
      </aside>
    </section>
  );
}
