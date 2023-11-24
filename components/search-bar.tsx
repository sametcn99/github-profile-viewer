"use client";
import { SearchIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react"; // Import useState hook
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState(""); // State to store input value
  const router = useRouter();

  const handleKeyPress = (e: any) => {
    // Check if the pressed key is Enter (key code 13)
    if (e.key === "Enter") {
      seachHandle();
    }
  };

  const handleChange = (e: any) => {
    // Update the input value in the state
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    seachHandle();
  };

  const seachHandle = () => {
    router.push(`/${inputValue}`);
  };
  return (
    <section className="flex flex-col items-center justify-center gap-5">
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100 w-[20rem]",
          input: "text-sm",
        }}
        endContent={
          <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
        }
        labelPlacement="outside"
        placeholder="write user name..."
        type="search"
        onKeyPress={handleKeyPress} // Add onKeyPress event handler
        onChange={handleChange} // Add onChange event handler to update input value
        value={inputValue} // Pass the input value to the component
      />
      <Button
        className="ml-2 w-9"
        onClick={handleSearchClick} // Add onClick event handler for the search button
      >
        Search
      </Button>
    </section>
  );
}
