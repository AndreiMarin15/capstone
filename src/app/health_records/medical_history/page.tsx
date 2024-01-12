import * as React from "react";
import Navbar from "../../navbar";

export default function MyComponent() {
  return (
    <div className="border bg-white flex flex-col items-stretch border-solid border-stone-300">
      <div className="shadow-sm bg-white flex w-full items-stretch justify-between gap-5 pl-4 pr-10 py-3 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
        <span className="flex items-stretch justify-between gap-2">
          <div className="flex-col fill-[radial-gradient(59.93%_59.93%_at_50%_50%,#D9D9D9_0%,#3B82F6_0.01%,#A4CFFF_45.83%,#00358C_100%)] overflow-hidden relative flex aspect-square w-[22px] items-center pt-2.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/83bd97a3b9ad8a4df15853122d6698e645dc2f967b2f2cc7fb5c41430ed60187?"
              className="absolute h-full w-full object-cover object-center inset-0"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f90f582d49960701a4c4e6c2288d37b696bf5d95eb2fcd78caf369ca1c1d588?"
              className="aspect-[1.69] object-contain object-center w-full fill-[radial-gradient(50.07%_88.54%_at_50.07%_11.46%,#3B82F6_0%,rgba(30,64,175,0.00)_100%)] overflow-hidden"
            />
          </div>
          <div className="text-blue-500 text-base font-bold leading-6 self-center grow whitespace-nowrap my-auto">
            EndoTracker
          </div>
        </span>
        <span className="flex items-stretch gap-3 self-start">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/420af751190fdb4e560229ef4d3be0fa0ba331fefda2f9a9817a925f6af80e2d?"
            className="aspect-square object-contain object-center w-[21px] overflow-hidden shrink-0 max-w-full"
          />
          <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
            John Doe
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/850e1212f2e2a2e181cf24b4224a15b094709337f2b2ee8e5e7fd5e7556566dc?"
            className="aspect-[2] object-contain object-center w-2.5 overflow-hidden self-center shrink-0 max-w-full my-auto"
          />
        </span>
      </div>
      <div className="w-full max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="flex flex-col items-stretch w-[17%] max-md:w-full max-md:ml-0">
          <Navbar />
          </div>
          
          <div className="flex flex-col items-stretch w-[83%] ml-5 max-md:w-full max-md:ml-0 h-[100vh]">
            <span className="flex flex-col mt-8 px-5 max-md:max-w-full max-md:mt-10">
              <span className="flex w-[221px] max-w-full flex-col items-stretch self-start">
                <div className="text-black text-xl font-semibold leading-8">
                  Health Records
                </div>
                <div className="flex items-stretch justify-between gap-3.5 mt-10">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f93d5b041a77641729755adbc288033a6c368ab9f2f47627fb102ac12928179c?"
                    className="aspect-square object-contain object-center w-[59px] overflow-hidden shrink-0 max-w-full"
                  />
                  <span className="flex grow basis-[0%] flex-col items-stretch mt-4 self-start">
                    <div className="text-black text-xs font-semibold leading-5">
                      DELA CRUZ, Juan
                    </div>
                    <div className="flex items-center">
                      <div className="text-black text-xs leading-5 whitespace-nowrap pr-2">
                        74 years old
                      </div>
                      <div className="relative">
                        <div className="bg-stone-300 w-px h-4 top-0 bottom-0 left-1/2 transform -translate-x-1/2" />
                      </div>
                      <div className="text-black text-xs leading-5 whitespace-nowrap pl-2">
                        Male
                      </div>
                    </div>
                  </span>
                </div>
              </span>
              <span className="flex items-start justify-between gap-5 mt-4 self-start max-md:max-w-full max-md:flex-wrap">
              <div className="text-black text-xs font-medium leading-5 self-center my-auto">
                  Master Data
                </div>
                <span className="text-white text-xs font-medium leading-5 whitespace-nowrap bg-sky-900 self-stretch grow justify-center items-stretch px-6 py-3 rounded-3xl max-md:px-5">
                  Medical History
                </span>
                <div className="text-black text-xs font-medium leading-5 self-center my-auto">
                  Family History
                </div>
                <div className="text-black text-xs font-medium leading-5 self-center grow whitespace-nowrap my-auto">
                  Vitals & Social History
                </div>
              </span>
              <div className="text-black text-xs font-bold leading-5 mt-8 mb-8 max-md:ml-1 max-md:mt-10">
                MEDICAL HISTORY
              </div>

              <span className="flex items-center gap-2.5 mb-8">
                <div className="text-black text-xs font-bold leading-5 whitespace-nowrap">
                    STATUS:
                </div>
                <span className="border self-stretch flex justify-between gap-5 pl-6 pr-2 py-1.5 rounded-md border-solid border-zinc-400 items-start">
                    <div className="text-black text-xs font-medium leading-5">
                        Active
                    </div>
                    <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/554c1e18059b6f0490f9d598b5f23e6954398601ddfbab70a22496a73e532e48?"
                    className="aspect-[0.55] object-contain object-center w-1.5 overflow-hidden self-stretch shrink-0 max-w-full"
                    />
                </span>
            </span>

              <div className="flex grow flex-col items-stretch max-md:mt-10 gap-y-[30px]">
                <span className="flex items-stretch gap-4">
                  <img
                    loading="lazy"
                    src= "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?"
                    className="aspect-square object-contain object-center w-5 overflow-hidden shrink-0 max-w-full"
                  />
                  <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                    Diagnosis
                  </div>
                </span>
                <span className="flex items-stretch gap-4">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?"
                    className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
                  />
                  <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                    Date of Diagnosis
                  </div>
                </span>
                <span className="flex items-stretch gap-4">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/abf6097d90bb41a27fe7af53db50a7e72d58f98784d373f3d96269100499e801?"
                    className="aspect-[0.88] object-contain object-center w-3.5 fill-black overflow-hidden shrink-0 max-w-full"
                  />
                  <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                    Doctor
                  </div>
                </span>
                <span className="flex items-stretch gap-4">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f4d912f8102b745e1cadcdfa06bd7d42c5f96a1f5470e70c3e8d52350dbb2192?"
                    className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
                  />
                  <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                    Procedure/s
                  </div>
                </span>
                <span className="flex items-stretch gap-4">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7902b2ce256c214a23ab208ae308822af7403afd38460b9ef2c7f83be18954b6?"
                    className="aspect-square object-contain object-center w-[18px] overflow-hidden shrink-0 max-w-full"
                  />
                  <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                    Care Plan
                  </div>
                </span>
                <span className="flex items-stretch gap-4">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/73a75686b5cd170bb3f25deb8f06c42c071c4ba5dc25573afa2fcfb453e5b5f4?"
                    className="aspect-square object-contain object-center w-5 overflow-hidden shrink-0 max-w-full"
                  />
                  <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                    Lab Tests
                  </div>
                </span>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


