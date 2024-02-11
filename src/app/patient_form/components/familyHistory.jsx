export default function SignUpFamilyHistory() {
  return (
    <div className="container mx-auto mt-16 mb-5 flex h-[65dvh]">
      {/* Left Column */}
      <div className="w-1/2 pr-8 flex flex-col">
        <div className="text-black text-base font-semibold leading-6">
          Family History
        </div>
        <div className="text-zinc-600 text-base leading-6 mt-2">
          Kindly enter any patient family history that is relevant with the
          disease. <br />
          <br />
          This includes:
          <br />
          - Diseases related to the heart
          <br />
          - Diseases related to the eyes
          <br />
          - Disease related to the kidney
          <br />- Diseases related to the digestive system
        </div>
      </div>

      {/* Right Column */}
      <div className="w-1/2 pl-8">
        <div className="flex items-stretch justify-between gap-5 mr-4  max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
          <span className="items-stretch flex grow basis-[0%] flex-col self-start">
            <div className="text-black text-sm font-semibold leading-5">
              Family member first name
            </div>
            <input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
          </span>
          <span className="items-stretch flex grow basis-[0%] flex-col self-start">
            <div className="text-black text-sm font-semibold leading-5">
              Family member last name
            </div>
            <input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
          </span>
        </div>
        <div className="flex items-stretch justify-between gap-3 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
          <span className="items-stretch flex-col self-start">
            <div className="text-black text-sm font-semibold leading-5 whitespace-nowrap">
              Age
            </div>
            <input className="rounded shadow-sm flex-shrink-0 w-14 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
          </span>
          <span className="items-stretch flex-grow basis-[0%] flex-col">
            <div className="text-black text-sm font-semibold leading-5">
              Gender
            </div>
            <select className="text-black rounded shadow-sm flex-shrink-0 w-32 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black">
              {" "}
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>{" "}
          </span>
          <div className="flex items-stretch self-stretch flex-grow flex-col">
            <div className="text-black text-sm font-semibold leading-5">
              Patient Relationship with Family Member
            </div>
            <input className="rounded shadow-sm h-[30px] flex-grow flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
          </div>
        </div>
        <div className="flex items-stretch justify-between gap-5 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
          <div className="flex items-stretch self-stretch flex-grow flex-col">
            <div className="text-black text-sm font-semibold leading-5">
              Medical Condition of the Family Member
            </div>
            <input className="rounded shadow-sm h-[30px] flex-grow flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
          </div>
          <div className="flex items-stretch gap-2.5 mt-1. self-start">
            <span className="flex grow basis-[0%] flex-col items-stretch">
              <div className="text-black text-sm font-semibold leading-5">
                Date when Condition Started
              </div>

              <div className="flex items-stretch justify-between gap-2.5 mt-2">
                <div className="flex justify-between gap-2.5">
                  <input
                    className="text-stone-300 text-sm leading-5 whitespace-nowrap rounded shadow-sm flex-shrink-0 w-12 justify-center items-stretch px-2 py-2.5 border-[0.5px] border-solid border-black"
                    placeholder="MM"
                  />
                  <input
                    className="text-stone-300 text-sm leading-5 whitespace-nowrap rounded shadow-sm flex-shrink-0 w-12 justify-center items-stretch px-2 py-2.5 border-[0.5px] border-solid border-black"
                    placeholder="DD"
                  />
                  <input
                    className="text-stone-300 text-sm leading-5 whitespace-nowrap rounded shadow-sm flex-shrink-0 w-20 justify-center items-stretch px-2 py-2.5 border-[0.5px] border-solid border-black"
                    placeholder="YYYY"
                  />
                </div>
              </div>
            </span>
          </div>
        </div>
        <div className="text-black text-sm font-semibold leading-5 flex items-stretch justify-between gap-5 mr-9 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
          Medical Condition Outcomes of the Family Member
        </div>
        <select className="text-black rounded shadow-sm flex-shrink-0 w-60 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-5 border-solid border-black">
          {" "}
          <option value="">Select</option>
          <option value="deceased">Deceased</option>
          <option value="recovered">Recovered</option>
          <option value="chronic">Chronic</option>
          <option value="chronic">Improved</option>
        </select>{" "}
        <div className="flex items-stretch self-stretch mt-8 flex-grow flex-col">
          <div className="text-black text-sm font-semibold leading-5">
            Medical Procedures Performed on the Family Member (if any){" "}
          </div>

          <div className="flex gap-2.5 justify-between mt-2 text-lg text-white whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
            <input className="rounded shadow-sm h-[30px] flex-grow flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />

            <button className="justify-center items-center px-2 my-auto bg-gray-400 rounded-full aspect-square h-[25px]">
              +
            </button>
          </div>
        </div>
        <div className="flex gap-1.5 self-start mt-10 whitespace-nowrap">
          <button className="justify-center items-center px-1.5 text-lg text-white bg-gray-400 rounded-full aspect-square h-[25px]">
            +
          </button>
          <div className="grow text-base text-gray-400">
            Add another family member
          </div>
        </div>
      </div>
    </div>
  );
}
