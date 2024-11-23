import React from 'react';

// Define TypeScript interfaces for the plan data
interface Plan {
  name: string;
  desc: string;
  price: number;
  isMostPop: boolean;
  features: string[];
}

// Sample data for the plans
const plans: Plan[] = [
  {
    name: "Free",
    desc: "Ideal for basic use. Includes 5 files and support for Windows executables and compiled files.",
    price: 0,
    isMostPop: false,
    features: [
      "5 Files",
      "Windows Executable Files",
      "Compiled Executable Files",
    ],
  },
  {
    name: "Member",
    desc: "Perfect for growing needs. Manage up to 15 files with support for Windows and Linux executables.",
    price: 35,
    isMostPop: true,
    features: [
      "15 Files",
      "Windows Executable Files",
      "Linux Executable Files",
      "Compiled Executable Files",
    ],
  },
  {
    name: "Pro",
    desc: "For advanced projects. Handle unlimited files with support for all major file types and executables.",
    price: 60,
    isMostPop: false,
    features: [
      "Unlimited Files",
      "Windows Executable Files",
      "Linux Executable Files",
      "Compiled Executable Files",
      "Interpretable Files",
      "JAR Files"
    ],
  },
];



const PricingSection: React.FC = () => {
  return (
    <section className='py-14 bg-transparent pattern'>
      <div className="max-w-screen-xl mx-auto px-4 text-gray-300 md:px-8">
        <div className='relative max-w-xl mx-auto sm:text-center'>
          <h3 className='text-gray-200 text-3xl font-semibold sm:text-4xl'>
            Pricing
          </h3>
          <div className='mt-3 max-w-xl'>
            <p>
              Explore our flexible pricing plans designed to fit various needs. Choose from basic, growing, and advanced options to find the perfect fit for you.
            </p>
          </div>
        </div>

        <div className='mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3'>
          {plans.map((item, idx) => (
            <div
              key={idx}
              className={`relative flex-1 flex items-stretch flex-col rounded-xl border-2 mt-6 sm:mt-0 ${item.isMostPop ? "mt-10" : ""}`}
            >
              {item.isMostPop && (
                <span className="w-32 absolute -top-5 left-0 right-0 mx-auto px-3 py-2 rounded-full border shadow-md bg-white text-center text-gray-700 text-sm font-semibold">
                  Most popular
                </span>
              )}
              <div className="p-8 space-y-4 border-b">
                <span className='text-indigo-600 font-medium'>
                  {item.name}
                </span>
                <div className='text-gray-200 text-3xl font-semibold'>
                  ${item.price} <span className="text-xl text-gray-600 font-normal">/mo</span>
                </div>
                <p>
                  {item.desc}
                </p>
                <button className='px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700'>
                  Get Started
                </button>
              </div>
              <ul className='p-8 space-y-3'>
                <li className="pb-2 text-gray-300 font-medium">
                  <p>Features</p>
                </li>
                {item.features.map((featureItem, idx) => (
                  <li key={idx} className='flex items-center gap-5'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 text-indigo-600'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                    {featureItem}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
