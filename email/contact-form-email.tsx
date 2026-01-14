import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type ContactFormEmailProps = {
  message: string;
  senderEmail: string;
  senderName: string;
};

export default function ContactFormEmail({
  message,
  senderEmail,
  senderName,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New message from {senderName}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container>
            <Section className="bg-white borderBlack my-10 px-10 py-4 rounded-md">
              <Heading className="leading-tight">
                Message from {senderName}
              </Heading>
              <Text>{message}</Text>
              <Hr />
              <Text>From: {senderName}</Text>
              <Text>Email: {senderEmail}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
