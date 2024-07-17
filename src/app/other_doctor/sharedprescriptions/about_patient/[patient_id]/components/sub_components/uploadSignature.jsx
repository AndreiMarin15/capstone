"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/app/store";
import { useSignature } from "@/app/store";
import { uploadSignature } from "@/backend/signatures/doctor_signature";

export function UploadSignature({ signatureFlag, setSignatureFlag }) {
  const [base64, setBase64] = useState(""); // State to store the base64 string
  const fileInputRef = useRef(null); // Ref for the file input

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result); // Set the base64 string to state
        useSignature.getState().setSignature(reader.result);
        useSignature.getState().setId(currentUser.getState().info.id);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (base64) {
      uploadSignature();
      setSignatureFlag(!signatureFlag);
    }
  }, [base64]);

  const handleClick = () => {
    fileInputRef.current.click(); // Trigger file input click on button click
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }} // Hide the file input
        ref={fileInputRef}
      />
      <Button variant="outline" onClick={handleClick}>
        Upload Signature
      </Button>
      {/* {base64 && (
				<div>
					<Image src={base64} alt="signature" width={100} height={100} />
				</div>
			)} */}
    </div>
  );
}
