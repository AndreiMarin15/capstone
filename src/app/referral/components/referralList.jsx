import Image from "next/image";
import { useEffect, useState } from "react";
import { DeleteReferral } from "./ui/deleteReferral";

export function ReferralList({
  setCurrentInfo,
  referral,
  retrieveReferralData,
  referralFlag,
  setReferralFlag,
}) {
  const [accepted, setAccepted] = useState(referral.accepted);
  const [displayAccept, setDisplayAccept] = useState(referral.display_accept);

  return (
    <>
      <div
        className="flex gap-5 mt-5"
        onClick={() => {
          setCurrentInfo(referral);
        }}
      >
        {/* Left side tab with bg-blue-500 */}
        <div className="flex gap-5 w-[100%]">
          <div
            className={
              accepted
                ? "bg-blue-500 w-2.5 h-[129px]"
                : "bg-orange-500 w-2.5 h-[129px]"
            }
          />
          <Image
            alt="image"
            height={0}
            width={0}
            loading="lazy"
            src={
              referral.photo ??
              "https://cdn.builder.io/api/v1/image/assets/TEMP/a7c15d8e78fed1700b5a41fe03386945de7b86991164dd8f5e36bb4f2a9286b8?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
            }
            className="self-start mt-7 w-[43px]"
          />
          <div className="flex flex-col flex-1 my-auto">
            <div className="text-lg font-semibold whitespace-nowrap">
              <div className="flex w-full gap-28 justify-between whitespace-nowrap">
                {referral.name}
                <span>
                  <DeleteReferral
                    referralId={referral.id}
                    referralFlag={referralFlag}
                    setReferralFlag={setReferralFlag}
                  />
                </span>
              </div>
              <div className="text-base text-zinc-600">
                <span className="text-zinc-300 font-medium">
                  {referral.specialty}
                </span>
                <div className="mt-4 text-sm font-medium text-zinc-600">
                  <span className="font-bold">PATIENT</span>: {referral.patient}
                </div>
                {displayAccept && (
                  <div className="flex gap-3 mt-6 whitespace-nowrap">
                    <button
                      onClick={async () => {
                        setDisplayAccept(!displayAccept);
                        setAccepted(true);
                        const approval =
                          await retrieveReferralData.updateReferralRequest(
                            referral.id,
                            true
                          );

                        console.log(approval);
                      }}
                    >
                      <div className="px-2 py-2 text-white text-sm bg-sky-900 rounded max-md:px-2">
                        Accept
                      </div>
                    </button>
                    <button
                      onClick={async () => {
                        const approval =
                          await retrieveReferralData.updateReferralRequest(
                            referral.id,
                            false
                          );

                        console.log(approval);
                      }}
                    >
                      <div className="px-2 py-2 text-sky-900  text-sm rounded border border-sky-900 border-solid max-md:px-5">
                        Decline
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
