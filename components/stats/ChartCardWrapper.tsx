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
import { ReactNode, useState } from "react";
import FilterChart from "./FilterChart";

export default function ChartCardWrapper({
  data,
  title,
}: {
  data: Object;
  title: string;
}) {
  const [length, setLength] = useState(
    Object.entries(data).length > 5 ? 5 : Object.entries(data).length,
  );
  if (Object.entries(data).length === 0) return null;
  return (
    <Card>
      <Heading className="ml-3">
        <Flex gap="4">
          <Text>
            {title} Top {length}
          </Text>
          <FilterChart
            maxLength={Object.entries(data).length}
            length={length}
            setLength={setLength}
          />
        </Flex>
      </Heading>
      <Box className="h-[20rem] w-full rounded-2xl bg-gray-400 p-2">
        {Object.keys(data).length > 0 && (
          <PieChart
            sx={{
              color: "green",
              WebkitTextStrokeColor: "white",
              fontWeight: "bold",
            }}
            series={[
              {
                data: Object.entries(data) // Convert object to array of [key, value] pairs
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
      {Object.entries(data).length > 5 && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>See All</AccordionTrigger>
            <AccordionContent>
              <Table.Root>
                <ScrollArea className="h-[15rem] w-full rounded-2xl border p-4">
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeaderCell> {title}</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Count</Table.ColumnHeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {Object.entries(data).map(([name, count]) => (
                      <Table.Row key={name} className="hover:bg-black/30">
                        <Table.Cell>{name}</Table.Cell>
                        <Table.Cell>{count as ReactNode}</Table.Cell>
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
