export default function LabTests() {
  const cPList = [
    {
      date: "2023-01-07",
      labtest: "2D ECHO",
      request: "Dr. John Doe",
      special: "Endocrinology",
      status: "Uploaded",
    },
    {
      date: "2023-01-07",
      labtest: "2D ECHO",
      request: "Dr. Johnny Santos",
      special: "Cardiology",
      status: "Not yet started",
    },
    {
      date: "2023-01-07",
      labtest: "2D ECHO",
      request: "Dr. John Doe",
      special: "Endocrinology",
      status: "Uploaded",
    },
    {
      date: "2023-01-07",
      labtest: "2D ECHO",
      request: "Dr. John Doe",
      special: "Endocrinology",
      status: "Uploaded",
    },
    {
      date: "2023-01-07",
      labtest: "2D ECHO",
      request: "Dr. John Doe",
      special: "Endocrinology",
      status: "Uploaded",
    },
    {
      date: "2023-01-07",
      labtest: "2D ECHO",
      request: "Dr. John Doe",
      special: "Endocrinology",
      status: "Uploaded",
    },
    {
      date: "2023-01-07",
      labtest: "2D ECHO",
      request: "Dr. John Doe",
      special: "Endocrinology",
      status: "Uploaded",
    },
  ];

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 mt-10">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date Requested
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Laboratory Test
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Requested By
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Specialization
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {cPList.map((item) => (
            <tr key={item.date}>
              <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-blue-500 underline hover:text-blue-700 hover:underline">
                  {item.labtest}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.request}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.special}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
