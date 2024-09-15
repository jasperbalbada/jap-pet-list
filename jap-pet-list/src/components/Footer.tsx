import Link from 'next/link';
import { mainRoutes, routes } from '@/constants/routes';

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-between border-x-2 border-b-2 border-gray-200 py-10">
      <div className="flex-1 text-black p-4">
        <Link
          href={mainRoutes[0].link}
          className="wave-text font-bold"
        >
          {mainRoutes[0].label}
        </Link>
      </div>

      <div className="flex-1 border-dashed border-l-2 border-gray-200 font-extralight p-4">
        <p className="mb-4 text-gray-600 text-sm">TRADE</p>
        <Link href={routes.PET_INDEX} className="mb-4 cursor-pointer text-black">
          Pet Index
        </Link>
      </div>

      <div className="flex-1 text-gray-600 border-dashed border-l-2 border-gray-200 font-extralight p-4">
        <p className="mb-4 text-gray-600 text-sm">CONTACT</p>
        <Link
          href={routes.LINKEDIN}
          className="mb-2 cursor-pointer text-black block"
          target={routes.LINKEDIN.startsWith('http') ? "_blank" : "_self"}
          rel={routes.LINKEDIN.startsWith('http') ? "noopener noreferrer" : undefined}
        >
          LinkedIn
        </Link>
        <Link 
          href={`mailto:${routes.EMAIL}`} 
          className="mb-2 cursor-pointer text-black block">
          Email
        </Link>
        <Link
          href={routes.CV}
          className="mb-2 cursor-pointer text-black block"
          target={routes.CV.startsWith('http') ? "_blank" : "_self"}
          rel={routes.CV.startsWith('http') ? "noopener noreferrer" : undefined}
        >
          CV
        </Link>
      </div>

      <div className="flex-1 text-sm text-black border-dashed border-l-2 border-gray-200 p-4">
        <p>© 2024 Jasper Balbada.</p>
        <p>All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;