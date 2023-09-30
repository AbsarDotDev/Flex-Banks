import { Suspense } from 'react';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="mx-auto gap-4 pb-4 text-black dark:text-white md:flex-row">
        <div className="order-last min-h-screen w-full md:order-none">{children}</div>
      </div>
    </Suspense>
  );
}
