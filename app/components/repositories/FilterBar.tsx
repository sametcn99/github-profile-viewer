import FilterInput from "../FilterInput";
import { Box, Button, DropdownMenu } from "@radix-ui/themes";
export default function FilterBar({
  setFilterValue,
  sort,
  setSort,
  selectedLanguage,
  setSelectedLanguage,
  uniqueLanguages,
  selectedTopic,
  setSelectedTopic,
  uniqueTopics,
  selectedFilter,
  setSelectedFilter,
}: any) {
  return (
    <>
      <Box className="flex w-full flex-row flex-wrap items-center justify-between gap-3">
        <FilterInput setFilterValue={setFilterValue} />
        <Box className="mx-auto flex flex-row  flex-wrap items-center justify-center ">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button className="hover:cursor-pointer">Sort By</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>Sort by</DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.RadioGroup value={sort} onValueChange={setSort}>
                <DropdownMenu.RadioItem value="Updated Descending">
                  Updated Descending
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="Updated Ascending">
                  Updated Ascending
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="Created Ascending">
                  Created Ascending
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="Created Descending">
                  Created Descending
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="Stars Ascending">
                  Stars Ascending
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="Stars Descending">
                  Stars Descending
                </DropdownMenu.RadioItem>
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button className="hover:cursor-pointer">Languages</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>Languages</DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.RadioGroup
                value={selectedLanguage}
                onValueChange={setSelectedLanguage}
                style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                <DropdownMenu.RadioItem value="">All</DropdownMenu.RadioItem>
                {uniqueLanguages.map((language: string, index: number) => (
                  <DropdownMenu.RadioItem key={index} value={language}>
                    {language}
                  </DropdownMenu.RadioItem>
                ))}
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button className="hover:cursor-pointer">Topics</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>Topics</DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.RadioGroup
                value={selectedTopic}
                onValueChange={setSelectedTopic}
                style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                <DropdownMenu.RadioItem value="">All</DropdownMenu.RadioItem>
                {uniqueTopics.map((topic: string, index: number) => (
                  <DropdownMenu.RadioItem key={index} value={topic}>
                    {topic}
                  </DropdownMenu.RadioItem>
                ))}
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button className="hover:cursor-pointer">Filter By</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>Filter By</DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.RadioGroup
                value={selectedFilter}
                onValueChange={setSelectedFilter}
              >
                <DropdownMenu.RadioItem value="All">All</DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="Forked">
                  Forked
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="Not Forked">
                  Not Forked
                </DropdownMenu.RadioItem>
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Box>
      </Box>
    </>
  );
}