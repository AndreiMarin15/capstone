import Image from "next/image";

// Define the component function
export default function NotesAndReview() {
  // Return JSX code for the component
  return (
    <div className="flex flex-col ml-2 mr-6">
          <div className="border border-[color:var(--background-background-600,#E8E8E8)] shadow-sm bg-white w-[96%] pl-8 py-6 ml-10">
            <div className="gap-5 flex">
              <span className="flex grow flex-col w-[10%]">
                <div className="text-black text-base font-semibold">
                  Selected Doctor
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
                      Dr.Johnny Santos
                    </div>
                    <div className="text-black text-xs font-medium leading-5 whitespace-nowrap mt-1.5">
                      Specialization: Cardiology
                    </div>
                  </span>
                </div>
              </span>

              <div className="flex flex-col items-stretch w-[75%] ml-5 max-md:w-full max-md:ml-0">
                <div className="text-black text-base font-semibold leading-6">
                  Selected Patient
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
                  <span className="self-center flex grow basis-[0%] flex-col">
                    <div className="text-black text-xs font-semibold leading-5">
                      Juan Dela Cruz
                    </div>
                    <div className="text-black text-xs leading-5 whitespace-nowrap mt-2">
                      <span className="font-medium">
                        74 years old | Male
                      </span>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
       
      

      {/* Right section containing notes and remarks */}
      <div className="flex flex-col w-[98.5%]  pl-10 mt-5">
        <div className="border border-[color:var(--background-background-600,#E8E8E8)] shadow-sm bg-white px-4 py-5 rounded">
          <div className="text-black text-base font-semibold">
            Notes/Remarks:
          </div>
          <div className="notes-remarks mt-3 rounded-lg">
                <textarea
                  placeholder="Enter notes here:"
                  style={{ width: "100%", height: "100%", padding: "10px", boxSizing: "border-box" }}
                />
          </div>
        </div>
      </div>
    </div>
  );
}
