"use client";
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
import Image from "next/image";
import { useState, useEffect } from "react";
import { getAttachments } from "@/backend/referral/attachments";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageUploader } from "./imageupload";
export function Attachments({ recepient }) {
	const [uploadFlag, setUploadFlag] = useState(false);
	const [attachments, setAttachments] = useState([]);
	useEffect(() => {
		console.log(recepient);
		console.log(recepient.recepientId);
		getAttachments();
	}, [recepient]);

	useEffect(() => {
		const fetchAttachments = async () => {
			const attachments = await getAttachments(recepient.patient_id);
			setAttachments(attachments);
		};
		fetchAttachments();
	}, [uploadFlag]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button type="button" variant="link">
					<div className="flex gap-2">
						<Image
							alt="picture"
							height={0}
							width={0}
							loading="lazy"
							src="https://cdn.builder.io/api/v1/image/assets/TEMP/01c0bac69d971db5ceab6a14362a487d7075841b45abae5d7e1d709ca6ef4f0f?"
							className="aspect-square object-contain object-center w-4 fill-black fill-opacity-0 overflow-hidden shrink-0 max-w-full"
						/>{" "}
						View Attachments
					</div>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[3/4] max-h-[90dvh]">
				<DialogHeader>
					<DialogTitle>Send or View attachments</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4 ">
					<ImageUploader
						recepient={recepient.recepientId}
						setUploadFlag={setUploadFlag}
						uploadFlag={uploadFlag}
						patient_id={recepient.patient_id}
					/>
					<ScrollArea className="h-1/2">
						{attachments.map((attachment) => (
							<>
								<div className="flex flex-col gap-2 items-start text-start">
									<div className="flex flex-col">
										<div className="text-sm">Attachment: {attachment.filename}</div>
										{/* <div className="text-sm">Uploaded By: {"hello"}</div> */}

										{/* <div className="text-xs text-zinc-600">{attachment.date}</div> */}
									</div>
									<Image
										alt="picture"
										height={0}
										width={0}
										loading="lazy"
										src={
											attachment.img ??
											"https://cdn.builder.io/api/v1/image/assets/TEMP/01c0bac69d971db5ceab6a14362a487d7075841b45abae5d7e1d709ca6ef4f0f?"
										}
										className="aspect-square object-contain object-center w-full fill-black fill-opacity-0 overflow-hidden shrink-0 max-w-full"
									/>
								</div>
							</>
						))}
					</ScrollArea>
				</div>
			</DialogContent>
		</Dialog>
	);
}
