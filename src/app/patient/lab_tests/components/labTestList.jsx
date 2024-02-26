import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LabTestList() {
  const cPList = [
    {
      date: "2023-01-07",
      labtest: "2D ECHO",
      request: "Dr. John Doe",
      special: "Endocrinology",
      status: "Uploaded",
    },
    {
      date: "2023-01-07",
      labtest: "2D ECHO",
      request: "Dr. Johnny Santos",
      special: "Cardiology",
      status: "Not yet started",
    },
    {
      date: "2023-01-07",
      labtest: "2D ECHO",
      request: "Dr. John Doe",
      special: "Endocrinology",
      status: "Uploaded",
    },
    {
      date: "2023-01-07",
      labtest: "2D ECHO",
      request: "Dr. John Doe",
      special: "Endocrinology",
      status: "Uploaded",
    },
    {
      date: "2023-01-07",
      labtest: "2D ECHO",
      request: "Dr. John Doe",
      special: "Endocrinology",
      status: "Uploaded",
    },
    {
      date: "2023-01-07",
      labtest: "2D ECHO",
      request: "Dr. John Doe",
      special: "Endocrinology",
      status: "Uploaded",
    },
    {
      date: "2023-01-07",
      labtest: "2D ECHO",
      request: "Dr. John Doe",
      special: "Endocrinology",
      status: "Uploaded",
    },
  ];

  const lab = [
    {
      srcmedicine:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      labname: "Fasting Blood Sugar (FBS) Test",
      reqdate: "2024/01/24",
    },
    {
      srcmedicine:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      labname: "HbA1c Test",
      reqdate: "2024/01/24",
    },
    {
      srcmedicine:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      labname: "Total Cholesterol Test",
      reqdate: "2024/01/24",
    },
  ];
  return (
    <>
      <div className=" bg-white flex flex-col items-stretch min-h-screen w-full">
        <div className="w-full max-md:max-w-full h-full">
          {lab.map((lab, index) => (
            <button
              key={index}
              className="flex flex-col mt-10 items-start text-xs leading-5 text-black max-w-[601px]"
            >
              <div className="flex gap-3.5 font-semibold whitespace-nowrap">
                <Image
                  alt="image"
                  height={0}
                  width={0}
                  loading="lazy"
                  src={lab.srcmedicine}
                  className="aspect-square fill-black w-[15px]"
                />
                <div className="my-auto">{lab.labname}</div>
              </div>
              <div className="flex gap-5 justify-between ml-7 max-md:ml-2.5">
                <div className="flex gap-1 justify-between font-medium whitespace-nowrap">
                  Requested on:
                  <div className="grow my-auto">{lab.reqdate}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
