"use client";
import * as React from "react";
import Navbar from "../navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { healthRecords } from "../../../lib/backend/health_records/health_records";

export default function MyComponent() {
  const [navigation, setNavigation] = React.useState([]);
  function computeAge(birthdate) {
    const dob = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const patients = await healthRecords.getPatients();
      setNavigation(
        patients.map((patient) => ({
          name: `${patient.personal_information.first_name} ${patient.personal_information.last_name}`,
          age: computeAge(patient.personal_information.birthdate),
          href: `/health_records/about_patient/${patient.id}`,
          src: patient.personal_information.photo,
        }))
      );
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    console.log(navigation);
  }, [navigation]);

  const router = useRouter();
  return (
    <div className="border bg-white flex flex-col items-stretch border-solid border-stone-300 min-h-screen w-full">
      <div className="w-full max-md:max-w-full h-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0 h-full">
          <div className="flex flex-col items-stretch w-[70%] ml-5 max-md:w-full max-md:ml-0">
            <span className="flex flex-col items-stretch mt-8 ml-5 w-full max-md:max-w-full max-md:mt-10">
              <div className="text-black text-xl font-semibold leading-8 max-md:max-w-full mb-10">
                Health Records
              </div>
              <span className="flex w-full items-center justify-between gap-5 mt-8 mb-8 max-md:max-w-full max-md:flex-wrap max-md:mt-10 max-md:pr-5">
                <div className="text-black text-base font-medium leading-6 my-auto">
                  PATIENTS
                </div>
                <div className="self-stretch flex items-stretch justify-between gap-2.5">
                  <span className="flex items-stretch justify-between gap-2 py-2 rounded-md border-[0.5px] border-solid border-black">
                    <Image
                      alt="picture"
                      height={0}
                      width={0}
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2aee5eaae6c8b317fa94c9456603d2ba5c59247e65984390a06ee8f8b01312c?"
                      className="aspect-square object-contain object-center w-[13px] fill-stone-300 overflow-hidden shrink-0 max-w-full"
                    />
                    <div
                      className="text-stone-300 text-xs leading-5 my-auto"
                      style={{ paddingRight: "300px" }}
                    >
                      SEARCH
                    </div>
                  </span>
                  <button className="flex gap-1 px-5 py-2 text-xs rounded-md border border-black border-solid">
                    <Image
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/1815063a9248e003b79041a817235f1997954e6c1ef9ef5b1f105c020315d455?"
                      width="100"
                      height="100"
                      className="shrink-0 w-3 aspect-[0.85]"
                      alt="img"
                    />
                    <div className="self-start">FILTER</div>
                  </button>
                  <button className="grow justify-center text-xs px-6 py-2 rounded-md border border-black border-solid">
                    SORT
                  </button>
                </div>
              </span>
            </span>

            {navigation.map((item) => (
              <div key={item.name} className="ml-5 flex w-full flex-col">
                <button
                  className="flex w-full items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap"
                  onClick={() => {
                    router.push(item.href);
                  }}
                >
                  <div className="flex items-center gap-5">
                    <Image
                      alt="picture"
                      height={0}
                      width={0}
                      loading="lazy"
                      src={
                        item.src
                          ? item.src
                          : "https://cdn.builder.io/api/v1/image/assets/TEMP/5fee24394139ee09d61af596b82e9174ea8a73c2e68f5ff59e2c793c7b2e08ee?"
                      }
                      className="aspect-square object-contain object-center w-[49px] overflow-hidden shrink-0 max-w-full"
                    />
                    <div className="flex flex-col items-start">
                      <div className="text-black text-xs font-semibold leading-5 whitespace-nowrap">
                        {item.name}
                      </div>
                      <div className="text-black text-xs mt-2">
                        AGE: {item.age}
                      </div>
                    </div>
                  </div>
                </button>
                <div className="border-b border-gray-300 w-full mb-2 mt-2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
