
import "../globals.css";
import Wireframe from "@/components/Wireframe";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Heading from "@/components/Heading";
import Text from "@/components/Text";
import Divider from "@/components/Divider";
import Link from "next/link";
import Image from "next/image";

import { 
  Jacquard_24, 
  Montserrat,
  Courier_Prime,
  MedievalSharp,
} from "next/font/google";

import Header from "./Header";
import Footer from "./Footer";
import { twMerge } from "tailwind-merge";

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
  type="normal",
  justify="text-left",
  className: importedClassName="",
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
      textColor: "text-[#ff6161]",
    }
  }

  const style = config[type];

  return <Link href={href} className={`flex items-center gap-2`}>
    <span className={`rounded-[50%] ${style.bulletSize} bg-white`}></span>
    <Heading className={twMerge(`hover:underline ${justify} ${style.textColor} ${style.fontStyle}`, importedClassName)}>{children}</Heading>
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

          <div className="w-[18rem] xl:block hidden">
            <div className="w-[18rem] h-[100vh] sticky top-3">
              <div className="table-of-contents-header">
                <Heading textSize="xl" className="mb-3 text-0">Table of Contents</Heading>
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

          <div className="w-[18rem] xl:block hidden">
            <div className=" w-[18rem] h-[100vh] sticky top-3">
              <div className="table-of-contents-header">
                <Heading textSize="xl" className="mb-3 text-0">Sources and Citations:</Heading>
              </div>

              <Divider size="" className="h-[1px] bg-[#393939] mx-2 mt-3 mb-5"/>
                
              <div>
                <ul className="">
                  <li className="mx-auto w-fit">
                    <NavLink className="underline text-cyan-300" href="https://sites.google.com/site/cryptocrackprogram/user-guide/cipher-types/substitution/porta">Della Porta cipher article</NavLink>
                  </li>
                  <li className="mx-auto w-fit">
                    <NavLink className="underline text-cyan-300" href="https://nonvalet.com/posts/20210413_java_console_colors/#:~:text=To%20change%20terminal%20colors%2C%20you,names%20for%20better%20code%20readability">Console Colors</NavLink>
                  </li>
                </ul>
              </div>

              <div className="mt-6 table-of-contents-header">
                <Heading textSize="xl" className="text-0">Other Tools:</Heading>
              </div>

              <Divider size="" className="h-[1px] bg-[#393939] mx-2 mt-3 mb-5"/>

              <div>
                <ul className="">
                  <li className="mx-auto w-fit">
                    <NavLink className="" href="#online-java-compiler">Online Java Compiler</NavLink>
                  </li>
                </ul>
              </div>

              <div className="mt-6 table-of-contents-header">
                <Heading textSize="xl" className="text-0">Della Porta Project</Heading>
              </div>

              <Divider size="" className="h-[1px] bg-[#393939] mx-2 mt-3 mb-5"/>

              <div className="flex flex-row items-center justify-center gap-3 p-2">
                <Image
                className="h-[25px]"
                src="/github-mark-white.png"
                width={25}
                height={25}
                alt=""
                />
                <NavLink href="https://github.com/william-horn/della-porta-cipher">Check out our project on github</NavLink>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
        <SpeedInsights/>
      </body>
    </html>
  );
}
