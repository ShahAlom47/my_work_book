'use client';

import React, { useEffect, useState } from 'react';
import { IoSunny, IoSunnyOutline } from "react-icons/io5";

const ThemeChanger: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Load theme from localStorage on first render
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
  }, []);

  // Update document and localStorage when theme changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button onClick={toggleTheme} className="text-2xl p-2 rounded">
      {theme === 'light' ? <IoSunny />:  <IoSunnyOutline /> }
    </button>
  );
};

export default ThemeChanger;
