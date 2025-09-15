

interface DashboardTableProps<T> {
  columns: column<T>[];
  data: T[];
  hideNumeric?: boolean;
  center?: boolean;
  headerClassName?: string;
  roundedClassName?: string;
  headerItemClassName?: string;
}

export default function DashboardTable<T>({
  data,
  columns,
  hideNumeric,
  center,
  headerClassName = "bg-[#0097B259]",
  roundedClassName = "rounded-[20px]",
  headerItemClassName = "text-center",
}: DashboardTableProps<T>) {
  return (
    <div className={`overflow-x-auto ${roundedClassName}`}>
      <table className="w-full">
        <thead className={`${headerClassName}`}>
          <tr>
            {columns.map((item, index) => {
              return (
                <th
                  key={index}
                  scope="col"
                  className={`text-primaryDark text-sm leading-6 text-nowrap  align-middle p-4 font-semibold ${headerItemClassName}`}
                >
                  {item.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index} className="bg-white border-t border-[#06536180]">
                {columns.map((rowItem, rowIndex) => {
                  return (
                    <td key={rowIndex} className={`text-primaryDark text-sm leading-6 text-nowrap align-middle p-5 font-medium`}>
                      <div className={`flex items-center ${(rowIndex != 0 || center) && "justify-center"}`}>
                        {rowIndex == 0 && !hideNumeric && `${index + 1}. `}
                        {item[rowItem.field] ? (item[rowItem.field] as React.ReactNode) : "-"}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
