export interface completeType {
  id: string;
  complete: boolean;
}
export interface todoType {
  id: string;
  title: string;
  complete: boolean;
  userId: string;
}
export interface taskType {
  title: string;
}
export interface ToDoListProps {
  onAddTaskButton: () => void;
  todoList: todoType[];
}

export interface elementType {
  element: todoType;
}
export interface ItemProps {
  task: todoType;
}
