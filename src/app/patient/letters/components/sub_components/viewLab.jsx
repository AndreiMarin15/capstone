import Image from "next/image";
import * as React from "react";
import { useState } from "react";
import ViewTest from "./lab_components/viewTest"; // Adjust the import path as necessary

export default function ViewLabRequest({ currentScreen, setCurrentScreen }) {
  const [currentScreen3, setCurrentScreen3] = useState(0);
  const [showVisitLabTests, setShowVisitLabTests] = useState(false);

  const labreqs = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      name: "HbA1c",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      name: "Fasting Blood Sugar (FBS)",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      name: "Lipid Profile",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      name: "Urinalysis",
    },
  ];

  if (showVisitLabTests) {
    return <ViewTest />;
  }

  return (
    <>
      {(currentScreen3 === 0 || currentScreen === 1) && (
        <>
          <div className="text-black text-base font-bold leading-5 mt-6 ml-6 mb-1 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
            Lab Test Request #1
          </div>
          <div className="text-black text-sm font-normal leading-5 mt-2 ml-6 mb-1 max-md:ml-1 max-md:mt-10">
            <span className="font-semibold">Requested on: </span>2024-01-24
          </div>{" "}
          <hr className="ml-5 mt-2" style={{ borderTop: "1px solid #9CA3AF", width: "100%" }} />

          <div className="flex-1 mr-4 text-xs ml-6 mt-3">
            <table className="max-w-fit border-spacing-y-3 border-separate">
              <tbody className="text-xs leading-5 text-black">
                {labreqs.map((item, index) => (
                  <tr key={index}>
                    <td className="pl-2 pr-0">
                      <Image
                        alt="image"
                        height={0}
                        width={0}
                        loading="lazy"
                        src={item.src}
                        className="self-start aspect-square fill-black w-[15px]"
                      />
                    </td>
                    <td className="border-l-[16px] border-transparent">
                      <button onClick={() => setShowVisitLabTests(true)}>
                        {item.name}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
