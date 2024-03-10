import Image from "next/image";
import * as React from "react";
import BackButton from "./sub_components/BackButton";
import { useState } from "react";
import ViewSystolic from "./sub_components/viewSystolic";
export default function Vitals() {
    const [currentPage, setCurrentPage] = useState(0);

    const handleVisitClick = () => {
        setCurrentPage(currentPage + 1);
    };
    // const vitals = [
    //     {
    //       src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&", 
    //       systolic: "110",
    //       diastolic: "90",
    //       heartrate: "60",
    //       height: "180",
    //       weight:"70",
    //       bmi: "50"

    //     },
    //     {
    //         src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3989204c70d706bac6f9f46ddda5aa4e7e97fa6018e996dd7dc93112d8fd1b8b?apiKey=66e07193974a40e683930e95115a1cfd&",
    //         systolic: "120",
    //         diastolic: "90",
    //         heartrate: "60",
    //         height: "180",
    //         weight:"70",
    //         bmi: "50"
		
    //     },
    //     {
    //         src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f4d912f8102b745e1cadcdfa06bd7d42c5f96a1f5470e70c3e8d52350dbb2192?apiKey=66e07193974a40e683930e95115a1cfd&",
    //         systolic: "110",
    //         diastolic: "90",
    //         heartrate: "60",
    //         height: "180",
    //         weight:"70",
    //         bmi: "50"
			
    //     },
    //     {
    //         src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b947b8e54bf04f2cb0c3ec2f17d835819b72247144f9a6d4d213b09ee01afe5a?",
    //         systolic: "120",
    //         diastolic: "90",
    //         heartrate: "60",
    //         height: "180",
    //         weight:"70",
    //         bmi: "50"
			
    //     },
    //     {
    //         src: "https://cdn.builder.io/api/v1/image/assets/TEMP/abf6097d90bb41a27fe7af53db50a7e72d58f98784d373f3d96269100499e801?",
    //         systolic: "110",
    //         diastolic: "90",
    //         heartrate: "60",
    //         height: "180",
    //         weight:"70",
    //         bmi: "50"
		
    //     },
    //     {
    //         src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?apiKey=66e07193974a40e683930e95115a1cfd&",
    //         systolic: "110",
    //         diastolic: "90",
    //         heartrate: "60",
    //         height: "180",
    //         weight:"70",
    //         bmi: "50"
    //     },
    // ];
    const vitals = [
        {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
            variable: "Systolic Blood Pressure",
            value1: "110",
            value2: "110",
            value3: "110",
            value4: "110",
        },
        {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3989204c70d706bac6f9f46ddda5aa4e7e97fa6018e996dd7dc93112d8fd1b8b?apiKey=66e07193974a40e683930e95115a1cfd&",
            variable: "Diastolic Blood Pressure",
            value1: "90",
            value2: "90",
            value3: "90",
            value4: "90",
		
        },
        {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f4d912f8102b745e1cadcdfa06bd7d42c5f96a1f5470e70c3e8d52350dbb2192?apiKey=66e07193974a40e683930e95115a1cfd&",
            variable: "Heart Rate",
            value1: "60",
            value2: "60",
            value3: "60",
            value4: "60",
			
        },
        {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b947b8e54bf04f2cb0c3ec2f17d835819b72247144f9a6d4d213b09ee01afe5a?",
            variable: "Height (cm)",
            value1: "180",
            value2: "180",
            value3: "180",
            value4: "180",
			
        },
        {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/abf6097d90bb41a27fe7af53db50a7e72d58f98784d373f3d96269100499e801?",
            variable: "Weight (kg)",
            value1: "70",
            value2: "70",
            value3: "70",
            value4: "70",
		
        },
        {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?apiKey=66e07193974a40e683930e95115a1cfd&",
            variable: "Body Mass Index",
            value1: "50",
            value2: "50",
            value3: "50",
            value4: "50",
			
        },
    ];


    
	return (
        <>
        {currentPage === 0 ? (
        <>
            <div className="max-w-fit text-black">
				<div className="flex justify-between">
					<div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">
						PATIENT VITALS
					</div>
				<div className="flex">
					<span className="text-black text-base font-bold leading-5 mt-8">
						Rendering Options:
					</span>

					<select className="ml-2  mt-8  w-auto h-5 rounded-md border border-gray-500 text-black text-xs text-gray-500">
					<option value="option1">Newest to Oldest</option>
					<option value="option2">Oldest to Newest</option>
					<option value="option3">January</option>
					</select>

					<select className="ml-2 mt-8 	w-auto h-5  rounded-md border border-gray-500 text-black text-xs text-gray-500">
					<option value="option1">3 Appointments</option>
					<option value="option2">5 Appointments</option>
				
					</select>
				</div>
			</div>
				<a
					href="/path/to/pdf"
					download="full_vitals_history.pdf"
					className="text-blue-500 text-xs block mb-2 flex items-center"
				>
					<img src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f1514e9c761b45ed8abcb6811a56eaaf480fdda4754ab1d1e1240f3cb88e4a2?apiKey=7e8c8e70f3bd479289a042d9c544736c&" alt="icon" className="w-4 mr-2" />
					<span>Full Vitals History (.pdf)</span>
				</a>
						
                <table className="border-spacing-y-5 border-separate">
						<tr>
                            <th colSpan="1"></th>
                            <th className="border-l-[5rem] border-transparent text-black text-xs leading-5 font-semibold">2023-12-01</th>
                            <th className="border-l-[5rem] border-transparent text-black text-xs leading-5 font-semibold">2024-02-15</th>
                            <th className="border-l-[5rem] border-transparent text-black text-xs leading-5 font-semibold">2024-05-25</th>
                            <th className="border-l-[5rem] border-transparent text-black text-xs leading-5 font-semibold">2024-08-01</th>
                        </tr>
                    <tbody>
                        {vitals.map((item) => (
                            <React.Fragment key={item.variable}>
							
                                <tr>
								    <td className="border-l-[16px] border-transparent">
									    <div className="flex items-center">
										    <Image alt="picture" height={0} width={0} loading="lazy" src={item.src} className="w-5 mr-4" />
										    <div className="text-black text-xs font-semibold leading-5 self-center my-auto">{item.variable}</div>
									    </div>
								    </td>
                                    <td className="border-l-[5rem] border-transparent text-center">
                                        <div className="text-black text-xs leading-5 ml-auto">{item.value1}</div>
                                    </td>
                                    <td className="border-l-[5rem] border-transparent text-center">
                                        <div className="text-black text-xs leading-5 ml-auto">{item.value2}</div>
                                    </td>
									
                                    <td className="border-l-[5rem] border-transparent text-center">
                                        <div className="text-black text-xs leading-5 ml-auto">{item.value3}</div>
                                    </td>
                                    <td className="border-l-[5rem] border-transparent text-center">
                                        <div className="text-black text-xs leading-5 ml-auto">{item.value4}</div>
                                    </td>
									<td className="border-l-[5rem] border-transparent text-center">
										<div className="flex items-center">
											<img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4cae5e15030443e8c364bdc417ce4c836ffe07d1728c5f93bea511f158e4afbf?apiKey=7e8c8e70f3bd479289a042d9c544736c&" alt="icon" className="w-5 mr-2" />
											<button className="text-blue-500 text-xs underline" onClick={() => { 
                                                setCurrentPage(currentPage + 1);
                                                console.log('%d', currentPage);
                                                console.log(`View chart for ${item.variable}`);
                                            }}>View Chart</button>
										</div>
									</td>
                                </tr>

								
                                {item.variable === "Heart Rate" && (
									<div className="max-w-fit text-black">
                                    <tr>

										
                                        <td colSpan="5">
                                            <div className="max-w-fit text-black">
                                                <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">
                                                    BIOMETRICS
                                                </div>
                                                <a
                                                    href="/path/to/pdf"
                                                    download="full_vitals_history.pdf"
                                                    className="text-blue-500 text-xs block mb-2 flex items-center"
                                                >
                                                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f1514e9c761b45ed8abcb6811a56eaaf480fdda4754ab1d1e1240f3cb88e4a2?apiKey=7e8c8e70f3bd479289a042d9c544736c&" alt="icon" className="w-4 mr-2" />
                                                    <span>Full Vitals History (.pdf)</span>
                                                </a>
												
                                            </div>
                                        </td>
                                    </tr>
									
								</div>
									
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
               
            </div>
            
            <BackButton />
            </>
            ):(
                ""
            )}

			{currentPage >= 1? (
				<>
					< ViewSystolic currentPage={currentPage} setCurrentPage={setCurrentPage} />
				</>
			) : (
				""
			)}
            
	  
        </>
    );
}