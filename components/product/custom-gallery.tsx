'use client';
import { Button } from 'flowbite-react';
import { Image as TypeImage } from 'lib/shopify/types';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Checked from '../../public/checklist.png';

export const CustomGallery = ({ images }: { images: TypeImage[] }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Track hovered image index

  useEffect(() => {
    // Close the lightbox when the component unmounts
    return () => {
      closeLightbox();
    };
  }, []);

  const openLightbox = (startIndex: number) => {
    setLightboxIndex(startIndex);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Hide the body scrollbar
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setLightboxOpen(false);
    document.body.style.overflow = ''; // Restore the body scrollbar
  };

  useEffect(() => {
    if (lightboxOpen && lightboxIndex !== null) {
      // Scroll to the selected image when the lightbox is opened
      const targetImage = document.getElementById(`lightbox-image-${lightboxIndex}`);
      if (targetImage) {
        targetImage.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [lightboxOpen, lightboxIndex]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div
            key={image.url}
            onMouseEnter={() => setHoveredIndex(index)} // Handle mouse enter
            onMouseLeave={() => setHoveredIndex(null)} // Handle mouse leave
            onClick={() => openLightbox(index)}
            className={`cursor-pointer ${index === 0 ? 'col-span-2' : 'col-span-1'}`}
          >
            <div className="relative">
              <Image src={image.url} alt="asda" width={1000} height={1000} className="w-full" />
              {index === 0 && (
                <div className="absolute left-10 top-10 flex items-center gap-x-2 bg-black px-4 py-2">
                  {/* <BadgeCheck className="text-white bg-blue-600" /> */}
                  <Image src={Checked} alt="certified" />
                  <p className="text-white">Authenticated</p>
                </div>
              )}
              {/* {hoveredIndex === index && ( // Show magnifying icon when hovered
                <div className=" absolute left-10 top-10 rounded-full bg-white p-2">
                  <MagnifyingGlassPlusIcon className="h-4 w-4 text-gray-500 " />
                </div>
              )} */}
            </div>
          </div>
        ))}
      </div>
      <>
        {lightboxOpen && (
          <div className="magnify-out-cursor fixed left-0 top-0 z-[9999] h-full w-full bg-black bg-opacity-75">
            <div
              className="flex h-screen w-full items-center justify-stretch"
              onClick={closeLightbox}
            >
              <div className="relative h-full w-full max-w-full bg-white px-20">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={closeLightbox}
                  className="absolute right-4 top-4 rounded-full border border-gray-300 bg-transparent p-3 hover:bg-transparent focus:bg-transparent"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </Button>
                {/* <button
                  className="absolute top-0 right-0 p-2 m-2 text-black bg-white rounded-full hover:bg-gray-200 focus:outline-none"
                  onClick={closeLightbox}
                >
                  Close
                </button> */}
                <div className="h-full overflow-y-scroll">
                  {images.map((imageUrl, index) => (
                    <div key={imageUrl.url} id={`lightbox-image-${index}`} className="mb-4">
                      <Image
                        src={imageUrl.url}
                        alt="asda"
                        objectFit="cover"
                        width={1000}
                        height={1000}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
};
