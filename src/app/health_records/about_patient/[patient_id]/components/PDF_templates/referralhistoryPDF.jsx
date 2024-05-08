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
  
  const referralhistory = [
    {
      number: "1",
      referredto: "Dr. Johnny Santos",
      specialization: "Cardiologist",
      date: "2024-04-21",
    },
    {
      number: "2",
      referredto: "Dr. Mari Abalos",
      specialization: "Gastroenterologist",
      date: "2024-04-21",
    },
    {
      number: "3",
      referredto: "Dr. Kim Cruz",
      specialization: "Cardiologist",
      date: "2024-04-26",
    },
  ];
  
  export default function ReferralHistoryPDF() {
    return (
      <>
        <div className="text-black text-center text-base font-bold leading-5 mt-8 max-md:ml-1 max-md:mt-10">
          JUAN DELA CRUZ
        </div>
        <div className="text-black text-center text-base text-xs leading-5 mb-1 max-md:ml-1 max-md:mt-10 mb-10">
          Referral History
        </div>
        <div className="flex mt-4 px-16 w-full text-xs max-md:flex-wrap max-md:max-w-full">
          <Table>
            {/* To change to button */}
            <TableCaption>Page 1 of 2</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Referred to</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Date Referred</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referralhistory.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.number}</TableCell>
                  <TableCell>{item.referredto}</TableCell>
                  <TableCell>{item.specialization}</TableCell>
                  <TableCell>{item.diet}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </>
    );
  }
  