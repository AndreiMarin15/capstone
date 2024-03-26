import Image from "next/image";
import BackButton from "./BackButton";
import { useState, useEffect } from "react";

export default function FamilyHistory({ setCurrentPage, data }) {
  useEffect(() => {
    const tempHistory = fHistory;
    tempHistory[0].value = data["first_name"];
    tempHistory[1].value = data["last_name"];
    tempHistory[2].value = data["relationship"];
    tempHistory[3].value = data["medical_condition"];
    tempHistory[4].value = data["medical_condition_date"];
    tempHistory[5].value = data["medical_condition_outcome"];
    tempHistory[6].value = data["medical_condition_procedures"];
  }, []);
  const [fHistory, setFHistory] = useState([
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b947b8e54bf04f2cb0c3ec2f17d835819b72247144f9a6d4d213b09ee01afe5a?",
      variable: "First Name",
      value: "Juana",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b947b8e54bf04f2cb0c3ec2f17d835819b72247144f9a6d4d213b09ee01afe5a?",
      variable: "Last Name",
      value: "Dela Cruz",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b947b8e54bf04f2cb0c3ec2f17d835819b72247144f9a6d4d213b09ee01afe5a?",
      variable: "Relationship",
      value: "Mother",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Condition",
      value: "Hypertension",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Date",
      value: "1990",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3989204c70d706bac6f9f46ddda5aa4e7e97fa6018e996dd7dc93112d8fd1b8b?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Outcome",
      value: "Chronic",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f4d912f8102b745e1cadcdfa06bd7d42c5f96a1f5470e70c3e8d52350dbb2192?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Procedure/s",
      value: "None",
    },
  ]);
  return (
    <>
      <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">
        FAMILY HISTORY
      </div>

      <table className="max-w-fit border-spacing-y-7 border-separate">
        {fHistory.map((item) => (
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
              <div className="text-black text-xs leading-5 ml-auto">
                {item.value}
              </div>
            </td>
          </tr>
        ))}
      </table>
      <div className="flex items-start justify-between mt-5">
        <button
          onClick={setCurrentPage}
          className="flex items-center justify-center px-2 py-1 rounded text-xs border border-sky-900 border-solid font-semibold border-1.5"
        >
          <div className="flex gap-0.5 justify-between items-center">
            <Image
              height={0}
              width={0}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0de7471415fd70bdaba9dd1e6f7c2e7075e37988a454dfb91c7aed9b11350077?"
              className="w-3 h-3 aspect-square"
              alt="Back Arrow"
            />
            <div className="text-xs">BACK</div>
          </div>
        </button>
      </div>
    </>
  );
}
