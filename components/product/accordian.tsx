import { CheckCircle2, HeartHandshake } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../../components/ui/accordion';

function ProductAccordian() {
  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <span className="text-md flex items-center justify-start font-bold text-black">
              <CheckCircle2 className="mr-2" />
              Is it Verified
            </span>
          </AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <span className="text-md flex items-center justify-start font-bold text-black">
              <HeartHandshake className="mr-2" />
              Our Promise
            </span>
          </AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default ProductAccordian;
