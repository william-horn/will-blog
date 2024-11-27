
import "../globals.css";
import Wireframe from "@/components/Wireframe";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { 
  Jacquard_24, 
  Montserrat,
  Courier_Prime,
  MedievalSharp,
} from "next/font/google";

import Header from "./Header";
import Footer from "./Footer";

const jacquard_24 = Jacquard_24({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal']
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '900'],
  style: ['italic', 'normal']
});

const courier_prime = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['italic', 'normal']
});

const medievalSharp = MedievalSharp({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal']
})

export const metadata = {
  title: "Della Porta Cipher",
  description: "Coming Soon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Wireframe/>

      <body 
      className={`antialiased theme-dark`}
      >
        <div className="flex flex-row">

          {/* <div className="w-[200px] h-[100vh] bg-blue-400 min-w-[150px] fixed">

          </div> */}

          <div className="flex-1">
            <Header/>
            {children}
            <Footer/>
          </div>
        </div>
        <SpeedInsights/>
      </body>
    </html>
  );
}
