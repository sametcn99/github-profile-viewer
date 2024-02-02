import { useState } from "react";
import { FaChartLine } from "react-icons/fa6";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Button, Dialog } from "@radix-ui/themes";
import Loading from "@/app/loading";

type StarredItem = {
  starred_at: string;
};

type ChartData = {
  category: string;
  value: number;
};

type StarHistoryProps = {
  username: string;
  repo: string;
  option: string;
};

export default function StarHistory({
  username,
  repo,
  option,
}: StarHistoryProps) {
  const [data, setData] = useState<StarredItem[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `/api/star-history?username=${username}&repo=${repo}&option=${option}`,
        {
          next: { revalidate: 1000 },
        },
      );
      const fetchedData = await response.json();
      if (fetchedData) {
        setData(fetchedData);

        const chartData = fetchedData.reduce((acc: ChartData[], item: any) => {
          const year = item.starred_at.slice(0, 4);

          const existingYearIndex = acc.findIndex(
            (entry) => entry.category === year,
          );

          if (existingYearIndex !== -1) {
            acc[existingYearIndex].value += 1;
          } else {
            acc.push({ category: year, value: 1 });
          }

          return acc;
        }, []);
        setLoading(false);
        setChartData(chartData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger onClick={fetchData} className="cursor-pointer">
          <FaChartLine size={22} />
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title className="flex flex-row justify-between w-full">
            <Box className="flex flex-row items-start justify-between w-full">
              <div> Star History </div>
              <Dialog.Close>
                <Button className="cursor-pointer hover:underline">
                  Close
                </Button>
              </Dialog.Close>
            </Box>
          </Dialog.Title>
          {loading && <Loading />}
          {data.length > 0 && (
            <Box className="h-[20rem] w-full rounded-2xl bg-gray-400 p-2">
              <BarChart
                xAxis={[
                  {
                    data: chartData.map((d) => d.category),
                    scaleType: "band",
                  },
                ]}
                series={[
                  {
                    data: chartData.map((d) => d.value),
                  },
                ]}
              />
            </Box>
          )}
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
