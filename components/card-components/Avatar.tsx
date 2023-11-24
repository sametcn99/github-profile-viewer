import Image from "next/image";
import React from "react";

export default function Avatar({ ...props }) {
  const avatar_url = props.avatar_url || props.gravatar_url;
  return (
    <Image
      priority
      src={avatar_url}
      alt="profile image"
      width={200}
      height={200}
      loading="eager"
      onDragStart={(e) => e.preventDefault()} // Prevent dragging
      className="rounded-large"
    />
  );
}
