import { Container } from "tabler-icons-react";
import { Bubble } from "./Bubble";
import { Flex, Group, createStyles } from "@mantine/core";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  messages: Message[];
}

const useStyles = createStyles((theme) => ({
  container: {
    width: "100%",
    flexGrow: 1,
    overflow: "scroll",
  },
}));

export default function Content({ messages }: Props) {
  const { classes } = useStyles();

  const items = messages.map((message, idx) => {
    return (
      <Bubble key={idx} role={message.role}>
        {message.content}
      </Bubble>
    );
  });

  return (
    <Flex direction="column" gap={20} mb={10} className={classes.container}>
      {/* <Flex direction="column" gap={20}> */}
      {items}
      {/* </Flex> */}
    </Flex>
  );
}
