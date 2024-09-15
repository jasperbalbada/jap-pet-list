import { ChevronRightIcon, PhotoIcon } from "@heroicons/react/24/outline";


const PetProfile: React.FC <{ 
  pets: { id: number; name: string; link: string; photo: string | null }[], 
  onPetClick: (pet: any) => void }> = ({ pets, onPetClick }) => {
  return (
    <div className="bg-white rounded-lg p-2 w-96 shadow-md">
      {pets.length === 0 ? (
        <div className="text-center text-gray-500 py-2">
          Start by adding a furbaby
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-gray-200">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="hover:bg-gray-100 p-2 block cursor-pointer"
              onClick={() => onPetClick(pet)}
            >
              <div key={pet.id} className="flex items-center justify-between hover:bg-gray-100 p-2">
                <div className="flex items-center space-x-4">
                  {pet.photo ? (
                    <img src={pet.photo} alt={pet.name} className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <PhotoIcon className="h-6 w-6 text-gray-500" />
                  )}
                  <h1 className="text-gray-700 text-lg">{pet.name}</h1>
                </div>
                <ChevronRightIcon className="h-6 w-6 text-gray-500" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetProfile;