'use client';
import { X } from 'lucide-react';
import Image from 'next/image';
import RoundImg from 'public/logomain.png';
import { useState } from 'react';

const RoundVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleVideo = () => {
    setIsPlaying(!isPlaying);
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setIsPlaying(false);
    setShowModal(false);
  };

  return (
    <div className="flex items-center px-4 py-5">
      <div
        className={`relative mr-2 h-20 w-20 cursor-pointer rounded-full border-4 border-red-500 p-2 ${
          isPlaying ? 'border-transparent' : ''
        }`}
        onClick={toggleVideo}
      >
        <Image className="h-full w-full rounded-full object-cover" src={RoundImg} alt="Image" />
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative">
            <button
              className="absolute right-[-50px] top-2 cursor-pointer text-white"
              onClick={closeModal}
            >
              <X />
            </button>
            <video className="h-[500px] w-full" controls autoPlay>
              <source src="/vidthumb.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
      <div
        className={`relative ml-2 h-20 w-20 cursor-pointer rounded-full border-4 border-red-500 p-2 ${
          isPlaying ? 'border-transparent' : ''
        }`}
        onClick={toggleVideo}
      >
        <Image className="h-full w-full rounded-full object-cover" src={RoundImg} alt="Image" />
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative">
            <button
              className="absolute right-[-50px] top-2 cursor-pointer text-white"
              onClick={closeModal}
            >
              <X />
            </button>
            <video className="h-[500px] w-full" controls autoPlay>
              <source src="/vidthumb.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoundVideo;
