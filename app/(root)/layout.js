
import "../globals.css";
import Wireframe from "@/components/Wireframe";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Jacquard_12, Montserrat } from "next/font/google";

import Header from "./Header";

const jacquard = Jacquard_12({
  subsets: ['latin'],
  weight: ['400'],
  // variable: "--text-font--6",
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '900'],
  style: ['italic', 'normal']
});

export const metadata = {
  title: "Della Porta Cipher",
  description: "Coming Soon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Wireframe/>

      <body 
      className={`${jacquard.className} antialiased theme-dark`}
      >
        <Header/>
        {children}
        <SpeedInsights/>
      </body>
    </html>
  );
}
