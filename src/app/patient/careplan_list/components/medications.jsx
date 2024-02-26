import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CarePlans() {
  const router = useRouter();

  const medications = [
    {
      srcmedicine:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      medicinename: "IBUPROFEN",
      srddoctor:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
      doctor: "Dr. Maria Santos",
      startdate: "2020-01-10",
      enddate: "2020-01-15",
      form: "Tablet",
      dose: "500",
      unit: "mg",
      frequency: "Once daily",
      until: "2020-01-15",
    },
    {
      srcmedicine:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      medicinename: "ASPIRIN",
      srddoctor:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
      doctor: "Dr. Johnny Santos",
      startdate: "2020-10-10",
      enddate: "2020-10-12",
      form: "Tablet",
      dose: "30",
      unit: "mg",
      frequency: "Once daily",
      until: "2020-10-12",
    },
    {
      srcmedicine:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      medicinename: "AMLOPIDINE",
      srddoctor:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
      doctor: "Dr. Johnny Santos",
      startdate: "2020-10-10",
      enddate: "2020-10-24",
      form: "Tablet",
      dose: "30",
      unit: "mg",
      frequency: "Once daily",
      until: "2020-10-24",
    },
  ];

  const careplan = [
    {
      srccareplan:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      careplanname: "DIETARY MANAGEMENT",
      value:
        "Prioritize fruits, vegetables, whole grains, and lean protein sources like fish, chicken, and beans",
    },
    {
      srccareplan:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      careplanname: "PHYSICAL ACTIVITIES",
      value:
        "Aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity aerobic activity per week.",
    },
    {
      srccareplan:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      careplanname: "SELF-MONITORING",
      value:
        "Pay attention to your feet and check for any cuts, sores, or redness",
    },
  ];

  return (
    <>
      <div className=" bg-white flex flex-col items-stretch min-h-screen w-full">
        <div className="w-full max-md:max-w-full h-full">
          <div className="text-start text-sm mt-7 whitespace-nowrap font-semibold text-black">
            Medications
          </div>
          {medications.map((medication, index) => (
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
                  src={medication.srcmedicine}
                  className="aspect-square fill-black w-[15px]"
                />
                <div className="my-auto">{medication.medicinename}</div>
              </div>
              <div className="flex gap-5 justify-between ml-7 max-md:ml-2.5">
                <div className="flex gap-1 justify-between font-medium whitespace-nowrap">
                  <Image
                    alt="image"
                    height={0}
                    width={0}
                    loading="lazy"
                    src={medication.srddoctor}
                    className="w-4 aspect-square"
                  />
                  <div className="grow my-auto">{medication.doctor}</div>
                </div>
                <div className="flex-auto my-auto">{`${medication.startdate} - ${medication.enddate}`}</div>
              </div>
              <div className="flex gap-5 justify-between self-stretch ml-12 mt-6 w-full font-semibold max-md:flex-wrap max-md:max-w-full">
                <div className="pr-8">
                  <span className="">Form</span>:{" "}
                  <span className="font-medium">{medication.form}</span>
                </div>
                <div className="pr-8">
                  <span className="">Dose</span>:{" "}
                  <span className="font-medium">{medication.dose}</span>
                </div>
                <div className="pr-8">
                  <span className="">Unit</span>:{" "}
                  <span className="font-medium">{medication.unit}</span>
                </div>
                <div className="flex-auto">
                  <span className="">Frequency</span>:{" "}
                  <span className="font-medium">{medication.frequency}</span>
                </div>
                <div className="flex-auto">
                  <span className="">Until</span>:{" "}
                  <span className="font-medium">{medication.until}</span>
                </div>
              </div>
            </button>
          ))}

          <div className="text-start text-sm mt-10 whitespace-nowrap font-semibold text-black">
            Care Plan
          </div>
          {careplan.map((careplan, index) => (
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
                  src={careplan.srccareplan}
                  className="aspect-square fill-black w-[15px]"
                />
                <div className="my-auto">{careplan.careplanname}</div>
              </div>

              <div className="flex gap-5 justify-between ml-7 max-md:ml-2.5">
                <div className="flex gap-5 text-left self-stretch w-full max-md:flex-wrap max-md:max-w-full">
                  <div className="pr-8">
                    <span className="font-normal">{careplan.value}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
