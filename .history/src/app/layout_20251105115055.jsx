import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Trello App",
  description: "User workspace to manage different task",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider> 
      </body>
    </html>
  );
}
