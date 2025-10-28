import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { AxiosResponse } from "axios";
import toast from "react-hot-toast";

const getFellowData = () => api.get(`/Fellow/Account`);

const getFellowGroups = () => api.get("/Fellow/Groups");

const getFellowUpcomingSessions = () => api.get("/Fellow/UpcomingSessions");

const updateFellowMutation = ({ data }: { data: FormData }) => api.put(`/Users/Photo`, data);

const updateFellowPassword = ({
  data,
}: {
  data: {
    currentPass: string;
    newPass: string;
    confirmPass: string;
  };
}) => api.put(`/StudentProfile/ChangePass`, data);

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

export const useFellowMutations = () => {
  const query = useQueryClient();
  const updatePhotoMutation = useMutation({
    mutationKey: ["updatePhoto"],
    mutationFn: ({ data }: { data: FormData }) => updateFellowMutation({ data }),
    onSuccess: async () => {
      await query.invalidateQueries({ queryKey: ["fellowAccount"] });
      toast.success("Update Profile photo successfully");
    },
  });
  const updatePasswordMutation = useMutation({
    mutationKey: ["updatePassword"],
    mutationFn: updateFellowPassword,
  });
  return { updateData: updatePhotoMutation.mutate, updatePassword: updatePasswordMutation.mutate };
};
