import { Input } from "./ui/input";

export default function FilterInput({ setFilterValue }: any) {
  return (
    <Input
      placeholder="Filter by title"
      type="search"
      onChange={(e) => setFilterValue(e.target.value)}
    />
  );
}
