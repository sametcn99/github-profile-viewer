"use client";
import { Flex, Button } from "@radix-ui/themes";
import React from "react";

export default function FilterChart({
  length,
  maxLength,
  setLength,
}: {
  length: number;
  maxLength: number;
  setLength: React.Dispatch<React.SetStateAction<number>>;
}) {
  const increaseLength = () => {
    if (length < maxLength) {
      setLength((prev) => prev + 1);
    }
  };

  const decreaseLength = () => {
    if (length > 1) {
      setLength((prev) => prev - 1);
    }
  };
  return (
    <Flex gap="4">
      <Button
        onClick={decreaseLength}
        className="text-2xl font-bold hover:cursor-pointer"
        disabled={length === 1}
      >
        -
      </Button>
      <Button
        onClick={increaseLength}
        className="text-2xl font-bold hover:cursor-pointer"
        disabled={length === maxLength}
      >
        +
      </Button>
    </Flex>
  );
}
