import { Button } from 'components/ui/button';
import { Instagram } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="bg-gray-200 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-1 gap-6 px-7 py-6 md:grid-cols-4 md:px-5 lg:py-8">
          <div>
            <Image src={'/logomain.png'} width={65} height={65} alt="logo" className="my-4" />
            <Instagram className="w-7" />
          </div>
          <div>
            <h2 className="mb-5 text-xl font-semibold uppercase text-gray-900 dark:text-white">
              Flashbanks
            </h2>
            <ul className="font-medium text-gray-900 dark:text-gray-400">
              <li className="mb-2">
                <Link href="#" className="hover:underline">
                  About
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:underline">
                  Download The App
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
          <div>
            <h2 className="mb-5 text-xl font-semibold uppercase text-gray-900 dark:text-white">
              CUSTOMER CARE
            </h2>
            <ul className="font-medium text-gray-900 dark:text-gray-400">
              <li className="mb-2">
                <Link href="#" className="hover:underline">
                  Shipping + Returns
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:underline">
                  Sizing
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:underline">
                  FAQ
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:underline">
                  Track My Order
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-5 text-xl font-semibold uppercase text-gray-900 dark:text-white">
              BECOME A VIP MEMBER
            </h2>
            <p className="text-gray-900">
              Stay up to date with new collections, promotions and exclusive content.
            </p>
            <input type="text" placeholder="Enter Email" className="mb-2 mt-5" />
            <Button className="rounded-none bg-black px-6 py-4 text-[12px] uppercase text-white">
              Sign Up
            </Button>
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
