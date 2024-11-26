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
  className: importedClassName,
  ...rest
}) => {
  return <Heading className={twMerge("text-1 font-6", importedClassName)} textSize="6xl" {...rest}>
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
      <Content span="sm" className="flex flex-col mx-auto">
        <div className="opacity-0 animate-fade-in-1">
          <Paragraph className="p-6 mb-10 rounded-md bg-0-inset">
            <Paragraph.Text bold textSize="lg" className="italic font-light"><Highlight className="">&quot;The Shifting Method&quot;</Highlight> is an algorithmic implementation developed by <Highlight className="">Will</Highlight>, <Highlight className="">Jaylen</Highlight>, and <Highlight className="">Alex</Highlight>, to encrypt and decrypt text using the Della Porta Cipher chart, as part of a college project. This article only focuses on <Link href="#implementation"><Highlight className="underline">our implementation</Highlight></Link> of the conversion algorithm. If you want to learn more about the Della Porta Cipher, <Link href="https://sites.google.com/site/cryptocrackprogram/user-guide/cipher-types/substitution/porta"><Highlight className="underline">click here to visit the source we used.</Highlight></Link></Paragraph.Text>
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
          <ContentHeading id="set-up">The Set Up - Data Formatting</ContentHeading>
        </Paragraph>

        <Paragraph className="mt-14">
          <Paragraph.Text className="font-medium">Since the encryption and decryption of our message depends on whatever <Highlight>keyword</Highlight> the user inputs, we must account for this first.</Paragraph.Text>
          <Paragraph.Text className="font-medium">We know that each letter in the keyword maps <Highlight>one-to-one</Highlight> with each letter in our input message, and the <Highlight>keyword letters will repeat themselves</Highlight> if or when they run out.</Paragraph.Text>
        </Paragraph>

        <Paragraph className="mt-12">
        <Paragraph.Text>So, lets assume we have this message to encrypt using this keyword:</Paragraph.Text>
        </Paragraph>

        <Paragraph className="mt-14">
          <div className="flex flex-col items-center p-5 mx-auto rounded-md bg-0-inset w-fit text-lg">
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
          <Paragraph.Text>So, how do our poor message letters find their way back home? This is where the <CodeBlock>keyword</CodeBlock> letters come to the rescue. <Highlight>Each of our message letter</Highlight> friends will be <Highlight>paired with a keyword letter</Highlight> buddy to help guide them back home (to the proper output). This means we need to create some kind of <Highlight>function</Highlight> that ensures each message letter is buddied up with a keyword letter. Let&apos;s call it <CodeBlock>getKeywordMessagePairs()</CodeBlock>, and it will look something like this:</Paragraph.Text>
        </Paragraph>

        <Paragraph className="flex flex-col items-center p-5 mx-auto rounded-md mt-14 bg-0-inset w-fit">
          <div className="lg:text-lg text-sm">
            {
              generateSyntaxHighlightedCode(`
              public static char[][] getKeywordMessagePairs(String message, String keyword) {
                // *create a 2D array of letter pairs, spanning the length of the message
                // *each row will have 2 columns: one for the message letter, the other for the keyword letter
                char[][] letterPairs = char[message.length()][2];
                
                // the mapping process
                ...

                // return the final letter mappings
                return letterPairs;
              }
            `)
            }
          </div>
        </Paragraph>

        <Paragraph id="data-output" className="mt-14">
          <Paragraph.Text>The expected output of this function should look something like this:</Paragraph.Text>
        </Paragraph>

        <Paragraph className="flex flex-col items-center p-5 mx-auto text-xl rounded-md mt-14 bg-0-inset w-fit">
          <div className="lg:text-lg text-sm">
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
          <Paragraph.Text>Where the <Highlight>first column</Highlight> in this 2D array holds our lost <Highlight>message letter</Highlight> friends, and the <Highlight>second column</Highlight> holds their corresponding <Highlight>keyword letter</Highlight> buddies&mdash;ready to guide them back home.</Paragraph.Text>
          <Paragraph.Text>Notice how once we ran out of keyword letters to pair with message letters, we just <Highlight>repeat</Highlight> the keyword letters from the beginning again. Also notice how the space character was paired with itself. This is because space characters, along with all other <Highlight>non-alphabet characters</Highlight>, are <Highlight>not included</Highlight> in this cipher algorithm. We want them to pass through the algorithm unchanged.</Paragraph.Text>
          <Paragraph.Text>Now that our data is in a much easier format to read and understand, let&apos;s take a look how to use it.</Paragraph.Text>
        </Paragraph>

        <Paragraph className="mt-12">
          <ContentHeading id="row-index">Finding the Row Index</ContentHeading>
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
          <Paragraph.Text>Here, we located the row <CodeBlock>{`I,J`}</CodeBlock> because we were looking for the keyword letter <CodeBlock>{`'j'`}</CodeBlock>. However, we would still choose this same row if we were looking for the letter <CodeBlock>{`'i'`}</CodeBlock> as well. So, <Highlight>how do we code this?</Highlight></Paragraph.Text>
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
          <Paragraph.Text className="font-medium">Since the rows fall in <Highlight>alphabetical</Highlight> order, the best way to determine the <Highlight>row index</Highlight> of <CodeBlock>{`'c'`}</CodeBlock> would be to find {`it's`} <Highlight>position</Highlight> in the alphabet. We can do this by getting the <Highlight>ASCII</Highlight> value of <CodeBlock>{`'a'`}</CodeBlock>&#8212;<CodeBlock>97</CodeBlock>&#8212;and subtracting that from the ASCII value of <CodeBlock>{`'c'`}</CodeBlock>&#8212;<CodeBlock>99</CodeBlock>.</Paragraph.Text>
          <Paragraph.Text>Doing this, we get <CodeBlock>99 - 97</CodeBlock> which gives us <CodeBlock>2</CodeBlock>. Lo and behold, that is the row index of <CodeBlock>{`'c'`}</CodeBlock> that we were looking for. In general, we would apply the formula: </Paragraph.Text>

          <div className="p-5 my-10 text-lg rounded-md bg-0-inset w-fit">
            {
              generateSyntaxHighlightedCode(`
              int row_index = keywordLetter - 'a';
            `)
            }
          </div>

          <Paragraph.Text>...assuming <CodeBlock>keywordLetter</CodeBlock> is a <CodeBlock>char</CodeBlock> type.</Paragraph.Text>
          <Paragraph.Text>We can apply this same logic to our original example with a <span className="italic">slight</span> modification: we must ignore every <Highlight>other</Highlight> position in the alphabet, because we are <Highlight>grouping two letters</Highlight> into <Highlight>one row index</Highlight>. In other words, for every <Highlight>two consecutive</Highlight> keyword letters, they must be at <Highlight>the same row index.</Highlight></Paragraph.Text>
          <Paragraph.Text>Therefore, since we are grouping by two, we just need to divide the position of our keyword letter in the alphabet by two. {`Here's`} what the function would look like:</Paragraph.Text>
        </Paragraph>

        <Paragraph className="flex flex-col items-center p-5 mx-auto text-xl rounded-md mt-14 bg-0-inset w-fit">
          <p className="text-sm lg:text-lg md:text-md sm:text-sm">
            {
              generateSyntaxHighlightedCode(`
              public static int getPortaRowIndexOf(String character) {
                // convert character to ASCII
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

        <Paragraph className="mt-14">
          <Paragraph.Text className="font-medium">Now that we can find the row index of our keyword letters, we can determine where our message letter <CodeBlock>{`'t'`}</CodeBlock> needs to start traveling in order to get home. {`Let's`} take a look at how he can get there.</Paragraph.Text>
        </Paragraph>

        <Paragraph className="mt-12">
          <ContentHeading id="porta-compliment">Finding the {`"Porta Compliment"`}</ContentHeading>
        </Paragraph>

        <Paragraph className="mt-14">
          <Paragraph.Text className="font-medium">We will continue where we left off, looking at the first message/keyword pair from our example output: <CodeBlock>{`{'t', 'j'}`}</CodeBlock>. Our <Highlight>message letter</Highlight> <CodeBlock>{`'t'`}</CodeBlock> is close to finding {`it's`} way home, but there is still more work to do.</Paragraph.Text>
          <Paragraph.Text>Calling <CodeBlock>getPortaRowIndexOf({`'j'`})</CodeBlock> tells us which road (or row index) <CodeBlock>{`'t'`}</CodeBlock> needs to travel on, but not which <Highlight>direction</Highlight> to go in. {`Let's`} take a look at the chart again:</Paragraph.Text>
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

        <Paragraph className="mt-14">
          <Paragraph.Text className="font-medium">The chart is split up into <Highlight>two halves</Highlight> of the alphabet: the <Highlight>first half</Highlight> is at the <Highlight>top</Highlight>, and the <Highlight>second half</Highlight> is all throughout the <Highlight>bottom</Highlight>.</Paragraph.Text>
          <Paragraph.Text>This means that for any <Highlight>message letter</Highlight>, it will either be at the top of chart in the first half of the alphabet, or somewhere in the <Highlight>row</Highlight> of our keyword letter, in the second half of the alphabet.</Paragraph.Text>
        </Paragraph>

        <Paragraph className="mt-12">
          <Heading id="case-1" className="text-4xl text-white font-9 leading-relaxed">Case 1: Message Letter in Second Half</Heading>
        </Paragraph>


        <Paragraph className="mt-14">
          <Paragraph.Text>In our case, <CodeBlock>{`'t'`}</CodeBlock> is in the second half of the alphabet, which means we should see it in our keyword letter row, which we do.</Paragraph.Text>
        </Paragraph>

        <Paragraph className="mt-14">
          <div className="xl:w-[711px] xl:h-[204px] md:w-[600px] md:h-[172px] min-w-[200px] w-[80vw] h-[23vw] min-h-[57px] relative">
            <Image
              src="/finding-t.webp"
              fill
              alt=""
            />
          </div>
        </Paragraph>

        <Paragraph className="mt-14">
          <Paragraph.Text>This now tells <CodeBlock>{`'t'`}</CodeBlock> which direction it needs to travel in order to get home. When the <Highlight>message letter</Highlight> is in the <Highlight>second half</Highlight> of the alphabet, the <Highlight>output</Highlight> (or <Highlight>compliment</Highlight>) character will reside in the <Highlight>first half</Highlight> of the alphabet&#8212;vertically aligned with the message letter.</Paragraph.Text>
        </Paragraph>

        <Paragraph className="mt-14">
          <div className="xl:w-[720px] xl:h-[337px] md:w-[600px] md:h-[281px] min-w-[200px] w-[80vw] h-[37vw] min-h-[94px] relative">
            <Image
              src="/finding-c-from-t.webp"
              fill
              alt=""
            />
          </div>
        </Paragraph>

        <Paragraph className="mt-14">
          <Paragraph.Text>So, the Porta compliment of <CodeBlock>{`'t'`}</CodeBlock> when paired with a keyword letter of <CodeBlock>{`'j'`}</CodeBlock>, is <CodeBlock>{`'c'`}</CodeBlock>. If we can do this for every letter in the message string, then we will have fully encrypted or decrypted our text. Now, <Highlight>how do we code this?</Highlight></Paragraph.Text>
          <Paragraph.Text>Remember, this is still just <Highlight>case 1</Highlight>: when the <Highlight>message letter</Highlight> is in the second half of the alphabet. So, for this explanation we will assume all message letters are in the second half.</Paragraph.Text>
          <Paragraph.Text>{`Let's`} take a look at the information we have so far, and how we can use that to calculate our answer of <CodeBlock>{`'c'`}</CodeBlock>. The first thing to notice is our <Highlight>message letter</Highlight> <CodeBlock>{`'t'`}</CodeBlock> and <Highlight>compliment letter</Highlight> <CodeBlock>{`'c'`}</CodeBlock> have the same index relative to the row their in.</Paragraph.Text>
        </Paragraph>

        <Paragraph className="mt-14">
          <div className="xl:w-[750px] xl:h-[278px] md:w-[600px] md:h-[222px] min-w-[200px] w-[80vw] h-[30vw] min-h-[74px] relative">
            <Image
              src="/row-relationship.webp"
              fill
              alt=""
            />
          </div>
        </Paragraph>

        <Paragraph className="mt-14">
          <Paragraph.Text id="t-equals-2">This is significant because if both the <Highlight>message letter</Highlight> and the <Highlight>compliment letter</Highlight> have the same <Highlight>relative row index</Highlight>, then we can use one to find the other. For instance, we know that <CodeBlock>{`'t'`}</CodeBlock> is at index <CodeBlock>2</CodeBlock> in {`it's`} row, so we can simply do <br></br><CodeBlock>{`'a' + 2`}</CodeBlock> (the equivalent of <CodeBlock>97 + 2</CodeBlock>) to calculate the <Highlight>ASCII</Highlight> for <CodeBlock>{`'c'`}</CodeBlock>.</Paragraph.Text>
          <Paragraph.Text>So then the question becomes, how do we find the relative row index of <CodeBlock>{`'t'`}</CodeBlock>?</Paragraph.Text>
          <Paragraph.Text>As mentioned from the beginning, each letter in the <Highlight>second half</Highlight> of the alphabet is <Highlight>shifting to the left</Highlight> by one slot for every descending row. This necessarily means that whatever the <Highlight>row index is</Highlight>, any given letter in that row has <Highlight>shifted to the left</Highlight> by that <Highlight>same number </Highlight> from {`it's`} <Highlight>initial position</Highlight>.</Paragraph.Text>
        </Paragraph>

        <Paragraph className="mt-14">
          <div className="xl:w-[700px] xl:h-[333px] md:w-[600px] md:h-[285px] min-w-[200px] w-[80vw] h-[38vw] min-h-[95px] relative">
            <Image
              src="/shift-counting.webp"
              fill
              alt=""
            />
          </div>
        </Paragraph>

        <Paragraph className="mt-14">
          <Paragraph.Text>We can use the <CodeBlock>A,B</CodeBlock> row as sort of a reference for our <Highlight>second-half</Highlight> letters, since this row contains their <Highlight>initial positions</Highlight>&#8212;before any shifting has occurred. We will need to know these initial positions so we can determine the {`letter's`} <Highlight>new position</Highlight> later on as things get shifted around.</Paragraph.Text>
          <Paragraph.Text>To do this, we could start by determining how <Highlight>far away</Highlight> from <CodeBlock>{`'z'`}</CodeBlock> each letter is. We would represent this as a <Highlight>positive</Highlight> number, for example: <CodeBlock>{`'x'`}</CodeBlock> would be a positive distance of <CodeBlock>2</CodeBlock> away from <CodeBlock>{`'z'`}</CodeBlock>.</Paragraph.Text>
          <Paragraph.Text>In the case of <CodeBlock>{`'t'`}</CodeBlock> it would be <CodeBlock>6</CodeBlock>:</Paragraph.Text>
        </Paragraph>

        <Paragraph className="mt-14">
          <div className="xl:w-[700px] xl:h-[287px] md:w-[600px] md:h-[222px] min-w-[200px] w-[80vw] h-[30vw] min-h-[74px] relative">
            <Image
              src="/t-from-z.webp"
              fill
              alt=""
            />
          </div>
        </Paragraph>

        <Paragraph className="mt-14">
          <Paragraph.Text>But remember, {`we're`} trying to find the <Highlight>relative row index</Highlight> of a letter starting from the <Highlight>beginning</Highlight> of the row, not the end of it. To account for this, we will <Highlight>subtract</Highlight> our {`letter's`} distance from <CodeBlock>{`'z'`}</CodeBlock>, which is <CodeBlock>6</CodeBlock> in this case, from <CodeBlock>12</CodeBlock>&#8212;the length of the row&#8212;to get the remaining row space. Therefore, our letter <CodeBlock>{`'t'`}</CodeBlock> is at an initial row index of <CodeBlock>12 - 6</CodeBlock>, which is <CodeBlock>6</CodeBlock>.</Paragraph.Text>
          <Paragraph.Text>So in general, we can find the <Highlight>relative row index</Highlight> of a letter in the row <CodeBlock>A,B</CodeBlock> by doing:</Paragraph.Text>

          <div className="p-5 my-10 text-lg rounded-md bg-0-inset w-fit">
            {
              generateSyntaxHighlightedCode(`
              int initial_position = 12 - ('z' - messageLetter);
            `)
            }
          </div>

          <Paragraph.Text>You may be asking: <span className="italic">{'"'}why not just do <span className="not-italic"><CodeBlock>messageLetter - {`'n'`}</CodeBlock>?</span>{'"'}</span></Paragraph.Text>
          <Paragraph.Text>And you could do this! However, it will make the math in the next few steps a bit more annoying. When we get there, {`we'll`} see why.</Paragraph.Text>
          <Paragraph.Text>Now that we have a formula for getting the <Highlight>initial position</Highlight> (or <Highlight>relative row index</Highlight>) of a letter in row <CodeBlock>A,B</CodeBlock>, we need to add how much that letter has shifted to this result to find {`it's`} new position in the other rows.</Paragraph.Text>
          <Paragraph.Text>In the case of <CodeBlock>{`'t'`}</CodeBlock>, we know that it has shifted exactly <CodeBlock>getPortaRowIndexOf({`'j'`})</CodeBlock> many times to the <Highlight>left</Highlight>. So, we want to add that number to <CodeBlock>{`'z'`} - messageLetter</CodeBlock> <Highlight>before</Highlight> subtracting it from <CodeBlock>12</CodeBlock>, because it has shifted that many more <Highlight>additional</Highlight> times.</Paragraph.Text>

          <div className="p-5 my-10 rounded-md bg-0-inset w-fit lg:text-lg md:text-md sm:text-sm">
            {
              generateSyntaxHighlightedCode(`
              // get the row index from our keyword letter
              int row_index = getPortaRowIndexOf(keywordLetter);

              // calculate the final relative row index
              int initial_position = 12 - ('z' - messageLetter + row_index);
            `)
            }
          </div>

          <Paragraph.Text>So, {`let's`} <Highlight>substitute</Highlight> <CodeBlock>{`'t'`}</CodeBlock> and <CodeBlock>{`'j'`}</CodeBlock> into this formula. We should get the value of <CodeBlock>2</CodeBlock>, as explained <Link href="#t-equals-2" className="underline">here</Link></Paragraph.Text>

          <div className="p-5 my-10 rounded-md bg-0-inset w-fit lg:text-lg md:text-md sm:text-sm">
            {
              generateSyntaxHighlightedCode(`
              // the row index of 'j' is still 4
              int row_index = getPortaRowIndexOf('j');

              // calculate the final relative row index
              int initial_position = 12 - ('z' - 't' + row_index);
            `)
            }
          </div>

          <Paragraph.Text>After the <Highlight>substitutions</Highlight> and replacing the characters with their <Highlight>ASCII</Highlight> values, the expression becomes <CodeBlock>{`12 - (122 - 116 + 4)`}</CodeBlock>, which indeed gives us the value of <CodeBlock>2</CodeBlock>.</Paragraph.Text>
          <Paragraph.Text>While this is the correct value in this case, it {`won't`} be in every case. You may have noticed, as the <Highlight>second-half</Highlight> letters are <Highlight>shifting to the left</Highlight> in each descending row, they <Highlight>snap back</Highlight> to the <Highlight>end of the row</Highlight> once they try shifting beyond the <Highlight>first position.</Highlight></Paragraph.Text>
        </Paragraph>

        <Paragraph className="mt-14">
          <div className="xl:w-[700px] xl:h-[245px] md:w-[600px] md:h-[210px] min-w-[200px] w-[80vw] h-[28vw] min-h-[70px] relative">
            <Image
              src="/letter-snap-back.webp"
              fill
              alt=""
            />
          </div>
        </Paragraph>

        <Paragraph className="mt-14">
          <Paragraph.Text>Currently, our formula just keeps adding the <Highlight>shifted value</Highlight> (<CodeBlock>row_index</CodeBlock>) to the {`message letter's`} <Highlight>distance</Highlight> away from <CodeBlock>{`'z'`}</CodeBlock>. This means that eventually, this sum will add up to <CodeBlock>12</CodeBlock>&mdash;the length of the row&mdash;as the letter shifts towards the beginning of the row.</Paragraph.Text>
          <Paragraph.Text>In other words, when the <Highlight>{`message letter's`}</Highlight> distance away from <CodeBlock>{`'z'`}</CodeBlock> is <CodeBlock>12</CodeBlock>, then it has reached the beginning of the row and cannot be shifted to the left anymore (like in the <CodeBlock>M,N</CodeBlock> row showed above). This means the next row down&mdash;when the message letter position is <CodeBlock>13</CodeBlock>&mdash;we should set the distance of the letter away from <CodeBlock>{`'z'`}</CodeBlock>, back to <CodeBlock>0</CodeBlock>. We can do this by simply taking the distance and <Highlight>modding</Highlight> it by <CodeBlock>13</CodeBlock> to get the following result:</Paragraph.Text>

          <div className="p-5 my-10 rounded-md bg-0-inset w-fit lg:text-lg md:text-md sm:text-sm">
            {
              generateSyntaxHighlightedCode(`
              // the row index of 'j' is still 4
              int row_index = getPortaRowIndexOf('j');

              // calculate the final relative row index
              int final_position = 12 - ('z' - 't' + row_index)%13;
            `)
            }
          </div>
        </Paragraph>

      </Content>
    </Page>
  );
}

export default Home;