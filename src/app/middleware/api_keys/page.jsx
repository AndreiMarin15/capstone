"use client";
import React, { useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { middlewareUser } from "@/app/store";
import { fetchFrom } from "../../../../globals";
import { useRouter } from "next/navigation";
export default function MyTable() {
	const router = useRouter();
	const mUser = middlewareUser.getState();
	const [data, setData] = useState([
		{ created_at: "2022-01-01", key: "1234567890" },
		{ created_at: "2022-01-02", key: "abcdefghij" },
		// Add more data as needed
	]);
	const newApiKeyRef = useRef();
	const [censoredData, setCensoredData] = useState([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [newApiKey, setNewApiKey] = useState("");
	function copyToClipboard() {
		navigator.clipboard
			.writeText(newApiKeyRef.current.innerText)
			.then(() => {
				toast.success("Copied to clipboard");
			})
			.catch((err) => console.error("Could not copy text: ", err));
	}
	useEffect(() => {
		console.log(data);
		if (data.data != null && data.data.length > 0) {
			setCensoredData(
				data.data?.map((item) => ({
					...item,
					key: censorKey(item.key),
				}))
			);
		}
	}, [data]);

	useEffect(() => {
		console.log(mUser);
		const fetchKeys = async () => {
			const response = await fetch(
				(process.env.NEXT_PUBLIC_MIDDLEWARE_API_CALLS ?? "https://cap-middleware.onrender.com/user") + "/getKeys",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: mUser.info.email,
					}),
				}
			);
			console.log(response);

			const fetched = await response.json();
			console.log(fetched);
			setData(fetched);
		};

		fetchKeys();
	}, []);

	function censorKey(key) {
		return key
			.split("")
			?.map((char, index) => {
				// Censor approximately 70% of the characters
				return Math.random() > 0.5 ? "*" : char;
			})
			.join("");
	}

	const createNewApiKey = async () => {
		// Generate a new API key

		const newKey = await fetchFrom("/generateKey", { email: mUser.info.email });
		// const newKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

		console.log(newKey);
		setNewApiKey(newKey[0].key);
		setModalIsOpen(true);
		if (data.length > 0) {
			setData([{ created_at: new Date().toISOString(), key: newKey[0].key }, ...data]);
		} else {
			setData([{ created_at: new Date().toISOString(), key: newKey[0].key }]);
		}
	};

	// Use censoredData instead of data in your render method
	function formatDateTime(dateTimeStr) {
		const date = new Date(dateTimeStr);
		return date.toLocaleString();
	}
	return (
		<>
			<div className="flex flex-col justify-start items-center bg-white pt-10">
				<div className="w-4/5 flex justify-between items-center mb-4">
					<h1 className="text-2xl font-bold text-gray-700">API Keys</h1>
					<div>
						<button
							onClick={() => {
								createNewApiKey();
							}}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5"
						>
							Create New API Key
						</button>
						<button
							onClick={() => {
								router.push("/middleware/mapping");
							}}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						>
							Map Your Data
						</button>

						<button
							onClick={() => {
								router.push("/middleware/view_mapping");
							}}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5"
						>
							View Mapping
						</button>
					</div>
				</div>

				<table className="w-4/5 bg-white rounded-xl overflow-hidden shadow-lg my-auto">
					<thead className="bg-gray-200">
						<tr>
							<th className="px-4 py-2">Created At</th>
							<th className="px-4 py-2">API Key</th>
						</tr>
					</thead>

					<tbody style={{ maxHeight: "500px", overflow: "auto" }}>
						{censoredData.length > 0 &&
							censoredData?.map((item, index) => (
								<tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
									<td className="border px-4 py-2 text-center">{formatDateTime(item.created_at)}</td>
									<td className="border px-4 py-2 text-center">{censorKey(item.key)}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				contentLabel="New API Key"
				className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-50"
			>
				<div className="bg-white rounded-lg w-1/2">
					<div className="flex flex-col items-start p-4">
						<div className="flex items-center w-full">
							<div className="text-gray-900 font-medium text-lg">Your new API key</div>
							<svg
								onClick={() => setModalIsOpen(false)}
								className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 18 18"
							>
								<path d="M18 1.3L16.7 0 9 7.6 1.3 0 0 1.3 7.6 9 0 16.7 1.3 18 9 10.4l7.7 7.6 1.3-1.3L10.4 9z" />
							</svg>
						</div>
						<hr className="w-full" />
						<p ref={newApiKeyRef} className="mt-4">
							{newApiKey}
						</p>
						<p className="mt-4">Please save it as it cannot be retrieved again.</p>
						<div className="flex ">
							<button
								onClick={copyToClipboard}
								className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
							>
								Copy to Clipboard
							</button>
							<button
								onClick={() => setModalIsOpen(false)}
								className="mt-4 ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
}
