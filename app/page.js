import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <header className="py-8">
        <h1 className="text-[#ff437d] text-center font-bold text-4xl arsenal-sc-bold pb-3">Della Porta Cipher</h1>
        <p className="montserrat font-light text-center">
          A group project by:&nbsp;
          <span className="underline">William Horn</span>,&nbsp;
          <span className="underline">Jaylen</span>,&nbsp;
          <span className="underline">Alex</span>,&nbsp;
        </p>
      </header>

      <main className="flex justify-center flex-col items-center gap-5">
        <div className="w-[50%]">
          <p className="font-light montserrat text-center text-lg">
            The function of the&nbsp;
            <a 
            href="https://sites.google.com/site/cryptocrackprogram/user-guide/cipher-types/substitution/porta">Della Porta Cipher</a> 
            &nbsp;is to encrypt and decrypt a message in plain text.
          </p>
        </div>

        <div className="w-[50%]">
          <p className="font-light montserrat text-center text-lg">
            The algorithm can be described using the chart below. Our implementation emulates the shifting patterns of each row in the Della Porta chart.
          </p>
        </div>

        <div className="flex flex-center flex-col items-center">
          <img
            src="./PortaTable.jpg"
            width={300}
            height={300}
          />
          <p className="mt-3">
            Source:&nbsp;
            <a href="https://sites.google.com/site/cryptocrackprogram/user-guide/cipher-types/substitution/porta">Della Porta Cipher</a>
          </p>
        </div>

        <div className="w-[50%]">
          <p className="font-light montserrat text-center text-lg">
            Placeholder text Placeholder text Placeholder text Placeholder text Placeholder text Placeholder text Placeholder text Placeholder text 
          </p>
        </div>

        <div className="flex flex-center flex-col items-center">
          <img
            src="./column-highlight.jpg"
            width={500}
            height={373}
          />
        </div>

        <div className="w-[50%]">
          <p className="font-light montserrat text-center text-lg">
            You can test our code here:
          </p>
        </div>

        <iframe
        frameBorder="0"
        height="450px"  
        src="https://onecompiler.com/embed/python?theme=dark" 
        width="50%"
        ></iframe>
      </main>
    </div>
  );
}
