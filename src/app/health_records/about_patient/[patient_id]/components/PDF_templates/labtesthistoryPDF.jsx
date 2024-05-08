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
  
  const labtesthistory = [
    {
      number: "1",
      name: "HB1AC",
      date: "2024-04-21",
      valid: "2024-04-28",
      values: "FBS = 90 mg/dL, PPBS =  140 mg/dL",
    },
    {
      number: "2",
      name: "HB1AC",
      date: "2024-05-21",
      valid: "2024-05-28",
      values: "FBS = 90 mg/dL, PPBS =  140 mg/dL",
    },
  ];
  
  export default function LabTestHistoryPDF() {
    return (
      <>
        <div className="text-black text-center text-base font-bold leading-5 mt-8 max-md:ml-1 max-md:mt-10">
          JUAN DELA CRUZ
        </div>
        <div className="text-black text-center text-base text-xs leading-5 mb-1 max-md:ml-1 max-md:mt-10 mb-10">
          Lab Test History
        </div>
        <div className="flex mt-4 px-16 w-full text-xs max-md:flex-wrap max-md:max-w-full">
          <Table>
            {/* To change to button */}
            <TableCaption>Page 1 of 2</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Lab Test Name</TableHead>
                <TableHead>Date Taken</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Values</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {labtesthistory.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.number}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.valid}</TableCell>
                  <TableCell>{item.values}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </>
    );
  }
  