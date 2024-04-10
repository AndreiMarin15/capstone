"use client";
import * as React from "react";
import { fetchFrom } from "../../../../globals";
import { useRouter } from "next/navigation";

const ViewMapping = () => {
	const router = useRouter();
	const [data, setData] = React.useState({});
	const [selectedEntity, setSelectedEntity] = React.useState("account");
	const handleButtonClick = (entity) => {
		setSelectedEntity(entity);
	};
	React.useEffect(() => {
		const fetchData = async () => {
			const response = await fetchFrom("/getMappings", {
				api_key: "28d0385e-df43-4c70-a356-042d0e520030",
				table: selectedEntity,
			});

			console.log(response);

			setData(response.column_mapping);
		};

		fetchData();
	}, []);

	React.useEffect(() => {
		const fetchData = async () => {
			const response = await fetchFrom("/getMappings", {
				api_key: "28d0385e-df43-4c70-a356-042d0e520030",
				table: selectedEntity,
			});

			console.log(response);

			setData(response.column_mapping);
		};

		fetchData();
	}, [selectedEntity]);

	return (
		<div className="flex flex-col justify-start items-center bg-white pt-10">
			<div className="flex ml-10 gap-2.5 px-0.5 mt-9 text-xs font-semibold leading-5 text-black max-md:flex-wrap">
				<button
					onClick={() => router.push("/middleware/mapping")}
					className={`justify-center px-6 py-1 whitespace-nowrap rounded border border-black border-solid max-md:px-5 bg-sky-800 text-white`}
				>
					Map Your Data
				</button>
				<button
					onClick={() => router.push("/middleware/api_keys")}
					className={`justify-center px-6 py-1 whitespace-nowrap rounded border border-black border-solid max-md:px-5 bg-sky-800 text-white`}
				>
					View API Keys
				</button>
			</div>
			<div>
				{[
					"Account",
					"Person",
					"Practitioner",
					"Patient",
					"Observation",
					"Encounter",
					"Family Member History",
					"Medication Request",
				].map((entity) => {
					let modifiedEntity = entity.toLowerCase().replace(/ /g, "");

					return (
						<button
							key={modifiedEntity}
							onClick={() => handleButtonClick(modifiedEntity)}
							className={`m-1 justify-center px-6 py-1 whitespace-nowrap rounded border border-black border-solid max-md:px-5 ${
								selectedEntity === modifiedEntity ? "bg-sky-900 text-white" : "hover:bg-sky-900 hover:text-white"
							}`}
						>
							{entity}
						</button>
					);
				})}
			</div>

			<table className="w-4/5 bg-white rounded-xl overflow-hidden shadow-lg my-auto">
				<thead className="bg-gray-200">
					<tr>
						<th className="px-4 py-2">FHIR Database</th>
						<th className="px-4 py-2">Your Database</th>
					</tr>
				</thead>

				<tbody>
					{data != null &&
						Object.entries(data).map(([key, value]) => (
							<tr key={key} className="bg-white hover:bg-gray-100">
								<td className="px-6 py-4 text-left text-sm text-gray-500">{key}</td>
								<td className="px-6 py-4 text-left text-sm text-gray-500">{value}</td>
							</tr>
						))}
				</tbody>
			</table>
			<></>
		</div>
	);
};

export default ViewMapping;
