'use client';
import { ButtonDemo } from '../Button';
import { Checkbox } from '../ui/checkbox';
import { useDeleteTodos } from '@/hooks/useTodos';
import { ItemProps } from '@/types/todoType';
import { FC } from 'react';

const Item: FC<ItemProps> = ({ task }) => {
  const deleteMutation = useDeleteTodos();
  const updateMutation = useDeleteTodos();

  const handleDeleteTask = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleComplete = (id: string) => {
    updateMutation.mutate(id);
  };

  return (
    <li className="flex items-center justify-start gap-3 bg-gray-100 p-3 m-2 rounded-md">
      <h3 className={task.complete ? 'line-through w-[50%] ' : 'w-[50%]'}>
        {task.title}
      </h3>
      <div className=" w-[65%]">
        <Checkbox
          className=""
          checked={task.complete}
          onCheckedChange={() => handleComplete(task.id)}
        />
        {updateMutation.isPending && (
          <div className="absolute inset-0 flex items-center justify-center w-[50%]">
            <span>Loading...</span>{' '}
          </div>
        )}
      </div>
      <ButtonDemo onClick={() => handleDeleteTask(task.id)}> Delete</ButtonDemo>
    </li>
  );
};

export default Item;
