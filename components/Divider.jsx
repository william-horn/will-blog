import { getResponsiveDividerSize } from "@/lib/util/responsive";
import { twMerge } from "tailwind-merge";
import React from "react";

const Divider = React.forwardRef(function({
  direction="horizontal",
  size="3xl",
  className=""
}, ref) {
  return (
    <div 
    ref={ref}
    className={
      twMerge(
        `divider ${getResponsiveDividerSize(direction, size)}`,
         className
      )
    }>
    </div>
  );
})

Divider.displayName = "Divider";
export default Divider;