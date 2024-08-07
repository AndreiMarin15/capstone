import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";
import BackButton from "../BackButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import doctor from "@/backend//health_records/doctor";
import { Button } from "@/components/ui/button";
import usePrescriptionsStore from "@/app/prescriptionsStore";
import {
  deleteMedicationById,
  retrieveMedicationsByIds,
} from "@/backend/health_records/getMedicationRequest";
import { UploadSignature } from "../uploadSignature";
import uploadMedicationComment from "@/backend/health_records/uploadMedicationComment";
import getMedicationComments from "@/backend/health_records/getMedicationComments";
import retrieveReferralData from "@/backend/referral/retrieveReferralData";
import getDoctorInfo from "@/backend/health_records/getDoctorInfo";


export default function AddPrescription({ onSave, fetchPrescriptions, prescriptionId }) {
  const {
    currentScreen,
    setCurrentScreen,
    medications,
    setMedications,
    medicationIds,
    setMedicationIds,
    setEditingMedicationId,
    editingMedicationId,
    fetchMedications,
  } = usePrescriptionsStore();

  const [showModal, setShowModal] = React.useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  const [currentInfo, setCurrentInfo] = useState("");
  const [currentDoctor, setCurrentDoctor] = useState("");
  const [status, setStatus] = useState("incomplete");

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const doctorInfo = await getDoctorInfo();
        console.log(doctorInfo);
        setCurrentInfo(doctorInfo)
        const currentDoctor = await doctor.getDoctorByCurrentUser();
        setCurrentDoctor(currentDoctor)
        if (currentDoctor.specialization === "Endocrinologist") {
          setStatus("complete");
        } else {
          setStatus("incomplete");
        }
      } catch (error) {
        console.error("Error fetching doctor info:", error);
      }
    };
  
    fetchDoctorInfo();
  }, []);


  useEffect(() => {
    fetchMedications();
  }, []);


  const handleEditMedication = (medicationId) => {
    console.log("Edit medication with ID:", medicationId);
    setEditingMedicationId(medicationId);
    setCurrentScreen(4);
  };

  const handleRemoveMedication = async (deletionId) => {
    // Remove locally
    const newMedications = medications.filter((item) => item.id !== deletionId);
    setMedications(newMedications);
    try {
      await deleteMedicationById(deletionId);
      toast.error("Medication Deleted", {
        position: "top-left",
        theme: "colored",
        autoClose: 8000,
      });
    } catch (error) {
      console.error("Error deleting medication from database:", error);
      toast.error("Failed to delete medication from database.", {
        position: "top-left",
        theme: "colored",
        autoClose: 8000,
      });
    }
  };

  const handleSubmit = async (event, finalize = false) => {
    event.preventDefault();
  
    const medicationDataArray = medications.map((medication) => ({
      ...medication,
      resource_type: "MedicationRequest",
      comments: comments.filter(comment => comment.medicationId === medication.id)
    }));
  
    const prescriptionData = {
      resource: {
        medicationData: medicationDataArray,
        resource_type: "prescription",
        status: finalize ? "complete" : "incomplete",
      },
    };
  
    try {
      console.log(prescriptionData);
      await onSave(prescriptionData);
      setMedicationIds([]);
      fetchPrescriptions();
      setCurrentScreen(0);
    } catch (error) {
      console.error("Error creating prescription:", error);
      toast.error("Failed to create prescription.", {
        position: "top-left",
        theme: "colored",
        autoClose: 8000,
      });
    }
  };

  const handleSaveComment = (medicationId) => {
    if (commentText.trim() !== '') {
      // Call the API to save the comment
      uploadMedicationComment({ medication_id: medicationId, comments: commentText })
        .then((insertedId) => {
          toast.success("Comment saved", {
            position: "top-left",
            theme: "colored",
            autoClose: 8000,
          });
          setShowModal(false); // Close the modal
          setCommentText(''); // Clear the comment input
        })
        .catch((error) => {
          console.error("Error saving comment:", error);
          toast.error("Failed to save comment.", {
            position: "top-left",
            theme: "colored",
            autoClose: 8000,
          });
        });
    } else {
      toast.error("Comment cannot be empty", {
        position: "top-left",
        theme: "colored",
        autoClose: 8000,
      });
    }
  };


  const handleComments = async (medicationId) => {
    setShowModal(true);
    setEditingMedicationId(medicationId); 
    await fetchComments(medicationId); // Fetch comments when opening the modal
  };

  const fetchComments = async (medicationId) => {
    if (medicationId) {
      console.log(medicationId);
      const fetchedComments = await getMedicationComments(medicationId);
      
      // Filter comments based on medicationId
      const filteredComments = fetchedComments.filter(
        (comment) => comment.medication_id === medicationId
      );
      
      setComments(filteredComments);
      console.log(filteredComments);
    }
  };

  return (
    <>
      {currentScreen === 1 ? (
        <>
          <div className="flex justify-between">
            <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
              CREATE PRESCRIPTION
            </div>
            <Button className="mt-5" onClick={() => setCurrentScreen(3)}>
              Add Medicine
            </Button>
          </div>
          {/* <UploadSignature /> */}
          <table className="gap-1 whitespace-nowrap mt-10">
            {medications?.map((item, index) => (
              <React.Fragment key={index}>
                <tr className="h-8">
                  <td className="w-5">
                    <Image
                      alt="image"
                      height={0}
                      width={0}
                      loading="lazy"
                      src={
                        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
                      } // Assuming item.src is the URL of the medication image
                      className="self-start aspect-square fill-black w-[15px]"
                    />
                  </td>
                  <td className="border-l-[10px] border-transparent">
                    <div className="text-black text-sm font-semibold leading-5 my-auto">
                      {
                        item.resource.medicationCodeableConcept?.[0]
                          ?.coding?.[0]?.display
                      }
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className="border-l-[5px] border-transparent">
                    <div className="text-black text-sm font-regular leading-5 ml-0.5">
                      <span className="font-semibold mr-4">Dr. {item.resource.requester?.agent?.reference} </span>
                      {" "}
                      {item.resource.dispenseRequest?.validityPeriod?.start} -{" "}
                      {item.resource.dispenseRequest?.validityPeriod?.end}
                    </div>
                  </td>
                  <td className="border-l-[5px] border-transparent">
                    <div className="flex items-center text-black text-sm font-regular leading-5 ml-0.5">
                      <Button
                        className="mr-3"
                        variant="outline"
                        onClick={() => handleEditMedication(item.id)}
                      >
                        Edit
                      </Button>
                      <Button
                      className="mr-3"
                        variant="destructive"
                        onClick={() => handleRemoveMedication(item.id)}
                      >
                        Delete
                      </Button>
                      <button onClick={() => handleComments(item.id)}>
                        <Image
                          alt="image"
                          height={0}
                          width={0}
                          loading="lazy"
                          src={
                            "https://cdn.builder.io/api/v1/image/assets/TEMP/7930b31c5acc01abc6a3efdb5937439b27cad97685d0d9fef7ee1fdea237d022?"
                          } // Assuming item.src is the URL of the medication image
                          className="self-center aspect-square fill-black w-[30px]"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className="flex  border-l-[5px] border-transparent">
                    <div
                      className="text-black text-sm font-regular leading-5"
                      style={{ whiteSpace: "normal", maxWidth: "200px" }}
                    >
                      <span className="font-semibold">Dosage:</span>{" "}
                      {
                        item.resource.dosageInstruction?.[0]?.doseAndRate?.[0]
                          ?.doseQuantity?.doseUnit
                      }
                    </div>
                    <div
                      className="text-black text-sm font-regular leading-5 ml-10"
                      style={{ whiteSpace: "normal", maxWidth: "200px" }}
                    >
                      <span className="font-semibold">Form:</span>{" "}
                      {item.resource.form?.text}
                    </div>
                    <div
                      className="text-black text-sm font-regular leading-5 ml-10"
                      style={{ whiteSpace: "normal", maxWidth: "200px" }}
                    >
                      <span className="font-semibold">Frequency:</span>{" "}
                      {item.resource.dispenseRequest?.dispenseInterval}
                    </div>

                    <div
                      className="text-black text-sm font-regular leading-5 ml-10"
                      style={{ whiteSpace: "normal", maxWidth: "200px" }}
                    >
                      <span className="font-semibold">Instructions:</span>{" "}
                      {item.resource.note}
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </table>
          <div className="flex justify-between mt-10">
            <BackButton
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
            />
            <div className="flex space-x-2">
              <Button onClick={(e) => handleSubmit(e, false)}>SAVE</Button>
              <Button onClick={(e) => handleSubmit(e, true)}>FINALIZE</Button>
            </div>
          </div>

          {showModal && (
            <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-60">
              <div className="bg-white p-8 rounded shadow-lg flex flex-col items-center max-w-full w-[1000px]">
                <div className="px-16 pb-2 text-3xl leading-10 font-semibold text-center text-black max-md:pr-7 max-md:pl-7 max-md:max-w-full">
                  Leave a Comment
                </div>
                <div className="text-sm text-zinc-400">
                  Enter your comments here about another specialists' prescribed medicine.
                </div>

                <div className="px-16 pb-2 text-xl leading-10 font-semibold text-center text-black max-md:pr-7 max-md:pl-7 max-md:max-w-full">
                  Comments:
                </div>
                <ul className="w-96">
                  {comments.map((comment) => {
                    const doctorInfo = currentInfo.find(
                      (doc) => doc.license_id.trim() === comment.doctor.license_id.trim()
                    );

                    return (
                      <li key={comment.id} className="border-b py-10 overflow-auto flex items-start">
                       {doctorInfo?.photo && (
                          <Image
                            src={doctorInfo.photo}
                            alt={doctorInfo.fullName}
                            width={50}
                            height={50}
                            className="mr-3 rounded-full w-12 h-12 object-cover"
                          />
                        )}
                        <div>
                          <strong>{comment.doctor.fullName}</strong>
                          <div>{comment.comments}</div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <textarea
                  rows="4"
                  id="textareaId"
                  value={commentText} // Bind the value to state
                  onChange={(e) => setCommentText(e.target.value)} // Update state on change
                  className="mt-9 w-96 px-3 py-5 max-w-full bg-white rounded-xl border border-solid shadow-sm border-black border-opacity-30 h-[80px] overflow-auto"
                  placeholder="Enter Text..."
                ></textarea>
                <div className="flex justify-between">
                  <button
                    className="justify-center px-[2rem] py-2.5 mt-8 mr-20 text-lg text-white whitespace-nowrap bg-sky-900 rounded max-md:px-6"
                    onClick={() => handleSaveComment(editingMedicationId)}
                  >
                    Save
                  </button>
                  <button
                    className="justify-center px-[2rem] py-2.5 mt-8 ml-20 text-lg text-white whitespace-nowrap bg-red-900 rounded max-md:px-6"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
}
