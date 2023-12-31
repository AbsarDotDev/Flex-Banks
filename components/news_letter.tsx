import Link from 'next/link';
import { Button } from './ui/button';

export default async function NewsLetter() {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center bg-mycolors-pink py-16">
        <h2 className="text-[22px] font-black uppercase text-pink-600 md:text-3xl">
          join our girl gang
        </h2>
        <p className="py-4 font-head text-[15px] font-semibold text-pink-600 md:text-lg">
          10% off when you sign up
        </p>
        <form action="#" className="mx-auto w-[86%] md:w-[40%]">
          <div className="flex w-full justify-center border-[1px] border-gray-300 p-1">
            <input
              className="m-auto block w-[70%] rounded-lg border-none bg-transparent p-3 text-sm text-gray-900 focus:border-none focus:ring-transparent md:w-[84%]"
              placeholder="Enter your email"
              type="email"
              id="email"
              required
            />
            <Button
              type="submit"
              className="border-primary-600 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-[30%] cursor-pointer rounded-md bg-black px-4 py-3 text-center font-head text-sm font-medium text-white md:w-[16%]"
            >
              JOIN
            </Button>
          </div>
        </form>

        <p className="newsletter-form-footer px-6 pt-4 text-center font-head text-[12px] text-gray-300 dark:text-gray-300 md:px-[350px] md:text-[14px]">
          Sign up to our vip mailing list for exclusive discounts, secret sales and hear news, plus
          10% off your first order. By entering your email adress, you are agreeing to our{' '}
          <Link
            href="#"
            className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
          >
            privacy policy
          </Link>
          .
        </p>
      </div>
    </>
  );
}
