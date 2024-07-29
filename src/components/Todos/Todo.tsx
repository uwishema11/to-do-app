'use client';
import { ButtonDemo } from '../Button';
import { Checkbox } from '../ui/checkbox';
import { ItemProps } from '@/types/todoType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { deleteData, updateCompleteStatus } from '@/actions/TodosActions';

const Item: FC<ItemProps> = ({ task }) => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateCompleteStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleDeleteTask = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleComplete = (id: string) => {
    updateMutation.mutate(id);
  };

  return (
    <li className="flex items-center justify-between p-2">
      <h3 className={task.complete ? 'line-through' : ''}>{task.title}</h3>
      <div>
        <Checkbox
          checked={task.complete}
          onCheckedChange={() => handleComplete(task.id)}
        />
        {updateMutation.isPending && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span>Loading...</span>{' '}
          </div>
        )}
      </div>
      <ButtonDemo onClick={() => handleDeleteTask(task.id)}> Delete</ButtonDemo>
    </li>
  );
};

export default Item;
