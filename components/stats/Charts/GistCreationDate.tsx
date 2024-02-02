import { Box, Card, Heading, ScrollArea, Table } from "@radix-ui/themes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BarChart } from "@mui/x-charts/BarChart";
import { StatsContext } from "@/app/context/StatsContext";
import { useContext } from "react";

export default function GistCreationDate() {
  const statsContext = useContext(StatsContext);
  const gistCreationStats = statsContext?.gistCreationStats || {};
  const statsData = Object.entries(gistCreationStats).map(([year, count]) => ({
    category: year,
    value: count,
  }));

  if (Object.keys(gistCreationStats).length === 0) return null;
  return (
    <>
      <Card>
        <Heading className="ml-3">Gist Creation Dates</Heading>
        <Box className="h-[20rem] w-full rounded-2xl bg-gray-400 p-2">
          <BarChart
            xAxis={[
              {
                data: statsData.map((d) => d.category),
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: statsData.map((d) => d.value),
              },
            ]}
          />
        </Box>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>See All Creation Dates</AccordionTrigger>
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
                        <Table.Row
                          key={data.value}
                          className="hover:bg-black/30"
                        >
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
      </Card>
    </>
  );
}
