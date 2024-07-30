import { Button } from '../ui/button';
import { useAddTodos } from '@/hooks/useTodos';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormField,
  FormMessage,
} from '../ui/form';

const taskSchema = z.object({
  title: z.string().min(2, {
    message: 'Task name must be at least 2 characters long',
  }),
});

export function TaskForm() {
  const addMutation = useAddTodos();

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof taskSchema>) => {
    addMutation.mutate(data.title);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Name</FormLabel>
              <FormControl>
                <Input placeholder="task name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {addMutation.isPending && <p>Loading...</p>}
        {addMutation.isError && (
          <p className="text-red-500">
            {addMutation.error?.message ||
              'An error occurred while adding the task'}
          </p>
        )}
        <Button type="submit" disabled={addMutation.isPending}>
          {addMutation.isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
