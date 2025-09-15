import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { AxiosResponse } from "axios";

const getFellowData = () => api.get(`/Fellow/Account`);

const getFellowGroups = () => api.get("/Fellow/Groups");

const getFellowUpcomingSessions = () => api.get("/Fellow/UpcomingSessions");

export const useFellowAccount = () => {
  const query = useQuery<AxiosResponse, Error, FellowHomeDashboard>({
    queryKey: ["fellowAccount"],
    queryFn: async () => await getFellowData(),
    select: (data) => data?.data.data,
  });
  return query;
};

export const useFellowGroups = () => {
  const query = useQuery<AxiosResponse, Error, FellowHomeGroup[]>({
    queryKey: ["fellowGroups"],
    queryFn: async () => await getFellowGroups(),
    select: (data) => data.data.data,
  });
  return query;
};

export const useFellowUpcomingSessions = () => {
  const query = useQuery<AxiosResponse, Error, FellowUpcommingSessions>({
    queryKey: ["fellowUpcompingSessions"],
    queryFn: async () => await getFellowUpcomingSessions(),
    select: (data) => data.data.data,
  });
  return query;
};
