import { ContactForm, FAQs, Subscribers } from "../components/index.jsx";
import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <>
      <div className="mt-4 overflow-hidden rounded-[54px] bg-white-50 py-16 shadow-[0_4px_67px_rgba(0,0,0,0.15)] xs:rounded-[94px]">
        <div className="flex items-center justify-center px-6 pb-20 sm:px-16 sm:py-12">
          <div className="flex w-full items-center justify-center xl:max-w-[1280px]">
            <ContactForm />
          </div>
        </div>

        <div className="mt-16 flex items-center justify-center bg-brandPink px-6 py-16 shadow-[0_4px_67px_rgba(0,0,0,0.1)] sm:px-16 sm:py-20">
          <div className="w-full font-poppins">
            <Subscribers />
          </div>
        </div>

        <div className="mx-auto px-6 py-4 sm:px-16 sm:py-20 xl:max-w-[1280px]">
          <FAQs />
        </div>
      </div>
    </>
  );
}
