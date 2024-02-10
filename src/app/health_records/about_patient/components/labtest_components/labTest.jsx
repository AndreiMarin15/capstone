/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

export default function LabTest(props) {
	return (
		<>
			<div className="text-black text-xs font-semibold leading-5 self-stretch mt-5 max-md:max-w-full max-md:mt-10">
				{props.testName}
			</div>

			{/* eslint-disable-next-line jsx-a11y/alt-text */}
			<Image
				height={0}
				width={0}
				loading="lazy"
				srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/435a0562ebd01ad567058149307e2442ecac83804ec50c76b11d2547d884d771?apiKey=66e07193974a40e683930e95115a1cfd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/435a0562ebd01ad567058149307e2442ecac83804ec50c76b11d2547d884d771?apiKey=66e07193974a40e683930e95115a1cfd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/435a0562ebd01ad567058149307e2442ecac83804ec50c76b11d2547d884d771?apiKey=66e07193974a40e683930e95115a1cfd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/435a0562ebd01ad567058149307e2442ecac83804ec50c76b11d2547d884d771?apiKey=66e07193974a40e683930e95115a1cfd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/435a0562ebd01ad567058149307e2442ecac83804ec50c76b11d2547d884d771?apiKey=66e07193974a40e683930e95115a1cfd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/435a0562ebd01ad567058149307e2442ecac83804ec50c76b11d2547d884d771?apiKey=66e07193974a40e683930e95115a1cfd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/435a0562ebd01ad567058149307e2442ecac83804ec50c76b11d2547d884d771?apiKey=66e07193974a40e683930e95115a1cfd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/435a0562ebd01ad567058149307e2442ecac83804ec50c76b11d2547d884d771?apiKey=66e07193974a40e683930e95115a1cfd&"
				className="aspect-[1.31] object-contain object-center w-[523px] overflow-hidden self-center max-w-full mt-9"
			/>
		</>
	);
}
