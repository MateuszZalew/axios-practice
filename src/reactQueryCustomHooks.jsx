import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import customInstance from "./utils";
import { toast } from "react-toastify";

export const useFetchTasks = () => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await customInstance.get("/");
      return data;
    },
  });
  return { isLoading, isError, data };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { mutate: createTask, isLoading } = useMutation({
    mutationFn: (taskName) => customInstance.post("/", { title: taskName }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("task added");
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { createTask, isLoading };
};

export const useEditTask = () => {
  const queryClient = useQueryClient();
  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      return customInstance.patch(`/${taskId}`, {
        isDone,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return { editTask };
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteTask } = useMutation({
    mutationFn: (taskId) => {
      return customInstance.delete(`/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return { deleteTask };
};
