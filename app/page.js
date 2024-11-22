import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <header className="py-8">
        <h1 className="text-[#ff437d] text-center font-bold text-4xl arsenal-sc-bold">Della Porta Cipher</h1>
      </header>

      <main className="flex justify-center">
        <div className="w-[50%]">
          <p className="font-light montserrat text-center text-lg">
            The function of the 
            <a 
            className="text-[#dc51cd]"
            href="https://sites.google.com/site/cryptocrackprogram/user-guide/cipher-types/substitution/porta">Della Porta Cipher</a> 
            is to encrypt and decrypt a message in plain text.
          </p>
        </div>
      </main>
    </div>
  );
}
