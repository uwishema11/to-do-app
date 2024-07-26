import { fetchData } from "@/services/useTodos";
import { deleteData, updateData } from "@/services/useTodos";
import { TaskForm } from "./addTodo";
import ToDoList from "./Todos";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const TodosOperations = () => {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchData,
  });

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    console.error("Error fetching todos:", error);
    return <span>Error: {error.message}</span>;
  }

  const handleDeleteTask = (id: string) => {
    console.log("Deleting task with ID:", id);
    deleteMutation.mutate(id);
  };

  const handleAddTaskButton = () => {
    setShowAddTaskForm((showForm) => !showForm);
  };

  const handleComplete = (id: string, complete: boolean) => {
    console.log("Completing task with ID:", id);
    // updateMutation.mutate(id, complete);
  };

  return (
    <div className="m-20 w-3/4 bg-gray-500 p-7 font-semibold">
      <p className="mb-4 py-7 text-center text-3xl font-bold underline">
        To do list app
      </p>
      <ToDoList
        onAddTaskButton={handleAddTaskButton}
        onDelete={handleDeleteTask}
        todoList={data}
        onComplete={handleComplete}
      />
      {showAddTaskForm && <TaskForm />}
    </div>
  );
};
