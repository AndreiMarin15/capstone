import Image from "next/image";
import { useState, useEffect } from "react";
import FamilyHistory from "./sub_components/viewfamilyHistory";
import { FaM } from "react-icons/fa6";
import { getFamilyAndSocialHistory } from "../../../../../lib/backend/patient/personal_details/master_data";
import EditFamilyHistory from "./sub_components/editFamilyHistory";

export default function SocialHistory() {
  const [isEditingSocialHistory, setIsEditingSocialHistory] = useState(false);
  const [originalSocialHistory, setOriginalSocialHistory] = useState({}); // Store original data

  const disabledInputStyle = {
    backgroundColor: "#ccc",
    color: "#666",
    cursor: "not-allowed",
  };
  const [currentPage, setCurrentPage] = useState(0);
  const [familyHistory, setFamilyHistory] = useState([]);
  const [socialHistory, setSocialHistory] = useState({});
  const [currentFamily, setCurrentFamily] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const familyAndSocialHistory = await getFamilyAndSocialHistory();
        console.log(familyAndSocialHistory);
        setFamilyHistory(familyAndSocialHistory.familyHistory);
        setSocialHistory(familyAndSocialHistory.socialHistory);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const tempSHistory = sHistory;
    tempSHistory[0].value = socialHistory["smoker_status"];
    tempSHistory[1].value = socialHistory["cigarettes_per_day"];
    tempSHistory[2].value = socialHistory["alcohol_consumption"];
    tempSHistory[3].value = socialHistory["physical_activities"];
    setSHistory(tempSHistory);
  }, [socialHistory]);

  useEffect(() => {
    const tempValue = [];
    familyHistory.forEach((val) => {
      tempValue.push({
        name: `${val["last_name"]}, ${val["first_name"]}`,
        relationship: val["relationship"],
      });
    });

    setFHistory(tempValue);
  }, [familyHistory]);

  const [fHistory, setFHistory] = useState([]);
  const [sHistory, setSHistory] = useState([
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/7a91cfdd5846dc05e44380ed44e3b06466dab42e135dd9885eea2acdccfe9fee?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Smoking Status",
      value: "-",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/65c9a72e3a94e2c92d81578df365997bc45a028f61ee1fba03762a4052e6f394?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Cigarettes Per Day",
      value: "-",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b841c62f42d2c5d465163f55b524edf4dd643301dbe4fa2bcc0572263ffee5e1?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Alcohol",
      value: "-",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/272bfa12e1a92d2fff81cf645845a86243b21061b37393b3575f26e5a12a9821?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Physical Activities",
      value: "-",
    },
  ]);

  const handleVisitClick = (i) => {
    console.log(familyHistory[i]);
    setCurrentPage(currentPage + 1);
  };

  const handleSocialHistoryChange = (e, index) => {
    const newSocialHistory = [...sHistory];
    newSocialHistory[index].value = e.target.value;
    setSHistory(newSocialHistory);
  };

  return (
    <>
      {currentPage === 0 && (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
            FAMILY HISTORY
            <button
              className="flex gap-1.5 justify-between px-10 py-1 rounded border-blue-800 text-blue-800 border-solid text-xs font-semibold border-1.5"
              onClick={() => setCurrentPage(2)}
            >
              Edit Family History
            </button>
          </div>

          {fHistory.map((item, index) => (
            <button
              key={index}
              className="flex gap-2.5 mt-3 mb-3 text-xs text-black"
              onClick={() => {
                setCurrentFamily(familyHistory[index]);
                handleVisitClick(index);
              }}
            >
              <div className="flex flex-col flex-1 text-left">
                <div className="font-semibold whitespace-nowrap">
                  {item.name}
                </div>
                <div>{item.relationship}</div>
                <div className="border-b border-gray-300 w-full mt-2"></div>
              </div>
            </button>
          ))}

          <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
            SOCIAL HISTORY
            <div>
              {!isEditingSocialHistory && (
                <button
                  className="flex gap-1.5 justify-between px-10 py-1 rounded border-blue-800 text-blue-800 border-solid text-xs font-semibold border-1.5"
                  onClick={() => {
                    setOriginalSocialHistory(socialHistory); // Store the original data
                    setIsEditingSocialHistory(true);
                  }}
                >
                  Edit Social History
                </button>
              )}
              {isEditingSocialHistory && (
                <button
                  className="flex gap-1.5 justify-between px-10 py-1 rounded border-blue-800 text-blue-800 border-solid text-xs font-semibold border-1.5"
                  onClick={() => {
                    setSocialHistory(originalSocialHistory); // Revert to original data
                    setIsEditingSocialHistory(false);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          <table className="max-w-fit border-spacing-y-7 border-separate">
            {" "}
            {sHistory.map((item, index) => (
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
                    {isEditingSocialHistory ? (
                      item.variable === "Smoking Status" ? (
                        <select
                          onChange={(e) => handleSocialHistoryChange(e, index)}
                          value={item.value}
                          className="text-black text-sm whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch mt-[10px] px-2 py-2.5 border-[0.5px] border-solid border-black"
                        >
                          <option value="">Select</option>
                          <option value="Smoker">Smoker</option>
                          <option value="Non-Smoker">Not a Smoker</option>
                        </select>
                      ) : item.variable === "Cigarettes Per Day" ? (
                        <input
                          type="number"
                          value={item.value}
                          onChange={(e) => handleSocialHistoryChange(e, index)}
                          className="text-black text-sm whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch mt-[10px] px-2 py-2.5 border-[0.5px] border-solid border-black"
                          disabled={sHistory[0].value === "Non-Smoker"}
                          style={
                            sHistory[0].value === "Non-Smoker"
                              ? disabledInputStyle
                              : {}
                          }
                        />
                      ) : item.variable === "Physical Activities" ? (
                        <select
                          onChange={(e) => handleSocialHistoryChange(e, index)}
                          value={item.value}
                          className="text-black text-sm whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch mt-[10px] px-2 py-2.5 border-[0.5px] border-solid border-black"
                        >
                          <option value="">Select</option>
                          <option value="Sedentary">Sedentary</option>
                          <option value="Low">Low Activity</option>
                          <option value="ModerateAct">Moderate Activity</option>
                          <option value="High">High Activity</option>
                          <option value="Regular">Regular Exercise</option>
                        </select>
                      ) : item.variable === "Alcohol" ? (
                        <select
                          onChange={(e) => handleSocialHistoryChange(e, index)}
                          value={item.value}
                          className="text-black text-sm whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch mt-[10px] px-2 py-2.5 border-[0.5px] border-solid border-black"
                        >
                          <option value="">Select</option>
                          <option value="Non-Drinker">Non-Drinker</option>
                          <option value="Moderate">Moderate Drinker</option>
                          <option value="Heavy">Heavy Drinker</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={item.value}
                          onChange={(e) => handleSocialHistoryChange(e, index)}
                          className="text-black text-sm whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch mt-[10px] px-2 py-2.5 border-[0.5px] border-solid border-black"
                        />
                      )
                    ) : (
                      item.value
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </table>
          {isEditingSocialHistory && (
            <button
              className="self-end gap-1.5 justify-between px-10 py-1 rounded border-sky-900  bg-sky-900 text-white border-solid text-xs font-semibold border-1.5"
              onClick={() => {
                // Logic for saving changes
                setIsEditingSocialHistory(false);
              }}
            >
              Save
            </button>
          )}
        </>
      )}

      {currentPage === 1 && <FamilyHistory data={currentFamily} />}

      {currentPage === 2 && <EditFamilyHistory />}
    </>
  );
}
