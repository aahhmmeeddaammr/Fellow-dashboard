declare interface SelectType {
  item: ReactNode;
  value: string | number;
}
declare interface column<T> {
  title: string;
  field: keyof T;
}

declare interface SidebarRoute {
  link?: string;
  name: string;
  iconActive?: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
}
declare interface StatusPillProps {
  isFuture?: boolean;
  isFreeze?: boolean;
  variant:
    | "absent"
    | "attended"
    | "tbd"
    | "High"
    | "Medium"
    | "Low"
    | "almost-there"
    | "rising-champ"
    | "trail-blazer"
    | "hero-learner"
    | "superstar"
    | "late"
    | "freeze";
}

declare interface CalendarType {
  oldClasses: CalendarClassType[];
  upcomingClasses: CalendarClassType[];
  todayClass: CalendarClassType;
}

declare interface CalendarClassType {
  day: string;
  status: string;
  className: string;
  startTime: string;
  zoomLink: string;
}
