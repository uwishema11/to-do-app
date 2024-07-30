import { signIn } from '@/auth';
import { Button } from '../ui/button';

export async function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        action={async () => {
          'use server';
          await signIn('github', { redirectTo: '/todos' });
        }}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in</h2>
        <Button type="submit" className="w-full">
          Sign in with GitHub
        </Button>
      </form>
    </div>
  );
}
