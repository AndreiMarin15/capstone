import Image from "next/image";

export default function NotesAndReview() {
    return (
      <div className="z-[1] mt-0 w-full max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[59%] max-md:w-full max-md:ml-0">
            <div className="border border-[color:var(--background-background-600,#E8E8E8)] shadow-sm bg-white w-full pl-6 pr-12 py-6 rounded border-solid max-md:max-w-full max-md:mt-6 max-md:px-5">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                <span className="flex grow flex-col items-stretch max-md:mt-10">
                  <div className="text-black text-base font-semibold leading-6">
                    Selected Patient
                  </div>
                  <div className="flex items-stretch justify-between gap-4 mt-5">
                    <Image
                    alt="image"
                    height={0}
                    width={0}
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/07caaf7b2d9f9eabf73cbe715abbbb917f30a4c0fe09aaba01a573f2fa4c3bd3?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
                      className="aspect-square object-contain object-center w-14 overflow-hidden shrink-0 max-w-full"
                    />
                    <span className="self-center flex grow basis-[0%] flex-col items-stretch my-auto">
                      <div className="text-black text-xs font-semibold leading-5">
                        Juan Dela Cruz
                      </div>
                      <div className="text-black text-xs font-medium leading-5 whitespace-nowrap mt-1.5">
                        74 years old | Male
                      </div>
                    </span>
                  </div>
                </span>
  
                <div className="flex flex-col items-stretch w-[48%] ml-5 max-md:w-full max-md:ml-0">
                  <div className="text-black text-base font-semibold leading-6">
                    Selected Doctor
                  </div>
                  <div className="flex items-stretch justify-between gap-4 mt-5">
                    <Image
                    alt="image"
                    height={0}
                    width={0}
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/4178b5990d00702a3619d42e29bbf590bee01c15535b3a80454a72296a27f759?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
                      className="aspect-square object-contain object-center w-14 overflow-hidden shrink-0 max-w-full"
                    />
                    <span className="self-center flex grow basis-[0%] flex-col items-stretch my-auto">
                      <div className="text-black text-xs font-semibold leading-5">
                        Dr. Johnny Santos
                      </div>
                      <div className="text-black text-xs leading-5 whitespace-nowrap mt-2">
                        <span className="font-medium">
                          Specialization: Cardiology
                        </span>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="flex flex-col items-stretch w-[41%] ml-5 max-md:w-full max-md:ml-0">
            <div className="border border-[color:var(--background-background-600,#E8E8E8)] shadow-sm bg-white flex flex-col items-stretch w-full px-4 py-5 rounded max-md:mt-4 max-w-[7]">
              <div className="text-black text-base font-semibold leading-6">
                Notes/Remarks:
              </div>
              <span className="text-zinc-500 text-sm leading-5 bg-stone-50 items-center aspect-square mt-3 pt-2 px-4 rounded-lg max-md:pb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud.{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  