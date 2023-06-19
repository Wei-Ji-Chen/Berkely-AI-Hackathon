import { useState, useRef } from "react";

const mimeType: string = "audio/webm";

const DashBoard = (): JSX.Element => {
  const [permission, setPermission] = useState<boolean>(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<string>("inactive");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audio, setAudio] = useState<string | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const getMicrophonePermission = async (): Promise<void> => {
    if ("MediaRecorder" in window) {
      try {
        const mediaStream: MediaStream =
          await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
          });
        setPermission(true);
        setStream(mediaStream);
      } catch (err) {
        alert(err);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async (): Promise<void> => {
    setRecordingStatus("recording");
    const media: MediaRecorder = new MediaRecorder(stream!);

    mediaRecorder.current = media;

    mediaRecorder.current.start();

    let localAudioChunks: Blob[] = [];

    mediaRecorder.current.ondataavailable = (event: BlobEvent): void => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);
  };

  const stopRecording = (): void => {
    setRecordingStatus("inactive");
    mediaRecorder.current!.stop();

    mediaRecorder.current!.onstop = (): void => {
      const audioBlob: Blob = new Blob(audioChunks, { type: mimeType });
      const audioUrl: string = URL.createObjectURL(audioBlob);

      setAudio(audioUrl);

      setAudioChunks([]);
    };
  };

  return (
    <div>
      {/* <h2>Audio Recorder</h2>
      <main>
        <div className="audio-controls">
          {!permission ? (
            <button onClick={getMicrophonePermission} type="button">
              Get Microphone
            </button>
          ) : null}
          {permission && recordingStatus === "inactive" ? (
            <button onClick={startRecording} type="button">
              Start Recording
            </button>
          ) : null}
          {recordingStatus === "recording" ? (
            <button onClick={stopRecording} type="button">
              Stop Recording
            </button>
          ) : null}
        </div>
        {audio ? (
          <div className="audio-player">
            <audio src={audio} controls></audio>
            <a download href={audio}>
              Download Recording
            </a>
          </div>
        ) : null}
      </main> */}
    </div>
  );
};

export default DashBoard;
