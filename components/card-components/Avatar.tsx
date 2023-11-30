import { Card, Tooltip } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import React from "react";

export default function Avatar({ ...props }) {
  const avatar_url = props.avatar_url || props.gravatar_url;
  return (
    <Card className="m-10">
      <Tooltip
        content="Profile Image"
        delay={0}
        closeDelay={0}
        className="select-none bg-opacity-60 light:bg-black light:text-white dark:bg-white dark:text-black"
      >
        <Image
          isZoomed
          src={avatar_url}
          alt="profile image"
          width={250}
          height={250}
          loading="eager"
          onDragStart={(e) => e.preventDefault()} // Prevent dragging
          className="p-2"
        />
      </Tooltip>
    </Card>
  );
}
