import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import birdImage from "../assets/bird.png";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ResultsSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dummyResults = location.state?.results || [
    { birdName: "Bird A", confidence: 95 },
    { birdName: "Bird B", confidence: 80 },
    { birdName: "Bird C", confidence: 65 },
  ];

  const chartData = {
    labels: dummyResults.map((bird) => bird.birdName),
    datasets: [
      {
        label: "Confidence (%)",
        data: dummyResults.map((bird) => bird.confidence),
        backgroundColor: ["#86efac", "#4ade80", "#22c55e"],
        borderColor: ["#16a34a", "#15803d", "#166534"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Confidence Levels",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Confidence (%)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Birds",
        },
      },
    },
  };

  const handleShare = () => {
    const shareText = dummyResults
      .map(
        (bird, index) => `${index + 1}. ${bird.birdName} (${bird.confidence}%)`
      )
      .join("\n");
    const fullText = `Check out my bird identification results from Kicau Finder:\n${shareText}\n\nTry it yourself at [your-app-url]!`;

    navigator.clipboard
      .writeText(fullText)
      .then(() => {
        alert("Results copied to clipboard! You can paste it anywhere.");
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
        alert("Failed to copy results. Please try again.");
      });

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fullText)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="container mx-auto mt-16 px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-fade-in">
        Identification Results
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {dummyResults.map((bird, index) => (
          <div
            key={index}
            className="bg-green-50 p-6 rounded-lg shadow-md card-hover animate-fade-in"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <img
              src={birdImage}
              alt={`Image of ${bird.birdName} in flight`}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800">
              {bird.birdName}
            </h2>
            <p className="text-gray-600 mt-2 font-semibold text-lg">
              Confidence:{" "}
              <span className="text-green-600">{bird.confidence}%</span>
            </p>
            <button
              onClick={() =>
                navigate(
                  `/birdpedia/${bird.birdName.toLowerCase().replace(" ", "-")}`
                )
              }
              className="mt-4 inline-block text-green-500 font-semibold hover:underline"
            >
              Learn More
            </button>
          </div>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto mb-12 animate-fade-in min-h-[300px]">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div className="flex justify-center space-x-4 animate-fade-in">
        <button
          onClick={handleShare}
          aria-label="Share identification results"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center"
        >
          <i className="fas fa-share-alt mr-2"></i> Share Results
        </button>
        <button
          onClick={() => navigate("/")}
          aria-label="Back to recorder"
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Back to Recorder
        </button>
      </div>
    </div>
  );
};

export default ResultsSection;
