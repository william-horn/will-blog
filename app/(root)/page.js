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
  className: importedClassName
}) => {
  return <span className={twMerge(`px-2 py-1 mx-1 font-mono rounded-md bg-1-inset text-6`, importedClassName)}>
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
      <Content span="xs" className="flex flex-col mx-auto">
        <div className="opacity-0 animate-fade-in-1">
          <Paragraph className="p-6 mb-10 rounded-md bg-0-inset">
            <Paragraph.Text bold textSize="xl" className="italic font-light"><Highlight className="">&quot;The Shifting Method&quot;</Highlight> is an algorithmic implementation developed by <Highlight className="">Will</Highlight>, <Highlight className="">Jaylen</Highlight>, and <Highlight className="">Alex</Highlight>, to encrypt and decrypt text using the Della Porta Cipher chart, as part of a college project. This article only focuses on <Link href="#implementation"><Highlight className="underline">our implementation</Highlight></Link> of the conversion algorithm. If you want to learn more about the Della Porta Cipher, <Link href="https://sites.google.com/site/cryptocrackprogram/user-guide/cipher-types/substitution/porta"><Highlight className="underline">click here to visit the source we used.</Highlight></Link></Paragraph.Text>
          </Paragraph>

          <Paragraph className="mt-16">
            <ContentHeading id="implementation">How Does it Work?</ContentHeading>
          </Paragraph>

          <Paragraph className="mt-14">
            <Paragraph.Text className="font-medium">Our algorithm uses the shifting pattern of the characters in each row of the Della Porta Cipher chart, to find the <Highlight>compliment</Highlight> of an input character at any given row index.</Paragraph.Text>
            <Paragraph.Text className="font-medium">The <Highlight>compliment character</Highlight> is just the output of the algorithm when inputting a single character. For example, the compliment of an encrypted character is a decrypted character, and the compliment of a decrypted character is an encrypted character.</Paragraph.Text>
            <Paragraph.Text>We will be using <Highlight>Java</Highlight> in this article to implement the algorithm.</Paragraph.Text>
          </Paragraph>

          <Paragraph className="mt-14">
            <div>
              <Paragraph.Text textSize="3xl" className="font-medium text-1 font-6">Della Porta Cipher Chart:</Paragraph.Text>
              <div className="md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] w-[60vw] h-[60vw] min-w-[300px] min-h-[300px] relative">
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
        </div>

        <Paragraph className="mt-12">
          <Paragraph.Text className="font-medium">Notice how each row in the second half of the alphabet has their letters <Highlight>shifted to the left</Highlight>, by the same number corresponding to its <Highlight>row index.</Highlight> This will be important later on when we calculate which letter is in a given row, at a given position.</Paragraph.Text>
          <Paragraph.Text className="font-medium">Before we get into that, let&apos;s think about what information we need to begin the conversion process.</Paragraph.Text>
        </Paragraph>

        <Paragraph className="mt-12">
          <ContentHeading id="implementation">The Set Up - Data Formatting</ContentHeading>
        </Paragraph>

        <Paragraph className="mt-14">
          <Paragraph.Text className="font-medium">Since the encryption and decryption of our message depends on whatever <Highlight>keyword</Highlight> the user inputs, we must account for this first.</Paragraph.Text>
          <Paragraph.Text className="font-medium">We know that each letter in the keyword maps <Highlight>one-to-one</Highlight> with each letter in our input message, and the <Highlight>keyword letters will repeat themselves</Highlight> if or when they run out.</Paragraph.Text>
        </Paragraph>

        <Paragraph className="mt-12">
        <Paragraph.Text>So, lets assume we have this message to encrypt using this keyword:</Paragraph.Text>
        </Paragraph>

        <Paragraph className="mt-14">
          <div className="flex flex-col items-center p-5 mx-auto text-xl rounded-md bg-0-inset w-fit">
            {
              generateSyntaxHighlightedCode(`
              String message = "the quick brown fox";

              String keyword = "jumped";
            `)
            }
          </div>
        </Paragraph>

        <Paragraph className="mt-14">
          <Paragraph.Text>Each letter in our <CodeBlock>message</CodeBlock> string is like a <span className="">lost traveler&#8212;trying to find their way back home.</span> In this case, <Highlight>&quot;home&quot;</Highlight> is the <Highlight>encrypted</Highlight> or <Highlight>decrypted</Highlight> output letter.</Paragraph.Text>
          <Paragraph.Text>So, how do our poor message letters find their way back home? Well, this is where the <CodeBlock>keyword</CodeBlock> letters come to the rescue. <Highlight>Each of our message letter</Highlight> friends will be <Highlight>paired with a keyword letter</Highlight> buddy to help guide them back home (to the proper output). This means we need to create some kind of <Highlight>function</Highlight> that ensures each message letter is paired with a keyword letter buddy. Let&apos;s call it <CodeBlock>getKeywordMessagePairs()</CodeBlock>, and it will look something like this:</Paragraph.Text>
        </Paragraph>

        <Paragraph className="flex flex-col items-center p-5 mx-auto rounded-md lg:text-lg md:text-sm mt-14 bg-0-inset w-fit">
          {
            generateSyntaxHighlightedCode(`
            public static char[][] getKeywordMessagePairs(String message, String keyword) {
              // *create a 2D array of letter pairs, spanning the length of the message
              // *each row will have 2 columns: one for the message letter, the other for the keyword letter
              char[][] letterPairs = char[message.length()][2];
              
              // the parsing process
              ...

              // return the final letter mappings
              return letterPairs;
            }
          `)
          }
        </Paragraph>

        <Paragraph id="data-output" className="mt-14">
          <Paragraph.Text>The expected output of this function should look something like this:</Paragraph.Text>
        </Paragraph>

        <Paragraph className="flex flex-col items-center p-5 mx-auto text-xl rounded-md mt-14 bg-0-inset w-fit">
          <div>
            {
              generateSyntaxHighlightedCode(`
              { 't', 'j' },

              { 'h', 'u' },

              { 'e', 'm' },

              { ' ', ' ' },

              { 'q', 'p' },

              { 'u', 'e' },

              { 'i', 'd' },

              { 'c', 'j' },

              { 'k', 'u' },

              ...
            `)
            }
          </div>
        </Paragraph>

        
        <Paragraph className="mt-14">
          <Paragraph.Text>Where the first column in this 2D array holds our lost <Highlight>message letter</Highlight> friends, and the second column holds their corresponding <Highlight>keyword letter</Highlight> buddies, ready to guide them back home. Notice how once we ran out of keyword letters to pair with message letters, we just <Highlight>repeat</Highlight> the keyword letters from the beginning again. Also notice how the space character was paired with itself. This is because space characters, along with all other <Highlight>non-alphabet characters</Highlight>, are <Highlight>not included</Highlight> in this cipher algorithm. We want them to pass through the algorithm unchanged.</Paragraph.Text>
          <Paragraph.Text>Now that our data is in a much easier format to read and understand, let&apos;s take a look how to use it.</Paragraph.Text>
        </Paragraph>

        <Paragraph className="mt-12">
          <ContentHeading id="implementation">Finding the Row Index</ContentHeading>
        </Paragraph>

        <Paragraph className="mt-14">
          <Paragraph.Text className="inline">To recap, the first step to decoding a Della Porta cipher is take a <Highlight>keyword letter</Highlight> and find where it exists in the <Highlight>Key</Highlight> column of the chart. Let&apos;s continue using our <Link href="#data-output" className="underline">previous data example</Link>, and take a look at the first pair: <Link href="#data-output"><CodeBlock>{"{'t', 'j'}"}</CodeBlock></Link></Paragraph.Text>
          <Paragraph.Text className="italic">Remember: <CodeBlock>{`'t'`}</CodeBlock> is a letter in the message, and <CodeBlock>{`'j'`}</CodeBlock> is {"it's"} corresponding keyword letter buddy.</Paragraph.Text>
        </Paragraph>

        <Paragraph className="mt-14">
          <div className="xl:w-[541px] xl:h-[530px] lg:w-[450px] lg:h-[441px] md:w-[400px] md:h-[392px] w-[60vw] h-[59vw] min-w-[300px] min-h-[294px] relative">
            <Image
              src="/find-row.webp"
              fill
              alt=""
            />
          </div>
        </Paragraph>
      
        {/* <Paragraph className="mt-14">
          <div className="xl:w-[730px] xl:h-[508px] lg:w-[510px] lg:h-[355px] md:w-[480px] md:h-[334px] w-[400px] h-[278px] relative">
            <Image
              src="/table-row-1.png"
              fill
              alt=""
            />
          </div>
        </Paragraph> */}

        <Paragraph className="mt-14">
          <Paragraph.Text className="font-medium">In this case, our <Highlight>keyword letter</Highlight> is at the <Highlight>4th row index</Highlight> (starting from zero). But before going further, there is a small caveat that you may have already noticed: there are <Highlight>two</Highlight> letters in each <Highlight>Key</Highlight> column.</Paragraph.Text>
          <Paragraph.Text>Here, we located the row <CodeBlock>{`I, J`}</CodeBlock> because we were looking for the keyword letter <CodeBlock>{`'j'`}</CodeBlock>. However, we would still choose this same row if we were looking for <CodeBlock>{`'i'`}</CodeBlock> as well. So, <Highlight>how do we code this?</Highlight></Paragraph.Text>
          <Paragraph.Text>First, {`let's`} assume our <Highlight>Key</Highlight> column just has <Highlight>single letters</Highlight> for now. How would we find a row? For example, {`let's`} say our keyword letter was <CodeBlock>{`'c'`}</CodeBlock> and we had to find that <Highlight>row index</Highlight> in this chart:</Paragraph.Text>
        </Paragraph>

        <Paragraph className="mt-14">
          <div className="md:w-[600px] md:h-[222px] xl:w-[675px] xl:h-[250px]  w-[80vw] h-[30vw] min-w-[200px] min-h-[100px] relative">
            <Image
              src="/finding-c.webp"
              fill
              alt=""
            />
          </div>
        </Paragraph>

        <Paragraph className="mt-14">
          <Paragraph.Text>For simplicity, we will always assume all lowercase characters.</Paragraph.Text>
          <Paragraph.Text className="font-medium">Since the rows fall in <Highlight>alphabetical</Highlight> order, the best way to determine the <Highlight>row index</Highlight> of <CodeBlock>{`'c'`}</CodeBlock> would be to find {`it's`} <Highlight>position</Highlight> in the alphabet. We can do this by getting the <Highlight>bytecode</Highlight> value of <CodeBlock>{`'a'`}</CodeBlock>&#8212;<CodeBlock>97</CodeBlock>&#8212;and subtracting that from the bytecode value of <CodeBlock>{`'c'`}</CodeBlock>&#8212;<CodeBlock>99</CodeBlock>.</Paragraph.Text>
          <Paragraph.Text>Doing this, we get <CodeBlock>99 - 97</CodeBlock> which gives us <CodeBlock>2</CodeBlock>. Lo and behold, that is the row index of <CodeBlock>{`'c'`}</CodeBlock> that we were looking for. In general, we would apply the formula: </Paragraph.Text>

          <div className="my-10 text-xl">
            {
              generateSyntaxHighlightedCode(`
              int rowIndex = keywordLetter - 'a';
            `)
            }
          </div>

          <Paragraph.Text>...assuming <CodeBlock>keywordLetter</CodeBlock> is a <CodeBlock>char</CodeBlock> type.</Paragraph.Text>
          <Paragraph.Text>We can apply this same logic to our original example with a <span className="italic">slight</span> modification: we must ignore every <Highlight>other</Highlight> position in the alphabet, because we are <Highlight>grouping two letters</Highlight> into one <Highlight>row index</Highlight>. In other words, for every <Highlight>two consecutive</Highlight> keyword letters, they must be <Highlight>the same row index.</Highlight></Paragraph.Text>
          <Paragraph.Text>Therefore, since we are grouping by two, we just need to divide the position of our keyword letter in the alphabet by two. {`Here's`} what the function would look like:</Paragraph.Text>
        </Paragraph>

        <Paragraph className="flex flex-col items-center p-5 mx-auto text-xl rounded-md mt-14 bg-0-inset w-fit">
          <p className="text-sm lg:text-lg md:text-md sm:text-sm">
            {
              generateSyntaxHighlightedCode(`
              public static int getPortaRowIndexOf(String character) {
                // convert character to bytecode
                int characterByte = character;

                // get position of character in the alphabet
                int position = characterByte - 'a';

                // group two consecutive characters to the same index
                // ex:
                // getPortaRowIndexOf('a') -> 0
                // getPortaRowIndexOf('b') -> 0
                // getPortaRowIndexOf('c') -> 1
                // getPortaRowIndexOf('d') -> 1
                // ...
                return Math.floor(position/2);
              }
            `)
            }
          </p>
        </Paragraph>

      </Content>
    </Page>
  );
}

export default Home;