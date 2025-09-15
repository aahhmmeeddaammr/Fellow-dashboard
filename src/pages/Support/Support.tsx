import FeedbackIcon from "../../icons/FeedbackIcon";
import SelectField from "../../components/common/SelectField";
import { DashboardButton } from "../../components/common/DashboardButton";
import DashboardTable from "../../components/common/DashboardTable";
import { formatDate } from "../../lib/utils/Date";
import StatusPill from "../../components/common/StatusPill";
import { useSupport } from "../../Hooks/useSupport";
import { useForm } from "react-hook-form";

type Column<T> = {
  title: string;
  field: keyof T | string;
};

const Table = () => {
  const { isLoading, isError, data } = useSupport();

  const tableHeader: Column<any>[] = [
    { title: "Request Type", field: "requestType" },
    { title: "Group", field: "group" },
    { title: "Creation Date", field: "requestDate" },
    { title: "Respond Date", field: "responseDate" },
    { title: "Status", field: "status" },
  ];

  if (isLoading) return <h1>Loading...</h1>;

  const safeData = isError ? [] : data ?? [];

  return (
    <DashboardTable
      hideNumeric
      center
      columns={tableHeader}
      data={safeData.map((item: any) => ({
        ...item,
        requestDate: formatDate(item.requestDate),
        responseDate: formatDate(item.responseDate),
        status: <StatusPill variant={item.status} />,
      }))}
      headerClassName="bg-[#73C9D8] border-b-2 border-primary"
      roundedClassName="rounded-t-[10px]"
    />
  );
};

const SupportPage = () => {
  const form = useForm({
    defaultValues: {
      topic: "",
      requestType: "",
      message: "",
    },
  });
  const { control, handleSubmit, register } = form;
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col max-md:text-center gap-5 bg-white p-10 rounded-3xl">
        {/* <SupportHeader Icon={<ChatIcon />} text="How can we help?" /> */}
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-2">
            <SelectField options={[{ item: "Type", value: "Type" }]} fixed label="Topic" name="topic" control={control} />
          </div>
          <div className="col-span-2">
            <SelectField options={[{ item: "Type", value: "Type" }]} fixed label="Topic" name="requestType" control={control} />
          </div>
          <div className="col-span-1">
            <SelectField options={[{ item: "Type", value: "Type" }]} fixed label="Topic" name="" control={control} />
          </div>
          <div className="col-span-1">
            <SelectField options={[{ item: "Type", value: "Type" }]} fixed label="Topic" name="" control={control} />
          </div>
        </div>
        <textarea
          {...register("message")}
          name="message"
          className="w-full h-32 resize-none p-3 rounded-xl text-primaryDark font-medium placeholder:text-[#979797] focus:outline-none border"
          placeholder="Type your message here..."
        />
        <div className="flex items-center justify-between">
          <label htmlFor="feedbackFile" className="cursor-pointer flex justify-end gap-1">
            <FeedbackIcon />
            <p className="text-primary underline">Attach File</p>
            <input type="file" hidden id="feedbackFile" />
          </label>
          <DashboardButton type="submit" text="Send message" className="text-center" />
        </div>
      </form>

      <div className="flex flex-col gap-5 mt-10">
        <Table />
      </div>
    </div>
  );
};

export default SupportPage;
