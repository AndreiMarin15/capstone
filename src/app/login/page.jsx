"use client";

import Image from "next/image";
import * as React from "react";
import sideImg from "../assets/doctor-looking-information-database.jpeg";
import { useRouter } from "next/navigation";
// import { authentication } from "@/backend/login/auth";
import { login } from "@/backend/login/login";
import { useUserInfo } from "../store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const router = useRouter();
  const loginInfo = useUserInfo();
  return (
    <div className="border bg-white pl-20 border-solid border-stone-300 max-md:pl-5">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="flex flex-col items-stretch w-[60%] max-md:w-full max-md:ml-0">
          <div className="flex flex-col my-auto max-md:mt-10">
            <div className="items-center self-stretch flex justify-between gap-3">
              <Image
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7c5568ce87fad250d8960d04c2e97ceaf002e72729e6cdcc5eda1af6f229ff5?"
                className="aspect-square object-contain object-center w-9 overflow-hidden shrink-0 max-w-full my-auto"
                width={0}
                height={0}
                alt="mImg"
              />
              <div className="text-blue-500 text-3xl font-bold leading-10 self-stretch grow shrink basis-auto">
                EndoTracker
              </div>
            </div>
            <div className="text-black text-5xl font-bold leading-[72px] self-stretch mt-16 max-md:text-4xl max-md:mt-10">
              Login
            </div>

            <div className="text-left text-zinc-950 text-base leading-6 self-stretch mt-6">
              Want to create an account?{" "}
              <span
                className="underline text-blue-500 hover:cursor-pointer"
                onClick={() => {
                  router.push("/");
                }}
              >
                Sign up
              </span>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                const { user, userType } = await login.loginUser();
                console.log(user);

                if (user !== null) {
                  toast.success("Verifying Information. Please wait.", {
                    position: "top-left",
                    theme: "colored",
                    autoClose: 500,
                  });
                }

                console.log(userType);

                if (userType === "patient") {
                  router.push("/patient/home");
                } else if (userType === "doctor") {
                  const specialization = login.getDoctorSpecialization();
                  if (specialization === 1) {
                    router.push("/home");
                  } else {
                    router.push("/other_doctor/referrals");
                  }
                } else if (
                  userType !== null &&
                  userType !== "patient" &&
                  userType !== "doctor"
                ) {
                  toast.error(
                    "Failed logging in. Kindly double check your information",
                    {
                      position: "top-left",
                      theme: "colored",
                      autoClose: 8000,
                    }
                  );
                }
              }}
            >
              <div className="text-black text-lg font-semibold leading-7 self-stretch mt-7 max-md:ml-2">
                Email
              </div>
              <input
                type="text"
                id="email"
                onChange={(e) => {
                  loginInfo.setEmail(e.target.value);
                }}
                value={loginInfo.email}
                className="shadow-sm self-stretch flex w-full shrink-0 h-[38px] flex-col mt-2.5 rounded-md border-[0.638px] border-solid border-black max-md:ml-2 text-black px-3"
              />
              <div className="text-black text-lg font-semibold leading-7 self-stretch mt-5 max-md:ml-2">
                Password
              </div>
              <input
                type="password"
                id="password"
                onChange={(e) => {
                  loginInfo.setPassword(e.target.value);
                }}
                value={loginInfo.password}
                className="shadow-sm self-stretch flex w-full shrink-0 h-[38px] flex-col mt-2.5 rounded-md border-[0.638px] border-solid border-black max-md:ml-2 text-black px-3"
              />

              <button
                type="submit"
                className="text-white text-lg font-semibold whitespace-nowrap justify-center items-stretch bg-sky-900 mt-10 px-8 py-3 rounded self-start max-md:px-5 hover:bg-sky-600"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col items-stretch justify-end h-[100vh] ml-5 w-full">
          <Image
            src={sideImg}
            width={0}
            height={0}
            className="w-full object-cover aspect-[0.63] object-center overflow-hidden grow max-md:max-w-full max-md:mt-10"
            alt="side"
          />
        </div>
      </div>
    </div>
  );
}
