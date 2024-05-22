export default function ClinicForm() {
  return (
    <>
    
        <span className="items-stretch flex grow basis-[0%] flex-col self-start">
          <div className="text-black text-sm font-semibold leading-5">
            Clinic{" "}
          </div>
          <input className="mt-[10px] text-black text-sm whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch px-2 py-2.5 border-[0.5px] border-solid border-black" />
        </span>
        <span className="items-stretch flex grow basis-[0%] flex-col self-start">
          <div className="text-black text-sm font-semibold leading-5">
            Schedule{" "}
          </div>
          <input className="mt-[10px] text-black text-sm whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch px-2 py-2.5 border-[0.5px] border-solid border-black" />
        </span>
        <span className="items-stretch flex grow basis-[0%] flex-col">
          <div className="text-black text-sm font-semibold leading-5">
            Contact Person
          </div>
          <input className="mt-[10px] text-black text-sm whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch px-2 py-2.5 border-[0.5px] border-solid border-black" />
        </span>
    </>
  );
}
