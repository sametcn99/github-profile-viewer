import { SearchIcon } from "@/components/icons";
import { Input } from "@nextui-org/input";

export default function FilterDataBar({
  setFilterValue,
  count,
  totalCount,
}: any) {
  return (
    <section className=" mx-auto flex flex-row items-center space-x-2">
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100 w-[10rem] sm:w-[20rem]",
          input: "text-sm",
        }}
        endContent={
          <>
            {totalCount !== count && (
              <span className="mr-2 font-light">{`(${count})`}</span>
            )}
            <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
          </>
        }
        labelPlacement="outside"
        placeholder="Filter by title"
        type="search"
        onChange={(e) => setFilterValue(e.target.value)}
      />
    </section>
  );
}
