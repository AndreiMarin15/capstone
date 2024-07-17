"use client";

import Image from "next/image";
import * as React from "react";
import { useState, useRef, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";

const ImageModal = ({ src, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
      <div className="max-w-screen-lg">
        <img src={src} alt="full" className="max-w-full max-h-full" />
        <button className="absolute top-4 right-4 text-white" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default function AddLabTest() {
  return (
    <>
      <>
        <div className="text-black text-base font-bold leading-5 mt-8 mb-8 max-md:ml-1 max-md:mt-10">
          RECORD LAB TEST
        </div>

        <div>
          <div className="flex flex-col max-w-full">
            <div className="w-full max-md:max-w-full">
              <span className="font-medium text-sm">Fasting Blood Sugar</span>

              <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:w-full">
                <div className="flex flex-col ml-5 w-[50%] max-md:ml-0 max-md:w-full">
                  <table className="max-w-fit border-separate">
                    <tr>
                      <td>
                        <div className="flex gap-4 my-auto font-semibold text-black">
                          <Image
                            alt="image"
                            height={0}
                            width={0}
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/835c2c533b5709aa853e0418efd68df6d00f1c923dd0dedb18dc8516044c5f8b?"
                            className="aspect-square fill-black w-[15px]"
                          />
                          <div className="my-auto text-sm">Lab Values</div>
                        </div>
                      </td>
                      <td className="pl-80">
                        <div className="flex gap-4 my-auto font-semibold text-black">
                          <div className="my-auto text-sm">Unit</div>
                        </div>
                      </td>
                    </tr>
                  </table>
                  <table className="max-w-fit border-spacing-y-2 border-separate">
                    <tbody className="text-sm leading-5 text-black">
                      <tr></tr>
                      {/* Your existing row */}

                      {/* Add another row button */}
                      <tr>
                        <td colSpan="4" className="text-center">
                          <button className="mt-3 flex gap-1.5 px-5 font-semibold whitespace-nowrap leading-[150%]">
                            <div className="justify-center items-center px-px text-lg text-white bg-gray-400 rounded-full aspect-square h-[26px] w-[26px]">
                              +
                            </div>
                            <div className=" my-auto text-sm text-gray-400">
                              Add another row
                            </div>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="max-w-fit border-separate mt-8">
                    <tr>
                      <td>
                        <div className="flex gap-4 my-auto font-semibold text-black">
                          <Image
                            alt="image"
                            height={0}
                            width={0}
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/04feedd180d99a276d32b47268955875856411c5fd622922cd3c35776c289845?"
                            className="aspect-square fill-black w-[22px]"
                          />
                          <div className="my-auto text-sm">Ranges</div>
                        </div>
                      </td>
                    </tr>
                  </table>
                  <table className="max-w-fit border-spacing-y-2 border-separate">
                    <tbody className="text-sm leading-5 text-black">
                      <tr></tr>
                      {/* Your existing row */}
                      <tr>
                        <td className="border-l-[16px] border-transparent">
                          <input
                            className="justify-center py-2 px-2 font-medium whitespace-nowrap rounded border-black border-solid border-[0.5px] text-black w-16"
                            type="text"
                            placeholder="Normal"
                          />
                        </td>
                        <td className="border-l-[8px] border-transparent flex items-center">
                          <span className="mt-2 flex items-center text-black font-lg font-bold">
                            :
                          </span>
                        </td>
                        <td className="border-l-[8px] border-transparent">
                          <input
                            className="justify-center py-2 px-2  font-medium whitespace-nowrap rounded border-black border-solid border-[0.5px] text-black w-16"
                            type="text"
                            placeholder="100"
                          />
                        </td>
                        <td className="border-l-[20px] border-transparent">
                          <input
                            className="text-center justify-center py-2 px-2 font-medium whitespace-nowrap rounded border-black border-solid border-[0.5px] text-black w-12"
                            type="text"
                            placeholder="-"
                          />
                        </td>
                        <td className="border-l-[20px] border-transparent">
                          <input
                            className="justify-center py-2 px-2  font-medium whitespace-nowrap rounded border-black border-solid border-[0.5px] text-black w-16"
                            type="text"
                            placeholder="20"
                          />
                        </td>
                      </tr>

                      {/* Add another row button */}
                      <tr>
                        <td colSpan="4" className="text-center">
                          <button className="mt-3 flex gap-1.5 px-5 font-semibold whitespace-nowrap leading-[150%]">
                            <div className=" justify-center items-center px-px text-lg text-white bg-gray-400 rounded-full aspect-square h-[26px] w-[26px]">
                              +
                            </div>
                            <div className=" my-auto text-sm text-gray-400">
                              Add another row
                            </div>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          {/* <BackButton
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
            />

            <Button
              className="flex items-center ml-12 px-5 py-1 rounded border border-sky-900 border-solid font-semibold border-1.5 text-basebg-sky-900 text-white"
              onClick={handleAddLabTest}
            >
              Save
            </Button> */}
        </div>
      </>
    </>
  );
}
