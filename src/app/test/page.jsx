"use client";

import { PROJECT } from "../../../lib/backend/project/db";
import { PUBLIC } from "../../../lib/backend/public/db";
import { useEffect, useState } from "react";
export default function Notes() {
	const [otp, setOtp] = useState(null);
	
	const [userNumber, setNumber] = useState(null);
	

	const sendOTP = () => {
		const myHeaders = new Headers();
		myHeaders.append("Authorization", "App 78aafa3855b42fc87b6336514b2447a6-00e11e65-977b-4589-b0ac-2814b265773a");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Accept", "application/json");
		console.log(userNumber);
		const raw = JSON.stringify({
			messages: [
				{
					destinations: [{ to: userNumber }],
					from: "ServiceSMS",
					text: `Hello! Your OTP is  ${otp}
					
					By providing this pin to your healthcare provider, you are authorizing EndoTracker and [NAME OF DOCTOR], to access your health information, particularly the following:

					- SAMPLE DATA PULL 1
					- SAMPLE DATA PULL 2
					
					EndoTracker respects the privacy of personal data, and are committed to handling your personal data with care. It is your right to be informed of how EndoTracker collects your data, including the purposes of how we collect, use, and disclose. 
					
					For more information on how EndoTracker handles and makes use of your data, please refer to the Privacy Policy full text which can be found in the system https://capstone-cap2224.vercel.app/legal/privacy_policy.`,
				},
			],
		});

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch("https://y36nrg.api.infobip.com/sms/2/text/advanced", requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.error(error));
	};

	

	

	return (
		<>
			<input
				className="border-2 border-black"
				type="text"
				onChange={(e) => {
					setEntered(e.target.value);
				}}
			/>
			<input
				className="border-2 border-black"
				type="text"
				onChange={(e) => {
					setNumber(e.target.value);
				}}
			/>

			<button
				onClick={() => {
					sendOTP();
				}}
			>
				OTP
			</button>

			{enteredOtp === otp ?? <p>OTP CORRECT</p>}
		</>
	);
}
