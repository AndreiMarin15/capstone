import { useEffect, useState } from "react";
import { useDoctorInfo } from "@/app/store";
import ClinicForm from "./subcomponents/clinic";
import Image from "next/image";
// import { DoctorSignU } from "@/backend//signup/doctor_signup";
import { DoctorSignUp } from "@/backend/signup/doctor_signup";
export default function DoctorRegistration() {
  const [clinicForms, setClinicForms] = useState([<ClinicForm key={0} />]);

  const addClinicForm = () => {
    setClinicForms((prevForms) => [
      ...prevForms,
      <ClinicForm key={prevForms.length} />,
    ]);
  };

  const doctorStore = useDoctorInfo();
  const [specializations, setSpecializations] = useState([]);
  useEffect(() => {
    const getSpecials = async () => {
      const specials = await DoctorSignUp.selectSpecializations();

      setSpecializations(specials);
    };

    getSpecials();
  }, []);
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);

    console.log(base64.toString());
    doctorStore.setPhoto(base64.toString());
  };
  return (
    <div className="mt-16 justify-between flex h-[-65dvh]">
      {/* Left Column */}
      <div>
        <div className="text-black text-base font-semibold leading-6">
          Professional Information
        </div>
        <div className="text-zinc-600 text-base leading-6 mt-2">
          Kindly answer the following regarding your professional information.
        </div>
      </div>

      {/* Right Column */}
      <div>
        <div className="flex gap-5 mr-4 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
          <span className="items-stretch flex-col">
            <div className="text-black text-base font-semibold leading-5">
              License ID
            </div>
            <input
              onChange={(e) => {
                doctorStore.setDoctor_license({
                  license_number: e.target.value,
                });
              }}
              id="lice"
              value={doctorStore.doctor_license.license_number}
              className="rounded shadow-sm flex shrink-0 h-[30px] w-64 flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
              // Adjust the class name and styling as needed for your design
            />
          </span>
          <span className="items-stretch flex-col">
            <div className="text-black text-base font-semibold leading-5">
              Professional Tax Receipt (PTR)
            </div>
            <input
              onChange={(e) => {
                doctorStore.setPtr(e.target.value);
              }}
              value={doctorStore.ptr}
              className="rounded shadow-sm flex shrink-0 h-[30px] w-64 flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
              // Adjust the class name and styling as needed for your design
            />
          </span>
        </div>

        <div className="flex gap-5 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
          <span className="items-stretch flex-col self-start">
            <div className="text-black text-base font-semibold leading-5">
              Last Name
            </div>
            <input
              onChange={(e) => {
                doctorStore.setLast_name(e.target.value);
              }}
              type="text"
              value={doctorStore.last_name}
              className="mt-[10px] text-black text-base w-64 whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch px-2 py-2.5 border-[0.5px] border-solid border-black"
            />
          </span>
          <span className="items-stretch flex-col self-start">
            <div className="text-black text-base font-semibold leading-5">
              First Name
            </div>
            <input
              onChange={(e) => {
                doctorStore.setFirst_name(e.target.value);
              }}
              value={doctorStore.first_name}
              type="text"
              className="mt-[10px] text-black text-base w-64 whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch px-2 py-2.5 border-[0.5px] border-solid border-black"
            />
          </span>
          <span className="items-stretch flex-col">
            <div className="text-black text-base font-semibold leading-5">
              Gender
            </div>
            <select
              onChange={(e) => {
                doctorStore.setGender(e.target.value);
                console.log(doctorStore.gender);
              }}
              value={doctorStore.gender}
              type="text"
              className="text-black text-base w-36 whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch mt-[10px] px-2 py-2.5 border-[0.5px] border-solid border-black"
            >
              {" "}
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </span>
        </div>

        <div className="flex gap-5 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
          <span className="items-stretch flex-col self-start">
            <div className="text-black text-basefont-semibold leading-5">
              Hospital
            </div>
            <input
              onChange={(e) => {
                doctorStore.setHospitalName(e.target.value);
              }}
              value={doctorStore.hospital.name}
              className="mt-[10px] text-black text-base w-64 whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch px-2 py-2.5 border-[0.5px] border-solid border-black"
            />
          </span>
          <span className="items-stretch flex-col">
            <div className="text-black text-base font-semibold leading-5">
              Specialization
            </div>
            <select
              onChange={(e) => {
                const id = e.target.value;
                const name = e.target.options[e.target.selectedIndex].text;
                doctorStore.setSpecializationId(id);
                doctorStore.setSpecializationName(name);
              }}
              className="text-black text-base whitespace-nowrap w-64 rounded shadow-sm flex-shrink-0 justify-center items-stretch mt-[10px] px-2 py-2.5 border-[0.5px] border-solid border-black"
            >
              {Array.isArray(specializations) &&
                specializations?.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.doctor_specialization_name}
                    </option>
                  );
                })}
            </select>
          </span>
          <div className="flex items-stretch gap-2.5 mt-1. self-start">
            <span className="flex grow basis-[0%] flex-col items-stretch">
              <div className="text-black text-basefont-semibold leading-5">
                Years of Practice
              </div>

              <div className="flex items-stretch justify-between gap-2.5">
                <div className="flex justify-between gap-2.5">
                  <input
                    type="number"
                    className="mt-[10px] w-36 text-black text-base whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch px-2 py-2.5 border-[0.5px] border-solid border-black"
                  />
                </div>
              </div>
            </span>
          </div>
        </div>
        <div className="flex gap-16 mr-4 max-md:max-w-full max-md:flex-wrap max-md:mt-10 ">
          <div className="mt-10 mr-4 max-md:max-w-full max-md:mt-10">
            <div className="text-black text-base font-semibold leading-5">
              Photo
            </div>
            <div className="flex items-center gap-2.5 mt-3">
              <Image
                loading="lazy"
                alt="image"
                src={
                  doctorStore.photo
                    ? doctorStore.photo
                    : "https://cdn.builder.io/api/v1/image/assets/TEMP/245d6ea395b4c712a6f541d78979f36e05242f760c2b5899f9e58d63bf27d745?"
                }
                className="aspect-[1.02] w-[53px]"
                width="0"
                height="0"
              />
              <label
                htmlFor="fileInput"
                className="justify-center px-3 py-1.5 my-auto bg-white rounded-sm border-solid shadow-sm aspect-[2.48] border-[0.5px] border-zinc-600 cursor-pointer"
              >
                Change Photo
                <input
                  onChange={handleImageUpload}
                  id="fileInput"
                  type="file"
                  accept=".jpeg, .png, .jpg"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <span className="items-stretch flex-col self-end">
            <div className="text-black text-base font-semibold leading-5">
              About Yourself
            </div>
            <textarea
              onChange={(e) => {
                doctorStore.setAbout(e.target.value);
              }}
              value={doctorStore.about}
              className="w-64  rounded shadow-sm items-stretch mt-2 flex shrink-0 h-[60px] flex-col p-2 border-[0.5px] border-solid border-black max-md:mr-2.5"
              style={{
                resize: "horizontal",
                maxHeight: "60px",
                maxWidth: "400px",
              }}
            />{" "}
          </span>
        </div>

        <div className="flex flex-col max-md:max-w-full max-md:flex-wrap max-md:mt-10">
          {clinicForms.map((clinicForm, index) => (
            <div key={index} className="flex gap-5 mr-4 mt-10">
              {clinicForm}
              {index === clinicForms.length - 1 && (
                <div className="flex gap-1.5 self-start mt-10 whitespace-nowrap">
                  <button
                    onClick={addClinicForm}
                    className="justify-center items-center px-1.5 text-lg text-white bg-gray-400 rounded-full aspect-square h-[25px]"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
