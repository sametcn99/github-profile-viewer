import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

export default function Avatar({ ...props }) {
  const avatar_url = props.avatar_url || props.gravatar_url;
  return (
    <Tooltip
      content="User Avatar"
      delay={0}
      closeDelay={0}
      className="select-none bg-opacity-60 light:bg-black light:text-white dark:bg-white dark:text-black"
    >
      <Image
        priority
        src={avatar_url}
        alt="profile image"
        width={200}
        height={200}
        loading="eager"
        onDragStart={(e) => e.preventDefault()} // Prevent dragging
        className="rounded-large p-2"
      />
    </Tooltip>
  );
}
