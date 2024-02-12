"use client";
import { useAllergyNav } from "@/app/store";

export default function AllergiesNav() {
  const { selected, setSelected } = useAllergyNav();

  const items = ["Drug", "Food", "Environmental", "Add Allergy"];

  return (
    <span className="flex items-start justify-between gap-5 mt-4 self-start max-md:max-w-full max-md:flex-wrap">
      {items.map((item) => (
        <button
          key={item}
          className={`text-xs font-medium leading-5 whitespace-nowrap self-stretch grow justify-center items-stretch px-6 py-3 rounded-3xl max-md:px-5 ${
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
