
import Text from "@/components/Text";
import Content from "@/components/Content";
import Heading from "@/components/Heading";
import Divider from "@/components/Divider";

import { getResponsivePadding } from "@/lib/util/responsive";

import React from 'react';

const Header = () => {
  return (
    <>
      <header
      className={`${getResponsivePadding("6xl", "top")} ${getResponsivePadding("6xl", "bottom")}`}
      >
        <Heading 
        textSize="7xl" 
        type="h1" 
        className="relative leading-tight animate-fade-down-0 text-1 font-6"
        >
          Della Porta Cipher
        </Heading>

        <Text 
        className="pt-2 font-light text-center opacity-0 animate-fade-in-2 text-0-muted"
        >
          A group project by: Will, Jaylen, and Alex
        </Text>
      </header>
    </>
  );
};

export default Header;