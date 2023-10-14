'use client';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const AccordionSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    console.log(isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <div className={`rounded-m border-b border-gray-800 py-2`}>
      <button onClick={toggleAccordion} className="flex w-full items-center justify-between">
        {' '}
        <p className="flex items-center justify-start font-para text-[15px] font-medium uppercase text-black">
          Description
        </p>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 rotate-180 transform duration-300" />
        ) : (
          <ChevronDown className="h-4 w-4 rotate-0 transform duration-300" />
        )}
      </button>
      {isOpen ? (
        <div className="mt-4 transform duration-700">
          <p className="font-xs text-left font-head text-gray-600">
            <span className="font-black text-gray-800">Drake</span> and{' '}
            <span className="font-black text-gray-800">Nike</span> continue their collaboration
            through the <span className="font-black text-gray-800">Nocta</span> label and revisit
            the legendary <span className="font-black text-gray-800">Air Force 1 Low</span> to mark
            the model&apos;s <span className="font-black text-gray-800">40th anniversary</span> .
            <br />
            <br />
            The{' '}
            <span className="font-black text-gray-800">
              Nike Air Force 1 Low NOCTA Drake Certified Lover Boy
            </span>{' '}
            takes the curves of the silhouette imagined in{' '}
            <span className="font-black text-gray-800">1982</span> by{' '}
            <span className="font-black text-gray-800">Bruce Kilgore</span> by adding details that
            make it original. We then find an immaculate{' '}
            <span className="font-black text-gray-800">grained leather</span> upper . Only the
            deubrés provide a slight contrast in material. On the heel reinforcement of the left
            shoe, we can see the <span className="font-black text-gray-800">Nocta</span> logo while
            the words “ <span className="font-black text-gray-800">AIR</span> ” on the sole have
            been replaced by “ <span className="font-black text-gray-800">Love you forever</span> ”.{' '}
            <br /> <br />
            The <span className="font-black text-gray-800">Canadian rapper</span> thus reinvents in
            her own way this icon of sneaker culture which will arrive in a{' '}
            <span className="font-black text-gray-800">special box</span> .<br />
            <br />
            <span className="font-black text-gray-800">SKU</span> : CZ8065-100
            <br />
            <span className="font-black text-gray-800">Release Date</span> : December 2022
            <br />
            <span className="font-black text-gray-800">Colorway</span> : WHITE/WHITE/WHITE
          </p>
        </div>
      ) : (
        <div
          className="mt-4 h-12 transform overflow-hidden duration-700 "
          onClick={toggleAccordion}
        >
          <p className="font-xs text-left font-head text-gray-600">
            <span className="font-black text-gray-800">Drake</span> and{' '}
            <span className="font-black text-gray-800">Nike</span> continue their collaboration
            through the <span className="font-black text-gray-800">Nocta</span> label and
            <span className="blur-[1px]">
              {' '}
              revisit the legendary{' '}
              <span className="font-black text-gray-800">Air Force 1 Low</span> to mark the
              model&apos;s <span className="font-black text-gray-800">40th anniversary</span> .
            </span>
            <br />
            <br />
            The{' '}
            <span className="font-black text-gray-800">
              Nike Air Force 1 Low NOCTA Drake Certified Lover Boy
            </span>{' '}
            takes the curves of the silhouette imagined in{' '}
            <span className="font-black text-gray-800">1982</span> by{' '}
            <span className="font-black text-gray-800">Bruce Kilgore</span> by adding details that
            make it original. We then find an immaculate{' '}
            <span className="font-black text-gray-800">grained leather</span> upper . Only the
            deubrés provide a slight contrast in material. On the heel reinforcement of the left
            shoe, we can see the <span className="font-black text-gray-800">Nocta</span> logo while
            the words “ <span className="font-black text-gray-800">AIR</span> ” on the sole have
            been replaced by “ <span className="font-black text-gray-800">Love you forever</span> ”.{' '}
            <br /> <br />
            The <span className="font-black text-gray-800">Canadian rapper</span> thus reinvents in
            her own way this icon of sneaker culture which will arrive in a{' '}
            <span className="font-black text-gray-800">special box</span> .<br />
            <br />
            <span className="font-black text-gray-800">SKU</span> : CZ8065-100
            <br />
            <span className="font-black text-gray-800">Release Date</span> : December 2022
            <br />
            <span className="font-black text-gray-800">Colorway</span> : WHITE/WHITE/WHITE
          </p>
        </div>
      )}
    </div>
  );
};

export default AccordionSection;
