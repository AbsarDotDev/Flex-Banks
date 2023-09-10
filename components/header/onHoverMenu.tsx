import Image from 'next/image';
import trop from 'public/trop.jpg';
export default function OnHoverMenu() {
  return (
    <>
      <div className="absolute left-0 z-[999] w-[100%] bg-white">
        <div className="fixed left-0 z-[999] w-[100%] bg-white">
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
          <div className="mt-4 flex justify-center">
            {/* Add margin-top to center the lists */}
            <div className="flex items-center text-black">
              <div>
                <li>NEW ARRIVALS</li>
              </div>
              <div>
                <li>
                  hkk
                  <ul>NEW ARRIVALS</ul>
                </li>
              </div>
              <div>
                <li>
                  <ul>NEW ARRIVALS</ul>
                </li>
              </div>
              <div>
                <li>
                  <ul>NEW ARRIVALS</ul>
                </li>
              </div>
              <div>
                <li>
                  <ul>NEW ARRIVALS</ul>
                </li>
              </div>
            </div>
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
