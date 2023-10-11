import { CheckCircle2, Instagram } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="bg-gray-200 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-2xl">
        <div className="grid grid-cols-1 gap-8 py-6 md:grid-cols-5 md:px-5 lg:py-8">
          <div>
            <Image src={'/logomain.png'} width={65} height={65} alt="logo" className="my-4" />
            <Instagram className="w-7" />
          </div>
          <div>
            <div className="flex ">
              <h2 className="mb-5 text-[18px] font-semibold uppercase text-gray-900 dark:text-white">
                entreprise certifiée
              </h2>
              <CheckCircle2 className="ml-1 rounded-full bg-blue-600 text-white" />
            </div>
            <div>
              <p className="text-[15px] font-medium leading-snug">
                Entrepôt <br />
                66 Av des champs-Élysées <br />
                75008 Paris
              </p>
            </div>
          </div>
          <div>
            <h2 className="mb-5 text-[18px] font-semibold uppercase text-gray-900 dark:text-white">
              notre mission
            </h2>
            <p className="text-[15px] font-medium leading-snug">
              Notre mission est de vous fournir les meilleurs produits de qualité au meilleur prix.
            </p>
          </div>
          <div>
            <h2 className="mb-5 text-[18px] font-semibold uppercase text-gray-900 dark:text-white">
              nous contacter
            </h2>
            <p className="text-[15px] font-medium leading-snug">
              E-mail: officalflexbank@gmail.com
            </p>
            <p className="text-[15px] font-medium leading-snug">Phone: 0698897299</p>
          </div>
          <div>
            <h2 className="mb-5 text-[18px] font-semibold uppercase text-gray-900 dark:text-white">
              aide
            </h2>
            <ul className="font-para text-[15px] font-medium leading-snug text-gray-900 dark:text-gray-400">
              <li className="mb-2">
                <Link href="#" className="uppercase hover:underline">
                  Faq
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="uppercase hover:underline">
                  Contact
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:underline">
                  Stories
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:underline">
                  Jobs
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t-[1px] border-gray-300 px-5 pb-10 text-center dark:bg-gray-700 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-900 dark:text-gray-300 sm:text-center">
            © 2023 <Link href="https://flowbite.com/">FlashBanks™</Link>. All Rights Reserved.
          </span>
          <div className="mt-4 flex justify-center space-x-5 md:mt-0">
            <ul className="flex text-[12px]">
              <li className="px-2">
                <Link href={''}>TERMS OF USE</Link>
              </li>
              <li className="px-2">
                <Link href={''}>ABOUT</Link>
              </li>
              <li className="px-2">
                <Link href={''}>PRIVACY POLICY</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
