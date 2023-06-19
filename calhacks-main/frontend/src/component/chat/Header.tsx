import { Container } from "@mantine/core";

interface Conversation {
  id: string;
  title: string;
  timestamp: string;
}

interface Props {
  previousConversations: Conversation[];
}

export default function Header(props: Props) {
  return <Container></Container>;
}
