"use client"

import { Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from './ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-10 h-10 transition-all duration-300 hover:bg-primary/10"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-slate-700 hover:text-primary" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-400 hover:text-white" />
      )}
    </Button>
  );
}
