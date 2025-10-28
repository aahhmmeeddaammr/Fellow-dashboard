import React, { useCallback, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import type { ViewApi } from "@fullcalendar/core";
import StatusPill from "./StatusPill";

// ---------- Types ----------
type ClassItem = {
  className: string;
  day: string;
  status: string;
};

export type CalendarType = {
  oldClasses: ClassItem[];
  upcomingClasses: ClassItem[];
};

type DashboardCalendarProps = {
  data: CalendarType;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  month?: number;
  year?: number;
};

// ---------- Component ----------
export default function DashboardCalendar({ data, onMonthChange, onYearChange, month, year }: DashboardCalendarProps) {
  // Merge all class data into one consistent event format
  const eventDates = useMemo(() => {
    const old = data?.oldClasses ?? [];
    const upcoming = data?.upcomingClasses ?? [];

    return [...old, ...upcoming].map((item) => ({
      title: item.className,
      date: new Date(item.day).toLocaleDateString("en-CA"),
      absent: item.status === "absent",
    }));
  }, [data]);

  // Add a "Today" marker event
  const todayEvent = useMemo(
    () => ({
      title: "Today",
      start: new Date(),
      className: "text-center font-semibold leading-6 uppercase",
      textColor: "#065361",
    }),
    []
  );

  // Deep clone to avoid FullCalendar mutation side-effects
  const events = useMemo(() => JSON.parse(JSON.stringify([todayEvent, ...eventDates])), [todayEvent, eventDates]);

  // Handle responsive header & day formatting
  const handleResize = useCallback(({ view }: { view: ViewApi }) => {
    const calendar = view.calendar;
    const width = window.innerWidth;

    calendar.setOption("headerToolbar", {
      start: width <= 1024 ? "title" : "",
      center: width <= 1024 ? "" : "title",
    });

    calendar.setOption("dayHeaderFormat", {
      weekday: width <= 1280 ? "short" : "long",
    });
  }, []);

  // Detect month/year changes
  const handleDateChange = useCallback(
    ({ view }: { view: ViewApi }) => {
      const newDate = view.currentStart;
      onMonthChange(newDate.getMonth() + 1);
      onYearChange(newDate.getFullYear());
    },
    [onMonthChange, onYearChange]
  );

  // Initial display date
  const initialDate = useMemo(() => new Date(year ?? new Date().getFullYear(), month ?? new Date().getMonth()), [month, year]);

  return (
    <div className="w-full">
      <FullCalendar
        plugins={[dayGridPlugin]}
        headerToolbar={{ end: "prev,next" }}
        firstDay={6}
        contentHeight="auto"
        initialDate={initialDate}
        events={events}
        windowResize={handleResize}
        datesSet={handleDateChange}
        fixedWeekCount={false}
        eventBackgroundColor="transparent"
        defaultAllDay
        dayCellClassNames={({ date, isFuture, isToday }) => {
          const formattedDate = date.toLocaleDateString("en-CA");
          const event = eventDates.find((item) => item.date === formattedDate);

          if (event && !isToday) {
            if (isFuture) return "full-calendar-new";
            return event.absent ? "full-calendar-absent" : "full-calendar-not-absent";
          }
          return "";
        }}
        eventContent={({ event, isFuture, isToday }) => {
          if (isToday) return <span>{event.title}</span>;
          return (
            <div className="flex flex-col items-center gap-2">
              <p className="text-[#E9F9FC] font-semibold leading-5">{event.title}</p>
              <StatusPill isFuture={isFuture} variant={event.extendedProps.absent ? "absent" : "attended"} />
            </div>
          );
        }}
      />
    </div>
  );
}
