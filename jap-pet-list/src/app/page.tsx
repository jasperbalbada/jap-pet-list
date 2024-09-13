"use client";

import Navbar from "@/components/Navbar";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { routes } from "@/constants/routes";
import Footer from "@/components/Footer";


const Home: React.FC = () => {

  const router = useRouter();

  const handleClick = () => {
    router.push(routes.PET_INDEX);
  };
  
  return (
    <div>
      <Navbar />
      <div className="bg-gray-50 min-h-screen flex flex-col border-t-2 border-gray-200 px-20">
        <div className="flex-1 flex justify-center items-start py-64 border-x-2 border-gray-200">
          <div className="text-center">
            <p className="text-gray-400 font-bold text-3xl text-left">Full-Stack Developer</p>
            <p className="text-black text-8xl font-thin">Jasper Balbada</p>
          </div>
        </div>

        <div id="trade" className="flex-1 flex justify-center items-start border-2 border-gray-200 py-10">
          <div className="self-center">
            <p className="text-gray-800 text-2xl font-thin">TRADE</p>
          </div>
        </div>

        <div className="flex min-h-screen border-b-2 border-gray-200">
          <div className="flex-1 flex flex-col items-start pt-10 border-x-2 border-gray-200 relative">
            <div className="text-left ml-16">
              <p className="text-gray-500 text-xl mb-5">Pet Index</p>
              <p className="text-black font-thin text-5xl mb-16">Holistic Monitoring System for Pet Parents</p>

              <div className="flex space-x-4">
                <div className="flex flex-col justify-start items-start mb-10 mr-32">
                  <div className="text-left">
                    <p className="text-gray-500 text-lg mb-2 whitespace-nowrap">Personalized Profile</p>
                    <p className="text-gray-500 text-lg mb-2 whitespace-nowrap">Stats</p>
                    <p className="text-gray-500 text-lg mb-5 whitespace-nowrap">Vaccination Card</p>
                    <button 
                      onClick={handleClick}
                      className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-500 whitespace-nowrap">
                      Try me out
                    </button>
                  </div>
                </div>

                <div className="relative w-full h-96">
                  <Image
                    src="/static/petindex1.png"
                    alt="Photo"
                    fill
                    style={{ objectFit: 'scale-down' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-start border-x-2 border-b-2 border-gray-200 py-4"/>

        <div className="flex min-h-screen border-b-2 border-gray-200">
          <div className="flex-1 flex flex-col items-start pt-10 border-x-2 border-gray-200 relative">
            <div className="text-left ml-16">
              <p className="text-gray-500 text-xl mb-5">Pet Index</p>
              <p className="text-black font-thin text-5xl mb-16">Holistic Monitoring System for Pet Parents</p>

              <div className="flex space-x-4">
                <div className="flex flex-col justify-start items-start mb-10 mr-32">
                  <div className="text-left">
                    <p className="text-gray-500 text-lg mb-2 whitespace-nowrap">Personalized Profile</p>
                    <p className="text-gray-500 text-lg mb-2 whitespace-nowrap">Stats</p>
                    <p className="text-gray-500 text-lg mb-5 whitespace-nowrap">Vaccination Card</p>
                    <button 
                      onClick={handleClick}
                      className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-500 whitespace-nowrap">
                      Try me out
                    </button>
                  </div>
                </div>

                <div className="relative w-full h-96">
                  <Image
                    src="/static/petindex1.png"
                    alt="Photo"
                    fill
                    style={{ objectFit: 'scale-down' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-start border-x-2 border-b-2 border-gray-200 py-4"/>

        <Footer/>
      </div>
    </div>
  );
};

export default Home;