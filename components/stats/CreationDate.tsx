import { Box, Card, Heading, ScrollArea, Table } from "@radix-ui/themes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BarChart } from "@mui/x-charts/BarChart";

interface StatsData {
  category: string;
  value: number;
}

interface Props {
  statsData: StatsData[];
}

export default function CreationDate({ statsData }: Props) {
  return (
    <>
      <Card>
        <Heading className="ml-3">Repository Creation Dates</Heading>
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
        {statsData.length > 5 && (
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
        )}
      </Card>
    </>
  );
}
