import {
  TruckIcon,
  HeartIcon,
  StarIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Quality Ingredients",
    description:
      "We only incorporate high quality ingredients into our soap products. Each product is made in small batches, to maintain our high quality standard.",
    icon: GlobeAmericasIcon,
  },
  {
    name: "Handmade Products",
    description:
      "All our soap products are handmade for our customers. We take the time to ensure that each handcrafted soap is made with high quality and care in mind.",
    icon: HeartIcon,
  },
  {
    name: "Bulk Orders",
    description:
      "We are open to working with our customers that want to order our products in bulk. Please visit our Contact page to inquire more about working with us.",
    icon: TruckIcon,
  },
  {
    name: "Seasonal Collections",
    description:
      "Keep a look out for our seasonal collections that we release periodically throughout the year. Sign up for updates below if you want to be notified about future releases.",
    icon: StarIcon,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="mx-auto mt-24 max-w-7xl px-4 sm:mt-32 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          A better way to spend money.
        </h2>
        <p className="mt-6 text-lg leading-8 text-slate">
          {`If our amazing collection of soap products wasn't enough, here are a few 
          reasons why you should consider shopping, or working, with Beanie Bubble.`}
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 md:max-w-5xl lg:mt-24">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 md:max-w-none md:grid-cols-2 md:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-slate">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-white-50">
                  <feature.icon
                    className="h-6 w-6 text-gray-900"
                    aria-hidden="true"
                  />
                </div>
                {feature.name}
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-700">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
