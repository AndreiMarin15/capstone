/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Image from "next/image";

const ReferralDoctors = ({ name, specialization, id, selectedId, photo }) => {
  const [selected, setSelected] = React.useState(false);

  React.useEffect(() => {
    if (id === selectedId) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, []);
  React.useEffect(() => {
    if (id === selectedId) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [selectedId]);
  return (
    <>
      <div className="mx-5 flex w-auto flex-col">
        <div
          className={
            selected
              ? "bg-blue-300 p-2 flex w-auto items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap"
              : "p-2 flex w-full items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap hover:bg-gray-50"
          }
        >
          <div className="flex items-stretch justify-between gap-5">
            <Image
              alt="picture"
              height={0}
              width={0}
              loading="lazy"
              src={
                photo ??
                "https://cdn.builder.io/api/v1/image/assets/TEMP/5fee24394139ee09d61af596b82e9174ea8a73c2e68f5ff59e2c793c7b2e08ee?"
              }
              className="aspect-square object-contain object-center w-[49px] overflow-hidden shrink-0 max-w-full"
            />
            <span className="self-center flex grow basis-[0%] flex-col items-stretch my-auto">
              <div className="text-black text-sm font-semibold leading-5 whitespace-nowrap">
                {name}
              </div>
              <div className="text-black text-sm leading-5 mt-2">
                Specialization: {specialization}
              </div>
            </span>
          </div>
          <div className="self-center flex aspect-[3.3333333333333335] flex-col justify-center items-stretch my-auto"></div>
        </div>
        <div className="bg-gray-400 self-stretch min-h-[1px] w-auto mt-2 mb-2" />
      </div>
    </>
  );
};

export default ReferralDoctors;
