import "./home.css";
import React, { useMemo, Suspense } from "react";

import Video from "../../assets/images/video.svg";
import People from "../../assets/images/people.svg";
import arrow from "../../assets/images/fellow-arrow.svg";
import PresentionChart from "../../assets/images/presention-chart.svg";
import notification from "../../assets/images/notification.svg";

import { useFellowAccount, useFellowGroups, useFellowUpcomingSessions } from "../../Hooks/useFellow";

const FellowSessionsTable = React.lazy(() => import("../../components/Fellow/FellowSessionsTable"));
const SessionCard = React.lazy(() => import("../../components/Fellow/SessionCard"));
const CalendarCard = React.lazy(() => import("../../components/Fellow/CalendarCard"));
const GroupCard = React.lazy(() => import("../../components/Fellow/GroupCard"));

const StatCard = React.memo(
  ({ icon, title, value, style }: { icon: string; title: string; value: number | undefined; style: string }) => (
    <div className={`${style} flex items-center gap-8 bg-white py-5 px-8 rounded-3xl`}>
      <img src={icon} width={60} height={60} alt={title} loading="lazy" />
      <div>
        <p className="text-primary font-medium mb-1">{title}</p>
        <p className="font-bold text-4xl text-primaryDark">{value ?? 0}</p>
      </div>
    </div>
  )
);

const FellowHomePage = () => {
  const { data: fellow } = useFellowAccount();
  const { data: groups } = useFellowGroups();
  const { data: upcomingSessions } = useFellowUpcomingSessions();
  console.log({ fellow });

  const allUpcomingSessions = useMemo(
    () => [...(upcomingSessions?.todays || []), ...(upcomingSessions?.upcoming || [])],
    [upcomingSessions]
  );

  const firstSession = useMemo(() => upcomingSessions?.todays?.[0] || upcomingSessions?.upcoming?.[0], [upcomingSessions]);

  const stats = useMemo(
    () => [
      {
        id: 1,
        icon: Video,
        title: "Sessions for Today",
        value: upcomingSessions?.todays?.length,
        style: "video",
      },
      {
        id: 2,
        icon: People,
        title: "Current Groups",
        value: groups?.length,
        style: "groups",
      },
      {
        id: 3,
        icon: PresentionChart,
        title: "Total Number of Classes",
        value: fellow?.totalNumberOfClasses,
        style: "classes",
      },
    ],
    [upcomingSessions, groups, fellow]
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <header className="flex items-center justify-between ">
        <div className="font-bold">
          <h1 className="leading-6 text-[#848484]">Hi {fellow?.fullName?.split(" ")[0]},</h1>
          <h2 className="text-4xl text-primary">Welcome back!</h2>
        </div>
        <div className="flex gap-4 items-center">
          <img src={notification} alt="Notifications" loading="lazy" />
          <img
            src={fellow?.pictureUrl || "https://placehold.co/35"}
            height={35}
            className="rounded-full size-9 object-cover"
            alt={`${fellow?.fullName} profile`}
            loading="lazy"
          />
        </div>
      </header>

      <section className="fellow_grid">
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
        {/* Fellow Profile */}
        <div className="fellow">
          <img
            src={fellow?.pictureUrl}
            className="rounded-full size-40 object-cover"
            alt={`${fellow?.fullName} profile`}
            loading="lazy"
          />
          <p className="font-bold text-2xl text-white">{fellow?.fullName}</p>
          <p className="text-white">ID: {fellow?.id}</p>
          <div className="pe-6 w-full -mb-7">
            <img src={arrow} alt="arrow" className="w-full" loading="lazy" />
          </div>
        </div>

        {/* Session Card */}
        {firstSession && (
          <Suspense fallback={<div>Loading session...</div>}>
            <SessionCard startTime={firstSession.startTime} zoomLink={firstSession.meetingLink} />
          </Suspense>
        )}

        {/* Calendar */}
        <div
          style={{ gridArea: "calendar" }}
          className="bg-white rounded-[25px] py-4 px-6 flex flex-col items-center justify-center inter"
        >
          <Suspense fallback={<div>Loading calendar...</div>}>
            <CalendarCard dates={allUpcomingSessions.map((item) => item.date)} />
          </Suspense>
        </div>

        {/* Upcoming Sessions Table */}
        <div className="Table">
          <h2 className="text-2xl text-primary font-extrabold">Upcoming Sessions</h2>
          <Suspense fallback={<div>Loading sessions...</div>}>
            <FellowSessionsTable sessionsData={allUpcomingSessions.slice(0,3)} />
          </Suspense>
        </div>

        {/* Groups */}
        <div className="selectgroups overflow-y-auto max-h-96">
          <h2 className="text-2xl text-primary font-extrabold">My Groups</h2>
          <div className="grid grid-cols-2 gap-2">
            {groups?.map((group) => (
              <Suspense key={group.groupId} fallback={<div>Loading group...</div>}>
                <GroupCard group={group} />
              </Suspense>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FellowHomePage;
