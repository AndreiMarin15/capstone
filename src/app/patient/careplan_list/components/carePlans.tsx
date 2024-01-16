import { useRouter } from "next/navigation";

export default function CarePlans() {
	const router = useRouter();

	const cPList = [
		{
			date: "2023-01-07",
			doctor: "Dr. Johnny Santos",
			specialization: "Cardiology",
			validty: "2023-01-28",
		},
		{
			date: "2023-01-07",
			doctor: "Dr. John Doe",
			specialization: "Endocrinology",
			validty: "2023-01-28",
		},
		{
			date: "2023-01-07",
			doctor: "Dr. John Doe",
			specialization: "Endocrinology",
			validty: "2023-01-28",
		},
		{
			date: "2023-01-07",
			doctor: "Dr. John Doe",
			specialization: "Endocrinology",
			validty: "2023-01-28",
		},
		{
			date: "2023-01-07",
			doctor: "Dr. John Doe",
			specialization: "Endocrinology",
			validty: "2023-01-28",
		},
		{
			date: "2023-01-07",
			doctor: "Dr. John Doe",
			specialization: "Endocrinology",
			validty: "2023-01-28",
		},
		{
			date: "2023-01-07",
			doctor: "Dr. John Doe",
			specialization: "Endocrinology",
			validty: "2023-01-28",
		},
	];
	return (
		<>
			<table className="min-w-full divide-y divide-gray-200 mt-10">
				<thead className="bg-gray-50">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Date Created
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Specialization
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Valid Until
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{cPList.map((item) => (
						<tr
							key={item.doctor}
							onClick={() => {
								router.push("careplan_list/careplan");
							}}
						>
							<td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
							<td className="px-6 py-4 whitespace-nowrap">{item.doctor}</td>
							<td className="px-6 py-4 whitespace-nowrap">{item.specialization}</td>
							<td className="px-6 py-4 whitespace-nowrap">{item.validty}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
