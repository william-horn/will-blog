import Image from "next/image";
import Page from "@/components/Page";
import Text from "@/components/Text";
import Content from "@/components/Content";
import Heading from "@/components/Heading";

import { getResponsivePadding } from "@/lib/util/responsive";

const Home = () => {
  return (
    <Page>
      <Content span="xs" className="gap-3 mx-auto opacity-0 animate-fade-in-3">
        <Content span="full">
          <Text 
          textSize="3xl"
          className="relative font-light leading-loose text-center"
          >
            The Della Porta Cipher is a polyalphabetical substitution encryption algorithm. It maps different letters in the alphabet to other letters.
          </Text>
        </Content>
        
        <Content span="full">
          <Text 
          textSize=""
          className="font-light leading-loose text-center"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, non iusto suscipit odio deleniti accusantium perspiciatis atque quod laudantium delectus similique impedit fugit, iure expedita nam cum voluptatum laborum quisquam sapiente eligendi et exercitationem doloribus, quam accusamus. Doloremque mollitia provident voluptatem ullam iste omnis debitis molestiae quaerat praesentium quisquam explicabo, eaque veritatis nobis facere, assumenda libero cum officiis, dignissimos aut!
          </Text>
        </Content>

        <Content span="full" className="">
          <p className="leading-loose text-center text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, non iusto suscipit odio deleniti accusantium perspiciatis atque quod</p>
        </Content>
      </Content>
    </Page>
  );
}

export default Home;