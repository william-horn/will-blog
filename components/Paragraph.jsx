
import { twMerge } from 'tailwind-merge';

import Text from './Text';
import Content from './Content';

import React from 'react';

const ParagraphText = ({
  bold,
  textSize="xl",
  children,
  className: importedClassName="",
}) => {
  return (
    <Text 
    textSize={textSize}
    className={twMerge(`font-medium text-center`, importedClassName)}
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