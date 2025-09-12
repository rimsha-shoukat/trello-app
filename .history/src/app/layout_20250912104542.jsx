'use client';
import { useState } from 'react';
import "./globals.css";

export const metadata = {
  title: "Trello App",
  description: "User workspace to manage different task",
};

export default function RootLayout({ children }) {
  const [boardBox, setBoardBox] = useState(false);
  const [listBox, setListBox] = useState(false);

  return (
    <html lang="en">
      <body>
        
        </navbar>
        {children}
      </body>
    </html>
  );
}