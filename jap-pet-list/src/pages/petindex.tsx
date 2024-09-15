import "../styles/globals.css";

import Navbar from "@/components/Navbar";
import PetProfile from "@/components/PetProfile";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { breeds } from "pet-breed-names";
import { XMarkIcon, ArrowLongRightIcon, ArrowLongLeftIcon, ChevronRightIcon, CameraIcon } from "@heroicons/react/24/outline";
import ConfirmationModal from "@/components/ConfirmationModal";
import Footer from "@/components/Footer";

interface Pet {
  id: number;
  name: string;
  photo: string | null;
  breed?: string;
  gender?: string;
  birthdate?: Date;
  weight?: number;
  type?: string;
}

export default function Petlist(): JSX.Element {

  const [pets, setPets] = useState<Pet[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proceedPetInfo, setProceedPetInfo] = useState(false);
  const [newPetName, setNewPetName] = useState('');
  const [newPetPhoto, setNewPetPhoto] = useState<File | null>(null);
  const [newPetType, setNewPetType] = useState<'cat' | 'dog' | ''>('');
  const [newPetBreed, setNewPetBreed] = useState('');
  const [newPetGender, setNewPetGender] = useState('');
  const [newPetBirthdate, setNewPetBirthdate] = useState<Date | null>(null);
  const [newPetWeight, setNewPetWeight] = useState<number | ''>('');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [barsActive, setBarsActive] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');

  const [editPhoto, setEditPhoto] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isDeleteModalOpen, setDeleteIsModalOpen] = useState(false);

  const openDeleteModal = () => setDeleteIsModalOpen(true);
  const closeDeleteModal = () => setDeleteIsModalOpen(false);

  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePhotoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedPet) {
      const updatedPet = { ...selectedPet, photo: URL.createObjectURL(file) };
      setPets((prevPets) =>
        prevPets.map((pet) => (pet.id === updatedPet.id ? updatedPet : pet))
      );
      setSelectedPet(updatedPet);
    }
  };

  const openEditModal = (field, value) => {
    setEditField(field);
    setEditValue(value);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (selectedPet) {
      const updatedPet = {
        ...selectedPet, 
        [editField]: editValue ,
        ...(editPhoto ? { photo: URL.createObjectURL(editPhoto) } : {}),
      };
      setPets((prevPets) =>
        prevPets.map((pet) => (pet.id === selectedPet.id ? updatedPet : pet))
      );
      setSelectedPet(updatedPet);
    }
    setIsEditModalOpen(false);
    setEditPhoto(null);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const toggleBarsColor = () => {
    setProceedPetInfo(!proceedPetInfo);
    setBarsActive(!barsActive);
  };

  useEffect(() => {
    const storedPets = localStorage.getItem('pets');
    if (storedPets) {
      setPets(JSON.parse(storedPets));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pets', JSON.stringify(pets));
  }, [pets]);

  const petBreedOptions = newPetType ? breeds[newPetType]['en'] || [] : [];

  const handleAddPet = () => {
    const newPetId = pets.length + 1;
    const newPet = {
      id: newPetId,
      name: newPetName,
      photo: newPetPhoto ? URL.createObjectURL(newPetPhoto) : null,
      breed: newPetBreed,
      gender: newPetGender,
      birthdate: newPetBirthdate || undefined,
      weight: newPetWeight === '' ? undefined : newPetWeight,
      type: newPetType,
    };
    setPets([...pets, newPet]);
    setIsModalOpen(false);
    setProceedPetInfo(false);
    setNewPetName('');
    setNewPetPhoto(null);
    setNewPetType('');
    setNewPetBreed('');
    setNewPetGender('');
    setNewPetBirthdate(null);
    setNewPetWeight('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewPetPhoto(file);
  };
  
  const handlePetClick = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const handleRemovePet = () => {
    if (selectedPet) {
      setPets(pets.filter(pet => pet.id !== selectedPet.id));
      setSelectedPet(null);
      setIsModalOpen(false);
      console.log('Pet removed');
      closeDeleteModal();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewPetType('');
    setNewPetGender('');
    setProceedPetInfo(false);
    setNewPetBreed('');
    setSelectedPet(null);
  };

  const calculateAge = (birthdate: Date) => {
    const now = new Date();
    let ageInYears = now.getFullYear() - birthdate.getFullYear();
    let ageInMonths = now.getMonth() - birthdate.getMonth();
  
    if (ageInMonths < 0) {
      ageInYears--;
      ageInMonths += 12;
    }
  
    return { years: ageInYears, months: ageInMonths };
  };

  return (
    <div className="bg-gray-50">
      <Navbar/>
      <div className="bg-gray-50 min-h-screen flex">
        <div className="flex-1 flex flex-col py-10 px-40">
          <p className="py-3 text-left text-3xl font-bold tracking-tight text-gray-800">
            Pet Index
          </p>
          <PetProfile pets={pets} onPetClick={handlePetClick}/>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-blue-500 w-96 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >Add pet
          </button>

          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-600" />
                </button>
                {selectedPet ? (
                  <>
                    <h2 className="text-xl font-bold mb-4 text-gray-700">Pet Profile</h2>
                    <div className="relative">
                      <img
                        src={selectedPet.photo || '/static/default.jpg'}
                        alt={selectedPet.name}
                        className="h-32 w-32 rounded-full object-cover mx-auto mb-4"
                      />
                      <button
                        onClick={handlePhotoClick}
                        className="absolute bottom-2 right-24 p-1 rounded-full bg-blue-100 hover:bg-gray-300 focus:outline-none"
                      >
                        <CameraIcon className="h-6 w-6 text-gray-600" />
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handlePhotoFileChange}
                      />
                    </div>
                    <div className="mb-4">
                      <div
                        onClick={() => openEditModal('name', selectedPet.name)}
                        className="flex justify-between items-center mb-2 border-b border-gray-300 pb-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                      >
                        <span className="text-gray-700">Name:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400 text-right">{selectedPet.name}</span>
                          <ChevronRightIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                      <div
                        onClick={() => openEditModal('breed', selectedPet.breed)}
                        className="flex justify-between items-center mb-2 border-b border-gray-300 pb-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                      >
                        <span className="text-gray-700">Breed:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400 text-right">{selectedPet.breed}</span>
                          <ChevronRightIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                      <div
                        onClick={() => openEditModal('gender', selectedPet.gender)}
                        className="flex justify-between items-center mb-2 border-b border-gray-300 pb-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                      >
                        <span className="text-gray-700">Gender:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400 text-right">{selectedPet.gender}</span>
                          <ChevronRightIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                      {selectedPet.birthdate && (
                        <div
                          onClick={() => openEditModal('birthdate', selectedPet.birthdate)}
                          className="flex justify-between items-center mb-2 border-b border-gray-300 pb-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                        >
                          <span className="text-gray-700">Age:</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400 text-right">
                              {`${calculateAge(new Date(selectedPet.birthdate)).years}y-${calculateAge(new Date(selectedPet.birthdate)).months}m`}
                            </span>
                            <ChevronRightIcon className="h-6 w-6 text-gray-400" />
                          </div>
                        </div>
                      )}
                      <div
                        onClick={() => openEditModal('weight', selectedPet.weight)}
                        className="flex justify-between items-center mb-2 border-b border-gray-300 pb-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                      >
                        <span className="text-gray-700">Weight:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400 text-right">{selectedPet.weight} kg</span>
                          <ChevronRightIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-4">
                      <div className="ml-auto">
                        <button
                          onClick={openDeleteModal}
                          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <ConfirmationModal
                      isOpen={isDeleteModalOpen}
                      onClose={closeDeleteModal}
                      onConfirm={handleRemovePet}
                    />
                    {isEditModalOpen && (
                      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                          <h2 className="text-xl font-bold mb-4 text-gray-600">Edit {editField}</h2>
                          <div className="mb-4">
                            {editField === "breed" && (
                              <>
                                <label className="block mb-2 text-gray-600">Pet Breed</label>
                                <select
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="w-full p-2 border rounded-lg text-gray-600"
                                >
                                  <option value="">Select Breed</option>
                                  {selectedPet.type && breeds[selectedPet.type]['en'].map((breed) => (
                                    <option key={breed} value={breed}>{breed}</option>
                                  ))}
                                </select>
                              </>
                            )}

                            {editField === "gender" && (
                              <>
                                <label className="block mb-2 text-gray-600">Pet Gender</label>
                                <select
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="w-full p-2 border rounded-lg text-gray-600"
                                >
                                  <option value="">Select Gender</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Neutered Male">Neutered Male</option>
                                  <option value="Spayed Female">Spayed Female</option>
                                </select>
                              </>
                            )}

                            {editField === "birthdate" && (
                              <>
                                <label className="block mb-2 text-gray-600">Pet Birthdate</label>
                                <input
                                  type="date"
                                  value={editValue ? new Date(editValue).toISOString().substring(0, 10) : ""}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="w-full p-2 border rounded-lg text-gray-600"
                                />
                              </>
                            )}

                            {editField === "weight" && (
                              <>
                                <label className="block mb-2 text-gray-600">Pet Weight (kg)</label>
                                <input
                                  type="number"
                                  step="0.1"
                                  placeholder="Weight in kg"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="w-full p-2 border rounded-lg text-gray-600"
                                />
                              </>
                            )}

                            {["name"].includes(editField) && (
                              <>
                                <label className="block mb-2 text-gray-600">Pet {editField.charAt(0).toUpperCase() + editField.slice(1)}</label>
                                <input
                                  type="text"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="w-full p-2 border rounded-lg text-gray-600"
                                />
                              </>
                            )}
                          </div>
                          <div className="mt-4 flex space-x-4">
                            <button
                              onClick={handleSaveEdit}
                              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                              Save
                            </button>
                            <button
                              onClick={closeEditModal}
                              className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-bold mb-4 text-gray-600">Add New Pet</h2>
                    <div className="absolute top-2 left-0 w-full flex justify-between px-2">
                      <div
                        className={`h-1 w-1/2 rounded-full bg-blue-500 mr-1`}
                      />
                      <div
                        className={`h-1 w-1/2 rounded-full ${barsActive ? 'bg-blue-500' : 'bg-gray-300'}`}
                      />
                    </div>
                    {!proceedPetInfo ? (
                      <div className="mb-4">
                        <label className="block mb-2 text-gray-600">Select Pet</label>
                        <div className="flex space-x-4 mb-2">
                          <button
                            onClick={() => setNewPetType('cat')}
                            className={`py-2 px-4 rounded-lg ${newPetType === 'cat' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                          >
                            Cat
                          </button>
                          <button
                            onClick={() => setNewPetType('dog')}
                            className={`py-2 px-4 rounded-lg ${newPetType === 'dog' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                          >
                            Dog
                          </button>
                        </div>
                        {newPetType && (
                          <>
                            <div className="mb-4">
                              <label className="block mb-2 text-gray-600">Pet Breed</label>
                              <select
                                value={newPetBreed}
                                onChange={(e) => setNewPetBreed(e.target.value)}
                                className="w-full p-2 border rounded-lg text-gray-600"
                              >
                                <option value="">Select Breed</option>
                                {petBreedOptions.map((breed) => (
                                  <option key={breed} value={breed}>{breed}</option>
                                ))}
                              </select>
                            </div>

                            {newPetBreed && (
                              <>
                                <label className="block mb-2 text-gray-600">Pet Gender</label>
                                <select
                                  value={newPetGender}
                                  onChange={(e) => setNewPetGender(e.target.value)}
                                  className="border border-gray-300 p-2 rounded-lg w-full mb-4 text-gray-600"
                                >
                                  <option value="">Select Gender</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Neutered Male">Neutered Male</option>
                                  <option value="Spayed Female">Spayed Female</option>
                                </select>
                                {newPetGender && (
                                  <>
                                    <div className="mb-6">
                                      <label className="block mb-2 text-gray-600">Pet Name</label>
                                      <input
                                        type="text"
                                        placeholder="Pet Name"
                                        value={newPetName}
                                        onChange={(e) => setNewPetName(e.target.value)}
                                        className="w-full p-2 border rounded-lg text-gray-600"
                                      />
                                    </div>
                                    <button
                                      onClick={toggleBarsColor}
                                      className="absolute bottom-2 right-2 p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                                    >
                                      <ArrowLongRightIcon className="h-6 w-6 text-gray-600" />
                                    </button>
                                  </>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </div>
                    ) : (
                    <>
                      <button
                        onClick={toggleBarsColor}
                        className="absolute bottom-2 right-2 p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                      >
                        <ArrowLongLeftIcon className="h-6 w-6 text-gray-600" />
                      </button>
                      <div className="mb-4">
                        <label className="block mb-2 text-gray-600">Upload Picture</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="w-full mb-4 text-gray-600"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-gray-600">Input Birthdate</label>
                        <input
                          type="date"
                          value={newPetBirthdate ? newPetBirthdate.toISOString().substr(0, 10) : ''}
                          onChange={(e) => setNewPetBirthdate(e.target.valueAsDate)}
                          className="w-full p-2 border rounded-lg text-gray-600"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-gray-600">Input Weight (kg)</label>
                        <input
                          type="number"
                          step="0.1"
                          placeholder="Weight in kg"
                          value={newPetWeight}
                          onChange={(e) => setNewPetWeight(Number(e.target.value))}
                          className="w-full p-2 border rounded-lg text-gray-600"
                        />
                      </div>
                      <div className="mt-4 flex space-x-4">
                        <button
                          onClick={handleAddPet}
                          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                          Submit
                        </button>
                      </div>
                    </>
                  )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="w-1/2 relative z-10">
          <Image
            src="/static/pets1.jpeg"
            alt="Pets Picture"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
        </div>
      </div>
      <div className="bg-gray-50 flex flex-col border-t-2 border-gray-200 px-20">
        {/* <div id="trade" className="flex-1 flex justify-center items-start border-x-2 border-b-2 border-gray-200 py-4"/> */}
        <Footer/>
      </div>
    </div>
  );
}