// import { Button } from "./ui/button";
// import { InsertData } from "@/service/useTodos";
// import { Input } from "./ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { taskType } from "@/types/todoType";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "./ui/form";

// import { useMutation, useQueryClient } from "@tanstack/react-query";

// const taskSchema = z.object({
//   title: z.string().min(2, {
//     message: "Task name must be at least 2 characters long",
//   }),
// });

// export  function TaskForm() {

//   const form = useForm<z.infer<typeof taskSchema>>({
//     resolver: zodResolver(taskSchema),
//     defaultValues: {
//       title: "",
//     },
//   });

//   const queryClient = useQueryClient();

//   const addMutation =useMutation({
//     mutationFn: InsertData,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["todos"] });
//     },
//   })

//   const onSubmit = async (data: z.infer<typeof taskSchema>) => {
//     addMutation.mutate(data.title);
//     form.reset();
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="title"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Task Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="task name" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// }

import { Button } from "./ui/button";
import { InsertData } from "@/services/useTodos";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const taskSchema = z.object({
  title: z.string().min(2, {
    message: "Task name must be at least 2 characters long",
  }),
});

export function TaskForm() {
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
    },
  });

  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: InsertData,
    onSuccess: () => {
      console.log("Mutation successful, invalidating queries...");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const onSubmit = async (data: z.infer<typeof taskSchema>) => {
    console.log("Submitting data:", data.title);
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
