import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { AxiosResponse } from "axios";

const getGroupSessions = (id: string) => api.get(`Fellow/GroupsSessions/${id}`);
const getFellowGroups = () => api.get("/Fellow/Groups");
export const useGroupSessions = ({ id }: { id: string }) => {
  const query = useQuery<
    AxiosResponse,
    Error,
    Array<{ sessionDate: string; sessionId: number; sessionName: string; sessionOrder: number; sessionRecordingLink: string }>
  >({
    queryKey: ["groupSessions", id],
    queryFn: async () => await getGroupSessions(id),
    select: (data) => data.data.data,
    enabled: !!id,
  });
  return query;
};

export const useGroupDetails = ({ id }: { id: number }) => {
  const query = useQuery<AxiosResponse, Error, FellowHomeGroup>({
    queryKey: ["groupDetails", id],
    queryFn: async () => await getFellowGroups(),
    select: (data) => data.data.data.filter((group: FellowHomeGroup) => group.groupId == id)[0],
  });
  return query;
};
