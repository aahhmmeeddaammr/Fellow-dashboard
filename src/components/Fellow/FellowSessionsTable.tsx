import document from "../../assets/images/document.svg";
import DashboardTable from "../common/DashboardTable";
import { Link } from "react-router-dom";

const FellowSessionsTable = ({ sessionsData }: { sessionsData?: FellowSessionProps[] }) => {
  const tableHeader: column<FellowHomeTable>[] = [
    { title: "Date", field: "date" },
    { title: "Package", field: "package" },
    { title: "Age", field: "age" },
    { title: "Group", field: "group" },
    { title: "Class no.", field: "classNumber" },
    { title: "Materials", field: "materials" },
  ];

  const tableRows: FellowHomeTable[] | undefined = sessionsData?.map((item) => {
    return {
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
      age: `${item.ageGroup}`,
      group: item.groupName,
      classNumber: `Class ${item.id}`,
      materials: (
        <Link to={""}>
          <img src={document} alt="" />
        </Link>
      ),
    };
  });

  return (
    <DashboardTable
      headerClassName="bg-white border-b-2 border-primary "
      roundedClassName="rounded-[10px]"
      hideNumeric
      columns={tableHeader}
      data={tableRows || []}
    ></DashboardTable>
  );
};

export default FellowSessionsTable;
