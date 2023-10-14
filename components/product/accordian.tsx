import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../../components/ui/accordion';

function ProductAccordian() {
  return (
    <div>
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <span className="flex items-center justify-start font-para text-sm font-medium uppercase text-black">
              {/* <CheckCircle2 className="mr-2" /> */}
              Discription
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="font-xs text-left font-head text-gray-600">
              <span className="font-black text-gray-800">Drake</span> and{' '}
              <span className="font-black text-gray-800">Nike</span> continue their collaboration
              through the <span className="font-black text-gray-800">Nocta</span> label and revisit
              the legendary <span className="font-black text-gray-800">Air Force 1 Low</span> to
              mark the model's <span className="font-black text-gray-800">40th anniversary</span> .
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
              shoe, we can see the <span className="font-black text-gray-800">Nocta</span> logo
              while the words “ <span className="font-black text-gray-800">AIR</span> ” on the sole
              have been replaced by “{' '}
              <span className="font-black text-gray-800">Love you forever</span> ”. <br /> <br />
              The <span className="font-black text-gray-800">Canadian rapper</span> thus reinvents
              in her own way this icon of sneaker culture which will arrive in a{' '}
              <span className="font-black text-gray-800">special box</span> .<br />
              <br />
              <span className="font-black text-gray-800">SKU</span> : CZ8065-100
              <br />
              <span className="font-black text-gray-800">Release Date</span> : December 2022
              <br />
              <span className="font-black text-gray-800">Colorway</span> : WHITE/WHITE/WHITE
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <span className="flex items-center justify-start font-para text-sm font-medium uppercase text-black">
              {/* <CheckCircle2 className="mr-2" /> */}
              Authenticity
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="font-xs text-left font-head text-gray-600">
              All products sold on Wethenew are guaranteed authentic . Before reaching your hands,
              they are checked by our experts who ensure their authenticity.
              <br /> <br />
              All products come directly from our network of partner resellers, individually
              selected for their experience. They are delivered to you in their original box with
              all the accessories as well as a Wethenew seal which ensures that the product has been
              checked and sent by our team.
              <br /> <br />
              <Link href={'#'} className="font-semibold underline">
                Learn more
              </Link>{' '}
              about our authentication methods.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            <span className="flex items-center justify-start font-para text-sm font-medium uppercase text-black">
              {/* <CheckCircle2 className="mr-2" /> */}
              Delivery & Return
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="font-xs text-left font-head text-gray-600">
              <span className="font-semibold">Carrier</span> : Chronopost
              <br />
              <br />
              <span className="font-semibold">Delivery methods</span> : at home or at a relay point
              against signature.
              <br />
              <br />
              <span className="font-semibold">Shipping costs</span> : free at relay point for all
              orders over 200 euros.
              <br />
              <br />
              <span className="font-semibold">Delivery time</span> :<br />
              <br />
              - 2 working days for “48h Express Delivery” products.
              <br />
              <br />
              - From 3 to 10 working days for “Standard Delivery” products.
              <br />
              <br />
              <span className="font-semibold">Returns</span> :<br />
              <br />
              You must make your return request via our{' '}
              <Link href={'#'} className="font-semibold underline">
                return portal
              </Link>{' '}
              within 14 calendar days of receiving your order.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            <span className="flex items-center justify-start font-para text-sm font-medium uppercase text-black">
              {/* <CheckCircle2 className="mr-2" /> */}
              Means Of Payment
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="font-xs text-left font-head text-gray-600">
              <span className="font-semibold">For orders shipped to France</span> we accept payment
              by credit card (Visa, MasterCard, Amex or debit card for foreign payments) and payment
              via PayPal.
              <br />
              <br />
              <span className="font-semibold">For orders shipped to Belgium</span> we accept payment
              by credit card (Visa, MasterCard, Amex), debit card, Apple Pay, Paypal, Bancontact,
              Klarna (pay later) and Alma.
              <br />
              <br />
              For orders via payment in installments with Alma ({' '}
              <span className="font-semibold">payment in 2, 3 or 4 installments</span> for an order
              of a <span className="font-semibold">minimum amount of €100</span> ) simply select the{' '}
              <span className="font-semibold">Alma option - Payment in 2, 3 or 4 installments</span>{' '}
              to pay for your purchase and thus spread the payment over 2, 3 or 4 months in a secure
              manner. Your order is taken into account and processed within our{' '}
              <span className="font-semibold">usual time frame of 7 working days on average</span>{' '}
              (excluding weekends and public holidays). This option involves a fee of 2.25% of the
              order total.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default ProductAccordian;
