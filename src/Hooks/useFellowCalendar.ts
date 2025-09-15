import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { AxiosResponse } from "axios";

const getCalendar = (year: string, month: string) =>
  api.get("/Fellow/Calender", {
    params: { year, month },
  });

export const useFellowCalendar = ({ month, year }: { year: string; month: string }) => {
  const query = useQuery<AxiosResponse, Error, CalendarType>({
    queryKey: ["fellowCalendar", year, month],
    queryFn: async () => await getCalendar(year, month),
    select: (res) => {
      const sessions = res.data.data;
      const today = new Date().toISOString().split("T")[0];

      const oldClasses = sessions
        .filter((s: { sessionDate: string }) => s.sessionDate < today)
        .map((s: any) => ({
          className: s.groupName,
          day: s.sessionDate,
          startTime: s.sessionStartTime,
          status: "Completed",
          zoomLink: s.sessionLink,
        }));

      const todayClass = sessions.find((s: any) => s.sessionDate.startsWith(today));

      const upcomingClasses = sessions
        .filter((s: any) => s.sessionDate > today)
        .map((s: any) => ({
          className: s.groupName,
          day: s.sessionDate,
          startTime: s.sessionStartTime,
          status: "Scheduled",
          zoomLink: s.sessionLink,
        }));

      return {
        oldClasses,
        todayClass: todayClass
          ? {
              className: todayClass.groupName,
              day: todayClass.sessionDate,
              startTime: todayClass.sessionStartTime,
              status: "Ongoing",
              zoomLink: todayClass.sessionLink,
            }
          : null,
        upcomingClasses,
      };
    },
  });

  return query;
};
