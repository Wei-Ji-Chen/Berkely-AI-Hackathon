import { Microphone } from "tabler-icons-react";
import { MicrophoneButton } from "./chat/MicrophoneButton";
import { useEffect, useState } from "react";
import { Container, Flex, createStyles } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import Content from "./chat/Content";
import Header from "./chat/Header";
import { API_URL } from "../context/constants";

const useStyles = createStyles((theme) => ({
  flexContainer: {
    // position: "absolute",
    // bottom: 0,
  },
  container: {
    // position: "absolute",
    // bottom: 0,
    maxWidth: "75ch",
  },
}));

const messages: { role: "user" | "assistant"; content: string }[] = [
  {
    role: "user",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    role: "assistant",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    role: "user",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export function ChatNew() {
  const { classes } = useStyles();
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { height } = useViewportSize();

  useEffect(() => {
    (async () => {
      const res = await createConversation();
      const snd = new Audio("data:audio/wav;base64," + res.audio);
      snd.play();
      setMessages(res.messages);
      setConversationId(res.conversation_id);
    })();
  }, []);

  const onRecordingFinished = async (chunks: any) => {
    const blob = new Blob(chunks);
    const res = await getResponse(conversationId, blob);
    if (!res.detail) {
      setMessages(res.messages);
      const snd = new Audio("data:audio/wav;base64," + res.audio);
      snd.play();
    }
  };

  async function getResponse(conv_id: string, query: Blob) {
    const data = await blobToBase64(query);

    setIsLoading(true);
    const res = await fetch(`${API_URL}/response`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversation_id: conv_id,
        audio: data,
        text: "",
      }),
      credentials: "include",
    });
    setIsLoading(false);

    const resData = await res.json();
    return resData;
  }

  return (
    <Container className={classes.container}>
      <Flex
        direction="column"
        justify="space-between"
        h={height - 90}
        py={10}
        mt={10}
        className={classes.flexContainer}
      >
        {/* <Header previousConversations={[]} /> */}
        <Content messages={messages} />

        {conversationId && (
          <MicrophoneButton
            isLoading={isLoading}
            onRecordingFinished={onRecordingFinished}
          />
        )}
      </Flex>
    </Container>
  );
}

async function createConversation() {
  const res = await fetch(`${API_URL}/conversation`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();
  return data;
}

function blobToBase64(blob: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // @ts-ignore
      // @ts-ignore
      const base64String = reader.result!.split(",")[1]; // Extract the Base64 string without the data URL scheme
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
