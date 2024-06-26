// BackButton.js
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const BackButton = ({
  currentPage,
  setCurrentPage,
  currentScreen,
  setCurrentScreen,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (
      currentPage === 10 ||
      currentPage === 1 ||
      currentPage === 3 ||
      currentPage === 4
    ) {
      setCurrentPage(0);
    } else if (currentPage === 2) {
      setCurrentPage(0); // Set currentPage to 0 if currentPage is 2
    } else if (currentScreen === 1) {
      setCurrentScreen(0); // Set currentScreen to 0 if currentScreen is 1
    } else if (currentScreen === 2) {
      setCurrentScreen(0); // Set currentScreen to 1 if currentScreen is 2
    } else if (currentScreen === 3 || currentScreen === 4) {
      setCurrentScreen(2);
    } else if (currentScreen === 5) {
      setCurrentScreen(1);
    } else {
      router.push("/patient/my_health_record");
    }
  };
  return (
    <div className="flex items-start justify-between mt-5">
      <Button variant="back" onClick={handleBack}>
        <div className="flex gap-0.5 justify-between items-center">
          <Image
            height={0}
            width={0}
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0de7471415fd70bdaba9dd1e6f7c2e7075e37988a454dfb91c7aed9b11350077?"
            className="w-3 h-3 aspect-square"
            alt="Back Arrow"
          />
          BACK
        </div>
      </Button>
    </div>
  );
};

export default BackButton;
