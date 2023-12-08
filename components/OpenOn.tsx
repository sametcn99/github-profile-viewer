import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function OpenOn({ ...props }) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          className="h-10 hover:bg-zinc-700 hover:bg-opacity-50"
        >
          Open On
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="open on github" href={props.github} target="_blank">
          Github
        </DropdownItem>
        <DropdownItem
          key="open on github ide"
          href={props.githubide}
          target="_blank"
        >
          Github IDE
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
