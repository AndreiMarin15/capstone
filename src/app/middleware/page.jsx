"use client";

import Image from "next/image";
import * as React from "react";
import sideImg from "../assets/doctor-looking-information-database.jpeg";
import { useRouter } from "next/navigation";
import { useUserInfo } from "../store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import middleware from "@/app/middleware/backend/middleware";

export default function Home() {
  const router = useRouter();
  const userStore = useUserInfo();

  const [passwordVerify, setPasswordVerify] = React.useState("");
  const [agreed, setAgreed] = React.useState(false);

  const passwordValid = () => {
    if (userStore.password === passwordVerify) {
      if (userStore.password.length >= 8) {
        return {
          status: true,
          message: `Registration for ${userStore.email} is now ongoing. Please answer the forms in the next page.`,
        };
      }

      return {
        status: false,
        message: "Password length too short. Please input atleast 8 characters",
      };
    }

    return {
      status: false,
      message: "Passwords do not match. Please try again.",
    };
  };

  const handleLoginClick = () => {
    router.push("/middleware/login");
  };

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
                EndoTracker - Middleware
              </div>
            </div>
            <div className="text-black text-5xl font-bold leading-[72px] self-stretch mt-16 max-md:text-4xl max-md:mt-10">
              Get started
            </div>
            <div className="text-left text-zinc-950 text-base leading-6 self-stretch mt-6">
              Already have an account?{" "}
              <span
                className="underline text-blue-500 hover:cursor-pointer"
                onClick={handleLoginClick}
              >
                Sign in
              </span>
            </div>
            <div className="text-black text-lg font-semibold leading-7 self-stretch mt-7 max-md:ml-2">
              Email
            </div>
            <input
              type="text"
              id="email"
              onChange={(e) => {
                userStore.setEmail(e.target.value);
              }}
              value={userStore.email ?? ""}
              className="shadow-sm self-stretch flex w-full shrink-0 h-[38px] flex-col mt-2.5 rounded-md border-[0.638px] border-solid border-black max-md:ml-2 text-black px-3"
            />
            <div className="text-black text-lg font-semibold leading-7 self-stretch mt-5 max-md:ml-2">
              Password
            </div>
            <input
              type="password"
              id="password"
              onChange={(e) => {
                userStore.setPassword(e.target.value);
              }}
              value={userStore.password ?? ""}
              className="shadow-sm self-stretch flex w-full shrink-0 h-[38px] flex-col mt-2.5 rounded-md border-[0.638px] border-solid border-black max-md:ml-2 text-black px-3"
            />
            <div className="text-black text-lg font-semibold leading-7 self-stretch mt-5 max-md:ml-2">
              Re-type Password
            </div>
            <input
              type="password"
              id="password"
              onChange={(e) => {
                setPasswordVerify(e.target.value);
              }}
              value={passwordVerify}
              className="shadow-sm self-stretch flex w-full shrink-0 h-[38px] flex-col mt-2.5 rounded-md border-[0.638px] border-solid border-black max-md:ml-2 text-black px-3"
            />

            <div className="items-center self-stretch flex justify-between gap-1.5 mt-6">
              <input
                type="checkbox"
                className="border-gray-400 bg-white flex w-3 shrink-0 h-3 flex-col my-auto rounded-sm border-[0.4px] border-solid"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                }}
              />
              <div className="text-black-500 text-base leading-5 self-stretch grow whitespace-nowrap">
                I agree to the{" "}
                <span
                  className="underline text-blue-500 hover:cursor-pointer"
                  onClick={() => {
                    router.push("/legal/terms_of_service");
                  }}
                >
                  terms of service
                </span>{" "}
                and{" "}
                <span
                  className="underline text-blue-500 hover:cursor-pointer"
                  onClick={() => {
                    router.push("/legal/privacy_policy");
                  }}
                >
                  privacy policy
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                const result = passwordValid();

                if (agreed === true) {
                  if (result.status === true) {
                    toast.success(result.message, {
                      position: "top-left",
                      theme: "colored",
                      autoClose: 2000,
                    });

                    middleware.signUp().then((data) => {
                      if (data.status === 200) {
                        setTimeout(() => {
                          router.push("/middleware/login");
                        }, 2300);
                      }
                    });
                  } else {
                    toast.error(result.message, {
                      position: "top-left",
                      theme: "colored",
                      autoClose: 2000,
                    });
                  }
                } else {
                  toast.error(
                    "Kindly Read and Agree to both the Terms of Service and Privacy Policy.",
                    {
                      position: "top-left",
                      theme: "colored",
                      autoClose: 2000,
                    }
                  );
                }
              }}
              className="text-white text-lg font-semibold whitespace-nowrap justify-center items-stretch bg-sky-900 mt-10 px-8 py-3 rounded self-start max-md:px-5 hover:bg-sky-600"
            >
              Sign Up
            </button>
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
