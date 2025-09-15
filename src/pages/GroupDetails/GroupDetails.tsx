import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";

import notification from "../../assets/images/notification.svg";
import arrow from "../../assets/images/fellow-arrow.svg";
import shark from "../../assets/images/shark.png";

import CalendarIcon from "../../icons/CalendarIcon";
import FileIcon from "../../icons/FileIcon";
import MediaIcon from "../../icons/MediaIcon";
import UserIcon from "../../icons/UserIcon";
import ClockIcon from "../../icons/ClockIcon";
import PresentationChartIcon from "../../icons/PresentationChartIcon";

import { useGroupDetails, useGroupSessions } from "../../Hooks/useGroup";
import { useGroupDetailsMutations, useSessionDetails, type IProgress } from "../../Hooks/useSession";
import { formatDate } from "../../lib/utils/Date";
import GroupStatusPill, { type Option } from "../../components/common/GroupStatusPill";
// Attendance
const attendanceMap: Record<string, number> = {
  attended: 1,
  absent: 0,
  late: 2,
};

// Review
const reviewMap: Record<string, number> = {
  "trailblazer! 🚀": 3,
  "rising champ!🏆": 2,
  "almost there!🧭": 1,
  "hero learner!💡": 4,
  "superstar💫": 5,
};

// EAndP, LAndC, BAndS levels
const levelMap: Record<string, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

const attendanceOptions: Option[] = [
  { label: "Pending", value: -1 },
  { label: "Attended", value: 10 },
  { label: "Late", value: 5 },
  { label: "Absent", value: 0 },
];

const reviewOptions: Option[] = [
  { label: "Almost There", value: 2 },
  { label: "Rising Champ", value: 4 },
  { label: "Trailblazer", value: 6 },
  { label: "Hero Learner", value: 8 },
  { label: "Super Star", value: 10 },
];

const performanceOptions: Option[] = [
  { label: "Low", value: 10 },
  { label: "Medium", value: 15 },
  { label: "High", value: 20 },
];

type FellowSessionDetails = {
  id: number;
  studentId: string;
  studentName: string;
  attendanceStatus: string | null;
  quizScore: number | null;
  taskScore: number | null;
  review: string | null;
  bAndS: string | null;
  lAndC: string | null;
  eAndP: string | null;
};

type Column<T> = {
  title: string;
  field: keyof T | "action"; // restricted fields
};
function mapToNumber(field: string | number | null | undefined, type: "attendance" | "review" | "level"): number {
  if (field == null) return -1; // missing → default

  const normalized = String(field).trim().toLowerCase();

  switch (type) {
    case "attendance":
      return attendanceMap[normalized] ?? -1;
    case "review":
      return reviewMap[normalized] ?? -1;
    case "level":
      return levelMap[normalized] ?? -1;
    default:
      return Number(field) || -1;
  }
}

