import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@radix-ui/themes";
import Link from "next/link";

export default function FaqAccordion() {
  return (
    <Card>
      <Accordion type="single" collapsible className="w-full ">
        <AccordionItem value="item-1">
          <AccordionTrigger>How can I create an Access Token?</AccordionTrigger>
          <AccordionContent>
            To generate an Auth Access Token, you can follow these steps:
            <ol className="list-decimal pl-5">
              <li>
                Visit the{" "}
                <Link
                  href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens"
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  GitHub documentation
                </Link>{" "}
                on managing Personal Access Tokens.
              </li>
              <li>
                Follow the instructions provided in the documentation to create
                a new Personal Access Token for your account.
              </li>
              <li>
                Once you have generated the token, copy and paste it into the
                input field below.
              </li>
            </ol>
            By following these steps, you&apos;ll successfully create and
            integrate an Auth Access Token for your application.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Why do I need an Access Token?</AccordionTrigger>
          <AccordionContent>
            An Access Token is crucial for secure and authenticated interactions
            with the GitHub API. Here&apos;s why you need one:
            <ol className="list-decimal pl-5">
              <li>
                <strong>Authentication:</strong> GitHub requires authentication
                to access certain features and resources. An Access Token serves
                as a secure way to verify your identity.
              </li>
              <li>
                <strong>Rate Limiting:</strong> When making requests to the
                GitHub API, there are rate limits in place. An Access Token
                increases these limits, allowing for more requests within a
                given time frame.
              </li>
            </ol>
            By obtaining and using an Access Token, you not only comply with
            GitHub&apos;s authentication requirements but also enhance the
            performance and security of your application.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
