import "./globals.css";
import { BoardProvider } from './context/BoardContext';

export const metadata = {
  title: "Trello App",
  description: "User workspace to manage different task",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <BoardProvider>
          {children}
        </BoardProvider>
      </body>
    </html>
  );
}
