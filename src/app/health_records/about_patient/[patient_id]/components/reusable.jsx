import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export function ReusableLabTest({ child, filename }) {
	const pdfRef = useRef();
	const downloadPDF = () => {
		const input = pdfRef.current;

		// Remove the 'hidden' class
		input.classList.remove("hidden");

		const width = input.offsetWidth;
		const height = input.offsetHeight;
		let computedWidth = width;
		let computedHeight = height;
		console.log(width, height);
		if (width < 1920 / 2) {
			computedWidth = 1920 / 2;
			// computedHeight = computedWidth / 2;
		}
		if (height < 1080 / 2) {
			computedHeight = 1080 / 2;
			// computedWidth = computedHeight * 2;
		}

		console.log(computedWidth, computedHeight);

		html2canvas(input)
			.then((canvas) => {
				const imgData = canvas.toDataURL("image/png");
				const pdf = new jsPDF("l", "px", [computedWidth, computedHeight]);
				pdf.addImage(imgData, "PNG", 0, 0, width, height);
				pdf.save(`${filename}.pdf`);
			})
			.finally(() => {
				// Add the 'hidden' class back after the PDF has been downloaded
				input.classList.add("hidden");
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
