import { TextField } from "@radix-ui/themes";

export default function FilterInput({ setFilterValue }: any) {
  return (
    <div className="w-full">
      <TextField.Root>
        <TextField.Input
          placeholder="Filter by title"
          type="search"
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </TextField.Root>
    </div>
  );
}
