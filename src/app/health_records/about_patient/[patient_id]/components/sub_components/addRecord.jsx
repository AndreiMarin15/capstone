import Image from "next/image";
import { Button } from "@/components/ui/button";
import BackButton from "./BackButton";
import { uploadRecord } from "@/backend/health_records/uploadRecord";
import { doctor } from "@/backend/health_records/doctor";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ImageModal = ({ src, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
      <div className="max-w-screen-lg">
        <img src={src} alt="full" className="max-w-full max-h-full" />
        <button className="absolute top-4 right-4 text-white" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default function AddRecord({ currentScreen, setCurrentScreen, patientId, fetchRecords }) {
  const [doctorInfo, setDoctorInfo] = useState({});
  const [uploadedImageSrc, setUploadedImageSrc] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    upload: null,
    patientInfo: {
      subject: {
        reference: patientId,
      }
    },
    doctorInfo: {
      type: "",
      fullName: "", 
      license: "",
    }
  });

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const doctorId = await doctor.getDoctorByCurrentUser();
        setDoctorInfo(doctorId);

        // Update formData with the fetched doctorInfo
        setFormData((prevFormData) => ({
          ...prevFormData,
          doctorInfo: {
            type: doctorId.type,
            fullName: doctorId.fullName,
            license: doctorId.license,
          }
        }));
      } catch (error) {
        console.error('Error fetching doctorId:', error);
      }
    };

    fetchDoctorInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileUpload = async (files) => {
    const file = files[0];
    try {
      const base64Image = await getImageBase64(file);
      setUploadedImageSrc(base64Image);
      setFormData({
        ...formData,
        upload: base64Image,
      });
    } catch (error) {
      console.error("Error converting image to Base64:", error);
    }
  };

  const getImageBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      upload: e.target.files[0], // Capture the first file selected by the user
    });
    handleFileUpload(e.target.files);
  };

  const validateFields = () => {
    let valid = true;

    if (!formData.title.trim()) {
      valid = false;
        toast.error("Title is required.", {
          autoClose: 2000,
        });
    }

    if (!formData.upload) {
      valid = false; 
        toast.error("Upload is required.", {
          autoClose: 2000,
        });
    }

    return valid;
  };

  const handleSubmit = async () => {
    // Set formSubmitted to true to display validation errors if any
    setFormSubmitted(true);

    if (!validateFields()) {
      return;
    }

    const result = await uploadRecord(formData);

    if (result.success) {
      toast.success("Other Record Added", {
        position: "top-left",
        theme: "colored",
        autoClose: 2000
      });
      fetchRecords();
      setCurrentScreen(0);
    } else {
      toast.error("Error Adding Record", {
        position: "top-left",
        theme: "colored",
        autoClose: 2000
      });
    }
  };

  return (
    <>
      <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
        UPLOAD OTHER RECORDS
      </div>

      <div>
        <div className="flex flex-col max-w-full">
          <table className="max-w-fit border-spacing-y-5 border-separate">
            <tbody className="text-xs leading-5 text-black">
              {[
                { variable: "Title", type: "input" },
                { variable: "Description", type: "textarea" },
                { variable: "Upload", type: "upload" },
              ].map((item, index) => (
                <tr key={index} className="align-top">
                  <td className="w-5">
                    <Image
                      alt="icon"
                      height={0}
                      width={0}
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
                      className="self-start aspect-square fill-black w-[15px]"
                    />
                  </td>
                  <td className="border-l-[5px] border-transparent">
                    <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                      {item.variable}
                    </div>
                  </td>
                  <td className="border-l-[15px] border-transparent">
                    {item.type === "input" ? (
                      <input
                        name="title"
                        placeholder={`Add ${item.variable}`}
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        className={`justify-center items-start py-1.5 pl-3 pr-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] max-md:pr-5 w-full ${
                          formSubmitted && !formData.title.trim() ? "border-red-500" : ""
                        }`}
                      />
                    ) : item.type === "textarea" ? (
                      <textarea
                        name="description"
                        placeholder={`Add ${item.variable}`}
                        value={formData.description}
                        onChange={handleChange}
                        className="justify-center items-start py-1.5 pl-3 pr-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] max-md:pr-5 w-full"
                      />
                    ) : item.type === "upload" ? (
                      <div
                        className={`flex gap-10 mt-6`}
                        onDrop={(e) => handleDrop(e)}
                        onDragOver={(e) => handleDragOver(e)}
                      >
                        <div
                            className={`flex flex-col items-center px-20 py-8 text-xs leading-5 text-center bg-white border-black border-[0.5px] border-solid ${
                              formSubmitted && !formData.upload ? "border-red-500" : "border-black"
                            } w-25%`}
                          >
                          {uploadedImageSrc ? (
                            <>
                              <div className="w-full max-w-full overflow-hidden flex justify-center items-center">
                                <div
                                  className="w-auto max-w-full h-[400px] cursor-pointer flex justify-center"
                                  onClick={handleOpenModal}
                                >
                                  <img
                                    src={uploadedImageSrc}
                                    alt="uploaded"
                                    style={{
                                      maxWidth: "100%",
                                      maxHeight: "80%",
                                    }}
                                  />
                                </div>
                              </div>
                              <button
                                className="mt-2 text-sky-600 underline cursor-pointer"
                                onClick={() => setUploadedImageSrc(null)}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <Image
                                alt="image"
                                height={0}
                                width={0}
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d670cd5944e41d3f0d0ba9e28820c872d801df2a901fa93765c19dc39e0b53f7?"
                                className="aspect-[1.03] w-[38px]"
                              />
                              <div className="self-stretch mt-1.5 text-black">
                                Drag or drop here.
                              </div>
                              <div
                                className="mt-3.5 font-light text-sky-600 underline"
                                onClick={handleUploadClick}
                              >
                                Upload
                              </div>
                              <input
                                type="file"
                                className="hidden"
                                onChange={(e) => handleFileUpload(e.target.files)}
                                ref={fileInputRef}
                              />
                            </>
                          )}
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                          />
                        </div>
                      </div>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center">
            <BackButton
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
            />

            <Button
              className="flex items-center ml-12 px-5 py-1 rounded border border-sky-900 border-solid font-semibold border-1.5 text-sm bg-sky-900 text-white"
              onClick={handleSubmit}
            >
              Save
            </Button>
            {isModalOpen && (
              <ImageModal src={uploadedImageSrc} onClose={handleCloseModal} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
