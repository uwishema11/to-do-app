import { todoType } from '@/types/todoType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  fetchData,
  updateCompleteStatus,
  InsertData,
  deleteData,
} from '@/actions/TodosActions';

export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const data = await fetchData();
      return data as todoType[];
    },
  });
};

export const useAddTodos = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: InsertData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
  return mutation;
};
export const useDeleteTodos = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
  return mutation;
};

export const useCompleteMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateCompleteStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
  return mutation;
};
