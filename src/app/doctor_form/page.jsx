"use client";

import * as React from "react";
import Image from "next/image";
import RegisterDoctor from "./components/doctorRegistration";
import { useDoctorInfo, useUserInfo } from "../store";
import { useRouter } from "next/navigation";
import { DoctorSignUp } from "@/backend/signup/doctor_signup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
{
  /* MISSING ITEMS 
    - Progress Bar
    - Add buttons 
    - Upload profile picture
    - Multiple Choice options (Gender)
    - Restrict input (Contact number, birthdate)
    - NEED BACK BUTTON

    - WILL USE TO CONVERT TO DYNAMIC
    */
}

export default function DoctorInformation() {
  const router = useRouter();
  const doctorStore = useDoctorInfo();
  const userStore = useUserInfo();
  return (
    <div className=" bg-white flex flex-col items-stretch pb-8 h-auto">
      <span className="flex w-full flex-col mt-11 px-20 max-md:max-w-full max-md:mt-10 max-md:px-5">
        <span className="self-stretch flex items-center justify-between gap-5 mr-4 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5">
          <div className="text-black text-xl font-semibold leading-8 my-auto">
            Doctor Registration
          </div>
          <span className="self-stretch flex items-center justify-between gap-5">
            <div className="text-gray-400 text-sm font-medium leading-5 grow whitespace-nowrap my-auto">
              Already have an account?
            </div>
            <button
              onClick={() => {
                window.location.href = "/login";
              }}
              className="text-white text-sm font-semibold whitespace-nowrap justify-center items-stretch bg-sky-900 self-stretch grow px-6 py-2 rounded max-md:px-5"
            >
              SIGN IN
            </button>
          </span>
        </span>

        <div className="mb-20">
          <RegisterDoctor />
        </div>

        <div
          onClick={() => {
            router.push("/");
          }}
          className="w-full flex justify-between px-14 max-md:max-w-full  max-md:px-5"
        >
          <Button variant="back"> ← BACK</Button>

          <div></div>

          <Button
            onClick={async () => {
              const doctorInfo = {
                email: userStore.email,
                password: userStore.password,
                license_id: doctorStore.doctor_license.license_number,
                specialization_id: doctorStore.specialization_id,
                specialization_name: doctorStore.specialization_name,
                first_name: doctorStore.first_name,
                last_name: doctorStore.last_name,
                gender: doctorStore.gender,
                // birthdate: doctorStore.birthdate,
                years_of_practice: doctorStore.years_of_practice,
                about: doctorStore.about,
                photo: doctorStore.photo,
                hospital: doctorStore.hospital,
                ptr: doctorStore.ptr,
              };

              const account = await DoctorSignUp.signUpAsDoctor(doctorInfo);
              console.log(account.message);
              if (account.message) {
                toast.error(account.message, {
                  position: "top-left",
                  theme: "colored",
                  autoClose: 8000,
                });
              } else {
                toast.success("Registration Success! Redirecting...", {
                  position: "top-left",
                  theme: "colored",
                  autoClose: 8000,
                });

                setTimeout(() => {
                  console.log(doctorStore.specialization_id);
                  if (doctorStore.specialization_id === 1 || 2 || 3) {
                    router.push("/home");
                  } else {
                    router.push("/other_doctor/referrals");
                  }
                }, 2000);
              }
            }}
          >
            NEXT
          </Button>
        </div>
      </span>
    </div>
  );
}
