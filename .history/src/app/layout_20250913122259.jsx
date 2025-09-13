import "./globals.css";

export const metadata = {
  title: "Trello App",
  description: "User workspace to manage different task",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

import { BoardProvider } from '../context/BoardContext';
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <BoardProvider>
          {children}
        </BoardProvider>
      </body>
    </html>
  );
}