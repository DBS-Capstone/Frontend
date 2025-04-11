import React from "react";
import birdImage from "../assets/bird.png";

const HomeSection = () => {
  return (
    <div className="container mx-auto mt-10 px-4 md:flex md:items-center">
      <div className="md:w-1/2 flex justify-center">
        <div className="bg-green-200 p-4 rounded-lg">
          <img
            alt="A colorful bird with blue and orange feathers perched on a branch"
            className="rounded-lg shadow-lg"
            height="400"
            src={birdImage}
            width="400"
          />
        </div>
      </div>
      <div className="md:w-1/2 mt-6 md:mt-0 md:ml-10">
        <h1 className="text-5xl font-bold">Find Me</h1>
        <p className="mt-4 text-gray-700">
          Temukan berbagai jenis burung hanya dari suara kicauannya. Kicau
          Finder membantu mengidentifikasi burung secara cepat dan akurat. Cukup
          unggah atau rekam suara burung, dan biarkan teknologi kami
          mencocokkannya dengan database suara burung dari berbagai spesies.
          Cocok untuk pengamat burung, peneliti, atau siapa saja yang penasaran
          dengan suara kicauan di sekitar mereka. Rasakan pengalaman mengenali
          burung dengan cara yang seru dan interaktif, langsung dari genggaman
          tanganmu.
        </p>
      </div>
    </div>
  );
};

export default HomeSection;
