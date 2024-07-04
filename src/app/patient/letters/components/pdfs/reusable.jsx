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
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const canvasAspectRatio = canvas.width / canvas.height;
      let pdfWidth, pdfHeight;

      // Set PDF dimensions based on orientation
      if (orientation === "l") {
        pdfWidth = 1920;
        pdfHeight = 1080;
      } else {
        // Default to portrait if orientation is not explicitly "l"
        pdfWidth = 1080;
        pdfHeight = 1920;
      }

      // Instantiate jsPDF with specified orientation and dimensions
      const pdf = new jsPDF({
        orientation: orientation,
        unit: "px",
        format: [pdfWidth, pdfHeight],
      });

      // Calculate scale factor to fit the canvas within the PDF dimensions
      const scaleX = pdfWidth / canvas.width;
      const scaleY = pdfHeight / canvas.height;
      const scaleToFit = Math.min(scaleX, scaleY);

      // Adjusted scale factor might leave whitespace on the sides for portrait mode
      // To minimize this, consider adjusting the scale factor based on the orientation
      let adjustedScaleToFit = scaleToFit;
      if (orientation === "p" && scaleX > scaleY) {
        // This condition implies that fitting to height leaves space on the sides
        // Adjusting scale to fit width instead
        adjustedScaleToFit = scaleX;
      }

      // Calculate the scaled dimensions using the adjusted scale factor
      const scaledWidth = canvas.width * adjustedScaleToFit;
      const scaledHeight = canvas.height * adjustedScaleToFit;

      // Center the image on the page
      const xPosition = (pdfWidth - scaledWidth) / 2;
      const yPosition = (pdfHeight - scaledHeight) / 2;

      // Add the image to the PDF with adjusted dimensions to avoid stretching and cutting off
      pdf.addImage(
        imgData,
        "PNG",
        xPosition,
        yPosition,
        scaledWidth,
        scaledHeight
      );

      pdf.save(`${filename}.pdf`);
    });
  };
  return (
    <div className="flex items-center justify-center text-center m-2">
      <Button variant="download" onClick={downloadPDF}>
        {" "}
        ↓ Download (.pdf)
      </Button>

      <div
        ref={pdfRef}
        className="hidden z-[-10] absolute"
        style={{ left: "-5000px" }}
      >
        {child}
      </div>
    </div>
  );
}
