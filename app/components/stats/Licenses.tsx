import "@/app/globals.css";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Box, Card, Heading, ScrollArea, Table } from "@radix-ui/themes";
export default function Licenses({ licenses, count }: any) {
  return (
    <Card>
      <Heading className="ml-3">Top 5 Licenses</Heading>
      <Box className="block h-[20rem] w-full rounded-2xl bg-gray-400 md:hidden">
        <PieChart
          sx={{
            color: "green",
            WebkitTextStrokeColor: "white",
            fontWeight: "bold",
          }}
          series={[
            {
              data: Object.keys(licenses)
                .slice(0, 5)
                .map((lang, index) => ({
                  id: index.toString(),
                  value: count[index],
                  label: lang,
                })) as {
                id: string;
                value: number;
                label: string;
              }[],
            },
          ]}
        />
      </Box>
      <Box className="hidden h-[20rem] w-full rounded-2xl bg-gray-400 md:block">
        <BarChart
          xAxis={[
            {
              id: "barCategories",
              data: Object.keys(licenses).slice(0, 5),
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: Object.values(licenses).slice(0, 5) as number[],
            },
          ]}
        />
      </Box>
      {Object.values(licenses).length > 5 && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>See All Licenses</AccordionTrigger>
            <AccordionContent>
              <Table.Root>
                <ScrollArea className="h-[15rem] w-full rounded-2xl border p-4">
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeaderCell>License</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Count</Table.ColumnHeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {Object.entries(licenses)
                      .sort((a, b) => (b[1] as number) - (a[1] as number))
                      .map(([topic, count]) => (
                        <Table.Row key={topic}>
                          <Table.Cell>{topic}</Table.Cell>
                          <Table.Cell>{String(count)}</Table.Cell>
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
