import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RequestLabTest() {
  
    const request = [
        {
          src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d438eda9a72d20e6657f02d3192ba2f5ee4c611be4a5e1393f6583e1cda024c4?",
          variable: "Name of Lab Test",
          value: "",
        },
    ];

    return (
        <>
        <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">
        REQUEST LAB TEST
        </div>
        <table className="max-w-fit border-spacing-y-7 border-separate">
            {request.map((item) => (
            <tr key={item.variable}>
                <td className="w-5">
                <Image
                    alt="picture"
                    height={0}
                    width={0}
                    loading="lazy"
                    src={item.src}
                    className="w-5"
                />
                </td>
                <td className="border-l-[16px] border-transparent">
                <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                    {item.variable}
                </div>
                </td>
                <td className="border-l-[5rem] border-transparent">
                {typeof item.value === "string" ? (
                    <div className="text-black text-xs leading-5 ml-auto">
                    {item.value}
                    </div>
                ) : (
                    <div className="ml-auto">
                    {item.value}
                    </div>
                )}
                </td>
            </tr>
            ))}
        </table>
        </>
    );
}