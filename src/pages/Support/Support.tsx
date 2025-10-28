import { useForm } from "react-hook-form";
import { useFellowGroups } from "../../Hooks/useFellow";
import { useGroupSessions } from "../../Hooks/useGroup";
import { DashboardButton } from "../../components/common/DashboardButton";
import SelectField from "../../components/common/SelectField";
import FeedbackIcon from "../../icons/FeedbackIcon";
import DashboardTable from "../../components/common/DashboardTable";
import StatusPill from "../../components/common/StatusPill";
import { formatDate } from "../../lib/utils/Date";
import { useSupport } from "../../Hooks/useSupport";
import { api } from "../../lib/api";
import { useState } from "react";
import toast from "react-hot-toast";

type SupportForm = {
  topic: string;
  requestType: string;
  message: string;
  groupId: string;
  sessionId: string;
  attachedFile?: FileList;
};

const Table = () => {
  const { isLoading, isError, data } = useSupport();

  const tableHeader = [
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
  const { data: Groups } = useFellowGroups();
  const form = useForm<SupportForm>({
    defaultValues: {
      topic: "",
      requestType: "",
      message: "",
      groupId: "",
      sessionId: "",
    },
  });

  const { control, handleSubmit, register, watch, reset } = form;
  const groupId = watch("groupId");
  const { data: sessions } = useGroupSessions({ id: groupId });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: SupportForm) => {
    try {
      setIsSubmitting(true);

      // convert attached file to Base64 string if exists
      let base64File = "";
      const file = values.attachedFile?.[0];
      if (file) {
        base64File = await toBase64(file);
      }

      const payload = {
        topic: values.topic,
        requestType: values.requestType,
        message: values.message,
        groupId: values.groupId,
        sessionId: values.sessionId,
        attachedFile: base64File, // send as string
      };

      await api.post("/Fellow/Support", payload, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Support request sent successfully!");
      reset();
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("dsds");

        toast.success("File Uploaded successfully");
        return resolve(reader.result as string);
      };
      reader.onerror = reject;
    });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col max-md:text-center gap-5 bg-white p-10 rounded-3xl">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-2">
            <SelectField options={[{ item: "Type", value: "Type" }]} fixed label="Topic" name="topic" control={control} />
          </div>

          <div className="col-span-2">
            <SelectField
              options={[{ item: "Type", value: "Type" }]}
              fixed
              label="Requests"
              name="requestType"
              control={control}
            />
          </div>

          <div className="col-span-1">
            <SelectField
              options={
                Groups?.map((g) => ({
                  item: g.groupName,
                  value: g.groupId,
                })) || []
              }
              fixed
              label="Group"
              name="groupId"
              control={control}
            />
          </div>

          <div className="col-span-1">
            <SelectField
              options={
                sessions?.map((s) => ({
                  item: s.sessionName,
                  value: s.sessionId,
                })) || []
              }
              fixed
              label="Session"
              name="sessionId"
              control={control}
            />
          </div>
        </div>

        <textarea
          {...register("message")}
          className="w-full h-32 resize-none p-3 rounded-xl text-primaryDark font-medium placeholder:text-[#979797] focus:outline-none border"
          placeholder="Type your message here..."
        />

        <div className="flex items-center justify-between">
          <label htmlFor="feedbackFile" className="cursor-pointer flex justify-end gap-1">
            <FeedbackIcon />
            <p className="text-primary underline">Attach File</p>
            <input type="file" hidden id="feedbackFile" {...register("attachedFile")} />
          </label>
          <DashboardButton
            type="submit"
            text={isSubmitting ? "Sending..." : "Send message"}
            className="text-center"
            disabled={isSubmitting}
          />
        </div>
      </form>

      <div className="flex flex-col gap-5 mt-10">
        <Table />
      </div>
    </div>
  );
};

export default SupportPage;
