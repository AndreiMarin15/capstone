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
      message: "This is where the account owner's name is inputted.",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "status",
      value: "",
      message:
        "Account status means whether the account is active or inactive.",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "identifier",
      value: "",
      message: "This is the unique ID of the account owner",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "description",
      value: "",
      message:
        "This identifies whether the account is a patient or a practitioner.",
    },
  ];
  const personfields = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "name",
      value: "",
      message: "This is where the person is inputted.",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "photo",
      value: "",
      message: "This is where the account owner's photo is stored.",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "gender",
      value: "",
      message: "Gender of the account owner.",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "street_address",
      value: "",
      message: "Street address of the account owner",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "email",
      value: "",
      message: "Email address of the account owner",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "deceased",
      value: "",
      message: "This is used to store whether the patient is deceased or not",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "birthdate",
      value: "",
      message: "Birthdate of the account owner",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "identifier",
      value: "",
      message: "This is the unique ID of the account owner",
    },
  ];
  const pracfields = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "practitioner",
      value: "",
      message: "This is where the name of the practitioner is stored.",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "active",
      value: "",
      message: "This stores whether the doctor account is active or not.",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "gender",
      value: "",
      message: "Refers to the gender of practitioner.",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "telecom",
      value: "",
      message: "Refers to the email address of the practitioner.",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "birthdate",
      value: "",
      message: "This is where the practitioner's birthdate is stored.",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "identifier",
      value: "",
      message: "This is the unique ID of the practitioner.",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "qualification",
      value: "",
      message: "This is the unique ID of the practitioner's specialization.",
    },
  ];
  const patientfields = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "name",
      value: "",
      message: "This is where the patient's name is stored.",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "photo",
      value: "",
      message: "This is where the patient's photo is stored.",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "active",
      value: "",
      message: "Used to store whether the patient's account is active or not.",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "gender",
      value: "",
      message: "Gender of the patient].",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "street_address",
      value: "",
      message: "Street address of the patient.",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "email",
      value: "",
      message: "Email address of the patientr",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "deceased",
      value: "",
      message: "This is used to store whether the patient is deceased or not.",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "birthdate",
      value: "",
      message: "Birthdate of the patient.",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "identifier",
      value: "",
      message: "This is the unique ID of the patient.",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "philhealth_id",
      value: "",
      message: "This stores the patien's PhilHealth ID number.",
    },
  ];
  const observefields = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "id",
      value: "",
      message: "This is where the observation is inputted.",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "code",
      value: "",
      message: "This is to test the patient",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "system",
      value: "",
      message: "This is to test the patient",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "subject",
      value: "",
      message: "This is to test the patient",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "resource_type",
      value: "",
      message: "This is to test the patient",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "unit",
      value: "",
      message: "This is to test the patient",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "value",
      value: "",
      message: "This is to test the patient",
    },
  ];
  const encounterfields = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "id",
      value: "",
      message: "This is where the encounter is inputted.",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "start",
      value: "",
      message: "This is to test the patient",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "type",
      value: "",
      message: "This is to test the patient",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "contained",
      value: "",
      message: "This is to test the patient",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "type",
      value: "",
      message: "This is to test the patient",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "actor",
      value: "",
      message: "This is to test the patient",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "resource_type",
      value: "",
      message: "This is to test the patient",
    },
  ];
  const famhistoryfields = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "age",
      value: "",
      message: "Refers to the age of the family member.",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "sex",
      value: "",
      message: "Refers to the sex of the family member.",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "name",
      value: "",
      message: "Refers to the sex of the family member.",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "patient",
      value: "",
      message: "Refers to the unique ID of the patient.",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "code",
      value: "",
      message: "Refers to the disease of the family member.",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "onset",
      value: "",
      message: "Refers to the family member's disease onset date.",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "outcome",
      value: "",
      message:
        "Refers to the whether the family member's outcome was deceased, recovered, chronic, or improved.",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "procedure",
      value: "",
      message:
        "Refers to medical procedures done on the family member related to the condition, if any.",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "identifier",
      value: "",
      message: "Refers to the unique ID of the patient's family member.",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d19836557e1663895fdf541cf9cb7830a89d1289dd6769b52c91d8a61b9f5e13?",
      variable: "relationship",
      value: "",
      message:
        "Refers to the relationship of the patient with the family member.",
    },
  ];

  const RenderInputFields = () => {
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
                <div
                  className="text-xs absolute top-[calc(100% + 5px)] left-1/2 bg-gray-200 p-2 rounded shadow-md transform -translate-x-1/2 flex justify-center items-center z-10" // Adjusted z-index to bring it to the front
                  style={{ maxWidth: "200px", wordWrap: "break-word" }}
                >
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
                <div
                  className="text-xs absolute top-[calc(100% + 5px)] left-1/2 bg-gray-200 p-2 rounded shadow-md transform -translate-x-1/2 flex justify-center items-center z-10" // Adjusted z-index to bring it to the front
                  style={{ maxWidth: "200px", wordWrap: "break-word" }}
                >
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
                <div
                  className="text-xs absolute top-[calc(100% + 5px)] left-1/2 bg-gray-200 p-2 rounded shadow-md transform -translate-x-1/2 flex justify-center items-center z-10" // Adjusted z-index to bring it to the front
                  style={{ maxWidth: "200px", wordWrap: "break-word" }}
                >
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
                <div
                  className="text-xs absolute top-[calc(100% + 5px)] left-1/2 bg-gray-200 p-2 rounded shadow-md transform -translate-x-1/2 flex justify-center items-center z-10" // Adjusted z-index to bring it to the front
                  style={{ maxWidth: "200px", wordWrap: "break-word" }}
                >
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
                <div
                  className="text-xs absolute top-[calc(100% + 5px)] left-1/2 bg-gray-200 p-2 rounded shadow-md transform -translate-x-1/2 flex justify-center items-center z-10" // Adjusted z-index to bring it to the front
                  style={{ maxWidth: "200px", wordWrap: "break-word" }}
                >
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
                <div
                  className="text-xs absolute top-[calc(100% + 5px)] left-1/2 bg-gray-200 p-2 rounded shadow-md transform -translate-x-1/2 flex justify-center items-center z-10" // Adjusted z-index to bring it to the front
                  style={{ maxWidth: "200px", wordWrap: "break-word" }}
                >
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
                <div
                  className="text-xs absolute top-[calc(100% + 5px)] left-1/2 bg-gray-200 p-2 rounded shadow-md transform -translate-x-1/2 flex justify-center items-center z-10" // Adjusted z-index to bring it to the front
                  style={{ maxWidth: "200px", wordWrap: "break-word" }}
                >
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
        <div className="text-small mt-5 mr-40 text-justify font-normal">
          <span className="font-semibold">How to Use:</span>
          <br />
          <br />
          Use the input fields below to map the fields EndoTracker's databse to
          your EMR (Electronic Medical Record) system.
          <br />
          <br />
          For example, in EndoTracker's database, the field name that stores a
          user's photo is is "user_photo," but in your EMR system, the name of
          the field is "photo." You should input "photo" in place of the empty
          "user_photo" input field.
          <br />
          For easier reference, the 'i' icon contains information on what the
          field is for.
        </div>
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
            {RenderInputFields()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
