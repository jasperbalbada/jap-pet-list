import Link from "next/link";
import { PhotoIcon } from "@heroicons/react/24/outline";

const PetProfile: React.FC = () => {
  return (
    <div className="bg-white container rounded-lg p-4 max-w-sm mx-auto shadow-md">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <PhotoIcon className="h-6 w-6 text-gray-500" />
          <Link href="/" className="text-gray-700 hover:text-blue-600 text-lg">
            Pet 1
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <PhotoIcon className="h-6 w-6 text-gray-500" />
          <Link href="/" className="text-gray-700 hover:text-blue-600 text-lg">
            Pet 2
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PetProfile;