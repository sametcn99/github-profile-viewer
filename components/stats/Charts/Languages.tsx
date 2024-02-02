"use client";
import "@/app/globals.css";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Box,
  Card,
  Flex,
  Heading,
  ScrollArea,
  Table,
  Text,
} from "@radix-ui/themes";
import { useContext, useState } from "react";
import FilterChart from "../FilterChart";
import { StatsContext } from "@/app/context/StatsContext";

export default function Languages({}: {}) {
  const statsContext = useContext(StatsContext);
  const languages = statsContext?.languages ?? {};
  const count = Object.values(languages);
  const [length, setLength] = useState(
    Object.keys(languages).length > 5 ? 5 : Object.keys(languages).length,
  );
  if (Object.keys(languages).length === 0) return null;
  return (
    <Card>
      <Heading className="ml-3">
        <Flex gap="4">
          <Text>Top {length} Languages</Text>
          <FilterChart
            maxLength={Object.keys(languages).length}
            length={length}
            setLength={setLength}
          />
        </Flex>
      </Heading>
      <Box className="h-[20rem] w-full rounded-2xl bg-gray-400 p-2">
        {Object.keys(languages).length > 0 && (
          <PieChart
            sx={{
              color: "green",
              WebkitTextStrokeColor: "white",
              fontWeight: "bold",
            }}
            series={[
              {
                data: Object.entries(languages) // Convert object to array of [key, value] pairs
                  .sort((a, b) => b[1] - a[1]) // Sort by count in descending order
                  .slice(0, length) // Slice the first 'length' elements
                  .map(([name, count], index) => ({
                    // Map to the desired structure
                    id: index.toString(),
                    value: Number(count),
                    label: name,
                  })),
              },
            ]}
          />
        )}
      </Box>
      {Object.keys(languages).length > 5 && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>See All Languages</AccordionTrigger>
            <AccordionContent>
              <Table.Root>
                <ScrollArea className="h-[15rem] w-full rounded-2xl border p-4">
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeaderCell>Language</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Count</Table.ColumnHeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {Object.entries(languages).map(([name, count]) => (
                      <Table.Row key={name} className="hover:bg-black/30">
                        <Table.Cell>{name}</Table.Cell>
                        <Table.Cell>{count}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </ScrollArea>
              </Table.Root>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </Card>
  );
}
