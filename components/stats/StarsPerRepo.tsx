"use client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { useState } from "react";
import FilterChart from "./FilterChart";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea, Table } from "@radix-ui/themes";
export default function StarsPerRepo({
  starsPerRepo,
}: {
  starsPerRepo: { [key: string]: number };
}) {
  const [length, setLength] = useState(
    Object.keys(starsPerRepo).length > 5 ? 5 : Object.keys(starsPerRepo).length,
  );
  return (
    <Card>
      <Heading className="ml-3">
        <Flex gap="4">
          <Text>Stars Per Repo | Top {length}</Text>
          <FilterChart
            maxLength={Object.entries(starsPerRepo).length}
            length={length}
            setLength={setLength}
          />
        </Flex>
      </Heading>
      <Box className="h-[20rem] w-full rounded-2xl bg-gray-400 p-2">
        <PieChart
          sx={{
            color: "green",
            WebkitTextStrokeColor: "white",
            fontWeight: "bold",
          }}
          series={[
            {
              data: Object.entries(starsPerRepo)
                .slice(0, length)
                .map(([key, value]) => ({
                  label: key,
                  value: value as number,
                })),
            },
          ]}
        />
      </Box>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>See All</AccordionTrigger>
          <AccordionContent>
            <Table.Root>
              <ScrollArea className="h-[15rem] w-full rounded-2xl border p-4">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>Repository</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Stars</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {Object.entries(starsPerRepo).map(([key, value]) => (
                    <Table.Row
                      key={key}
                      className="hover:bg-black hover:bg-opacity-20"
                    >
                      <Table.Cell>{key}</Table.Cell>
                      <Table.Cell>{value}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </ScrollArea>
            </Table.Root>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
