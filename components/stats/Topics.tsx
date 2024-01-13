import React from "react";
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
import { BarChart } from "@mui/x-charts/BarChart";

export default function Topics({
  topTopics,
}: {
  topTopics: Record<string, number>;
}) {
  return (
    <>
      {Object.keys(topTopics).length > 0 && (
        <Card>
          <Heading className="ml-3">Top 5 Topics</Heading>
          <Box className="h-[20rem] w-full rounded-2xl bg-gray-400 p-2">
            <BarChart
              xAxis={[
                {
                  id: "barCategories",
                  data: Object.keys(topTopics).slice(0, 5),
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: Object.values(topTopics).slice(0, 5),
                },
              ]}
            />
          </Box>
        </Card>
      )}
      {Object.keys(topTopics).length > 5 && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>See All Topics</AccordionTrigger>
            <AccordionContent>
              <Table.Root>
                <ScrollArea className="h-[15rem] w-full rounded-2xl border p-4">
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeaderCell>Topic</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Count</Table.ColumnHeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {Object.entries(topTopics)
                      .sort((a, b) => b[1] - a[1])
                      .map(([topic, count]) => (
                        <Table.Row key={topic}>
                          <Table.Cell>{topic}</Table.Cell>
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
    </>
  );
}
