import Image from "next/image";
import BackButton from "./sub_components/BackButton";

export default function LabTests() {
    const tests = [
        {
            srctest: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
            testname: "2D ECHO",
            srddoctor: "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
            doctor: "Dr. Johnny Santos",
            date: "2020-01-10",
        },
        {
            srctest: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
            testname: "Hb1A1C TEST",
            srddoctor: "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
            doctor: "Dr. John Doe",
            date: "2020-03-15",
        },
        
    ];

    return (
        <>
            <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">
                LAB TESTS
            </div>

            {tests.map((medication, index) => (
                <button key={index} className="flex flex-col mt-10 items-start text-xs leading-5 text-black max-w-[601px]">
                    <div className="flex gap-3.5 font-semibold whitespace-nowrap">
                        <Image
                        alt="image"
                        height={0}
                        width={0}
                            loading="lazy"
                            src={medication.srctest}
                            className="aspect-square fill-black w-[15px]"
                        />
                        <div className="my-auto">{medication.testname}</div>
                    </div>
                    <div className="flex gap-5 justify-between ml-7 max-md:ml-2.5">
                        <div className="flex gap-1 justify-between font-medium whitespace-nowrap">
                            <Image
                            alt="image"
                            height={0}
                            width={0}
                                loading="lazy"
                                src={medication.srddoctor}
                                className="w-4 aspect-square"
                            />
                            <div className="grow my-auto">{medication.doctor}</div>
                        </div>
                        <div className="flex-auto my-auto"> {medication.date} </div>
                    </div>
                </button>
            ))}
            <BackButton />
        </>
    );
}
