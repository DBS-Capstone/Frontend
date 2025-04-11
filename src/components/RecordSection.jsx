import React, { useState } from "react";
import { ReactMic } from "react-mic";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

const RecordSection = () => {
  const [record, setRecord] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const navigate = useNavigate(); // Untuk navigasi

  const startRecording = () => {
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onData = (recordedBlob) => {
    console.log("chunk of real-time data is: ", recordedBlob);
  };

  const onStop = (recordedBlob) => {
    console.log("recordedBlob is: ", recordedBlob);
    setAudioFile(recordedBlob.blob);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "audio/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setAudioFile(file);
        console.log("Dropped file: ", file);
        setUrlError("");
      }
    },
  });

  const handleUrlSubmit = async () => {
    if (!audioUrl) {
      setUrlError("Please enter a valid audio URL!");
      return;
    }

    const urlPattern = /^(https?:\/\/).*\.(mp3|wav|ogg)$/i;
    if (!urlPattern.test(audioUrl)) {
      setUrlError("URL must be a valid audio file (mp3, wav, or ogg)!");
      return;
    }

    try {
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const response = await fetch(proxyUrl + audioUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch audio");
      }
      const blob = await response.blob();
      if (!blob.type.startsWith("audio/")) {
        throw new Error("File is not a valid audio format");
      }
      const file = new File([blob], "audio-from-url.mp3", { type: blob.type });
      setAudioFile(file);
      console.log("Fetched audio from URL: ", file);
      setUrlError("");
    } catch (error) {
      console.error("Error fetching audio from URL:", error);
      setUrlError(
        "Failed to fetch audio. Make sure the URL is accessible and in a supported format."
      );
    }
  };

  const handleSubmit = async () => {
    if (!audioFile) {
      alert("Please record, upload, or insert a URL for an audio file first!");
      return;
    }

    setIsLoading(true);
    const dummyResponse = [
      { birdName: "Bird A", confidence: 95 },
      { birdName: "Bird B", confidence: 80 },
      { birdName: "Bird C", confidence: 65 },
    ];

    setTimeout(() => {
      setResult(dummyResponse);
      setIsLoading(false);
      // Pindah ke halaman Results dengan data
      navigate("/results", { state: { results: dummyResponse } });
    }, 2000);
  };

  return (
    <div className="container mx-auto mt-16 px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-2 animate-fade-in">
        Identify bird calls in seconds
      </h1>
      <div className="mt-8 flex justify-center animate-fade-in">
        <ReactMic
          record={record}
          className="sound-wave w-80 h-20 rounded-lg shadow-lg"
          onStop={onStop}
          onData={onData}
          strokeColor="#000000"
          backgroundColor="#86efac"
        />
      </div>
      <div className="mt-6 flex justify-center space-x-6 animate-fade-in">
        <button
          onClick={startRecording}
          disabled={record || isLoading}
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 hover:shadow-xl hover:scale-105 disabled:bg-gray-400 disabled:shadow-none disabled:scale-100 transition-all duration-300"
        >
          Start Recording
        </button>
        <button
          onClick={stopRecording}
          disabled={!record || isLoading}
          className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-red-600 hover:shadow-xl hover:scale-105 disabled:bg-gray-400 disabled:shadow-none disabled:scale-100 transition-all duration-300"
        >
          Stop Recording
        </button>
      </div>
      <div className="mt-6 animate-fade-in">
        <div
          {...getRootProps()}
          className={`w-1/2 mx-auto p-8 border-2 border-dashed rounded-xl text-center transition-all duration-300 ${
            isDragActive
              ? "border-green-500 bg-green-100 shadow-lg scale-105"
              : "border-gray-300 bg-gray-50 hover:border-green-400 hover:bg-green-50 hover:shadow-xl hover:scale-102"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-green-500 text-lg font-semibold animate-pulse">
              Drop the audio file here...
            </p>
          ) : (
            <p className="text-gray-600 text-lg font-semibold">
              Drag & drop audio here, or click to select a file
            </p>
          )}
        </div>
        <div className="mt-4 w-1/2 mx-auto flex flex-col items-center space-y-2">
          <div className="w-full flex items-center space-x-4">
            <input
              type="text"
              value={audioUrl}
              onChange={(e) => {
                setAudioUrl(e.target.value);
                setUrlError("");
              }}
              placeholder="Insert audio URL here..."
              className="flex-1 p-3 border border-gray-300 rounded-lg bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            <button
              onClick={handleUrlSubmit}
              className="bg-green-500 text-white px-4 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Load URL
            </button>
          </div>
          {urlError && (
            <p className="text-red-500 text-sm animate-fade-in">{urlError}</p>
          )}
        </div>
      </div>
      <div className="mt-6 animate-fade-in">
        <button
          onClick={handleSubmit}
          disabled={isLoading || !audioFile}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 hover:shadow-xl hover:scale-105 disabled:bg-gray-400 disabled:shadow-none disabled:scale-100 transition-all duration-300"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Identifying...
            </span>
          ) : (
            "Identify Bird"
          )}
        </button>
      </div>
      {result && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg shadow-md animate-fade-in">
          <h3 className="text-xl text-gray-800 font-semibold mb-2">
            Identification Results:
          </h3>
          {result.map((bird, index) => (
            <p key={index} className="text-gray-700">
              {bird.birdName} (Confidence: {bird.confidence}%)
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecordSection;
