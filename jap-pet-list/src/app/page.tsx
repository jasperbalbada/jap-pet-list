"use client";

import Navbar from "@/components/Navbar";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { routes } from "@/constants/routes";
import Footer from "@/components/Footer";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";


const Home: React.FC = () => {

  const router = useRouter();

  const [isHalfScreen, setIsHalfScreen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const halfScreen = window.innerHeight / 2;

      if (scrollPosition > halfScreen) {
        setIsHalfScreen(true);
      } else {
        setIsHalfScreen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    router.push(routes.PET_INDEX);
  };
  
  return (
    <div>
      <Navbar />
      <div className="bg-gray-50 min-h-screen flex flex-col border-t-2 border-gray-200 px-20">
        <div className="flex-1 flex justify-center items-start py-64 border-x-2 border-gray-200 relative animate-fade-in-up">
          <div className="text-center animate-fade-in-up">
            <p className="text-gray-400 font-bold text-3xl text-left">Full-Stack Developer</p>
            <p className="text-black text-8xl font-thin">Jasper Balbada</p>
          </div>

          <div className="absolute bottom-40 right-40 flex items-center space-x-2 cursor-pointer animate-fade-in-up">
            <Link 
              href={routes.ABOUT}
              className="text-base text-gray-500 font-thin flex items-center space-x-1 group hover:text-gray-800">
              <span>More about me</span>
              <ArrowRightIcon className="w-4 h-4 text-gray-500 group-hover:text-gray-800" />
            </Link>
          </div>

          <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full ${isHalfScreen ? '' : 'animate-fall hidden-before-animation'}`}/>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isHalfScreen ? 'opacity-0' : 'animate-appear hidden-before-animation'}`}>
            <p className="text-gray-500 text-lg tracking-widest transform rotate-90 absolute -bottom-64 -right-10">SCROLL</p>
          </div>
        </div>

        <div id="trade" className="flex-1 flex justify-center items-start border-2 border-gray-200 py-10 bg-gray-100">
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

        <div className="flex min-h-2.5 border-b-2 border-gray-200 bg-gray-100">
          <div className="flex-1 flex flex-col items-start py-10 border-x-2 border-gray-200 items-center">
            <p className="text-black font-thin text-4xl">New projects coming soon...</p>
          </div>
        </div>

        {/* <div className="flex-1 flex justify-center items-start border-x-2 border-b-2 border-gray-200 py-4"/> */}

        <Footer/>
      </div>
    </div>
  );
};

export default Home;