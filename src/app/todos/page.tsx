import { TodosOperations } from '@/app/todos/TodosList';
import NavBar from '@/components/NavBar';

const TodosPage = () => {
  return (
    <>
    <NavBar />
      <TodosOperations />
    </>
  );
};

export default TodosPage;
