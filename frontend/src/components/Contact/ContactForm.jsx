import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import {
  CheckCircleIcon,
  QuestionMarkCircleIcon,
  ShoppingCartIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/20/solid";
import classNames from "../../utils/classNames";
import { useCreateSubmissionMutation } from "../../slices/contactFormsSlice";

const mailingLists = [
  {
    title: "Question",
  },
  {
    title: "Custom Order",
  },
  {
    title: "Issue",
  },
];

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: mailingLists[0]["title"],
  message: "",
};

export default function ContactForm() {
  const [mailingList, setMailingList] = useState(mailingLists[0]);
  const [form, setForm] = useState(emptyForm);
  const [createSubmission] = useCreateSubmissionMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createSubmission(form);
    setForm({ ...emptyForm });
    setMailingList(mailingLists[0]);
  };

  return (
    <>
      <section className="bg-transparent font-poppins">
        <div className="mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 items-start gap-x-24 gap-y-8 md:grid-cols-5">
            <div className="py-10 md:col-span-2">
              <h2 className="text-4xl font-extrabold text-gray-900">
                CONTACT US
              </h2>
              <p className="mt-8 max-w-xl text-lg">
                {`Whether you're curious about our products, business, 
                or even collaborating with us—we're ready to answer any and all 
                questions you may have.`}
              </p>

              <ul className="mt-12 max-w-xl space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <QuestionMarkCircleIcon
                    className="mt-1 h-5 w-5 flex-none text-pink-300"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      General Inquiries:
                    </strong>{" "}
                    Have a question about our business or website? Please fill
                    out our contact form so we can assist you with any questions
                    you may have. All submitted inquiries will be processed in
                    the order we receive them.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ShoppingCartIcon
                    className="mt-1 h-5 w-5 flex-none text-pink-300"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Custom Orders:
                    </strong>{" "}
                    If you are interested in requesting a bulk order or
                    collaborating with us, please reach out to us! We are open
                    to exploring new opportunities.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <WrenchScrewdriverIcon
                    className="mt-1 h-5 w-5 flex-none text-pink-300"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Issues.
                    </strong>{" "}
                    {`If you have any issues with your order or our website,
                    please don't hesitate to let us know. We want to fix
                    any issues our customers encounter.`}
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg bg-brandPink px-6 py-10 text-slate shadow-lg sm:px-10 md:col-span-3 lg:p-12">
              <h3 className="text-xl font-semibold text-gray-900">
                Send us a message
              </h3>
              <form
                className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium"
                  >
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      required
                      className="block w-full rounded-md border-gray-400 bg-white-50 px-4 py-3 shadow-sm focus:border-brandBlue focus:ring-brandBlue"
                      value={form.firstName}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          firstName: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium"
                  >
                    Last name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      required
                      className="block w-full rounded-md border-gray-400 bg-white-50 px-4 py-3 shadow-sm focus:border-brandBlue focus:ring-brandBlue"
                      value={form.lastName}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          lastName: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-gray-400 bg-white-50 px-4 py-3 shadow-sm focus:border-brandBlue focus:ring-brandBlue"
                      value={form.email}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          email: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium"
                    >
                      Phone
                    </label>
                    <span id="phone-optional" className="text-sm">
                      Optional
                    </span>
                  </div>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      className="block w-full rounded-md border-gray-400 bg-white-50 px-4 py-3 shadow-sm focus:border-brandBlue focus:ring-brandBlue"
                      aria-describedby="phone-optional"
                      value={form.phone}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          phone: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <RadioGroup
                    value={mailingList}
                    onChange={(value) => {
                      setMailingList(value);
                      setForm({
                        ...form,
                        subject: value.title,
                      });
                    }}
                  >
                    <RadioGroup.Label className="block text-sm font-medium">
                      Select a subject
                    </RadioGroup.Label>

                    <div className="mt-2 grid grid-cols-3 gap-x-4">
                      {mailingLists.map((mailingList) => (
                        <RadioGroup.Option
                          key={mailingList.title}
                          value={mailingList}
                          className={({ checked, active }) =>
                            classNames(
                              checked
                                ? "border-transparent"
                                : "border-gray-400",
                              active
                                ? "border-brandBlue ring-2 ring-brandBlue"
                                : "",
                              "relative flex cursor-pointer rounded-lg border bg-white-50 p-2 shadow-sm focus:outline-none xs:p-4"
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <span className="flex flex-1 justify-center xs:justify-start">
                                <span className="flex flex-col justify-center">
                                  <RadioGroup.Label
                                    as="span"
                                    className="block text-center text-sm font-medium"
                                  >
                                    {mailingList.title}
                                  </RadioGroup.Label>
                                </span>
                              </span>
                              <CheckCircleIcon
                                className={classNames(
                                  !checked ? "invisible" : "",
                                  "hidden h-5 w-5 xs:block"
                                )}
                                aria-hidden="true"
                              />
                              <span
                                className={classNames(
                                  active ? "border" : "border-2",
                                  checked
                                    ? "border-brandBlue"
                                    : "border-transparent",
                                  "pointer-events-none absolute -inset-px rounded-lg"
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
                <div className="sm:col-span-2">
                  <div className="flex justify-between">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium"
                    >
                      Message
                    </label>
                    <span id="message-max" className="text-sm">
                      Max. 500 characters
                    </span>
                  </div>
                  <div className="mt-2">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="block w-full rounded-md border-gray-400 bg-white-50 px-4 py-3 shadow-sm focus:border-brandBlue focus:ring-brandBlue"
                      aria-describedby="message-max"
                      defaultValue={""}
                      value={form.message}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          message: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 sm:flex sm:justify-end">
                  <button
                    type="submit"
                    className="active:ring-white mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-green-400 px-6 py-3 text-base font-medium text-gray-900 shadow-sm hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-brandBlue sm:w-auto"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
