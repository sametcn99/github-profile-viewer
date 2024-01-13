import "@/app/globals.css";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Box, Card, Heading, ScrollArea, Table } from "@radix-ui/themes";
export default function Languages({
  language,
  count,
}: {
  language: string[];
  count: number[];
}) {
  return (
    <Card>
      <Heading className="ml-3">Top 5 Languages</Heading>
      <Box className="h-[20rem] w-full rounded-2xl bg-gray-400 p-2">
        {language.length > 0 && count.length > 0 && (
          <PieChart
            sx={{
              color: "green",
              WebkitTextStrokeColor: "white",
              fontWeight: "bold",
            }}
            series={[
              {
                data: language.slice(0, 5).map((lang, index) => ({
                  id: index.toString(),
                  value: Number(count[index]),
                  label: lang,
                })),
              },
            ]}
          />
        )}
      </Box>
      {language.length > 5 && (
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
                    {Object.entries(language)
                      .sort((a, b) => Number(b[1]) - Number(a[1]))
                      .map(([language, count]) => (
                        <Table.Row key={language}>
                          <Table.Cell>{count}</Table.Cell>
                          <Table.Cell>{language}</Table.Cell>
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
