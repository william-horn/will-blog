
import { twMerge } from 'tailwind-merge';

import Text from './Text';
import Content from './Content';

import React from 'react';

const ParagraphText = ({
  bold,
  textSize="lg",
  children,
  className: importedClassName="",
  ...rest
}) => {
  return (
    <Text 
    textSize={textSize}
    className={twMerge(`font-medium w-full`, importedClassName)}
    {...rest}
    >
      {children}
    </Text>
  );
};

const Paragraph = ({
  children,
  className: importedClassName="",
  ...rest
}) => {
  return (
    <Content span="full" className={twMerge("flex flex-col gap-5 justify-center items-center", importedClassName)} {...rest}>
      {children}
    </Content>
  );
};

Paragraph.Text = ParagraphText
export default Paragraph;