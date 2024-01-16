import * as React from "react";

{/* TO DO: Turn into component */}


export default function viewCarePlanList() {
  return (
    <div className="border bg-white flex flex-col items-center px-20 py-12 border-solid border-stone-300 max-md:px-5">
      <div className="flex w-full max-w-[928px] items-stretch justify-between gap-5 mt-11 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
        <span className="flex flex-col items-stretch">
          <div className="text-black text-xl font-semibold leading-8 whitespace-nowrap">
            Care Plans and Laboratory Tests
          </div>
          <div className="flex items-stretch gap-0 mt-3">
            <div className="bg-sky-900 flex w-[115px] shrink-0 h-8 flex-col rounded-3xl" />
            <span className="items-stretch flex gap-5 mt-2 self-start">
              <div className="text-white text-xs font-medium leading-5">
                Care Plans
              </div>
              <div className="text-black text-xs font-medium leading-5">
                Laboratory Tests
              </div>
            </span>
          </div>
        </span>
        <div className="flex items-stretch gap-2.5 mt-8 self-end">
          <span className="flex items-stretch justify-between gap-2 py-2 rounded-md border-[0.5px] border-solid border-black">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2aee5eaae6c8b317fa94c9456603d2ba5c59247e65984390a06ee8f8b01312c?"
              className="aspect-square object-contain object-center w-[13px] fill-stone-300 overflow-hidden shrink-0 max-w-full"
            />
            <div className="text-stone-300 text-xs leading-5 my-auto">
              SEARCH
            </div>
          </span>
          <span className="flex items-stretch justify-between gap-1 px-2.5 py-2 rounded-md border-[0.5px] border-solid border-black">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7824f47aef79f0674e3de34f06de56a14c198999165016166b0825bd17c7945d?"
              className="aspect-[0.86] object-contain object-center w-3 overflow-hidden shrink-0 max-w-full"
            />
            <div className="text-black text-xs leading-5 self-center grow whitespace-nowrap my-auto">
              FILTER
            </div>
          </span>
        </div>
      </div>
      <img
        loading="lazy"
        srcSet="..."
        className="aspect-[16.57] object-contain object-center w-[928px] shadow-sm overflow-hidden max-w-[928px] ml-24 mt-8 rounded-lg max-md:max-w-full"
      />
      <div className="shadow-sm bg-white flex w-full max-w-[928px] flex-col items-stretch mt-2 mb-2 pt-6 pb-9 px-6 rounded-lg max-md:max-w-full max-md:px-5">
        <div className="items-stretch flex w-full gap-16 pl-2 pr-5 pb-5 max-md:max-w-full max-md:flex-wrap">
          <span className="items-stretch flex justify-between gap-10 self-start max-md:max-w-full max-md:flex-wrap">
            <span className="items-stretch flex justify-between gap-16">
              <div className="text-black text-base leading-6">2023-01-07</div>
              <div className="text-black text-base leading-6">
                Dr. Johnny Santos
              </div>
            </span>
            <div className="text-black text-base leading-6">Cardiology</div>
            <div className="text-black text-base leading-6">2023-01-28</div>
          </span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/563df85092d5b0450f0170c683ae9cae5a7696bba4532f8cb3aab08c8dcbfc71?"
            className="aspect-[1.12] object-contain object-center w-[29px] overflow-hidden shrink-0 max-w-full"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/053026d3147102715d19c4f7f52d19ffc06a9b0d2c9822a9e436a3fa0d71cce2?"
            className="aspect-[1.04] object-contain object-center w-[25px] fill-black fill-opacity-0 overflow-hidden shrink-0 max-w-full self-start"
          />
        </div>
        
    
        
      </div>
    </div>
  );
}


