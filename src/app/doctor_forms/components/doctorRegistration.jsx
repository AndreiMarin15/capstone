import Image from "next/image";

export default function DoctorRegistration() {
  return (
    <div className="container mx-auto mt-16 flex h-[-65dvh]">
      {/* Left Column */}
      <div className="w-1/2 pr-8">
        <div className="text-black text-base font-semibold leading-6">
          Personal Information
        </div>
        <div className="text-zinc-600 text-base leading-6 mt-2">
          Kindly answer the following regarding your personal information.
        </div>
      </div>

      {/* Right Column */}
      <div className="w-1/2 pl-8">
        <div className="flex items-stretch justify-between gap-5 mr-4 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
          <span className="items-stretch flex grow basis-[0%] flex-col">
            <div className="text-black text-sm font-semibold leading-5">
              License ID
            </div>
            <input
              className="rounded shadow-sm flex shrink-0 h-[30px] w-64 flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
              // Adjust the class name and styling as needed for your design
            />
          </span>
        </div>

        <div className="flex items-stretch justify-between gap-5 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
          <span className="items-stretch flex grow basis-[0%] flex-col self-start">
            <div className="text-black text-sm font-semibold leading-5">
              Last Name
            </div>
            <input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
          </span>
          <span className="items-stretch flex grow basis-[0%] flex-col self-start">
            <div className="text-black text-sm font-semibold leading-5">
              First Name
            </div>
            <input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
          </span>
        </div>

        <div className="flex items-stretch justify-between gap-5 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
          <span className="items-stretch flex grow basis-[0%] flex-col">
            <div className="text-black text-sm font-semibold leading-5">
              Specialization
            </div>
            <select className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black">
              {" "}
              <option value="">Select</option>
              <option value="male">Endocrinologist</option>
              <option value="female">Cardiologist</option>
              <option value="other">Gastroenterologist</option>
            </select>
          </span>
          <span className="items-stretch flex grow basis-[0%] flex-col">
            <div className="text-black text-sm font-semibold leading-5">
              Gender
            </div>
            <select className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black">
              {" "}
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </span>
          <div className="flex items-stretch gap-2.5 mt-1. self-start">
            <span className="flex grow basis-[0%] flex-col items-stretch">
              <div className="text-black text-sm font-semibold leading-5">
                Birthdate
              </div>

              <div className="flex items-stretch justify-between gap-2.5">
                <div className="flex justify-between gap-2.5">
                  <input
                    className="text-stone-300 text-sm leading-5 whitespace-nowrap rounded shadow-sm flex shrink-0  w-12 justify-center h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
                    placeholder="MM"
                  />
                  <input
                    className="text-stone-300 text-sm leading-5 whitespace-nowrap rounded shadow-sm flex shrink-0  w-12 justify-center h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
                    placeholder="DD"
                  />
                  <input
                    className="text-stone-300 text-sm leading-5 whitespace-nowrap rounded shadow-sm flex shrink-0  w-12 justify-center h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
                    placeholder="YYYY"
                  />
                </div>
              </div>
            </span>
          </div>
        </div>

        <div className="text-black text-sm font-semibold leading-5 flex items-stretch justify-between gap-5 mr-9 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
          Years of Practice
        </div>
        <input className="w-16 rounded shadow-sm items-stretch flex shrink-0 h-[30px] mr-9 mt-2 flex-col px-2 py-4 border-[0.5px] border-solid border-black max-md:mr-2.5" />

        <div className="flex items-stretch justify-between gap-5 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
          <span className="items-stretch flex grow basis-[0%] flex-col self-start">
            <div className="text-black text-sm font-semibold leading-5">
              Email
            </div>
            <input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
          </span>
          <span className="items-stretch flex grow basis-[0%] flex-col self-start">
            <div className="text-black text-sm font-semibold leading-5">
              Password
            </div>
            <input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
          </span>
        </div>
      </div>
    </div>
  );
}
