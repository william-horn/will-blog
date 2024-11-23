import Image from "next/image";
import Page from "@/components/Page";
import Text from "@/components/Text";
import Content from "@/components/Content";
import Heading from "@/components/Heading";

const Home = () => {
  return (
    <Page>
      <Content span="full" className="mx-auto">
        <Text>Hello, world!</Text>
      </Content>
    </Page>
  );
}

export default Home;