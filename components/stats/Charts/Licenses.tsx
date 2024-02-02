"use client";
import "@/app/globals.css";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
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
import FilterChart from "../FilterChart";
import { useContext, useState } from "react";
import { StatsContext } from "@/app/context/StatsContext";

export default function Licenses() {
  const statContext = useContext(StatsContext);
  const licenses = statContext?.licenses ?? {}; // Provide an empty object as default
  const count = Object.values(licenses);
  const [length, setLength] = useState(
    Object.keys(licenses).length > 5 ? 5 : Object.keys(licenses).length,
  );
  if (Object.keys(licenses).length === 0) return null;
  return (
    <Card>
      <Heading className="ml-3">
        <Flex gap="4">
          <Text>Top {length} Licenses</Text>
          <FilterChart
            maxLength={Object.keys(licenses).length}
            length={length}
            setLength={setLength}
          />
        </Flex>
      </Heading>
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
                .slice(0, length)
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
              data: Object.keys(licenses).slice(0, length),
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: Object.values(licenses).slice(0, length) as number[],
            },
          ]}
        />
      </Box>
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
                      <Table.Row key={topic} className="hover:bg-black/30">
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
    </Card>
  );
}
