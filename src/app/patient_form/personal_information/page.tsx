import * as React from "react";

export default function MyComponent() {
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
              Personal Information
            </div>
            <div className="text-zinc-600 text-base leading-6 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </div>
          </div>

          {/* Right Column */}
          <div className="w-1/2 pl-8">
            <div className="flex items-stretch justify-between gap-5 mr-4  max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
              <span className="items-stretch flex grow basis-[0%] flex-col self-start">
                <div className="text-black text-sm font-semibold leading-5">
                  First name
                </div>
                <input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
              </span>
              <span className="items-stretch flex grow basis-[0%] flex-col self-start">
                <div className="text-black text-sm font-semibold leading-5">
                  Last name
                </div>
                <input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
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

            <div className="text-black text-sm font-semibold leading-5 flex items-stretch justify-between gap-5 mr-9 mt-16 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
              Street address
            </div>
            <input className="w-full rounded shadow-sm items-stretch flex shrink-0 h-[30px] mr-9 mt-2 flex-col px-2 py-4 border-[0.5px] border-solid border-black max-md:mr-2.5" />

            <div className="flex items-stretch justify-between gap-5 mr-4 mt-16 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
              <span className="items-stretch flex grow basis-[0%] flex-col">
                <div className="text-black text-sm font-semibold leading-5">
                  City
                </div>
                <input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
              </span>

              <span className="items-stretch flex grow basis-[0%] flex-col">
                <div className="text-black text-sm font-semibold leading-5">
                  State/Province
                </div>
                <input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] border-solid border-black px-2 py-4" />
              </span>
              <span className="items-stretch flex grow basis-[0%] flex-col">
                <div className="text-black text-sm font-semibold leading-5">
                  Postal code
                </div>
                <input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] border-solid border-black px-2 py-4" />
              </span>
            </div>
            <div className="flex items-stretch justify-between gap-5 mr-4 mt-16 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
              <span className="items-stretch flex grow basis-[0%] flex-col">
                <div className="text-black text-sm font-semibold leading-5">
                  Allergies
                </div>
                <input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
              </span>
              {/*<span className="text-black text-lg font-semibold leading-7 whitespace-nowrap aspect-square justify-center items-stretch mt-7 px-2 py-2.5 rounded-[50%] self-end">
                +
</span>*/}
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
