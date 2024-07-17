"use client";
import { useHRNav } from "@/app/store";

export default function HealthRecordsNav() {
  const { selected, setSelected } = useHRNav();

  const items = ["Master Data", "Medications"];

  return (
    <span className="flex items-start justify-start mt-4 self-start max-md:max-w-full max-md:flex-wrap w-full">
      {items?.map((item) => (
        <button
          key={item}
          className={`text-sm font-medium leading-5 whitespace-nowrap justify-center px-6 py-3 rounded-3xl max-md:px-5 ${
            item === selected ? "text-white bg-sky-900" : "text-black"
          }`}
          onClick={() => {
            setSelected(item);
          }}
        >
          {item}
        </button>
      ))}
    </span>
  );
}
