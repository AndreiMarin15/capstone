import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { deleteReferral } from "@/backend/referral/deleteReferrals";

export function DeleteReferral({ referralId , referralFlag, setReferralFlag }) {
	function deleteReferralHandler() {
		setReferralFlag(!referralFlag);
		deleteReferral(referralId);
	}
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="link">
					<Image
						loading="lazy"
						alt="image"
						src="https://cdn.builder.io/api/v1/image/assets/TEMP/518430534c2c24dbed700af9b17a81b17b48077b02c1a0107a16e74354bd3b8a?"
						className="w-[100%] aspect-square fill-orange-600 max-w-[22px]"
						width="0"
						height="0"
					/>
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your referral details.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogTrigger asChild>
					<Button
						variant="destructive"
						onClick={() => {
							deleteReferralHandler();
						}}
					>
						Continue
					</Button>
					</AlertDialogTrigger>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
