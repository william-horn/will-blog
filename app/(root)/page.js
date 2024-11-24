import Image from "next/image";
import Page from "@/components/Page";
import Text from "@/components/Text";
import Content from "@/components/Content";
import Heading from "@/components/Heading";
import Paragraph from "@/components/Paragraph";
import Link from "next/link";

import sleep from "@/lib/util/sleep";
import { getResponsivePadding } from "@/lib/util/responsive";

import { parseCode } from "@/lib/util/stringLib";
import { generateSyntaxHighlightedCode } from "@/lib/util/generation";

import { twMerge } from "tailwind-merge";

const Highlight = ({
  children, 
  className: importedClassName,
  italic,
}) => {
  return <span className={twMerge(`font-medium text-4 ${italic ? "italic" : ""}`, importedClassName)}>
    {children}
  </span>
}

const ContentHeading = ({
  children,
  ...rest
}) => {
  return <Heading className="text-1 font-6" textSize="7xl" {...rest}>
    {children}
  </Heading>
}

const CodeBlock = ({
  children,
}) => {
  return <span className="px-2 py-1 mx-1 font-mono rounded-md bg-1-inset text-6">
    {children}
  </span>
}

const Home = () => {

//   console.log("---------------------------------------------")
  
//   const parsed = parseCode(`
//   String message = "the quick brown fox";

//   String keyword = "jumped";
// `)

//   for (let i = 0; i < parsed.length; i++) {
//     const line = parsed[i];
//     console.log(`Line ${i}:`);
//     console.log(line);
//   }

  return (
    <Page className="p-4">
      <Content span="xs" className="flex flex-col mx-auto opacity-0 animate-fade-in-1">
        <Paragraph className="p-6 mb-10 rounded-md bg-0-inset">
          <Paragraph.Text bold textSize="xl" className="italic font-light"><Highlight className="">&quot;The Shifting Method&quot;</Highlight> is an algorithmic implementation developed by <Highlight className="">Will</Highlight>, <Highlight className="">Jaylen</Highlight>, and <Highlight className="">Alex</Highlight>, to encrypt and decrypt text using the Della Porta Cipher chart, as part of a college project. This article only focuses on <Link href="#implementation"><Highlight className="underline">our implementation</Highlight></Link> of the conversion algorithm. If you want to learn more about the Della Porta Cipher, <Link href="https://sites.google.com/site/cryptocrackprogram/user-guide/cipher-types/substitution/porta"><Highlight className="underline">click here to visit the source we used.</Highlight></Link></Paragraph.Text>
        </Paragraph>

        <Paragraph className="mt-16">
          <ContentHeading id="implementation">How Does it Work?</ContentHeading>
        </Paragraph>

        <Paragraph className="mt-14">
          <Paragraph.Text className="font-medium">Our algorithm uses the shifting pattern of the characters in each row of the Della Porta Cipher chart, to find the <Highlight>compliment</Highlight> of an input character at any given row index.</Paragraph.Text>
          <Paragraph.Text className="font-medium">The <Highlight>compliment character</Highlight> is just the output of the algorithm when inputting a single character. For example, the compliment of an encrypted character is a decrypted character, and the compliment of a decrypted character is an encrypted character.</Paragraph.Text>
        </Paragraph>

        <Paragraph className="mt-14">
          <div>
            <Paragraph.Text textSize="3xl" className="font-medium text-1 font-6">Della Porta Cipher Chart:</Paragraph.Text>
            <div className="md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] w-[300px] h-[300px] relative">
              <Image
                src="/table.webp"
                fill
                sizes="
                  (max-width: 640px) 30vw, (max-width: 768px) 50vw,
                  (max-width: 1024px) 80vw, (max-width: 1280px) 100vw,
                  30vw
                "
                alt=""
              />
            </div>
          </div>
        </Paragraph>

        <Paragraph className="mt-12">
          <Paragraph.Text className="font-medium">Notice how each row in the second half of the alphabet has their letters <Highlight>shifted to the left</Highlight>, by the same number corresponding to its <Highlight>row index.</Highlight> This will be important later on when we calculate which letter is in a given row, at a given position.</Paragraph.Text>
          <Paragraph.Text className="font-medium">Before we get into that, let&apos;s think about what information we need to begin the conversion process.</Paragraph.Text>
        </Paragraph>

        <Paragraph className="mt-12">
          <ContentHeading id="implementation">The Set Up</ContentHeading>
        </Paragraph>

        <Paragraph className="mt-14">
          <Paragraph.Text className="font-medium">Since the encryption and decryption of our message depends on whatever <Highlight>keyword</Highlight> the user inputs, we must account for this first.</Paragraph.Text>
          <Paragraph.Text className="font-medium">We know that each letter in the keyword maps <Highlight>one-to-one</Highlight> with each letter in our input message, and the keyword letters will repeat once they run out.</Paragraph.Text>
          <Paragraph.Text>So, given the inputs:</Paragraph.Text>
        </Paragraph>

        <Paragraph className="flex flex-col items-center p-5 mx-auto text-xl rounded-md mt-14 bg-0-inset w-fit">
          {
            generateSyntaxHighlightedCode(`
            String message = "the quick brown fox";

            String keyword = "jumped";
          `)
          }
        </Paragraph>

        <Paragraph className="mt-14">
          <Paragraph.Text className="font-medium">We know the first place we have to look to begin encrypting <CodeBlock>message</CodeBlock> is under the <Highlight>keys</Highlight> column of the cipher chart, so we can locate the row will contain the corresponding letter in our message.</Paragraph.Text>
        </Paragraph>

        <Paragraph className="mt-14">
          <Paragraph.Text className="font-medium">We want to think about pairing them up like this:</Paragraph.Text>
        </Paragraph>

        <Paragraph className="flex flex-col items-center p-5 mx-auto text-xl rounded-md mt-14 bg-0-inset w-fit">
          {
            generateSyntaxHighlightedCode(`
            { "t", "j" },

            { "h", "u" },

            { "e", "m" },

            { " ", " " },

            { "q", "p" },

            { "u", "e" },

            { "i", "d" },

            { "c", "j" },

            { "k", "u" },
          `)
          }
        </Paragraph>

      </Content>
    </Page>
  );
}

export default Home;