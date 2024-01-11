import * as React from "react";

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
            <div className="items-stretch shadow-sm flex w-full grow flex-col mx-auto pt-7 pb-12 px-3 max-md:mt-10" style={{background: "linear-gradient(180deg, #00296C 0%, rgba(0, 82, 216, 0.51) 99.99%, rgba(0, 97, 255, 0.57) 100%)"}}>
              <span className="items-stretch rounded shadow-sm bg-white bg-opacity-0 flex justify-between gap-2.5 px-3 py-2.5 max-md:pr-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/47e67a9dca9eb1ad1f1ee586eb9c4f52b09e2baf7a6546db2b589db473c7bf7a?"
                  className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
                />
                <div className="text-white text-xs font-semibold grow whitespace-nowrap self-start">
                  Dashboard
                </div>
              </span>
              <span className="items-stretch rounded shadow-sm bg-white bg-opacity-0 flex justify-between gap-2.5 mt-2.5 px-3 py-2.5 max-md:pr-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f9c43abea937dfcb94c562af7386aed6ebf39633f38ef2eb125de44f44e12f1?"
                  className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
                />
                <div className="text-white text-xs font-semibold grow whitespace-nowrap self-start">
                  Health Records
                </div>
              </span>
              <span className="items-stretch rounded shadow-sm bg-white bg-opacity-0 flex justify-between gap-2.5 mt-2.5 px-3 py-2.5 max-md:pr-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/65003c7954e9060e7972c1395d284ed0394b1a751cd4a8dfbb06cba627b76ab5?"
                  className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
                />
                <div className="text-white text-xs font-semibold grow whitespace-nowrap self-start">
                  Predictive Analytics
                </div>
              </span>
              <span className="items-stretch rounded shadow-sm bg-white bg-opacity-0 flex justify-between gap-2.5 mt-2.5 px-3 py-2.5 max-md:pr-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/db8d1ed60ebf26f113c515de8a5f6b0346b09bef90f202687d2d4e5c65ef6b04?"
                  className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
                />
                <div className="text-white text-xs font-semibold grow whitespace-nowrap self-start">
                  Referral
                </div>
              </span>
              <span className="items-stretch rounded shadow-sm bg-white bg-opacity-0 flex justify-between gap-2.5 mt-2.5 px-3 py-2.5 max-md:pr-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1f97c38d1861c9f15e7785d2fb60aa2e67056d9cbf10b632c0a227519b230848?"
                  className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
                />
                <div className="text-white text-xs font-semibold grow whitespace-nowrap self-start">
                  Messages
                </div>
              </span>
              <span className="items-stretch rounded shadow-sm bg-white bg-opacity-0 flex justify-between gap-2.5 mt-2.5 mb-80 px-3 py-2.5 max-md:mb-10 max-md:pr-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8f4408bbd37502169ad0ec9c3bb74645681e1577ab7fba2e42998850f280320?"
                  className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
                />
                <div className="text-white text-xs font-semibold grow whitespace-nowrap self-start">
                  Account
                </div>
              </span>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[83%] ml-5 max-md:w-full max-md:ml-0">
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
                      DELA CRUZ, JUAN
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
                <span className="text-white text-xs font-medium leading-5 whitespace-nowrap bg-sky-900 self-stretch grow justify-center items-stretch px-6 py-3 rounded-3xl max-md:px-5">
                  Master Data
                </span>
                <div className="text-black text-xs font-medium leading-5 self-center my-auto">
                  Medical History
                </div>
                <div className="text-black text-xs font-medium leading-5 self-center my-auto">
                  Family History
                </div>
                <div className="text-black text-xs font-medium leading-5 self-center grow whitespace-nowrap my-auto">
                  Vitals & Social History
                </div>
              </span>
              <div className="text-black text-xs font-bold leading-5 mt-8 max-md:ml-1 max-md:mt-10">
                MASTER DATA
              </div>
              <div className="self-stretch mt-10 px-5 max-md:max-w-full max-md:mt-10 max-md:pr-5">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                  <div className="flex flex-col items-stretch w-[44%] max-md:w-full max-md:ml-0">
                    <div className="z-[1] flex items-stretch gap-4 my-auto max-md:mt-10">
                      <div className="items-left flex-col max-md:hidden">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/86bc0813aecf897cafa42df901705c229a0a744cbf822394277aece4f7f5aa61?"
                          className="aspect-square object-contain object-center w-5 overflow-hidden"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/bdc83ab0b012624934a85572bc069777ad324e289e4cc66764a07f718b44bf9d?"
                          className="aspect-[1.25] object-contain object-center w-5 overflow-hidden mt-9"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?"
                          className="aspect-[1.25] object-contain object-center w-5 fill-black overflow-hidden mt-9"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4c3ec2f045c5a91d05c1f074f660097897b8fc83403da81ed7f44111303ef22f?"
                          className="aspect-[1.25] object-contain object-center w-5 overflow-hidden mt-9"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e77ec5f69c4c6a607193ae426085edd6fc84819ef906d2d9ebb491b796c8519b?"
                          className="aspect-[1.11] object-contain object-center w-5 overflow-hidden mt-9"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2afcd7832aea3646cef217f7aaf19b311bd3133a443e8b91269a59998c8333c5?"
                          className="aspect-square object-contain object-center w-5 overflow-hidden mt-9"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d354e02d857f0929bd9b58b2f172642a26d8df38bfdf167b22bd115bfe9b4fea?"
                          className="aspect-[1.11] object-contain object-center w-5 overflow-hidden mt-9"
                        />
                      </div>
                      <span className="items-stretch flex grow basis-[0%] flex-col self-start">
                        <div className="text-black text-xs font-semibold leading-5 whitespace-nowrap">
                          Name
                        </div>
                        <div className="text-black text-xs font-semibold leading-5 whitespace-nowrap mt-9">
                          Age
                        </div>
                        <div className="text-black text-xs font-semibold leading-5 whitespace-nowrap mt-9">
                          Birthday
                        </div>
                        <div className="text-black text-xs font-semibold leading-5 whitespace-nowrap mt-9">
                          Gender
                        </div>
                        <div className="text-black text-xs font-semibold leading-5 whitespace-nowrap mt-9">
                          Address
                        </div>
                        <div className="text-black text-xs font-semibold leading-5 whitespace-nowrap mt-9">
                          Contact
                        </div>
                        <div className="text-black text-xs font-semibold leading-5 whitespace-nowrap mt-9">
                          Allergies
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch w-[56%] ml-5 max-md:w-full max-md:ml-0">
                    <span className="items-stretch flex flex-col my-auto max-md:mt-10">
                      <div className="text-black text-xs leading-5">
                        Juan Dela Cruz
                      </div>
                      <div className="text-black text-xs leading-5 mt-9">
                        74
                      </div>
                      <div className="text-black text-xs leading-5 mt-9">
                        January 01, 1950
                      </div>
                      <div className="text-black text-xs leading-5 mt-9">
                        Male
                      </div>
                      <div className="text-black text-xs leading-5 whitespace-nowrap mt-9">
                        1 Pasay Rd. Pasay City, Metro Manila
                      </div>
                      <div className="text-black text-xs leading-5 mt-9">
                        0999 999 9999
                      </div>
                      <div className="text-black text-xs leading-5 mt-9">
                        Penicillin
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


