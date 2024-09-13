'use client';

import { mainRoutes } from '@/constants/routes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Navbar() {
  const router = useRouter();

  // const handleNavigation = (path: string) => {
  //   router.push(path);
  // };

  function renderRoutes() {
    return (
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-1">
          <Link
            href={mainRoutes[0].link}
            className="text-red-700 font-bold hover:text-gray-400"
          >
            {mainRoutes[0].label}
          </Link>
        </div>
    
        <div className="flex space-x-4">
          {mainRoutes.slice(1).map((route) => (
            <Link
              key={route.link}
              href={route.link}
              className="text-gray-700 hover:text-gray-400"
              target={route.link.startsWith('http') ? "_blank" : "_self"}
              rel={route.link.startsWith('http') ? "noopener noreferrer" : undefined}
            >
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <nav className="bg-white p-4">
      {renderRoutes()}
    </nav>
  );
};

export default Navbar;