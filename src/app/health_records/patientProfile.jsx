import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function PatientProfile({ photo, name, age, gender }) {
  const defaultImage =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/f93d5b041a77641729755adbc288033a6c368ab9f2f47627fb102ac12928179c?";
  return (
    <div className="w-[100%]">
      <div className="flex items-center justify-between w-[100%]">
        {/* Use justify-between to push items apart */}
        <div className="flex items-center gap-3.5">
          <Image
            alt="picture"
            height={0}
            width={0}
            loading="lazy"
            src={photo || defaultImage}
            className="aspect-square object-contain object-center w-[59px] overflow-hidden shrink-0 max-w-full"
          />
          <span className="flex-col items-stretch">
            <div className="text-black text-xs font-semibold leading-5">
              {name}
            </div>
            <div className="flex items-center">
              <div className="text-black text-xs leading-5 whitespace-nowrap pr-2">
                {age} years old
              </div>
              <div className="relative">
                <div className="bg-stone-300 w-px h-4 top-0 bottom-0 left-1/2 transform -translate-x-1/2" />
              </div>
              <div className="text-black text-xs leading-5 whitespace-nowrap pl-2">
                {gender}
              </div>
            </div>
          </span>
        </div>
        <div className="flex space-x-4">
          {" "}
          {/* Wrap buttons in a div with flex and space-x-4 for spacing */}
          <Button variant="outline">Refer Patient</Button>
          <Button>Generate Records</Button>
        </div>
      </div>
    </div>
  );
}
