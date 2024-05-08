import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
  const careplanlist = [
    {
      number: "1",
      provider: "Dr. John Doe",
      date: "2024-04-21",
      diet: "Prioritize fruits, vegetables, whole grains, and lean protein sources like fish, chicken, and beans",
      physical:
        "Aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity aerobic activity per week.",
      monitoring:
        "Pay attention to your feet and check for any cuts, sores, or redness",
    },
    {
      number: "2",
      provider: "Dr. John Doe",
      date: "2024-04-30",
      diet: "Prioritize fruits, vegetables, whole grains, and lean protein sources like fish, chicken, and beans",
      physical:
        "Aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity aerobic activity per week.",
      monitoring:
        "Pay attention to your feet and check for any cuts, sores, or redness",
    },
  ];
  
  export default function CarePlansPDF() {
    return (
      <>
        <div className="text-black text-center text-base font-bold leading-5 mt-8 max-md:ml-1 max-md:mt-10">
          JUAN DELA CRUZ
        </div>
        <div className="text-black text-center text-base text-xs leading-5 mb-1 max-md:ml-1 max-md:mt-10 mb-10">
          Care Plans
        </div>
        <div className="flex mt-4 px-5 w-full text-xs max-md:flex-wrap max-md:max-w-full">
          <Table>
            {/* To change to button */}
            <TableCaption>Page 1 of 2</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Dietary Management</TableHead>
                <TableHead>Physical Activities</TableHead>
                <TableHead>Self Monitoring</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {careplanlist.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.number}</TableCell>
                  <TableCell>{item.provider}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.diet}</TableCell>
                  <TableCell>{item.physical}</TableCell>
                  <TableCell>{item.monitoring}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </>
    );
  }
  