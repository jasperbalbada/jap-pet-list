import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-gray-700 text-lg font-semibold">Pet List</Link>
        <div>
          <Link href="/" className="text-gray-700 hover:text-white mx-4">Home</Link>
          <Link href="/about" className="text-gray-700 hover:text-white mx-4">About</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;