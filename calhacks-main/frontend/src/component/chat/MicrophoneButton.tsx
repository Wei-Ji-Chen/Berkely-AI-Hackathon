import { Button } from "@mantine/core";
import { useState } from "react";
import { FaMicrophone, FaRegStopCircle } from "react-icons/fa";
import {} from "react-icons/io";

interface Props {
  isLoading: boolean;
  onRecordingFinished: (chunks: any) => void;
}

export function MicrophoneButton({ isLoading, onRecordingFinished }: Props) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordedChunks([]);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/webm; codecs=opus",
        });

        setMediaRecorder(mediaRecorder);
        mediaRecorder.ondataavailable = (event) => {
          // @ts-ignore
          let finalChunks = [];
          if (event.data.size > 0) {
            // @ts-ignore
            setRecordedChunks((prevChunks) => {
              finalChunks = [...prevChunks, event.data];
              return finalChunks;
            });
          }

          if (mediaRecorder.state === "inactive") {
            // @ts-ignore
            setTimeout(() => onRecordingFinished(finalChunks), 500);
          }
        };

        mediaRecorder.start();
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  };

  const handleStopRecording = () => {
    mediaRecorder!.stop();
    // onRecordingFinished();
    setIsRecording(false);
  };

  return (
    // eslint-disable-next-line react/jsx-no-undef
    <>
      <Button
        variant="default"
        radius="xl"
        onClick={() => {
          if (isRecording) {
            handleStopRecording();
          } else {
            handleStartRecording();
          }
        }}
        loading={isLoading}
        mih={40}
      >
        {isLoading ? null : !isRecording ? (
          <FaMicrophone />
        ) : (
          <FaRegStopCircle />
        )}
      </Button>
    </>
  );
}
