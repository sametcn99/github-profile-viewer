import { LineChart } from "@mui/x-charts/LineChart";
import { Box, Card, Heading, ScrollArea, Table } from "@radix-ui/themes";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
export default function CreationDate({ statsData }: { statsData: any[] }) {
  return (
    <>
      <Card>
        <Heading className="ml-3">Creation Dates</Heading>
        <Box className="h-[20rem] w-full rounded-2xl bg-gray-400 p-2">
          <LineChart
            xAxis={[
              {
                data: statsData.map((d: any) => d.category.toString()),
                valueFormatter: (date) => date.toString(),
              },
            ]}
            series={[
              {
                data: statsData.map((d: any) => d.value),
                area: true,
              },
            ]}
            height={300}
          />
        </Box>
      </Card>
      {statsData.length > 5 && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>See All Languages</AccordionTrigger>
            <AccordionContent>
              <Table.Root>
                <ScrollArea className="h-[15rem] w-full rounded-2xl border p-4">
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeaderCell>Year</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Count</Table.ColumnHeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {statsData
                      .sort((a, b) => Number(b.value) - Number(a.value))
                      .map((data) => (
                        <Table.Row key={data.value}>
                          <Table.Cell>{data.category}</Table.Cell>
                          <Table.Cell>{data.value}</Table.Cell>
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
