
import "../globals.css";
import Wireframe from "@/components/Wireframe";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Heading from "@/components/Heading";
import Text from "@/components/Text";
import Divider from "@/components/Divider";
import Link from "next/link";

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

const NavLink = ({
  children,
  href="",
  type="normal"
}) => {
  const config = {
    heading: {
      fontStyle: "font-[600]",
      bulletSize: "min-w-[0.5rem] min-h-[0.5rem]",
      textColor: "text-1"
    },

    normal: {
      fontStyle: "font-[400]",
      bulletSize: "min-w-[0.4rem] min-h-[0.4rem]",
      textColor: "text-white",
    }
  }

  const style = config[type];

  return <Link href={href} className="flex items-center gap-2">
    <span className={`rounded-[50%] ${style.bulletSize} bg-white`}></span>
    <Heading className={`hover:underline text-left ${style.textColor} ${style.fontStyle}`}>{children}</Heading>
  </Link>
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Wireframe/>

      <body 
      className={`antialiased theme-dark`}
      >
        <div className="flex flex-row justify-center">

          <div className="w-[18rem] mr-[2rem] xl:block hidden">
            <div className="w-[18rem] h-[100vh] sticky top-2">
              <div className="table-of-contents-header">
                <Heading textSize="xl" className="my-3 text-0">Table of Contents</Heading>
              </div>

              <Divider size="" className="h-[1px] bg-[#393939] mx-2 mt-3 mb-5"/>

              <div className="pl-4 side-bar-body">

                <div className="content-link-body">
                  <ul>
                    {/* HOW DOES IT WORK */}
                    <li className="w-fit">
                      <NavLink href="#implementation" type="heading">How Does it Work?</NavLink>
                    </li>

                    {/* DATA FORMATTING */}
                    <li className="w-fit">
                      <NavLink href="#set-up" type="heading">Data Formatting</NavLink>
                    </li>
                    <li className="pl-5">
                      <ul>
                        <li className="w-fit">
                          <NavLink href="#data-output" type="normal">Example output</NavLink>
                        </li>
                      </ul>
                    </li>

                    <li className="w-fit">
                      <NavLink href="#row-index" type="heading">Finding Row Index</NavLink>
                    </li>
                    <li className="pl-5">
                      <ul>
                        <li className="w-fit">
                          <NavLink href="#single-letter-row" type="normal">Single letter row example</NavLink>
                        </li>
                        <li className="w-fit">
                          <NavLink href="#multi-letter-row" type="normal">Double letter row example</NavLink>
                        </li>
                      </ul>
                    </li>

                    <li className="w-fit">
                      <NavLink href="#porta-compliment" type="heading">The Porta Compliment</NavLink>
                    </li>
                    <li className="pl-5">
                      <ul>
                        <li className="w-fit">
                          <NavLink href="#case-1" type="normal">Case 1: Second Half</NavLink>
                        </li>
                        <li className="w-fit">
                          <NavLink href="#initial-position" type="normal">Initial letter position</NavLink>
                        </li>
                        <li className="w-fit">
                          <NavLink href="#relative-row-index" type="normal">Relative row index</NavLink>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                
              </div>

            </div>
          </div>

          <div className="xl:w-[50%] w-auto">
            <Header/>
            {children}
          </div>

          <div className="w-[18rem] mr-[2rem] shadow-lgk ml-[2rem] xl:block hidden">
            <div className=" w-[18rem] h-[100vh] sticky top-2">
              <div className="table-of-contents-header">
                <Heading textSize="xl" className="my-3 text-0">Sources and Technologies Used:</Heading>
              </div>

              <Divider size="" className="h-[1px] bg-[#393939] mx-2 mt-3 mb-5"/>

              <div>
                
              </div>
              {/* <iframe
              frameBorder="0"
              height="450px"  
              src="https://onecompiler.com/embed/java?theme=dark" 
              width="100%"
              ></iframe> */}
            </div>
          </div>
        </div>
        <Footer/>
        <SpeedInsights/>
      </body>
    </html>
  );
}
