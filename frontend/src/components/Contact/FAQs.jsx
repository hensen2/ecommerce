import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../index.jsx";

export default function FAQs() {
  return (
    <>
      <section className="mx-auto w-full max-w-4xl bg-transparent px-6 py-12 font-poppins text-gray-900 md:py-16 lg:px-0">
        <h2 className="scroll-m-20 pb-4 text-center text-3xl font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How many uses can I get out of a Body Bar?
            </AccordionTrigger>
            <AccordionContent className="leading-relaxed">
              While our bars are made with high quality ingredients that are
              made to last, our bars life span completely depends on how often
              they are used. Generally, our Bars last about a month with
              consistent use.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Where do you ship your products to?
            </AccordionTrigger>
            <AccordionContent className="leading-relaxed">
              Currently we are only able to ship to customers within the
              continental US.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Are your Bars skin safe?</AccordionTrigger>
            <AccordionContent className="leading-relaxed">
              Yes! They can be used on your body and hands. If you have
              sensitive skin, we suggest trying our products that do not include
              any added colors or fragrance. Our Staples Collection products
              include only all natural essential oils. However, some of our
              seasonal products do contain fragrance oils.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Why is my soap sweating?</AccordionTrigger>
            <AccordionContent className="leading-relaxed">
              Soap sweat is very normal and does not affect the way your soap
              will perform. Our soap products contain ingredients like glycerin
              and aloe vera that attract moisture. So when the water from the
              air gets drawn to the soap, it forms beads of moisture on its
              surface, and thus this “sweat” is not actually from the soap
              itself, but from the surrounding humid air.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>What is your return policy?</AccordionTrigger>
            <AccordionContent className="leading-relaxed">
              We do not offer returns on any of our products. We do offer
              refunds in the case your items or package comes damaged. If you
              run into this issue please fill out our Contact Us Form as soon as
              your items arrive.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </>
  );
}
