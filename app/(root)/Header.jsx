
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
      className={`${getResponsivePadding("6xl", "top")} ${getResponsivePadding("4xl", "bottom")}`}
      >
        <Heading 
        textSize="5xl" 
        type="h1" 
        className={`relative leading-tight animate-fade-down-0 text-1 px-4 font-0 ${getResponsivePadding("6xl", "bottom")}`}
        >
          Della Porta Cipher
          <br/>
          <span className="text-2xl font-0 italic">{`"The Shifting Method"`}</span>
        </Heading>

        <Text 
        textSize="3xl"
        className="pt-2 text-center opacity-0 animate-fade-in-1 text-0-muted font-6"
        >
          November 23, 2024
        </Text>
      </header>
    </>
  );
};

export default Header;