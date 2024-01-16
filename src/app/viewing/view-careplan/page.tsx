import * as React from "react";

export default function viewCarePlan() {
  return (
    <div className="h-full border bg-white flex flex-col px-20 py-12 border-solid border-stone-300 max-md:px-5">
      <span className="self-start flex w-full max-w-[918px] items-center justify-between gap-5 mt-12 px-px max-md:max-w-full max-md:flex-wrap max-md:mt-10">
        <div className="text-black text-xl font-semibold leading-8 flex-1 my-auto">
          Care Plan #1
        </div>
        <span className="self-stretch flex items-stretch justify-between gap-2">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/dd24b9989b2d32393ba168dd2d578d88a7f713a84668cedf9fa458e426c6e512?"
            className="aspect-square object-contain object-center w-[19px] fill-black fill-opacity-0 overflow-hidden shrink-0 max-w-full"
          />
          <div className="text-blue-500 text-base font-semibold leading-6 self-center grow whitespace-nowrap my-auto">
            Print as PDF
          </div>
        </span>
      </span>
      <span className="flex items-stretch gap-1 mt-4 self-start max-md:ml-2.5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a85a467796d751cb5ded5847f2714f4bae82ca57ba65095b371ed09797bd0658?"
          className="aspect-square object-contain object-center w-[21px] overflow-hidden shrink-0 max-w-full"
        />
        <div className="text-black text-sm font-semibold leading-5 grow whitespace-nowrap mt-2 self-start">
          CREATED BY:{" "}
          <span className="">Dr. Johnny Santos - Endocrinology</span>
        </div>
      </span>
      <span className="flex items-stretch gap-1 mt-2.5 self-start max-md:ml-2.5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f26cf3ca72d3c8bb2d17ce4d79fc83934f949a85f101f5fbea54a4c1cda3229?"
          className="aspect-[1.06] object-contain object-center w-[19px] overflow-hidden shrink-0 max-w-full"
        />
        <div className="text-black text-sm font-semibold leading-5 self-center grow whitespace-nowrap my-auto">
          CREATED ON: <span className="">2023-01-07</span>
        </div>
      </span>

      <div className="self-start w-full max-w-[918px] mt-10 px-2 max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[21%] max-md:w-full max-md:ml-0">
            <div className="flex items-center gap-4 my-auto max-md:mt-10">
              <div className="flex basis-[0%] flex-col items-center my-auto">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c30a6e4fc539ac988d28f6ab6785ceeca11c1aaa77f6d0272dd9cc6a0a0d3820?"
                  className="aspect-square object-contain object-center w-6 overflow-hidden"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ed9fdfc8e5d8d154f4e19144450c46befc8c837076372eb4558e3c022a2dd62?"
                  className="aspect-[2.5] object-contain object-center w-6 overflow-hidden mt-8"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/87ca70ae252b347ccd1a7f94322c75fde5eccbeaecf0c288f0c1483be1e110ce?"
                  className="aspect-[1.41] object-contain object-center w-6 overflow-hidden mt-10"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0cab09a72c90afc03696d3dc2ca45a2e63e8b730e21455af9a7bf1772fd796a5?"
                  className="aspect-[1.2] object-contain object-center w-6 overflow-hidden mt-8"
                />
              </div>
              <span className="items-stretch self-stretch flex grow basis-[0%] flex-col">
                <div className="text-black text-xs font-semibold leading-5 whitespace-nowrap">
                  Brand Name
                </div>
                <div className="text-black text-xs font-semibold leading-5 whitespace-nowrap mt-9">
                  Generic Name
                </div>
                <div className="text-black text-xs font-semibold leading-5 mt-9">
                  Dose
                </div>
                <div className="text-black text-xs font-semibold leading-5 mt-9">
                  Form
                </div>
                <div className="text-black text-xs font-semibold leading-5 mt-9">
                  Quantity
                </div>
                <div className="text-black text-xs font-semibold leading-5 mt-9">
                  Note
                </div>
              </span>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[79%] ml-5 mt-5 max-md:w-full max-md:ml-0">
            <span className="items-stretch flex flex-col my-auto max-md:max-w-full max-md:mt-10">
              <div className="text-black text-xs leading-5 max-md:max-w-full">
                Losartan
              </div>
              <div className="text-black text-xs leading-5 mt-9 max-md:max-w-full">
                Losartan
              </div>
              <div className="text-black text-xs leading-5 mt-9 max-md:max-w-full">
                50 mg
              </div>
              <div className="text-black text-xs leading-5 mt-9 max-md:max-w-full">
                Tablet
              </div>
              <div className="text-black text-xs leading-5 mt-9 max-md:max-w-full">
                30
              </div>
              <div className="text-black text-xs leading-5 mt-9 max-md:max-w-full">
                <ul>
                  <li>1 tablet 1x/ day for 30 days</li>
                  <li>
                    30 minutes of moderate-intensity exercise (e.g., brisk
                    walking, swimming, or cycling) at least five days a week.
                  </li>
                </ul>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
