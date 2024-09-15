import Footer from "@/components/Footer";
import "../styles/globals.css";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState } from "react";
import { routes } from "@/constants/routes";

export default function Reroll(): JSX.Element {

  const [dayOffMode, setDayOffMode] = useState(false);

  const toggleDayOffMode = () => {
    setDayOffMode(prevMode => !prevMode);
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gray-50 min-h-screen flex flex-col border-t-2 border-gray-200 px-20">
        <div className="flex flex-col items-center py-48 border-x-2 border-gray-200 space-y-12 animate-fade-in-up">
          <div className="flex justify-center items-center space-x-12 max-w-6xl w-full -m-14 animate-fade-in-up">
            <div className="text-left max-w-lg">
              <p className="text-black font-bold text-5xl text-left mb-4">Full-Stack Developer</p>
              <p className="text-gray-600 text-xl font-thin mb-5">
                Hi, I'm Jasper Balbada. A passionate Full-Stack developer based in Cebu, Philippines. 📍
              </p>
              <a href={routes.LINKEDIN} target="_blank" rel="noopener noreferrer" className="inline-block hover-grow">
                <Image src="/static/linkedin.png" alt="LinkedIn" width={35} height={35} />
              </a>
            </div>
            <div className="relative w-64 h-64 rounded-full border-2 border-gray-200 overflow-hidden animate-fade-in-up">
              <Image
                src="/static/jap.png"
                alt="Photo"
                fill
                style={{ objectFit: 'scale-down' }}
              />
            </div>
          </div>

          <div className="flex w-full max-w-6xl pt-24 ml-40 pl-24 animate-fade-in-up">
            <div className="flex items-center space-x-4">
              <p className="text-black font-bold text-xl pr-5">Tech Stack</p>

              <div className="flex space-x-3">
                <Image src="/static/atom.png" alt="React.js" width={50} height={50} />
                <Image src="/static/nodejs.png" alt="Node.js" width={50} height={50} />
                <Image src="/static/js.png" alt="Javascript" width={50} height={50} />
                <Image src="/static/typescript.png" alt="Typescript" width={50} height={50} />
                <Image src="/static/html-5.png" alt="HTML5" width={50} height={50} />
                <Image src="/static/css-3.png" alt="CSS3" width={50} height={50} />
                <Image src="/static/tailwind-css.svg" alt="Tailwind CSS" width={50} height={45} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex justify-center items-start border-x-2 border-b-2 border-gray-200 py-4"/>

        <div className="flex min-h-screen border-b-2 border-gray-200">
          <div className="flex-1 flex flex-col items-start border-x-2 border-gray-200 relative">
            
            {dayOffMode ? (
              <div className="justify-center items-center flex w-full space-x-12 min-h-full drop-in">
                <div>
                  <p className="text-black text-lg mb-2">
                    Outside of work 💻, I love taking care of my pets 🐈 and gaming 🎮 with my friends.
                  </p>
                  <p className="text-black text-lg mb-2">
                    I enjoy listening to music 🎶 across diverse genre. I also write songs 🎙️ when I feel it.
                  </p>
                  <p className="text-black text-lg mb-2">
                    I may not go out as often right now, but I do enjoy meeting my friends 😊.
                  </p>
                  <p className="text-black text-lg mb-10">
                    I also like taking pictures of flowers 🌻 where ever I go.
                  </p>
                  <div className="flex flex-col items-center space-y-4">
                    <p className="text-black text-lg">
                      Check out my stuff:
                    </p>
                    <div className="flex items-center space-x-4">
                      <a href={routes.INSTA_FLOWERS} target="_blank" rel="noopener noreferrer" className="hover-grow">
                        <Image src="/static/instagram.png" alt="Instagram" width={40} height={40} />
                      </a>
                      <a href={routes.SOUNDCLOUD} target="_blank" rel="noopener noreferrer" className="hover-grow">
                        <Image src="/static/soundcloud.png" alt="SoundCloud" width={40} height={40} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="justify-center items-center flex w-full space-x-12 min-h-full">
                <div className="relative w-72 h-72 border-2 border-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src="/static/cebu-city.png"
                    alt="Photo"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className="relative flex-col justify-start items-start mb-10 max-w-lg">
                  <div className="text-left">
                    <p className="text-gray-500 font-bold text-lg text-left mb-4 whitespace-nowrap">ABOUT ME</p>
                    <p className="text-black text-3xl font-bold">Full-Stack Developer</p>
                    <p className="text-black text-3xl mb-4 font-bold">based in Cebu, Philippines 📍</p>
                    <div>
                      <p className="text-black text-lg mb-4">
                        Hello, I go by Jappy, and I'm a Full-Stack Developer. I'm passionate in creating and developing clean, user-friendly experience for my users.
                      </p>
                      <p className="text-lg text-black">
                        My current stack is ReactJS/NextJS, combined with TypeScript and TailwindCSS.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              )}
              <button
              onClick={toggleDayOffMode}
              className={`font-bold py-2 px-4 rounded wave-text mb-4 absolute bottom-36 right-48 ${dayOffMode ? '' : 'pulsate'}`}>
              {dayOffMode ? 'Work Mode' : 'Day-off Mode'}
              </button>
            </div>
        </div>

        {/* <div className="flex-1 flex justify-center items-start border-x-2 border-b-2 border-gray-200 py-4"/> */}

        <Footer/>
      </div>
    </div>
  );
}