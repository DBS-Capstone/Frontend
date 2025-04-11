import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Data statis sebagai fallback
const defaultBirds = [
  {
    name: "Bird A",
    description:
      "Merpati adalah Burung yang indah , dan sering di temukan di daerah tropis.",
    image: "bird-a.png",
    habitat: "Tropical forests",
    sound: "Melodic chirping",
  },
  {
    name: "Bird B",
    description:
      "Burung Elang Burung Pemangsa yang sangat mahir , Diketahui adalah puncak Rantai makanan.",
    image: "bird.png",
    habitat: "Grasslands",
    sound: "High-pitched whistle",
  },
  {
    name: "Bird C",
    description:
      "Burung Kakak Tua Adalah Burung yang sering bisa mengikuti bahasa manusia, dan paling sering di pelihara manusia.",
    image: "bird-c.png",
    habitat: "Mountains",
    sound: "Sharp screech",
  },
];

const BirdpediaSection = () => {
  const { birdName } = useParams();
  const navigate = useNavigate();
  const [birds, setBirds] = useState(defaultBirds);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBirds = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/birds");
        if (!response.ok) {
          throw new Error("Failed to fetch birds");
        }
        const data = await response.json();
        // Jika data dari backend kosong, gunakan defaultBirds
        setBirds(data.length > 0 ? data : defaultBirds);
      } catch (error) {
        console.error("Error fetching birds:", error);
        // Gunakan defaultBirds jika gagal fetch
        setBirds(defaultBirds);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBirds();
  }, []);

  const filteredBirds = birds.filter((bird) =>
    bird.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (birdName) {
    const selectedBird = birds.find(
      (bird) => bird.name.toLowerCase().replace(" ", "-") === birdName
    );

    if (!selectedBird) {
      return (
        <div className="container mx-auto mt-16 px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-fade-in">
            Bird Not Found
          </h1>
          <button
            onClick={() => navigate("/birdpedia")}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Back to Birdpedia
          </button>
        </div>
      );
    }

    return (
      <div className="container mx-auto mt-16 px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-fade-in">
          {selectedBird.name}
        </h1>
        <div className="max-w-2xl mx-auto bg-green-50 p-6 rounded-lg shadow-md animate-fade-in">
          <img
            src={`http://localhost:3000/assets/${selectedBird.image}`}
            alt={`Image of ${selectedBird.name}`}
            className="w-full h-64 object-cover rounded-lg mb-4"
            onError={(e) => {
              // Fallback jika gambar dari backend gagal dimuat
              e.target.src = require(`../assets/${selectedBird.image}`);
            }}
          />
          <p className="text-gray-700 mb-4">{selectedBird.description}</p>
          <p className="text-gray-600">
            <strong>Habitat:</strong> {selectedBird.habitat}
          </p>
          <p className="text-gray-600">
            <strong>Sound:</strong> {selectedBird.sound}
          </p>
          <button
            onClick={() => navigate("/birdpedia")}
            className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Back to Birdpedia
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-16 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center animate-fade-in">
        Birdpedia
      </h1>
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search birds..."
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
      </div>
      {isLoading ? (
        <p className="text-center text-gray-600">Loading birds...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBirds.length > 0 ? (
            filteredBirds.map((bird, index) => (
              <div
                key={index}
                className="bg-green-50 p-6 rounded-lg shadow-md card-hover animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() =>
                  navigate(
                    `/birdpedia/${bird.name.toLowerCase().replace(" ", "-")}`
                  )
                }
              >
                <img
                  src={`http://localhost:3000/assets/${bird.image}`}
                  alt={`Image of ${bird.name}`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    // Fallback jika gambar dari backend gagal dimuat
                    e.target.src = require(`../assets/${bird.image}`);
                  }}
                />
                <h2 className="text-2xl font-semibold text-gray-800">
                  {bird.name}
                </h2>
                <p className="text-gray-600 mt-2">{bird.description}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No birds found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BirdpediaSection;
