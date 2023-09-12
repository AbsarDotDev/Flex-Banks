import Image from 'next/image';
import Link from 'next/link';
import trop from 'public/trop.jpg';
export default function OnHoverMenu() {
  return (
    <>
      <div className="fixed left-0 z-[999] mt-[11px] w-[100%] bg-gray-100">
        <div className="flex text-black">
          <div className="my-4 ml-52 flex flex-col items-center justify-center">
            <p className="my-2">LATEST IN:</p>
            <h2 className="my-2">TROPICAL SHORTS</h2>
            <button className="my-2">Shop Now</button>
          </div>
          <div className="relative flex flex-grow justify-end">
            <div className="w-1/2 bg-opacity-0 text-black backdrop-blur-sm "></div>
            <Image src={trop} alt="" height={600} width={750} />
          </div>
        </div>
        <div className="ml-10 grid grid-cols-5 py-5 font-head uppercase">
          <div>
            <h6 className="py-2 text-[12px] text-gray-400">
              <Link href={'#'}>new arrivals</Link>
            </h6>
            <ul className="text-[11px] text-gray-700"></ul>
          </div>
          <div>
            <h6 className="py-2 text-[12px] text-gray-400">
              <Link href={'#'}>tops</Link>
            </h6>
            <ul className="text-[11px] text-gray-700">
              <li className="pt-1">
                <Link href={'#'}>tees</Link>
              </li>
              <li className="pt-1">
                <Link href={'#'}>hoodies</Link>
              </li>
              <li className="pt-1">
                <Link href={'#'}>crewnecks</Link>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="py-2 text-[12px] text-gray-400">
              <Link href={'#'}>bottoms</Link>
            </h6>
            <ul className="text-[11px] text-gray-700">
              <li className="pt-1">
                <Link href={'#'}>denim</Link>
              </li>
              <li className="pt-1">
                <Link href={'#'}>pants</Link>
              </li>
              <li className="pt-1">
                <Link href={'#'}>shorts</Link>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="py-2 text-[12px] text-gray-400">
              <Link href={'#'}>sets</Link>
            </h6>
            <ul className="text-[11px] text-gray-700">
              <li className="pt-1">
                <Link href={'#'}>tracksuits</Link>
              </li>
              <li className="pt-1">
                <Link href={'#'}>sweatsuits</Link>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="py-2 text-[12px] text-gray-400">
              <Link href={'#'}>outwear</Link>
            </h6>
            <ul className="text-[11px] text-gray-700"></ul>
          </div>
        </div>
      </div>
    </>
    //       )}
    //     </li>
    //   </div>
    // </div>
  );
}
