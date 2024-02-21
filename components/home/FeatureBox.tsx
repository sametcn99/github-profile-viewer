import { Card, Heading, Text } from "@radix-ui/themes";

export default function FeatureBox({
  header,
  span,
}: {
  header: string;
  span: string;
}) {
  return (
    <Card className="p-4">
      <Heading>{header}</Heading>
      <Text>{span}</Text>
    </Card>
  );
}
