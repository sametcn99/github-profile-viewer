"use client";
import { Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";

export default function Rate() {
  const [rate, setRate] = useState({
    limit: 0,
    used: 0,
    remaining: 0,
    reset: 0,
  });

  const handleRate = async () => {
    try {
      const response = await fetch(`/api/github?option=rate`);
      if (!response.ok) {
        throw new Error("Failed to fetch rate");
      }

      const data = await response.json();
      setRate(data.data.rate);
      console.log(`Fetched rate: ${data.data.rate}`);
    } catch (error) {
      console.error("Error fetching rate:", error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    handleRate();
  }, [rate]);

  return (
    <Dialog.Root>
      <Dialog.Trigger className="hover:cursor-pointer">
        <Button>API Rate</Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>API Rate</Dialog.Title>
        <Dialog.Description size="2" mb="4" className="flex flex-col">
          The current rate limit is based on anonymous access. However, if you
          surpass this limit, you can continue browsing uninterrupted through
          our GitHub API key.
          <Text size="1" color="gray" mt="2">
            The primary rate limit for anonymous requests is 60 requests per
            hour.
            <br />
            Application rate limit is 5,000 requests per hour.
          </Text>
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <JsonView
            data={rate}
            shouldExpandNode={allExpanded}
            style={darkStyles}
          />
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Close
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
