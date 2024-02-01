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
import { useState } from "react";
import FilterChart from "./FilterChart";

export default function Languages({
  language,
  count,
}: {
  language: string[];
  count: number[];
}) {
  // Combine the language and count arrays into one array of objects
  const languageData = language.map((lang, index) => ({
    name: lang,
    count: count[index],
  }));

  // Sort the combined array based on the count in descending order
  const sortedLanguageData = languageData.sort((a, b) => b.count - a.count);
  const [length, setLength] = useState(
    Object.keys(language).length > 5 ? 5 : Object.keys(language).length,
  );

  return (
    <Card>
      <Heading className="ml-3">
        <Flex gap="4">
          <Text>Top {length} Languages</Text>
          <FilterChart
            maxLength={Object.keys(language).length}
            length={length}
            setLength={setLength}
          />
        </Flex>
      </Heading>
      <Box className="h-[20rem] w-full rounded-2xl bg-gray-400 p-2">
        {sortedLanguageData.length > 0 && (
          <PieChart
            sx={{
              color: "green",
              WebkitTextStrokeColor: "white",
              fontWeight: "bold",
            }}
            series={[
              {
                data: sortedLanguageData
                  .slice(0, length)
                  .map((data, index) => ({
                    id: index.toString(),
                    value: Number(data.count),
                    label: data.name,
                  })),
              },
            ]}
          />
        )}
      </Box>
      {sortedLanguageData.length > 5 && (
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
                    {sortedLanguageData.map((data) => (
                      <Table.Row key={data.name} className="hover:bg-black/30">
                        <Table.Cell>{data.name}</Table.Cell>
                        <Table.Cell>{data.count}</Table.Cell>
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
