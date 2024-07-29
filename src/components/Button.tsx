'use client';
import { ReactNode } from 'react';
import Button

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export function ButtonDemo({ children, onClick }: ButtonProps) {
  return <Button onClick={onClick}>{children}</Button>;
}
