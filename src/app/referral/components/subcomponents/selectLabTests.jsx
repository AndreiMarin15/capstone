import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SelectLabtests({ labtests, updateLabtest, addLabtest, removeLabtest }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Select Lab Tests</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Select Lab Tests</DialogTitle>
					<DialogDescription>Select the lab tests you want to show</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					{labtests.map((labtest, index) => (
						<div
							key={index}
							className={"hover:bg-blue-300 p-2 " + (labtest.selected ? "bg-blue-500" : "")}
							onClick={() => {
								if (labtest.selected) {
									removeLabtest(labtest.labtest.id);
								} else {
									addLabtest(labtest.labtest);
								}
								updateLabtest(labtest.labtest.id);
                                console.log(labtests)
							}}
						>
							<div className="grid grid-cols-2 items-start gap-7">
								<Label htmlFor="name">{labtest.labtest.resource.codeText}</Label>
								<Label>Lab Values:</Label>
							</div>
							<div className="mt-2 grid grid-cols-2 items-start gap-7">
								<Label htmlFor="username">
									{labtest.labtest.resource.uploadedDateTime &&
										`Laboratory Test Date: ${labtest.labtest.resource.uploadedDateTime}`}
								</Label>
								<Label>
									{labtest.labtest.resource.valueQuantity?.valueQuantities[0]?.display ?? ""}{" "}
									{labtest.labtest.resource.valueQuantity?.valueQuantities[0]?.display && "="}{" "}
									{labtest.labtest.resource.valueQuantity?.valueQuantities[0]?.value ?? ""}{" "}
									{labtest.labtest.resource.valueQuantity?.valueQuantities[0]?.unit ?? ""}
								</Label>
							</div>
						</div>
					))}
				</div>
				<DialogFooter>
					<DialogTrigger>
						<Button>Close</Button>
					</DialogTrigger>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
