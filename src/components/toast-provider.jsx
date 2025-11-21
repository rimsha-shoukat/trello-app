'use client';
import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        className: 'bg-white text-gray-800 dark:bg-slate-800 dark:text-white',
        success: {
          className: 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100',
        },
        error: {
          className: 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100',
        },
      }}
    />
  );
}