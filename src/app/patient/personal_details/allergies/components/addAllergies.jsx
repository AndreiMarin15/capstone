import Image from "next/image";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { PatientSignUp as signUp } from "../../../../../../lib/backend/signup/patient_signup";

import { updateAddAllergies } from "../../../../../../lib/backend/patient/personal_details/master_data";
import * as React from "react";
import { useState, useEffect } from "react";
export default function AddAllergy({ onAdd }) {
  const handleButtonClick = () => {
    // Trigger the parent's callback function
    onAdd();
  };

  const reactionCodes = [
    "J301",
    "J302",
    "J303",
    "J304",
    "J305",
    "L239",
    "L238",
    "L249",
    "H101",
    "H102",
    "T780",
    "T781",
    "T782",
    "T783",
    "T784",
    "T886",
    "T887",
  ];
  const [reactions, setReactions] = useState([]);
  const [reactionNames, setNames] = useState([]);
  const [filteredNames, setFilteredNames] = useState([]);

  const allergens = [
    {
      name: "Food",
      content: [
        "Milk",
        "Eggs",
        "Fish (e.g., bass, flounder, cod)",
        "Crustacean shellfish (e.g., crab, lobster, shrimp)",
        "Tree nuts (e.g., almonds, walnuts, pecans)",
        "Peanuts",
        "Wheat",
        "Soybeans",
        "Sesame",
        "Other",
      ],
    },
    {
      name: "Medication",
      content: [
        "Penicillin and related antibiotics",
        "Nonsteroidal anti-inflammatory drugs",
        "Antibiotics containing sulfonamides",
        "Chemotherapy drugs",
        "Monoclonal antibody therapy",
        "HIV drugs",
        "Antiseizure drugs",
        "Muscle relaxers given by IV",
      ],
    },
    {
      name: "Environment",
      content: [
        "Pollen",
        "Mold",
        "Pet dander and saliva",
        "Dust mites",
        "Cockroaches",
        "Smoke",
        "Dust",
      ],
    },
    {
      name: "Biologic",
      content: [
        "Pollen",
        "Fungal Spores",
        "House-Dust Mites",
        "Animal Epithelial Materials",
        "Drugs",
        "Biologic Products",
        "Insect Venoms",
      ],
    },
  ];
  const [allergenList, setAllergenList] = useState([]);
  const [allergyList, setAllergyList] = useState([]);

  const [saved, setSaved] = useState(false);

  const [allergy, setAllergy] = useState({
    category_of_allergen: "Food",
    allergen: "Milk",
    reactions: [],
    severity_of_allergy: "",
    date_of_onset: "",
    comments: "",
  });

  const form = [
    {
      label: "Category of Allergen",
      field: (
        <select
          onChange={(e) => {
            setAllergy((prev) => {
              return {
                ...prev,
                category_of_allergen: e.target.value,
              };
            });
          }}
          value={allergy.category_of_allergen}
          className="rounded shadow-sm h-10 mt-2 border-[0.5px] px-2 py-2 border-solid border-black"
        >
          <option value="Food">Food</option>
          <option value="Medication">Medication</option>
          <option value="Environment">Environment</option>
          <option value="Biologic">Biologic</option>
          {/* Add more options here */}
        </select>
      ),
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/6f6c16bf79fcef72c689d9cf0dca5633ff9c15a7fd4a0cfecf641759b0e5e537?",
    },
    {
      label: "Allergen",
      field: (
        <select
          onChange={(e) => {
            setAllergy((prev) => {
              return {
                ...prev,
                allergen: e.target.value,
              };
            });
          }}
          value={allergy.allergen}
          className="rounded shadow-sm h-10 mt-3 border-[0.5px] px-2 py-2 border-solid border-black"
        >
          {allergenList.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}

          {/* Add more options here */}
        </select>
      ),
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/8d83467a6242c7712b40f0ed0318ecf32eb3765ea8bbaaa517562b75d192879b?",
    },
    {
      label: "Add Reactions",
      field: (
        <>
          {reactions.length > 0 ? (
            <div className="flex">
              <div className="inline-block relative">
                <input
                  autoComplete="off"
                  type="text"
                  className="rounded shadow-sm h-10 mt-3 border-[0.5px] px-2 py-2 border-solid border-black"
                  placeholder="Allergy"
                  id="allergyInput"
                  onChange={(e) => {
                    let filteredDiseases = [];
                    reactions.forEach((reaction) => {
                      if (e.target.value.length > 0) {
                        if (
                          reaction.disease
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase())
                        ) {
                          filteredDiseases.push(reaction);
                        }
                      } else {
                        filteredDiseases = [];
                      }
                    });

                    setFilteredNames(filteredDiseases);
                  }}
                />
                {filteredNames.length > 0 ? (
                  <>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: "unset",
                        margin: "unset",
                        position: "absolute",
                        width: "100%",
                      }}
                    >
                      {filteredNames.map((aller) => (
                        <li
                          key={aller.id}
                          className="border border-t-0 border-gray-300 bg-gray-200 hover:bg-blue-300"
                        >
                          <button
                            className="border-none cursor-pointer block w-full text-left py-2 px-4"
                            onClick={() => {
                              setAllergy((prev) => {
                                return {
                                  ...prev,
                                  reactions: [
                                    ...allergy.reactions,
                                    {
                                      substance: aller.id,
                                      description: aller.disease,
                                    },
                                  ],
                                };
                              });

                              document.getElementById("allergyInput").value =
                                "";
                              setFilteredNames([]);
                            }}
                          >
                            {aller.disease}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div>
                <ul className="m-[10px] absolute">
                  {allergy.reactions.map((item, index) => (
                    <li className="m-[5px]" key={item.substance}>
                      {" "}
                      {index + 1}. {item.substance} - {item.description}
                    </li>
                  ))}
                </ul>
              </div>{" "}
            </div>
          ) : (
            "loading..."
          )}
        </>
      ),
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0f79f841ae91f66e8662f831b661819a926269652b904eff7314e2b43bb39640?apiKey=66e07193974a40e683930e95115a1cfd&width=100",
    },
    {
      label: "Severity of Allergy",
      field: (
        <select
          onChange={(e) => {
            setAllergy((prev) => {
              return {
                ...prev,
                severity_of_allergy: e.target.value,
              };
            });
          }}
          value={allergy.severity_of_allergy}
          className="rounded shadow-sm h-10 mt-3 border-[0.5px] px-2 py-2 border-solid border-black"
        >
          <option value="Mild">Mild</option>
          <option value="Moderate">Moderate</option>
          <option value="Severe">Severe</option>
          {/* Add more options here */}
        </select>
      ),
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/09f59612784184ecb36b692dc99a1889ca09a88615d7298261028160ecff647b?apiKey=66e07193974a40e683930e95115a1cfd&width=100",
    },
    {
      label: "Date of Onset",
      field: (
        <input
          onChange={(e) => {
            setAllergy((prev) => {
              return {
                ...prev,
                date_of_onset: e.target.value,
              };
            });
          }}
          type="date"
          value={allergy.date_of_onset}
          className=" rounded  border-[0.5px]  border-solid border-black"
        />
      ),
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
    },
    {
      label: "Comments",
      field: (
        <textarea
          onChange={(e) => {
            setAllergy((prev) => {
              return {
                ...prev,
                comments: e.target.value,
              };
            });
          }}
          value={allergy.comments}
          className="text-black shrink-0 mt-6 p-2 rounded border-black border-solid border-[0.5px] h-[81px]"
        />
      ),
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/35d66426cc909742122370c08977979ec58e47bea43f66c6158506c2d6dea5ca?",
    },
  ];
  useEffect(() => {
    if (allergy.category_of_allergen === "Food") {
      setAllergenList(allergens[0].content);

      setAllergy((prev) => {
        return {
          ...prev,
          allergen: allergens[0].content[0],
        };
      });
    } else if (allergy.category_of_allergen === "Medication") {
      setAllergenList(allergens[1].content);

      setAllergy((prev) => {
        return {
          ...prev,
          allergen: allergens[1].content[0],
        };
      });
    } else if (allergy.category_of_allergen === "Environment") {
      setAllergenList(allergens[2].content);

      setAllergy((prev) => {
        return {
          ...prev,
          allergen: allergens[2].content[0],
        };
      });
    } else if (allergy.category_of_allergen === "Biologic") {
      setAllergenList(allergens[3].content);

      setAllergy((prev) => {
        return {
          ...prev,
          allergen: allergens[3].content[0],
        };
      });
    }
  }, [allergy.category_of_allergen, setAllergenList]);

  useEffect(() => {
    setAllergenList(allergens[0].content);

    const getReactions = async () => {
      const query = await signUp.retrieveReactions(reactionCodes);
      setReactions(query);

      const names = query.map((react) => {
        react.disease;
      });

      setNames(names);
    };

    getReactions();
  }, []);

  {
    /* =========================================================== */
  }
  return (
    <>
      <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
        ADD ALLERGY
      </div>
      <div>
        <table className="max-w-fit border-spacing-y-7 border-separate">
          {form.map((item) => (
            <tr key={item.label}>
              <td className="border-l-[16px] border-transparent">
                <div className="text-black text-xs font-semibold flex">
                  <Image
                    alt="image"
                    height={18}
                    width={18}
                    loading="lazy"
                    src={item.src}
                    className="self-start aspect-square w-[18px] mr-3"
                  />
                  {item.label}
                </div>
              </td>
              <td className="border-l-[5rem] border-transparent">
                <div>{item.field}</div>
              </td>
            </tr>
          ))}
        </table>
        <button
          onClick={() => {
            if (saved === false) {
              updateAddAllergies(allergy);
              handleButtonClick();
              setSaved(true);

              setAllergy({
                category_of_allergen: "Food",
                allergen: "Milk",
                reactions: [],
                severity_of_allergy: "Mild",
                date_of_onset: "",
                comments: "",
              });

              setTimeout(() => {
                setSaved(false);
              }, 500);
            }
          }}
          className={
            "text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch" +
            (saved ? " bg-lime-600 " : " bg-sky-900 ") +
            "self-stretch mr-2  px-6 py-2 rounded max-md:px-5"
          }
        >
          {saved ? "Saved" : "Add to list"}
        </button>
      </div>
      {/*  */}
    </>
  );
}
