
import { Inter } from "next/font/google";
import Template from "../app/template";
import "../app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.className}>
      <Template>
        {children}
      </Template>
    </div>
  );
}