function SessionCard({ selected, onClick, index }: { selected?: boolean; index: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-[10px] ${selected ? "bg-primary text-secondary font-semibold" : "bg-white text-[#979797]"} py-3 px-8`}
    >
      Session {index}
    </button>
  );
}

type StudentFormValues = {
  studentId: string;
  sessionId: number;
  quizScore: string | number;
  taskScore: string | number;
  attendance: string;
  review: string;
  bAndS: string;
  lAndC: string;
  eAndP: string;
};

function StudentRow({
  row,
  tableHeader,
  sessionId,
}: {
  row: FellowSessionDetails;
  tableHeader: Column<FellowSessionDetails>[];
  sessionId: number;
}) {
  const { addProgress, updateProgress } = useGroupDetailsMutations({ id: sessionId });

  const defaultValues: StudentFormValues = {
    studentId: row.studentId,
    sessionId,
    quizScore: row.quizScore ? String(row.quizScore) : "",
    taskScore: row.taskScore ? String(row.taskScore) : "",
    attendance: row.attendanceStatus ? String(row.attendanceStatus) : "Pending",
    review: row.review ? String(row.review) : "Pending",
    bAndS: row.bAndS ? String(row.bAndS) : "Pending",
    lAndC: row.lAndC ? String(row.lAndC) : "Pending",
    eAndP: row.eAndP ? String(row.eAndP) : "Pending",
  };

  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitting },
    reset,
  } = useForm<StudentFormValues>({ defaultValues });

  // ✅ Reset form whenever row or session changes
  useEffect(() => {
    reset(defaultValues);
  }, [row, sessionId, reset]);

  const normalizeValue = (value: unknown): string | number =>
    value == null ? "" : typeof value === "number" ? value : String(value);

  const getChangedFields = (values: IProgress, defaults: IProgress): Partial<Record<keyof IProgress, string | number>> => {
    const diff: Partial<Record<keyof IProgress, string | number>> = {};
    (Object.keys(values) as Array<keyof IProgress>).forEach((key) => {
      if (normalizeValue(values[key]) !== normalizeValue(defaults[key])) {
        diff[key] = values[key];
      }
    });
    return diff;
  };

  const onSubmit: SubmitHandler<StudentFormValues> = (values) => {
    const normalizeNumber = (val: string | number | null): number => {
      if (val === null || val === "" || val === "Pending") return -1;
      return Number(val);
    };

    const payload: IProgress = {
      StudentId: row.studentId,
      SessionId: sessionId,
      AttendanceStatus: normalizeNumber(values.attendance),
      Review: normalizeNumber(values.review),
      EAndP: normalizeNumber(values.eAndP),
      LAndC: normalizeNumber(values.lAndC),
      BAndS: normalizeNumber(values.bAndS),
      QuizScore: normalizeNumber(values.quizScore),
      TaskScore: normalizeNumber(values.taskScore),
    };

    const hasExistingData =
      row.quizScore !== null || row.taskScore !== null || row.attendanceStatus !== null || row.review !== null;

    if (hasExistingData) {
      const defaults: IProgress = {
        StudentId: String(row.id),
        SessionId: sessionId,
        AttendanceStatus: mapToNumber(row.attendanceStatus, "attendance"),
        Review: mapToNumber(row.review, "review"),
        EAndP: mapToNumber(row.eAndP, "level"),
        LAndC: mapToNumber(row.lAndC, "level"),
        BAndS: mapToNumber(row.bAndS, "level"),
        QuizScore: row.quizScore ? Number(row.quizScore) : -1,
        TaskScore: row.taskScore ? Number(row.taskScore) : -1,
      };

      const changed = getChangedFields(payload, defaults);

      changed.StudentId = String(row.id);
      changed.SessionId = payload.SessionId;

      updateProgress(changed as IProgress, {
        onSuccess: () => {
          reset(values);
        },
      });
    } else {
      addProgress(payload, {
        onSuccess: () => {
          reset(values);
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid items-center bg-white border-t border-[#06536180] max-w-fit overflow-x-hidden pe-10 last:rounded-b-[10px]"
      style={{ gridTemplateColumns: `repeat(${tableHeader.length}, minmax(120px, 1fr))` }}
    >
      {/* Student Name */}
      <div className="p-5 text-sm font-medium text-primaryDark text-center">{row.studentName}</div>

      {/* Attendance */}
      <div className="p-5 text-sm text-center mx-auto">
        <GroupStatusPill name="attendance" control={control} options={attendanceOptions} />
      </div>

      {/* Quiz Score */}
      <div className="p-5 text-sm text-center mx-auto">
        <Controller
          name="quizScore"
          control={control}
          render={({ field }) => (
            <label className="max-w-fit flex items-center text-[#848484] focus-within:text-primaryDark hover:text-primaryDark text-sm leading-6 border border-[#848484] focus-within:border-primary hover:border-primary focus-within:bg-[#c2f6ff66] hover:bg-[#c2f6ff66] rounded-lg px-2.5 py-1 text-center focus:outline-none">
              <input {...field} type="text" maxLength={2} className="w-4 text-center bg-transparent focus:outline-0 border-0" />
              <span>/ 10</span>
            </label>
          )}
        />
      </div>

      {/* Task Score */}
      <div className="p-5 text-sm text-center mx-auto">
        <Controller
          name="taskScore"
          control={control}
          render={({ field }) => (
            <label className="max-w-fit flex items-center text-[#848484] focus-within:text-primaryDark hover:text-primaryDark text-sm leading-6 border border-[#848484] focus-within:border-primary hover:border-primary focus-within:bg-[#c2f6ff66] hover:bg-[#c2f6ff66] rounded-lg px-2.5 py-1 text-center focus:outline-none">
              <input {...field} type="text" maxLength={2} className="w-4 text-center bg-transparent focus:outline-0 border-0" />
              <span>/ 10</span>
            </label>
          )}
        />
      </div>

      {/* Review */}
      <div className="p-5 text-sm text-center mx-auto">
        <GroupStatusPill name="review" control={control} options={reviewOptions} />
      </div>

      {/* B&S */}
      <div className="p-5 text-sm text-center mx-auto">
        <GroupStatusPill name="bAndS" control={control} options={performanceOptions} />
      </div>

      {/* L&C */}
      <div className="p-5 text-sm text-center mx-auto">
        <GroupStatusPill name="lAndC" control={control} options={performanceOptions} />
      </div>

      {/* E&P */}
      <div className="p-5 text-sm text-center mx-auto">
        <GroupStatusPill name="eAndP" control={control} options={performanceOptions} />
      </div>

      {/* Actions */}
      <div className="p-5 text-sm text-center mx-auto">
        <button
          type="submit"
          disabled={!isDirty || isSubmitting}
          className={`px-3 py-1 rounded cursor-pointer ${!isDirty ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {!isDirty ? (
            // ✅ Saved icon
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
              <path
                opacity="0.4"
                d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z"
                fill="#04CD00"
                fillOpacity="0.47"
              />
              <path
                d="M11.0795 15.5796L7.71945 12.5296C7.42945 12.2396 7.42945 11.7596 7.71945 11.4696C8.00945 11.1796 8.48945 11.1796 8.77945 11.4696L11.0795 13.7696L16.2195 8.62961C16.5095 8.33961 16.9895 8.33961 17.2795 8.62961C17.5695 8.91961 17.5695 9.39961 17.2795 9.68961L11.6095 15.3596C11.4695 15.4996 11.2795 15.5796 11.0795 15.5796Z"
                fill="#04CD00"
                fillOpacity="0.47"
              />
            </svg>
          ) : (
            // ✏️ Changes pending icon
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
              <path
                opacity="0.4"
                d="M7.61039 5.96028L16.6304 2.95028C20.6804 1.60028 22.8804 3.81028 21.5404 7.86028L18.5304 16.8803C16.5104 22.9503 13.1904 22.9503 11.1704 16.8803L10.2804 14.2003L7.60039 13.3103C1.54039 11.3003 1.54039 7.99028 7.61039 5.96028Z"
                fill="#0097B2"
              />
              <path d="M12.6191 11.6296L16.4291 7.80957L12.6191 11.6296Z" fill="#0097B2" />
              <path
                d="M12.6205 12.38L15.8905 7.28C16.1805 6.99 16.6605 6.99 16.9505 7.28C17.2405 7.57 17.2405 8.05 16.9505 8.34L13.1505 12.16C13.0005 12.3 12.8105 12.38 12.6205 12.38Z"
                fill="#0097B2"
              />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}

export default function GroupDetails() {
  const { id } = useParams();
  const { data: sessions } = useGroupSessions({ id: id || "" });
  const { data: groupDetails } = useGroupDetails({ id: parseInt(id || "0") });
  const [selected, setSelected] = useState<GroupSession | null>(null);

  const { data: sessionDetails } = useSessionDetails({
    id: selected?.sessionId || 0,
  });

  const tableHeader: Column<FellowSessionDetails>[] = [
    { title: "Student", field: "studentName" },
    { title: "Attendance", field: "attendanceStatus" },
    { title: "Quiz", field: "quizScore" },
    { title: "Task Score", field: "taskScore" },
    { title: "Review", field: "review" },
    { title: "B&S", field: "bAndS" },
    { title: "L&C", field: "lAndC" },
    { title: "E&P", field: "eAndP" },
    { title: "Actions", field: "action" },
  ];

  useEffect(() => {
    if (sessions?.length) {
      setSelected(sessions[0]);
    }
  }, [sessions]);

  if (!groupDetails || !sessionDetails) return <p className="text-red-500">Loading...</p>;

  const data: FellowSessionDetails[] = sessionDetails.map((session) => ({
    studentId: session.studentId as string,
    studentName: session.studentName as string,
    attendanceStatus: session.attendanceStatus ?? null,
    quizScore: session.quizScore ? Number(session.quizScore) : null,
    taskScore: session.taskScore ? Number(session.taskScore) : null,
    review: session.review ?? null,
    bAndS: session.bAndS ?? null,
    lAndC: session.lAndC ?? null,
    eAndP: session.eAndP ?? null,
    id: session.id,
  }));

  return (
    <div className="flex flex-col gap-y-5 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link to={""} className="flex items-center gap-2 text-primary text-sm">
          <ArrowLeft size={20} />
          <span>Back</span>
        </Link>
        <h2 className="text-primary text-[40px] font-bold leading-10">{groupDetails?.groupName}</h2>
        <div className="flex gap-4">
          <img src={notification} alt="" />
          <img src={"https://placehold.co/35"} width={35} height={35} className="rounded-full" alt="" />
        </div>
      </div>

      {/* Group Info */}
      <div className="flex flex-col gap-3">
        <div
          className="bg-primary rounded-[10px] flex items-center h-20 relative"
          style={{ clipPath: "inset(-20px 0px 0px 0px round 0px)" }}
        >
          <p className="text-[#C2F6FF] text-2xl font-bold ms-7">{groupDetails?.packageName}</p>
          <div className="absolute top-2 left-2/3 -translate-x-1/2">
            <img src={arrow} width={250} height={64} alt="" />
          </div>
          <div className="absolute -top-3 left-3/4 translate-x-1/2">
            <img src={shark} width={64} height={64} alt="" />
          </div>
        </div>

        <div className="flex items-center gap-x-10">
          <div className="flex items-center gap-1">
            <PresentationChartIcon fill="fill-primary" />
            <span className="text-primaryDark text-sm font-medium">Age group: {groupDetails?.ageGroup}</span>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon fill="fill-primary" />
            <span className="text-primaryDark text-sm font-medium">{groupDetails?.schedule}</span>
          </div>
          <div className="flex items-center gap-1">
            <UserIcon fill="fill-primary" />
            <span className="text-primaryDark text-sm font-medium">{groupDetails?.sessionOrder} Students</span>
          </div>
        </div>

        {/* Session Selector */}
        <div className="overflow-auto w-full">
          <div className="flex gap-x-5 text-nowrap *:flex *:items-center *:justify-center">
            {sessions?.map((item, index: number) => (
              <SessionCard
                key={item.sessionId}
                index={index + 1}
                selected={item === selected || (index === 0 && selected === null)}
                onClick={() => {
                  if (item !== selected) {
                    setSelected(item);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Session Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <CalendarIcon fill="fill-primary" />
          <span className="text-primaryDark text-sm font-medium">{formatDate(selected?.sessionDate ?? "")}</span>
        </div>
        <div className="flex items-center gap-x-5">
          <div className="flex items-center gap-1">
            <FileIcon fill="fill-primary" />
            <span className="text-primaryDark text-sm font-medium underline">Materials</span>
          </div>
          <div className="flex items-center gap-1">
            <MediaIcon fill="fill-primary" />
            <span className="text-primaryDark text-sm font-medium underline">Recorded Session</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-[10px]  ">
        {/* Header */}
        <div
          className="grid bg-white border-b-2 border-primary rounded-t-[10px]"
          style={{
            gridTemplateColumns: `repeat(${tableHeader.length}, minmax(120px, 1fr))`,
          }}
        >
          {tableHeader.map((col, i) => (
            <div key={i} className="p-4 font-semibold text-sm text-primaryDark text-center leading-6 text-nowrap">
              {col.title == "Actions" ? "" : col.title}
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="flex flex-col">
          {data.map((row) => (
            <StudentRow key={row.studentId} row={row} tableHeader={tableHeader} sessionId={selected?.sessionId ?? 0} />
          ))}
        </div>
      </div>
    </div>
  );
}
