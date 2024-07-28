'use client';
import { ReactNode } from 'react';
import { Button } from './ui/button';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export function ButtonDemo({ children, onClick }: ButtonProps) {
  return <Button onClick={onClick}>{children}</Button>;
}
