// BackButton.js
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const BackButton = ({ currentPage, setCurrentPage, currentScreen, setCurrentScreen}) => {
  const router = useRouter();
    
  const handleBack = () => {
    if (currentPage === 10 || currentPage === 1) {
      setCurrentPage(0);
    } 
 
    else if (currentScreen === 1 || currentScreen === 2){
        setCurrentScreen(0);
    }
    else  if (currentScreen === 3) {
        setCurrentScreen(2);
    }
    else if (currentScreen === 4){
        setCurrentScreen(2);
    }
    else {
      router.push("/health_records"); // Navigate back to the default route
    }
  };

  return (
<div className="flex items-start justify-between mt-5">
    <button
      onClick={handleBack}
      className="flex items-center justify-center px-2 py-1 rounded text-xs border border-sky-900 border-solid font-semibold border-1.5"
    >
      <div className="flex gap-0.5 justify-between items-center">
        <Image
          height={0}
          width={0}
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0de7471415fd70bdaba9dd1e6f7c2e7075e37988a454dfb91c7aed9b11350077?"
          className="w-3 h-3 aspect-square"
          alt="Back Arrow"
        />
        <div className="text-xs">BACK</div>
      </div>
    </button>
    </div>
  );
};

export default BackButton;