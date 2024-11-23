// import getStylesFromProps from "@/util/getStylesFromProps";
import { twMerge } from "tailwind-merge";
import { getResponsiveTextSize } from "@/lib/util/responsive";
import React from "react";

const Heading = React.forwardRef(function({ 
  children, 
  type,
  textSize,
  className: importedClassName="",
  ...rest
}, ref) {

  const getHTag = (type, children, props) => {
    switch (type) {
      case "h1": return <h1 {...props}>{children}</h1>
      case "h2": return <h2 {...props}>{children}</h2>
      case "h3": return <h3 {...props}>{children}</h3>
      case "h4": return <h4 {...props}>{children}</h4>
      case "h5": return <h5 {...props}>{children}</h5>
      case "h6": return <h6 {...props}>{children}</h6>
      
      default: return <p {...props}>{children}</p>
    }
  }

  return getHTag(
    type, 
    children, 
    {
      ref,
      ...rest,
      className: twMerge(
        `${getResponsiveTextSize(textSize)} heading-text leading-normal py-2 text-0 font-0 text-center`,
        importedClassName
      )
    }
  );
});

Heading.displayName = "Heading"
export default Heading;
