import Navbar from "@/components/Navbar";
import PetProfile from "@/components/PetProfile";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex justify-center">
        <PetProfile>

        </PetProfile>
      </div>
      <button
          //onClick={onClick}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >Add pet
        </button>
    </div>
  );
};

export default Home;