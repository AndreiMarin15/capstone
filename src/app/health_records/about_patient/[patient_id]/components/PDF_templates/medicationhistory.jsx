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
  
  const medicationhistory = [
    {
      number: "1",
      provider: "Dr. Johnny Santos",
      generic: "Ibuprofen",
      brand: "Paracetamol",
      form: "Tablet",
      dose: "500mg",
      frequency: "3x a day",
      start: "2024-04-21",
      end: "2024-04-29",
    },
    {
      number: "2",
      provider: "Dr. Kim Cruz",
      generic: "Ibuprofen",
      brand: "Paracetamol",
      form: "Tablet",
      dose: "500mg",
      frequency: "3x a day",
      start: "2024-05-21",
      end: "2024-05-29",
    },
    {
      number: "3",
      provider: "Dr. John Doe",
      generic: "Ibuprofen",
      brand: "Paracetamol",
      form: "Tablet",
      dose: "500mg",
      frequency: "3x a day",
      start: "2024-07-21",
      end: "2024-07-29",
    },
  ];
  
  export default function MedicationHistoryPDF() {
    return (
      <>
        <div className="text-black text-center text-base font-bold leading-5 mt-8 max-md:ml-1 max-md:mt-10">
          JUAN DELA CRUZ
        </div>
        <div className="text-black text-center text-base text-xs leading-5 mb-1 max-md:ml-1 max-md:mt-10 mb-10">
          Medication History
        </div>
        <div className="flex mt-4 px-16 w-full text-xs max-md:flex-wrap max-md:max-w-full">
          <Table>
            {/* To change to button */}
            <TableCaption>Page 1 of 2</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Generic Name</TableHead>
                <TableHead>Brand Name</TableHead>
                <TableHead>Form</TableHead>
                <TableHead>Dose/Unit</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicationhistory.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.number}</TableCell>
                  <TableCell>{item.provider}</TableCell>
                  <TableCell>{item.generic}</TableCell>
                  <TableCell>{item.brand}</TableCell>
                  <TableCell>{item.form}</TableCell>
                  <TableCell>{item.dose}</TableCell>
                  <TableCell>{item.frequency}</TableCell>
                  <TableCell>{item.start}</TableCell>
                  <TableCell>{item.end}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </>
    );
  }
  