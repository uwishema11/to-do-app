'use client';
import { ButtonDemo } from './Button';
import { Checkbox } from './ui/checkbox';
import { FC } from 'react';
import { todoType } from '@/types/todoType';

interface ItemProps {
  task: todoType;
  onDelete: (id: string) => void;
  onComplete: (id: string, complete: boolean) => void;
}

const Item: FC<ItemProps> = ({ task, onDelete, onComplete }) => {
  return (
    <li className="flex items-center justify-between p-2">
      <h3 className={task.complete ? 'line-through' : ''}>{task.title}</h3>
      <span>
        <Checkbox
          checked={task.complete}
          onChange={() => onComplete(task.id, task.complete)}
        />
      </span>
      <ButtonDemo onClick={() => onDelete(task.id)}> Delete</ButtonDemo>
    </li>
  );
};

export default Item;
