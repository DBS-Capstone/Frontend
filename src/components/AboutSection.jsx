import React from "react";
import birdVM from "../assets/pexelsBird2.jpg";
import backgroundImage from "../assets/pexelsBird.jpg";
import peopleImage from "../assets/pexelscontoh.jpg";

const teamMembers = [
  { name: "Orchitiadi", role: "Machine Learning", img: peopleImage, large: true }, 
  { name: "Stefany", role: "Front-End Developer", img: peopleImage },
  { name: "Rahmat", role: "Front-End Developer", img: peopleImage, large: true },
  { name: "Aria", role: "Machine Learning", img: peopleImage },
  { name: "Defnanaya", role: "Back-End Developer", img: peopleImage},
  { name: "Dimas", role: "Machine Learning", img: peopleImage }
];

const TeamMemberCard = ({ name, role, img, large }) => (
  <div className={`flex flex-col items-center text-center p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ${large ? "row-span-2" : ""}`}>
    <img src={img} alt={name} className="w-32 h-32 rounded-full object-cover mb-4" />
    <h3 className="text-lg font-montserrat font-semibold" style={{ color: '#317538' }} >{name}</h3>
    <p className="text-sm font-montserrat" style={{ color: '#317538'}}>{role}</p>
  </div>
);

export default function TeamPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <section className="bgBird relative bg-cover bg-center h-64 md:h-96" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <h2 className="absolute left-[40px] top-1/2 transform -translate-y-1/2 text-white font-montserrat text-[34px] md:text-5xl font-bold">
            Kicau Finder
          </h2>
        </section>
        <main className="flex-grow max-w-7xl mx-auto px-4 py-12">
              <div className="max-w-7xl mx-auto px-4 py-12 pb-36">
                <section className="text-center mb-16">
                  <h1 className="text-4xl md:text-5xl font-montserrat font-extrabold mb-6 leading-tight"
                    style={{ color: '#6FC162' }}>
                    Meet the team<br />behind the chirps!
                  </h1>
                  <p className="text-gray-800 font-montserrat max-w-2xl mx-auto mb-6">
                    Our team consists of individuals who are passionate about technology development.
                    Together, we built Kicau Finder to help anyone recognise birds by their song.
                  </p>
                  <button className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 hover:scale-105 transition-all duration-300">
                    Contact Our Team
                  </button>
                </section>

                <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
                  {teamMembers.map((member) => (
                    <TeamMemberCard key={member.name} {...member} />
                  ))}
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start mb-30">
                  <div className="lg:col-span-2 space-y-8">
                    <div>
                      <h2 className="text-3xl font-bold mb-2" style={{ color: '#6FC162'}}>
                        Vision
                      </h2>
                      <p className="text-gray-800 font-montserrat">
                        To be the leading platform for bird education and identification, connecting people from all over the world
                        with the rich sounds of nature through smart, accurate and accessible technology.
                      </p>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-2" style={{ color: '#6FC162'}}>
                        Mission
                      </h2>
                      <ul className="relative border-1-2 border-green-500 ml-4 space-y-6">
                        <li className="relative pl-10">
                          <span className="absolute -left-5 top-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center">
                            1
                          </span>
                          <p className="text-gray-800 font-montserrat">
                            Presenting Machine Learning-based technology to accurately identify bird songs, bridging learning and science.
                          </p> 
                        </li>
                        <li className="relative pl-10">
                          <span className="absolute -left-5 top-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center">
                            2
                          </span>
                          <p className="text-gray-800 font-montserrat">
                            Encourage a love for nature and bird conservation through a better understanding of their sounds and species.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <img src={birdVM} alt="Bird Vision" className="rounded-2xl shadow-md" />
                  </div>
                </section>
            </div>
        </main>
      </div>

        <footer className="text-center py-12 bg-green-600 border-t w-full">
          <h2 className="text-xl font-montserrat font-semibold text-white mb-4">Contact Us</h2>
          <p className="font-montserrat text-white">
            We'd love to hear from you. For questions, feedback, or support,<br />
            please contact us at
            <a 
              href="mailto:support@kicaufinder.com" 
              className="font-montserrat text-white font-medium underline decoration-white decoration-1">
                support@kicaufinder.com
            </a>.
          </p>
        </footer>
    </>    
  );
}
