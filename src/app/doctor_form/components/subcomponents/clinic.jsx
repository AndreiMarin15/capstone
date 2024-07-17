import { useDoctorInfo } from "@/app/store";
export default function ClinicForm() {
  const doctorStore = useDoctorInfo();
  return (
    <>
      <span className="items-stretch flex-col self-start">
        <div className="text-black text-base font-semibold leading-5">
          Clinic{" "}
        </div>
        <input
          onChange={(e) => {
            doctorStore.setClinic(e.target.value);
          }}
          value={doctorStore.hospital.clinic}
          className="mt-[10px] w-64 text-black text-base whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch px-2 py-2.5 border-[0.5px] border-solid border-black"
        />
      </span>
      <span className="items-stretch flex-col self-start">
        <div className="text-black text-base font-semibold leading-5">
          Schedule{" "}
        </div>
        <input
          onChange={(e) => {
            doctorStore.setSchedule(e.target.value);
          }}
          value={doctorStore.hospital.schedule}
          className="mt-[10px] w-64 text-black text-base hitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch px-2 py-2.5 border-[0.5px] border-solid border-black"
        />
      </span>
      <span className="items-stretch flex-col">
        <div className="text-black text-base font-semibold leading-5">
          Contact Person
        </div>
        <input
          onChange={(e) => {
            doctorStore.setContact(e.target.value);
          }}
          className="mt-[10px] w-64 text-black text-base whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch px-2 py-2.5 border-[0.5px] border-solid border-black"
        />
      </span>
    </>
  );
}
