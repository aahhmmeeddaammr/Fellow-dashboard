import { useEffect, useState, useMemo } from "react";
import video from "../../assets/images/video.svg";
import timer from "../../assets/images/timer.svg";
import { DashboardButton } from "../common/DashboardButton";

export default function SessionCard({ startTime, zoomLink }: {  startTime?: string; zoomLink?: string }) {
  console.log(startTime);
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [firstRender, setFirstRender] = useState(true);

  const targetTime = useMemo(() => {
    if (!startTime || !zoomLink) return null;
    return new Date(startTime).getTime();
  }, []);

  function calculateTimeLeft() {
    console.log("targetTime", { targetTime });

    if (!targetTime) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const now = new Date().getTime();
    const diff = targetTime - now;

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    if (!targetTime) return;
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setFirstRender(false);

    return () => clearInterval(timer);
  }, []);

  const isStarted = timeLeft.days <= 0 && timeLeft.hours <= 0 && timeLeft.minutes <= 0 && timeLeft.seconds <= 0;

  return (
    <div
      style={{ gridArea: "join" }}
      className="bg-white rounded-[25px] p-8 flex flex-col gap-5 items-center justify-center h-full"
    >
      <img src={!isStarted || firstRender ? timer : video} alt="Session Icon" />
      {!isStarted || firstRender ? (
        <>
          <p className="text-primary text-2xl font-bold leading-6">
            {String(timeLeft.days).padStart(2, "0")}:{String(timeLeft.hours).padStart(2, "0")}:
            {String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
          </p>
          <p className="text-primaryDark text-xs text-center leading-4">
            {timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes} minutes, & {timeLeft.seconds} seconds <br />
            till your next online session
          </p>
        </>
      ) : (
        <p className="text-primary text-center text-2xl leading-6 font-bold mb-5">Join your online class</p>
      )}
      {isStarted && !firstRender && <DashboardButton target="_self" text="Join" url={zoomLink} />}
    </div>
  );
}
