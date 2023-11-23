import Image from "next/image";
import React from "react";

export default function Avatar({ avatar_url }: any) {
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
