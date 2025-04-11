import React from "react";

const AboutSection = () => {
  return (
    <div className="container mx-auto mt-16 px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-fade-in">
        About Kicau Finder
      </h1>
      <div className="max-w-3xl mx-auto">
        <p className="text-gray-700 mb-6 animate-fade-in">
          Kami adalah tim pecinta burung yang ingin memudahkan identifikasi
          kicauan burung menggunakan teknologi AI. Dengan Kicau Finder, kamu
          bisa merekam suara burung, mengunggah file audio, atau memasukkan URL
          untuk mengidentifikasi burung dalam hitungan detik.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 animate-fade-in">
          Visi & Misi
        </h2>
        <p className="text-gray-700 mb-6 animate-fade-in">
          Visi kami adalah menjadi platform terdepan untuk edukasi dan
          identifikasi burung di seluruh dunia. Misi kami adalah membantu
          masyarakat mengenal lebih dekat dunia burung melalui teknologi yang
          mudah digunakan dan informatif.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 animate-fade-in">
          Tim Kami
        </h2>
        <p className="text-gray-700 mb-6 animate-fade-in">
          Kami terdiri dari 3 tim frontend yang bekerja sama untuk membangun
          pengalaman pengguna terbaik. Kami juga berkolaborasi dengan tim
          backend untuk menghadirkan fitur identifikasi berbasis AI.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 animate-fade-in">
          Kontak
        </h2>
        <p className="text-gray-700 animate-fade-in">
          Punya pertanyaan atau saran? Hubungi kami di{" "}
          <a
            href="mailto:support@kicaufinder.com"
            className="text-green-500 hover:underline"
          >
            support@kicaufinder.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
