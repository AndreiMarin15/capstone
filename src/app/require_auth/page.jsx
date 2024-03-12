"use client";
import React, { useState } from "react"; // <-- Import useState from React
import Image from "next/image";
import ErrorPic from "../assets/nothing-found.png";

import { useRouter } from "next/navigation";

export default function AuthError() {
  const router = useRouter()
  return (
    <div className=" h-full w-full bg-white flex flex-col items-center px-20 py-12  max-md:px-5">
      <div className="flex flex-col h-full items-center px-5 font-semibold max-w-[545px]">
        <Image
          loading="lazy"
          alt="image"
          height={0}
          width={0}

          src={ErrorPic}
          className="max-w-full aspect-square w-[135px]"
        />
        <div className="mt-6 text-4xl text-sky-900 leading-[60px]">Whoops!</div>
        <div className="self-stretch mt-8 w-full text-2xl leading-10 text-center text-zinc-500 max-md:max-w-full">
          It seems like no user is currently logged in. <br />
          Please sign up or log in to proceed.
        </div>
        <div className="flex gap-5 justify-between mt-12 max-w-full text-lg text-white whitespace-nowrap w-[323px] max-md:mt-10">

          <button
          onClick={() => {
            router.push("/")
          }}
          className="grow justify-center px-8 py-3 bg-sky-900 rounded max-md:px-5">
            Sign Up
          </button>
          <button 
          onClick={() => {
            router.push("/login")
          }}
          className="grow justify-center px-10 py-3 bg-sky-900 rounded max-md:px-5">

            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
