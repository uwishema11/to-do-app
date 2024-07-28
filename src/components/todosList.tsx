'use client';
import { fetchData } from '@/services/TodosActions';
import { TaskForm } from './AddTodo';
import { ButtonDemo } from './Button';
import Item from './Todo';
import { useState } from 'react';
import { todoType } from '@/types/todoType';
import { useQuery } from '@tanstack/react-query';
import { elementType } from '@/types/todoType';

export function TodosOperations() {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchData,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const handleAddTaskButton = () => {
    setShowAddTaskForm((showForm) => !showForm);
  };

  return (
    <div className="m-20 w-3/4 bg-gray-500 p-7 font-semibold">
      <p className="mb-4 py-7 text-center text-3xl font-bold underline">
        To do list app
      </p>
      <div className="lists">
        <ul>
          {data.map((element: todoType) => (
            <Item key={element.id} task={element} />
          ))}
        </ul>
        <ButtonDemo onClick={handleAddTaskButton}>Add Task</ButtonDemo>
      </div>
      {showAddTaskForm && <TaskForm />}
    </div>
  );
}
