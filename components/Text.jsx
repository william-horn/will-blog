
import { twMerge } from "tailwind-merge";
import React from "react";
import { getResponsiveTextSize } from "@/lib/util/responsive";

const Text = React.forwardRef(function({ 
  children, 
  textSize,
  className: importedClassName="",
  ...rest
}, ref) {

  return (
    <p 
    ref={ref}
    className={twMerge(
      `${getResponsiveTextSize(textSize) || ''} general-text leading-6 text-0 font-0 align-middle block`,
      importedClassName
    )}
    {...rest}>
      {children}
    </p>
  );
});

// Text.displayName = "Text"; // for ESlint
export default Text;
