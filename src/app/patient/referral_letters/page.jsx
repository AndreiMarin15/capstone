"use client";
import * as React from "react";
import Image from "next/image";
import referralLetters from "@/backend//referral_letters/getData";
import { useRouter } from "next/navigation";
export default function ReferralLetters() {
  const router = useRouter();
  const [letters, setLetters] = React.useState([]);

  React.useEffect(() => {
    const fetchLetters = async () => {
      const data = await referralLetters.getLetters();

      setLetters(data);
    };

    fetchLetters();
  }, []);

  return (
    <div className="w-full max-md:max-w-full h-screen bg-white">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col ml-5 w-[82%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col mt-20 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 w-full max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
              <div className="flex-auto my-auto text-xl font-semibold leading-8 text-black">
                Referral Letters
              </div>
              <div className="flex gap-2.5">
                <div className="flex flex-col justify-center text-sm leading-5 whitespace-nowrap text-stone-300">
                  <div className="flex gap-2 py-2 rounded-md border border-black border-solid">
                    <Image
                      alt="image"
                      height={0}
                      width={0}
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2aee5eaae6c8b317fa94c9456603d2ba5c59247e65984390a06ee8f8b01312c?apiKey=66e07193974a40e683930e95115a1cfd&"
                      className="shrink-0 aspect-square fill-stone-300 w-[13px]"
                    />
                    <div className="flex-auto my-auto">SEARCH</div>
                  </div>
                </div>
                <div className="flex flex-col justify-center text-sm leading-5 text-black whitespace-nowrap">
                  <div className="flex gap-1 items-start p-2 rounded-md border border-black border-solid">
                    <Image
                      alt="image"
                      height={0}
                      width={0}
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/071a1d5277b4702c3740213c68e18cd7696473fec01cff1c7f5e540f7bc3d71c?apiKey=66e07193974a40e683930e95115a1cfd&"
                      className="shrink-0 w-3 aspect-[0.85]"
                    />
                    <div>FILTER</div>
                  </div>
                </div>
              </div>
            </div>
            {letters.length > 0 ? (
              <>
                {letters?.map((letter) => (
                  <div
                    key={letter.id}
                    className="flex gap-2.5 self-start px-5 mt-11 text-sm font-medium leading-5 text-black max-md:mt-10 hover:cursor-pointer"
                    onClick={() => {
                      router.push(`/patient/referral_letters/${letter.id}`);
                    }}
                  >
                    <Image
                      alt="image"
                      height={0}
                      width={0}
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?apiKey=66e07193974a40e683930e95115a1cfd&"
                      className="shrink-0 aspect-square fill-black w-[15px]"
                    />
                    <div className="hover:cursor-pointer">
                      Referral Letter to Dr. {letter.referral_data.doctor_name}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>No referral data yet</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
