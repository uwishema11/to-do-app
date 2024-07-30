'use server';
import { auth } from '@/auth';
import Link from 'next/link';
import { SignOut } from './Auth/SignOut';

export default async function NavBar() {
  const session = await auth();
  if (session?.user) {
    return (
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex text-white justify-between items-center">
          <div className="text-white text-2xl font-bold">
            <Link href="/">TodoApp</Link>
          </div>
          <ul className="flex space-x-4">
            <SignOut />
            <li>
              <Link href="/todos">Your Todos</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex text-white justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link href="/">TodoApp</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/todos">Your Todos</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
