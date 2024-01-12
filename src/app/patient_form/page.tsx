import React from "react";

const TwoColumnLayout = () => {
  return (
    <div className="container mx-auto mt-8 flex h-[100vh]">
      {/* Left Column */}
      <div className="w-1/2 pr-8">
        <h2 className="text-2xl font-bold mb-4">Left Column</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
          mollis ipsum, id eleifend elit.
        </p>
      </div>

      {/* Right Column */}
      <div className="w-1/2 pl-8">
      <div className="flex items-stretch justify-between gap-5 mr-4 mt-16 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
          <span className="items-stretch flex grow basis-[0%] flex-col self-start">
            <div className="text-black text-sm font-semibold leading-5">
              First name
            </div>
            <div className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] border-solid border-black" />
          </span>
          <span className="items-stretch flex grow basis-[0%] flex-col self-start">
            <div className="text-black text-sm font-semibold leading-5">
              Last name
            </div>
            <div className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] border-solid border-black" />
          </span>
        </div>


        <div className="flex items-stretch justify-between gap-5 mr-4 mt-16 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
          <span className="items-stretch flex grow basis-[0%] flex-col self-start">
            <div className="text-black text-sm font-semibold leading-5 whitespace-nowrap">
              Contact number
            </div>
            <span className="items-stretch rounded shadow-sm flex justify-between gap-1 mt-2 px-3 py-1.5 border-[0.5px] border-solid border-black">
              <div className="text-zinc-600 text-sm leading-5 whitespace-nowrap justify-center pl-2.5 pr-1 py-1 items-start max-md:pr-5">
                +63
              </div>
              <div className="text-stone-300 text-sm leading-5 grow whitespace-nowrap justify-center pl-1.5 pr-2 py-1 items-start max-md:pr-5">
                9171234567
              </div>
            </span>
          </span>
          <span className="items-stretch flex grow basis-[0%] flex-col">
            <div className="text-black text-sm font-semibold leading-5">
              Gender
            </div>
            <span className="text-stone-300 text-sm leading-5 whitespace-nowrap rounded shadow-sm justify-center mt-2 pl-2 pr-16 py-2.5 border-[0.5px] border-solid border-black items-start max-md:pr-5">
              Select
            </span>
          </span>
          <div className="flex items-stretch gap-2.5 mt-1. self-start">
            <span className="flex grow basis-[0%] flex-col items-stretch">
              <div className="text-black text-sm font-semibold leading-5">
                Birthdate
              </div>
              <div className="flex items-stretch justify-between gap-2.5 mt-2">
                <span className="text-stone-300 text-sm leading-5 whitespace-nowrap rounded shadow-sm aspect-[1.8333333333333333] justify-center items-stretch px-4 py-2.5 border-[0.5px] border-solid border-black">
                  MM
                </span>
                <span className="text-stone-300 text-sm leading-5 whitespace-nowrap rounded shadow-sm aspect-[1.8333333333333333] justify-center items-stretch px-5 py-2.5 border-[0.5px] border-solid border-black">
                  DD
                </span>
              </div>
            </span>
            <span className="text-stone-300 text-sm leading-5 whitespace-nowrap rounded shadow-sm grow justify-center items-stretch mt-6 px-5 py-2.5 border-[0.5px] border-solid border-black self-end max-md:px-5">
              YYYY
            </span>
          </div>
        </div>

        <div className="flex items-stretch justify-between gap-5 mr-4 mt-16 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
          Street address
        </div>
        <div className="rounded shadow-sm flex items-stretch shrink-0 h-[30px] flex-col border-[0.5px] border-solid border-black max-md:mr-2.5" />

        <div className="flex items-stretch justify-between gap-5 mr-4 mt-16 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
          <span className="items-stretch flex grow basis-[0%] flex-col">
            <div className="text-black text-sm font-semibold leading-5">
              City
            </div>
            <div className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] border-solid border-black" />
          </span>
          <span className="items-stretch flex grow basis-[0%] flex-col">
            <div className="text-black text-sm font-semibold leading-5">
              State/Province
            </div>
            <div className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] border-solid border-black" />
          </span>
          <span className="items-stretch flex grow basis-[0%] flex-col">
            <div className="text-black text-sm font-semibold leading-5">
              Postal code
            </div>
            <div className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] border-solid border-black" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default TwoColumnLayout;
