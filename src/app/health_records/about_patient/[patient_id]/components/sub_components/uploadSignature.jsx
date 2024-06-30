import React, { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function UploadSignature() {
	const [base64, setBase64] = useState(""); // State to store the base64 string
	const fileInputRef = useRef(null); // Ref for the file input

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setBase64(reader.result); // Set the base64 string to state
			};
			reader.readAsDataURL(file);
		}
	};

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
			<Button onClick={handleClick}>Upload Signature</Button>
			{base64 && (
				<div>
					<p>Your signature will not be saved but will be used for this session only:</p>
					<Image src={base64} alt="signature" width={100} height={100} />
				</div>
			)}
		</div>
	);
}
