import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { addAttachment } from "@/backend/referral/attachments";
export function ImageUploader({ recepient, setUploadFlag, uploadFlag, patient_id }) {
	const [imageBase64, setImageBase64] = useState("");
	const [fileName, setFileName] = useState("");
	const fileInputRef = useRef(null);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImageBase64(reader.result.toString());
				setFileName(file.name);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleClick = () => {
		fileInputRef.current.click();
	};

	const handleSubmit = async () => {
		await addAttachment({ img: imageBase64, filename: fileName }, recepient, patient_id);
		setImageBase64("");
		setFileName("");
		setUploadFlag(!uploadFlag);
	};

	return (
		<div>
			<input
				type="file"
				accept="image/*"
				onChange={handleImageChange}
				style={{ display: "none" }} // Hide the actual input
				ref={fileInputRef}
			/>
			<Button onClick={handleClick}>Upload Image</Button> {/* Custom button */}
			{imageBase64 && (
				<>
					<div>
						{/* <img src={imageBase64} alt="Uploaded" style={{ maxWidth: "100%", height: "auto" }} /> */}
						<p className="w-1/2 text-wrap">To Upload: {fileName ?? "No Image Selected"}</p>
					</div>
					<Button onClick={handleSubmit}>Send</Button> {/* Custom button */}
				</>
			)}
		</div>
	);
}

export default ImageUploader;
