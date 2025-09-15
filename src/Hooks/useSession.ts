import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { AxiosResponse } from "axios";
export interface IProgress {
  StudentId: string;
  SessionId: number;
  AttendanceStatus: number;
  Review: number;
  EAndP: number;
  LAndC: number;
  BAndS: number;
  QuizScore: number;
  TaskScore: number;
}
const getSessionDetails = (id: number) => api.get(`/Fellow/SessionStudents/${id}`);
const addStudentProgress = (data: IProgress) =>
  api.post("/Fellow/Students-Progress", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
export const useSessionDetails = ({ id }: { id: number }) => {
  const query = useQuery<AxiosResponse, Error, FellowSessionDetails[]>({
    queryKey: ["session", id],
    queryFn: async () => await getSessionDetails(id),
    select: (data) => data.data.data,
  });
  return query;
};

export const useGroupDetailsMutations = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const postAttendanceMutation = useMutation({
    mutationKey: ["CreateAttendance"],
    mutationFn: addStudentProgress,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["session", id] });
    },
  });
  const updateProgressM = useMutation({
    mutationFn: (data: IProgress) => api.put(`/Fellow/Students-Progress/${data.StudentId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group-details", id] });
    },
  });
  return { addProgress: postAttendanceMutation.mutate, updateProgress: updateProgressM.mutate };
};
