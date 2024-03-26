"use client";

import * as React from "react";
import Image from "next/image";

export default function Middleware() {
  const [selectedEntity, setSelectedEntity] = React.useState("");

  const handleButtonClick = (entity) => {
    setSelectedEntity(entity);
  };
  const accfields = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "name",
      value: "",
      message: "This is where the name is inputted.",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "status",
      value: "",
      message: "This is where the status is inputted.",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "identifier",
      value: "",
      message: "This is where the identifier is inputted.",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "description",
      value: "",
      message: "This is where the description is inputted.",
    },
  ];
  const personfields = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "person",
      value: "",
      message: "This is where the person is inputted.",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "person2",
      value: "",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "identifier",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "description",
      value: "",
    },
  ];
  const pracfields = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "practitioner",
      value: "",
      message: "This is where the practitioner is inputted.",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "test",
      value: "",
      message: "This is where the practitioner is inputted.",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "identifier",
      value: "",
      message: "This is where the practitioner is inputted.",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "description",
      value: "",
      message: "This is where the practitioner is inputted.",
    },
  ];
  const patientfields = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "patient",
      value: "",
      message: "This is where the patient is inputted.",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "patienttest",
      value: "",
      message: "This is to test the patient",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "identifier",
      value: "",
      message: "This is to test the patient",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "description",
      value: "",
      message: "This is to test the patient",
    },
  ];
  const observefields = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "observation",
      value: "",
      message: "This is where the observation is inputted.",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "patienttest",
      value: "",
      message: "This is to test the patient",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "identifier",
      value: "",
      message: "This is to test the patient",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "description",
      value: "",
      message: "This is to test the patient",
    },
  ];
  const encounterfields = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "encounter",
      value: "",
      message: "This is where the encounter is inputted.",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "patienttest",
      value: "",
      message: "This is to test the patient",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "identifier",
      value: "",
      message: "This is to test the patient",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "description",
      value: "",
      message: "This is to test the patient",
    },
  ];
  const famhistoryfields = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "family",
      value: "",
      message: "This is where the family is inputted.",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "patienttest",
      value: "",
      message: "This is to test the patient",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "identifier",
      value: "",
      message: "This is to test the patient",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "description",
      value: "",
      message: "This is to test the patient",
    },
  ];

  const renderInputFields = () => {
    const [hoveredImageId, setHoveredImageId] = React.useState(null); // Track the currently hovered image

    const onHover = (imageId) => {
      setHoveredImageId(imageId); // Set the hovered image ID when mouse enters
    };

    const onHoverOver = () => {
      setHoveredImageId(null); // Reset the hovered image ID when mouse leaves
    };

    const fields =
      selectedEntity === "Account"
        ? accfields
        : selectedEntity === "Person"
          ? personfields
          : selectedEntity === "Practitioner"
            ? pracfields
            : selectedEntity === "Patient"
              ? patientfields
              : selectedEntity === "Observations"
                ? observefields
                : selectedEntity === "Encounter"
                  ? encounterfields
                  : selectedEntity === "Patient Family History"
                    ? famhistoryfields
                    : [];

    if (selectedEntity === "Account") {
      // Assuming you have a similar structure for account fields
      return accfields.map((item, index) => (
        <tr key={index} className="h-8 relative">
          <td className="border-l-[16px] border-transparent">
            <div className="flex gap-1 items-center">
              <div className="gap-1 text-black text-xs font-semibold leading-5 self-center my-auto">
                {item.variable}
              </div>
              <Image
                alt="image"
                height={0}
                width={0}
                loading="lazy"
                src={item.src}
                className="self-center aspect-square fill-black w-[15px]"
                onMouseEnter={() => onHover(index)} // Pass the index as the image ID
                onMouseLeave={onHoverOver}
              />
              {hoveredImageId === index && (
                <div className="text-xs absolute top-0 left-0 bg-gray-200 p-2 rounded shadow-md transform translate-y-[80%] translate-x-[-20%]">
                  {`${item.message}`}
                </div>
              )}
            </div>
          </td>
          <td className="border-l-[5rem] border-transparent">
            <input className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5" />
          </td>
        </tr>
      ));
    } else if (selectedEntity === "Person") {
      return personfields.map((item, index) => (
        <tr key={index} className="h-8 relative">
          <td className="border-l-[16px] border-transparent">
            <div className="flex gap-1 items-center">
              <div className="gap-1 text-black text-xs font-semibold leading-5 self-center my-auto">
                {item.variable}
              </div>
              <Image
                alt="image"
                height={0}
                width={0}
                loading="lazy"
                src={item.src}
                className="self-center aspect-square fill-black w-[15px]"
                onMouseEnter={() => onHover(index)} // Pass the index as the image ID
                onMouseLeave={onHoverOver}
              />
              {hoveredImageId === index && (
                <div className="text-xs absolute top-0 left-0 bg-gray-200 p-2 rounded shadow-md transform translate-y-[80%] translate-x-[-20%]">
                  {`${item.message}`}
                </div>
              )}
            </div>
          </td>
          <td className="border-l-[5rem] border-transparent">
            <input className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5" />
          </td>
        </tr>
      ));
    } else if (selectedEntity === "Practitioner") {
      return pracfields.map((item, index) => (
        <tr key={index} className="h-8 relative">
          <td className="border-l-[16px] border-transparent">
            <div className="flex gap-1 items-center">
              <div className="gap-1 text-black text-xs font-semibold leading-5 self-center my-auto">
                {item.variable}
              </div>
              <Image
                alt="image"
                height={0}
                width={0}
                loading="lazy"
                src={item.src}
                className="self-center aspect-square fill-black w-[15px]"
                onMouseEnter={() => onHover(index)} // Pass the index as the image ID
                onMouseLeave={onHoverOver}
              />
              {hoveredImageId === index && (
                <div className="text-xs absolute top-0 left-0 bg-gray-200 p-2 rounded shadow-md transform translate-y-[80%] translate-x-[-20%]">
                  {`${item.message}`}
                </div>
              )}
            </div>
          </td>
          <td className="border-l-[5rem] border-transparent">
            <input className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5" />
          </td>
        </tr>
      ));
    } else if (selectedEntity === "Patient") {
      return patientfields.map((item, index) => (
        <tr key={index} className="h-8 relative">
          <td className="border-l-[16px] border-transparent">
            <div className="flex gap-1 items-center">
              <div className="gap-1 text-black text-xs font-semibold leading-5 self-center my-auto">
                {item.variable}
              </div>
              <Image
                alt="image"
                height={0}
                width={0}
                loading="lazy"
                src={item.src}
                className="self-center aspect-square fill-black w-[15px]"
                onMouseEnter={() => onHover(index)} // Pass the index as the image ID
                onMouseLeave={onHoverOver}
              />
              {hoveredImageId === index && (
                <div className="text-xs absolute top-0 left-0 bg-gray-200 p-2 rounded shadow-md transform translate-y-[80%] translate-x-[-20%]">
                  {`${item.message}`}
                </div>
              )}
            </div>
          </td>
          <td className="border-l-[5rem] border-transparent">
            <input className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5" />
          </td>
        </tr>
      ));
    } else if (selectedEntity === "Observation") {
      return observefields.map((item, index) => (
        <tr key={index} className="h-8 relative">
          <td className="border-l-[16px] border-transparent">
            <div className="flex gap-1 items-center">
              <div className="gap-1 text-black text-xs font-semibold leading-5 self-center my-auto">
                {item.variable}
              </div>
              <Image
                alt="image"
                height={0}
                width={0}
                loading="lazy"
                src={item.src}
                className="self-center aspect-square fill-black w-[15px]"
                onMouseEnter={() => onHover(index)} // Pass the index as the image ID
                onMouseLeave={onHoverOver}
              />
              {hoveredImageId === index && (
                <div className="text-xs absolute top-0 left-0 bg-gray-200 p-2 rounded shadow-md transform translate-y-[80%] translate-x-[-20%]">
                  {`${item.message}`}
                </div>
              )}
            </div>
          </td>
          <td className="border-l-[5rem] border-transparent">
            <input className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5" />
          </td>
        </tr>
      ));
    } else if (selectedEntity === "Encounter") {
      return encounterfields.map((item, index) => (
        <tr key={index} className="h-8 relative">
          <td className="border-l-[16px] border-transparent">
            <div className="flex gap-1 items-center">
              <div className="gap-1 text-black text-xs font-semibold leading-5 self-center my-auto">
                {item.variable}
              </div>
              <Image
                alt="image"
                height={0}
                width={0}
                loading="lazy"
                src={item.src}
                className="self-center aspect-square fill-black w-[15px]"
                onMouseEnter={() => onHover(index)} // Pass the index as the image ID
                onMouseLeave={onHoverOver}
              />
              {hoveredImageId === index && (
                <div className="text-xs absolute top-0 left-0 bg-gray-200 p-2 rounded shadow-md transform translate-y-[80%] translate-x-[-20%]">
                  {`${item.message}`}
                </div>
              )}
            </div>
          </td>
          <td className="border-l-[5rem] border-transparent">
            <input className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5" />
          </td>
        </tr>
      ));
    } else if (selectedEntity === "Patient Family History") {
      return famhistoryfields.map((item, index) => (
        <tr key={index} className="h-8 relative">
          <td className="border-l-[16px] border-transparent">
            <div className="flex gap-1 items-center">
              <div className="gap-1 text-black text-xs font-semibold leading-5 self-center my-auto">
                {item.variable}
              </div>
              <Image
                alt="image"
                height={0}
                width={0}
                loading="lazy"
                src={item.src}
                className="self-center aspect-square fill-black w-[15px]"
                onMouseEnter={() => onHover(index)} // Pass the index as the image ID
                onMouseLeave={onHoverOver}
              />
              {hoveredImageId === index && (
                <div className="text-xs absolute top-0 left-0 bg-gray-200 p-2 rounded shadow-md transform translate-y-[80%] translate-x-[-20%]">
                  {`${item.message}`}
                </div>
              )}
            </div>
          </td>
          <td className="border-l-[5rem] border-transparent">
            <input className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5" />
          </td>
        </tr>
      ));
    }
    // Add conditions for other entities
  };

  return (
    <div className="flex flex-col  px-5 bg-white max-w-full">
      <div className="w-full text-xl ml-10 mt-10 font-semibold leading-8 text-black max-md:max-w-full">
        Middleware
      </div>
      <div className="flex ml-10 gap-2.5 px-0.5 mt-9 text-xs font-semibold leading-5 text-black max-md:flex-wrap">
        {[
          "Account",
          "Person",
          "Practitioner",
          "Patient",
          "Observation",
          "Encounter",
          "Patient Family History",
        ].map((entity) => (
          <button
            key={entity}
            onClick={() => handleButtonClick(entity)}
            className={`justify-center px-6 py-1 whitespace-nowrap rounded border border-black border-solid max-md:px-5 ${
              selectedEntity === entity
                ? "bg-sky-900 text-white"
                : "hover:bg-sky-900 hover:text-white"
            }`}
          >
            {entity}
          </button>
        ))}
      </div>
      {/* <div className="flex ml-10 gap-2.5 px-0.5 mt-9 text-xs font-semibold leading-5 text-black max-md:flex-wrap">
        <button
          onClick={() => handleButtonClick("Account")}
          className="justify-center px-6 py-1 whitespace-nowrap rounded border border-black border-solid max-md:px-5 hover:bg-sky-900 hover:text-white"
        >
          {" "}
          Account
        </button>
        <button
          onClick={() => handleButtonClick("Person")}
          className="justify-center px-6 py-1 whitespace-nowrap rounded border border-black border-solid max-md:px-5 hover:bg-sky-900 hover:text-white"
        >
          Person
        </button>
        <button
          onClick={() => handleButtonClick("Practitioner")}
          className="justify-center px-6 py-1 whitespace-nowrap rounded border border-black border-solid max-md:px-5 hover:bg-sky-900 hover:text-white"
        >
          Practicioner
        </button>
        <button
          onClick={() => handleButtonClick("Patient")}
          className="justify-center px-6 py-1 whitespace-nowrap rounded border border-black border-solid max-md:px-5 hover:bg-sky-900 hover:text-white"
        >
          Patient
        </button>
        <button
          onClick={() => handleButtonClick("Observation")}
          className="justify-center px-6 py-1 whitespace-nowrap rounded border border-black border-solid max-md:px-5 hover:bg-sky-900 hover:text-white"
        >
          Observation
        </button>
        <button
          onClick={() => handleButtonClick("Encounter")}
          className="justify-center px-6 py-1 whitespace-nowrap rounded border border-black border-solid max-md:px-5 hover:bg-sky-900 hover:text-white"
        >
          Encounter
        </button>
        <button
          onClick={() => handleButtonClick("Patient Family History")}
          className="justify-center px-6 py-1 rounded border border-black border-solid max-md:px-5 hover:bg-sky-900 hover:text-white"
        >
          Patient Family History
        </button>
      </div> */}
      <div className="mt-12 max-w-full w-[447px] max-md:mt-10">
        <table className="ml-10 max-w-fit border-spacing-y-5 border-separate">
          <tbody className="text-xs leading-5 text-black">
            {renderInputFields()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
