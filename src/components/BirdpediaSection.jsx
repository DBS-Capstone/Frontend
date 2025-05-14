import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet"; // Untuk SEO
import { FaMapMarkerAlt, FaVolumeUp, FaFilter } from "react-icons/fa"; // Ikon
import birdMerpatiImage from "../assets/bird-a.png"; // Gambar untuk Merpati
import birdElangImage from "../assets/bird.png"; // Gambar untuk Elang
import birdKakakTuaImage from "../assets/bird-c.png"; // Gambar untuk Kakak Tua
import birdKelalawarImage from "../assets/bird-d.png";

const BirdpediaSection = () => {
  const { birdName } = useParams();
  const navigate = useNavigate();

  const birds = [
    {
      name: "Kelalawar",
      description:
        "Burung yang memliki suara dan kemampuan ultrasonic yang khas hanya di miliki oleh kelalawar",
      image: birdKelalawarImage,
      habitat: "Hutan dan Gua",
      sound: "Twi-twi-twi",
    },

    {
      name: "Merpati",
      description:
        "Burung yang indah, sering ditemukan di daerah tropis dan perkotaan.",
      image: birdMerpatiImage,
      habitat: "Perkotaan dan hutan tropis",
      sound: "Kukuruyuk lembut",
    },
    {
      name: "Elang",
      description:
        "Burung pemangsa yang sangat mahir, dikenal sebagai puncak rantai makanan.",
      image: birdElangImage,
      habitat: "Pegunungan dan hutan",
      sound: "Jeritan tajam",
    },
    {
      name: "Kakak Tua",
      description:
        "Burung yang sering bisa menirukan bahasa manusia, dan paling sering dipelihara manusia.",
      image: birdKakakTuaImage,
      habitat: "Hutan hujan tropis",
      sound: "Suara meniru manusia",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [habitatFilter, setHabitatFilter] = useState(""); // Filter berdasarkan habitat
  const [isLoading, setIsLoading] = useState(false); // Untuk simulasi loading

  // Filter burung berdasarkan search term dan habitat
  const filteredBirds = birds.filter(
    (bird) =>
      bird.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (habitatFilter === "" || bird.habitat.includes(habitatFilter))
  );

  // Daftar habitat unik untuk dropdown filter
  const habitats = [...new Set(birds.map((bird) => bird.habitat))];

  if (birdName) {
    const selectedBird = birds.find(
      (bird) => bird.name.toLowerCase().replace(" ", "-") === birdName
    );

    if (!selectedBird) {
      return (
        <div className="container mx-auto mt-16 px-4 text-center">
          <Helmet>
            <title>Burung Tidak Ditemukan - BirdHaven</title>
          </Helmet>
          <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-fade-in">
            Burung Tidak Ditemukan
          </h1>
          <button
            onClick={() => navigate("/birdpedia")}
            className="bg-black-500 text-black px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Kembali ke Birdpedia
          </button>
        </div>
      );
    }

    return (
      <div className="container mx-auto mt-16 px-4 text-center">
        <Helmet>
          <title>{selectedBird.name} - BirdHaven</title>
        </Helmet>
        <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-fade-in">
          {selectedBird.name}
        </h1>
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200 animate-fade-in">
          <img
            src={selectedBird.image}
            alt={`Gambar ${selectedBird.name}`}
            className="w-full h-64 object-cover rounded-lg mb-4"
            onError={(e) => (e.target.src = birdElangImage)} // Fallback ke bird.png
          />
          <p className="text-gray-700 mb-4 text-lg">
            {selectedBird.description}
          </p>
          <p className="text-gray-600 mb-2 flex items-center justify-center">
            <FaMapMarkerAlt className="mr-2 text-green-500" />
            <strong>Habitat:</strong> {selectedBird.habitat}
          </p>
          <p className="text-gray-600 flex items-center justify-center">
            <FaVolumeUp className="mr-2 text-green-500" />
            <strong>Suara:</strong> {selectedBird.sound}
          </p>
          <button
            onClick={() => navigate("/birdpedia")}
            className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Kembali ke Birdpedia
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-16 px-4">
      <Helmet>
        <title>Birdpedia - BirdHaven</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center animate-fade-in">
        Birdpedia
      </h1>
      <div className="mb-8 flex flex-col sm:flex-row justify-center gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari burung..."
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg bg-green-50 text-black focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />

        <div className="relative w-full max-w-xs">
          <select
            value={habitatFilter}
            onChange={(e) => setHabitatFilter(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition appearance-none"
          >
            <option value="" className="text-black">
              Semua Habitat
            </option>
            {habitats.map((habitat, index) => (
              <option key={index} value={habitat} className="text-black">
                {habitat}
              </option>
            ))}
          </select>
          <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      {isLoading ? (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
          <p className="text-gray-600 mt-2">Memuat burung...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBirds.length > 0 ? (
            filteredBirds.map((bird, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 animate-fade-in cursor-pointer hover:shadow-xl transition-shadow duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() =>
                  navigate(
                    `/birdpedia/${bird.name.toLowerCase().replace(" ", "-")}`
                  )
                }
              >
                <img
                  src={bird.image}
                  alt={`Gambar ${bird.name}`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  onError={(e) => (e.target.src = birdElangImage)} // Fallback ke bird.png
                />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {bird.name}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {bird.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              Tidak ada burung yang ditemukan.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BirdpediaSection;
