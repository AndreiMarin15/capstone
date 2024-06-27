import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export function Reusable({ child, filename, orientation, h, w }) {
	const pdfRef = useRef();
	const downloadPDF = () => {
		const input = pdfRef.current;

		// Remove the 'hidden' class
		input.classList.remove("hidden");

		const width = input.offsetWidth;
		const height = input.offsetHeight;

		html2canvas(input).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF(orientation ?? "p", "px");
			pdf.addImage(imgData, "PNG", 0, 0);
			pdf.save(`${filename}.pdf`);
		});
	};
	return (
		<div className="flex items-center justify-center text-center m-2">
			<Button variant="download" onClick={downloadPDF}>
				{" "}
				↓ Download (.pdf)
			</Button>

			<div ref={pdfRef} className="hidden z-[-10] absolute" style={{ left: "-5000px" }}>
				{child}
			</div>
		</div>
	);
}
