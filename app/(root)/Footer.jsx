
import Text from "@/components/Text";
import Content from "@/components/Content";
import Heading from "@/components/Heading";
import Divider from "@/components/Divider";

import { getResponsivePadding } from "@/lib/util/responsive";

import React from 'react';

const Footer = () => {
  return (
    <>
      <footer
      className="bg-0-inset h-[200px]"
      >
        <Text 
        textSize="3xl"
        className="pt-2 text-center opacity-0 animate-fade-in-1 text-0-muted font-6"
        >
          2024
        </Text>
      </footer>
    </>
  );
};

export default Footer;