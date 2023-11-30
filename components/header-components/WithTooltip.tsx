import { Tooltip } from "@nextui-org/react";
import React from "react";

export default function WithTooltip({ children, ...props }: any) {
  return (
    <Tooltip
      content={`Profile type: ${props.type}`}
      delay={0}
      closeDelay={0}
      className="select-none bg-opacity-60 light:bg-black light:text-white dark:bg-white dark:text-black"
    >
      {children}
    </Tooltip>
  );
}
