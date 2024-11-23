
import { twMerge } from "tailwind-merge";
import { getResponsiveContainerWidth } from "@/lib/util/responsive";
import React from "react";

const Content = React.forwardRef(function({
  children,
  span,
  className: importedClassName="",
  ...rest
}, ref) {

  return (
    <div
    className={`content ${twMerge(getResponsiveContainerWidth(span) || "", importedClassName)}`}
    {...rest}
    >
      {children}
    </div>
  );
})

export default Content;
