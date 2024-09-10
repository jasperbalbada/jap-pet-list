import Navbar from "@/components/Navbar";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex">
        <h1 className="text-black">Well</h1>
      </div>
    </div>
  );
};

export default Home;