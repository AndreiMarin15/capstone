import * as React from "react";

{
  /* MISSING ITEMS 
    - Progress Bar
    - Multiple Choice options (Smoker Status, Alcohol Consumption, Physical Activities)
    - Restrict input (Cigarettes per day)*/
}

export default function family_history() {
  return (
    <div className="border bg-white flex flex-col items-stretch pb-8 border-solid border-stone-300">
      <div className="shadow-sm bg-white flex w-full flex-col justify-center pl-4 pr-16 py-3 items-start max-md:max-w-full max-md:pr-5 max-sm:hidden">
        <span className="flex items-stretch gap-2">
          <div className="flex-col fill-[radial-gradient(59.93%_59.93%_at_50%_50%,#D9D9D9_0%,#3B82F6_0.01%,#A4CFFF_45.83%,#00358C_100%)] overflow-hidden relative flex aspect-square w-[22px] items-center pt-2.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5c3f4d00fff88c11c0b749d752a37d84fc9a7f14af72ad4d2717c52156cc88e1?"
              className="absolute h-full w-full object-cover object-center inset-0"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/52c2481ba9b5fc07f4dfb5bb7e3e915846d4b1f7f4bc690044aa72edf8a759a5?"
              className="aspect-[1.69] object-contain object-center w-full fill-[radial-gradient(50.07%_88.54%_at_50.07%_11.46%,#3B82F6_0%,rgba(30,64,175,0.00)_100%)] overflow-hidden"
            />
          </div>
          <div className="text-blue-500 text-base font-bold leading-6 self-center grow whitespace-nowrap my-auto">
            EndoTracker
          </div>
        </span>
      </div>
      <span className="flex w-full flex-col mt-11 px-20 max-md:max-w-full max-md:mt-10 max-md:px-5">
        <span className="self-stretch flex items-center justify-between gap-5 ml-4 mr-4 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5">
          <div className="text-black text-xl font-semibold leading-8 my-auto">
            Patient Registration
          </div>
          <span className="self-stretch flex items-center justify-between gap-5">
            <div className="text-gray-400 text-xs font-medium leading-5 grow whitespace-nowrap my-auto">
              Already have an account?
            </div>
            <button className="text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-sky-900 self-stretch grow px-6 py-2 rounded max-md:px-5">
              SIGN IN
            </button>
          </span>
        </span>
        {/* <div className="self-center flex w-[771px] max-w-full items-stretch justify-between gap-5 mt-16 max-md:flex-wrap max-md:mt-10">
          <span className="items-center flex basis-[0%] flex-col">
            <span className="text-white text-xl font-semibold leading-8 whitespace-nowrap aspect-square justify-center items-stretch px-4 py-3.5 rounded-[50%]">
              1
            </span>
            <div className="text-sky-900 text-base leading-6 self-stretch whitespace-nowrap mt-1.5">
              Personal Information
            </div>
          </span>
          <div className="flex grow basis-[0%] flex-col items-center self-start max-md:max-w-full">
            <div className="flex items-center gap-0.5 max-md:max-w-full max-md:flex-wrap">
              <span className="text-white text-xl font-semibold leading-8 whitespace-nowrap self-stretch aspect-square justify-center items-stretch px-4 py-3.5 rounded-[50%]">
                2
              </span>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d6d8a4f1f780d171fc0c5979ae4dc06265006cb1fe0d65d68ef9c0b303f1fd7b?"
                className="aspect-[83.5] object-contain object-center w-[167px] stroke-[2px] stroke-gray-400 overflow-hidden shrink-0 max-w-full my-auto"
              />
              <span className="text-white text-xl font-semibold leading-8 whitespace-nowrap self-stretch aspect-square justify-center items-stretch px-4 py-3.5 rounded-[50%]">
                3
              </span>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d6d8a4f1f780d171fc0c5979ae4dc06265006cb1fe0d65d68ef9c0b303f1fd7b?"
                className="aspect-[83.5] object-contain object-center w-[167px] stroke-[2px] stroke-gray-400 overflow-hidden shrink-0 max-w-full my-auto"
              />
              <span className="text-white text-xl font-semibold leading-8 whitespace-nowrap self-stretch aspect-square justify-center items-stretch px-4 py-3.5 rounded-[50%]">
                4
              </span>
            </div>
            <span className="self-stretch flex items-stretch justify-between gap-5 mt-3 max-md:max-w-full max-md:flex-wrap">
              <div className="text-gray-400 text-base leading-6">
                Family History
              </div>
              <div className="text-gray-400 text-base leading-6">
                Social History
              </div>
              <div className="text-gray-400 text-base leading-6">
                Medical History
              </div>
            </span>
          </div>
  </div> */}
        <div className="container mx-auto mt-16 flex h-[100vh]">
          {/* Left Column */}
          <div className="w-1/2 pr-8">
            <div className="text-black text-base font-semibold leading-6">
              Social History
            </div>
            <div className="text-zinc-600 text-base leading-6 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </div>
          </div>

          {/* Right Column */}
          <div className="w-1/2 pl-8 mr-24">
            <div className="flex items-stretch justify-between gap-5 mr-32 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
              <span className="items-stretch flex grow basis-[0%] flex-col self-start">
                <div className="text-black text-sm font-semibold leading-5">
                  Smoker Status
                </div>
                <input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
              </span>
              <span className="items-start flex grow basis-[0%] flex-col self-start">
                <div className="text-black text-sm font-semibold leading-5">
                  Cigarettes per day
                </div>
                <input className="w-16 rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
              </span>
            </div>

            <div className="flex items-stretch justify-between gap-3 mr-32 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
              <span className="items-stretch flex grow basis-[0%] flex-col self-start">
                <div className="text-black text-sm font-semibold leading-5">
                  Alcohol Consumption
                </div>
                <input className="w-52 rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
              </span>
            </div>

            <div className="flex items-stretch justify-between gap-3 mr-32 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
              <span className="items-stretch flex grow basis-[0%] flex-col self-start">
                <div className="text-black text-sm font-semibold leading-5">
                  Physical Activities
                </div>
                <input className="w-52 rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
              </span>
            </div>

            <div className="w-full flex justify-end">
              <button className="text-white text-xs font-semibold whitespace-nowrap justify-center flex items-stretch bg-sky-900 mr-2 mt-12 px-7 py-2 rounded max-md:mr-2.5 max-md:px-5">
                NEXT
              </button>
            </div>
          </div>
        </div>
      </span>
    </div>
  );
}
