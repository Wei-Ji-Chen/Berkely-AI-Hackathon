import React, { useState, useRef } from "react";
import {
  ActionIcon,
  Textarea,
  Paper,
  Avatar,
  Badge,
  Group,
} from "@mantine/core";
import { FiMic, FiStopCircle, FiSend } from "react-icons/fi";
import "../style.css";

interface Message {
  sender: string;
  text: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      const newMessage: Message = {
        sender: "user",
        text: inputText,
      };

      setMessages([...messages, newMessage]);
      setInputText("");
    }
  };

  const handleRecordToggle = () => {
    setIsRecording((prevState) => !prevState);
  };

  const handleRecordData = (recordedBlob: { blob: Blob }) => {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      const binaryData = event.target?.result as string;
      // Handle the binary data here or save it to a file
      console.log(binaryData);
    };
    fileReader.readAsBinaryString(recordedBlob.blob);
  };

  const handleScroll = () => {
    const chatWindow = chatWindowRef.current;
    if (
      chatWindow &&
      chatWindow.scrollTop + chatWindow.clientHeight === chatWindow.scrollHeight
    ) {
      // Reached the bottom of the chat window, enable tab switching
      document.removeEventListener("keydown", handleTabSwitch);
    } else {
      // Scrolled up, disable tab switching
      document.addEventListener("keydown", handleTabSwitch);
    }
  };

  const handleTabSwitch = (event: KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
    }
  };

  return (
    <div className="chat-container">
      <div className="sidebar">
        <h2>Conversation History</h2>
        {messages.map((message, index) => (
          <Paper
            key={index}
            shadow="xs"
            radius="md"
            style={{ marginBottom: "10px" }}
          >
            <Group position="apart">
              <Avatar
                size="md"
                radius="lg"
                color={message.sender === "user" ? "teal" : "blue"}
              >
                {message.sender === "user" ? "U" : "B"}
              </Avatar>
              <div style={{ textAlign: "center", flex: 1 }}>{message.text}</div>
              {message.sender !== "user" && (
                <Badge variant="filled" color="red">
                  Bot
                </Badge>
              )}
            </Group>
          </Paper>
        ))}
      </div>
      <div className="chat-content">
        <div
          className="chat-window"
          ref={chatWindowRef}
          onScroll={handleScroll}
        ></div>
        <div className="input-container search-big-bar">
          <Textarea
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyPress}
            placeholder="Type your message..."
            className="search-bar"
          />
          <ActionIcon
            onClick={handleSendMessage}
            variant="gradient"
            radius="xl"
            title="Send"
          >
            <FiSend />
          </ActionIcon>
          <ActionIcon
            onClick={handleRecordToggle}
            variant="gradient"
            radius="xl"
            title={isRecording ? "Stop Recording" : "Start Recording"}
          >
            {isRecording ? <FiStopCircle /> : <FiMic />}
          </ActionIcon>
        </div>
      </div>
    </div>
  );
};

export default Chat;
