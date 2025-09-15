import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import StatusPill from "./StatusPill";
import type { ViewApi } from "@fullcalendar/core/index.js";

export default function DashboardCalendar({ data }: { data: CalendarType }) {
  const eventDates = [...data.oldClasses, ...data.upcomingClasses].map((item) => {
    return {
      name: item.className,
      date: new Date(item.day).toLocaleDateString("en-CA"),
      absent: item.status === "absent",
    };
  });

  const today = {
    title: "Today",
    start: new Date(),
    className: "text-center font-semibold leading-6 uppercase",
    textColor: "#065361",
  };

  const events = JSON.parse(JSON.stringify([today, ...eventDates]));

  const handleCalendarResize = ({ view }: { view: ViewApi  }) => {
    const calendar = view.calendar;
    const isMobile = window.innerWidth <= 1024;
    const isTablet = window.innerWidth <= 1280;
    calendar.setOption("headerToolbar", { start: isMobile ? "title" : "", center: isMobile ? "" : "title" });
    calendar.setOption("dayHeaderFormat", { weekday: isTablet ? "short" : "long" });
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      headerToolbar={{ end: "prev,next" }}
      firstDay={6}
      contentHeight="auto"
      events={events}
      windowResize={handleCalendarResize}
      datesSet={handleCalendarResize}
      fixedWeekCount={false}
      dayCellClassNames={({ date, isFuture, isToday }) => {
        const formattedDate = date.toLocaleDateString("en-CA");
        const event = eventDates.find((item) => item.date === formattedDate);
        if (event && !isToday) {
          if (isFuture) {
            return "full-calendar-new";
          } else {
            return event.absent ? "full-calendar-absent" : "full-calendar-not-absent";
          }
        }
        return "";
      }}
      eventContent={({ event, isFuture, isToday }) => {
        if (isToday) {
          return event.title;
        } else {
          return (
            <div className="flex flex-col items-center gap-2">
              <p className="text-[#E9F9FC] font-semibold leading-5">{event.extendedProps.name}</p>
              <StatusPill isFuture={isFuture} variant={event.extendedProps.absent ? "absent" : "attended"} />
            </div>
          );
        }
      }}
      eventBackgroundColor="transparent"
      defaultAllDay={true}
    />
  );
}
