import SearchBar from 'components/layout/navbar/search';
import { Search } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet';
export function SheetSide() {
  return (
    <Sheet>
      <SheetTrigger>
        <Search className="text-black" />
      </SheetTrigger>
      <SheetContent side={'top'} className="w-full justify-center px-2 md:px-20 lg:px-20">
        <SheetHeader>
          <SearchBar />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
