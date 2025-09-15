import type { AxiosResponse } from "axios";
import { api } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

const getFellowRequests = () => api.get("/Fellow/Support");

export const useSupport = () => {
  const query = useQuery<AxiosResponse, Error, FellowSessionDetails[]>({
    queryKey: ["Requests"],
    queryFn: async () => await getFellowRequests(),
    select: (data) => data.data.data,
  });
  return query;
};
