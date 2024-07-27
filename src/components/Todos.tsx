import { todoType } from '@/types/todoType';
import { taskType } from '@/types/todoType';
import { ButtonDemo } from './Button';
import { FC } from 'react';
import Item from './todo';

interface ToDoListProps {
  onAddTaskButton: () => void;
  todoList: todoType[];
  onDelete: (id: string) => void;
  onComplete: (id: string, complete: boolean) => void;
}

const ToDoList: FC<ToDoListProps> = ({
  onAddTaskButton,
  todoList,
  onDelete,
  onComplete,
}) => {
  return (
    <div className="lists">
      <ul>
        {todoList.map((element) => (
          <Item
            key={element.id}
            task={element}
            onDelete={onDelete}
            onComplete={onComplete}
          />
        ))}
      </ul>
      <ButtonDemo onClick={onAddTaskButton}>Add Task</ButtonDemo>
    </div>
  );
};

export default ToDoList;
