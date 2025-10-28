import document from "../../assets/images/document.svg";
import DashboardTable from "../common/DashboardTable";
import { Link } from "react-router-dom";

export interface FellowHomeTable {
  date: React.ReactNode;
  package: string;
  age: string;
  group: string;
  classNumber: string;
  materials: React.ReactNode;
}

export interface Column<T> {
  title: string;
  field: keyof T;
}

export interface FellowSessionProps {
  id: number;
  date: string;
  sessionEndTime: string;
  ageGroup: string;
  groupName: string;
}

const FellowSessionsTable = ({ sessionsData }: { sessionsData?: FellowSessionProps[] }) => {
  const tableHeader: Column<FellowHomeTable>[] = [
    { title: "Date", field: "date" },
    { title: "Package", field: "package" },
    { title: "Age", field: "age" },
    { title: "Group", field: "group" },
    { title: "Class no.", field: "classNumber" },
    { title: "Materials", field: "materials" },
  ];

  const tableRows: FellowHomeTable[] =
    sessionsData?.map((item) => ({
      date: (
        <div className="flex flex-col">
          <p className="text-primaryDark text-sm">
            {new Date(item.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="text-primary text-xs">{item.sessionEndTime}</p>
        </div>
      ),
      package: "Innova Mini-Sharks",
      age: item.ageGroup,
      group: item.groupName,
      classNumber: `Class ${item.id}`,
      materials: (
        <Link to={""}>
          <img src={document} alt="Document" />
        </Link>
      ),
    })) ?? [];

  return (
    <DashboardTable
      headerClassName="bg-white border-b-2 border-primary "
      roundedClassName="rounded-[10px]"
      hideNumeric
      columns={tableHeader}
      data={tableRows}
    />
  );
};

export default FellowSessionsTable;
