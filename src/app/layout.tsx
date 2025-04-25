import "../styles/globals.css";
import { ReactNode } from "react";
import QueryProvider from "../providers/queryProvider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}