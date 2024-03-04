import Image from "next/image";
import BackButton from "./sub_components/BackButton";
export default function Medications() {
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
    },
    {
      srcmedicine:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      medicinename: "ASPIRIN",
      srddoctor:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
      doctor: "Dr. Johnny Santos",
      startdate: "2020-10-10",
      enddate: "2020-10-112",
      form: "Tablet",
      dose: "30",
      unit: "mg",
      frequency: "Once daily",
    },
  ];

  return (
    <>
      <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">
        MEDICATIONS
      </div>

      {medications.map((medication, index) => (
        <div
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
              <span className="font-medium">Form</span>:{" "}
              <span className="">{medication.form}</span>
            </div>
            <div className="pr-8">
              <span className="font-medium">Dose</span>:{" "}
              <span className="">{medication.dose}</span>
            </div>
            <div className="pr-8">
              <span className="font-medium">Unit</span>:{" "}
              <span className="">{medication.unit}</span>
            </div>
            <div className="flex-auto">
              <span className="font-medium">Frequency</span>:{" "}
              <span className="">{medication.frequency}</span>
            </div>
          </div>
        </div>
      ))}
      <BackButton/>
    </>
  );
}
