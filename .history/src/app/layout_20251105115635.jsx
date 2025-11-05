import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Trello App",
  description: "User workspace to manage different task",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <bod className="bg-white text-black dark:bg-gray-600 darKtext">
        <ThemeProvider attribute="class" defaultTheme="system"enableSystem >{children}</ThemeProvider> 
      </bod>
    </html>
  );
}
