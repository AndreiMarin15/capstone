import Image from "next/image";
import * as React from "react";
import { fetchFrom } from "../../../../../globals";
import { middlewareUser } from "@/app/store";
export default function Fields({ fields, onHoverOver, onHover, hoveredImageId, table, apiKey }) {
	const [toSave, setToSave] = React.useState({});
	const [clientTable, setClientTable] = React.useState("");
	const [toSend, setToSend] = React.useState([]);

	const handleSend = async (obj) => {
		let objectArray = Object.entries(obj).map(([key, value]) => ({
			middleware_table: table,
			client_table: clientTable,
			middleware_column: key,
			client_column: value,
		}));

		// objectArray = [{ middleware_table: table, client_table: clientTable }, ...objectArray];

		const mapping_data = {
			api_key: apiKey,
			owner_email: middlewareUser.getState().info.email,
			// table_mapping: { table_name: table, [table]: clientTable },
			column_mapping: toSave,
			client_table: clientTable,
			fhir_table: table,
		};

		const data = await fetchFrom("/mapForClient", mapping_data);

		// const data = await fetchFrom("/newMapping", { data: objectArray, api_key: "0249626e-2aaf-4f80-bcd5-600e2dbc12c7" });

		console.log(data);
	};

	React.useEffect(() => {
		fields.forEach((item) => {
			setToSave((prev) => ({
				...prev,
				[item.variable]: "",
			}));
		});
	}, []);

	React.useEffect(() => {
		setToSave({});
		fields.forEach((item) => {
			setToSave((prev) => ({
				...prev,
				[item.variable]: "",
			}));
		});
	}, [fields]);

	React.useEffect(() => {
		console.log(toSave);
	}, [toSave]);

	const handleChange = (e, item) => {
		setToSave((prev) => ({ ...prev, [item.variable]: e.target.value }));
	};

	// const handleSave = (e, item) => {
	// 	const obj = {
	// 		middleware_column: item.variable,
	// 		client_column: e.target.value,
	// 		middleware_table: table,
	// 		client_table: clientTable,
	// 	};

	// 	setToSave([...toSave, obj]);
	// };
	return (
		<>
			<tr className="h-8 relative">
				<td className="border-l-[16px] border-transparent">
					<div className="flex gap-1 items-center">
						<div className="gap-1 text-black text-xs font-semibold leading-5 self-center my-auto">Table Name</div>
					</div>
				</td>
				<td className="border-l-[5rem] border-transparent">
					<input
						onChange={(e) => {
							setClientTable(e.target.value);
						}}
						className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5"
					/>
				</td>
			</tr>
			{fields.map((item, index) => (
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
						<input
							onChange={(e) => {
								handleChange(e, item);
							}}
							value={toSave[item.variable]}
							className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5"
						/>
					</td>

					{index === fields.length - 1 && (
						<td className="border-l-[5rem] border-transparent">
							<button
								className="bg-blue-500 px-4 py-2 text-white border rounded-md border-blue-500 hover:bg-blue-600 transition-colors duration-200 ease-in-out"
								onClick={() => handleSend(toSave)}
							>
								Send
							</button>
						</td>
					)}
				</tr>
			))}
		</>
	);
}
