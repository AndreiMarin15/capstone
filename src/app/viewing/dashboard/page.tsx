import * as React from "react";

export default function Dashboard() {
  return (
    <div className="border bg-white flex flex-col items-stretch border-solid border-stone-300">
      <div className="w-full max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[100%] ml-5 max-md:w-full max-md:ml-0">
            <span className="flex flex-col items-stretch my-auto px-5 max-md:max-w-full max-md:mt-10">
              <div className="text-black text-xl font-semibold leading-8 max-md:max-w-full mt-10">
                Dashboard
              </div>
              <div className="mt-6 max-md:max-w-full">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                  <div className="flex flex-col items-stretch w-3/5 max-md:w-full max-md:ml-0">
                    <div className="flex grow flex-col items-stretch max-md:max-w-full max-md:mt-6">
                      <div className="border border-[color:var(--background-background-600,#E8E8E8)] shadow-sm bg-white pl-14 pr-20 py-8 rounded border-solid max-md:max-w-full max-md:px-5">
                        <div className="flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                          <div className="flex flex-col items-stretch  max-md:w-full max-md:ml-0">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2973ce194094175870e4010225d7995b70a4add3f96a4c16d2302409e5e7ccd8?"
                              className="aspect-square object-contain object-center w-14 overflow-hidden shrink-0 max-w-full max-md:mt-10"
                            />
                          </div>
                          <div className="flex flex-col items-stretch w-[69%] ml-5 max-md:w-full max-md:ml-0">
                            <span className="items-stretch flex flex-col my-auto max-md:mt-10">
                              <div className="text-black text-xs font-semibold leading-5">
                                Juan Dela Cruz
                              </div>
                              <span className="items-stretch flex gap-2">
                                <div className="text-black text-xs leading-5">
                                  74 years old
                                </div>
                                <div className="text-zinc-400 text-xs mt-1">
                                  |
                                </div>
                                <div className="text-black text-xs leading-5">
                                  Male
                                </div>
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="items-stretch border border-[color:var(--background-background-600,#E8E8E8)] shadow-sm bg-white flex flex-col justify-center mt-6 px-7 py-7 border-solid max-md:max-w-full max-md:px-5">
                        <div className="items-stretch flex justify-between gap-5 pr-5 max-md:max-w-full max-md:flex-wrap">
                          <span className="items-stretch flex grow basis-[0%] flex-col">
                            <div className="text-zinc-500 text-xs font-semibold leading-4">
                              Date of Birth
                            </div>
                            <div className="text-black text-xs font-medium leading-5 whitespace-nowrap">
                              01 January 1950
                            </div>
                            <div className="text-zinc-500 text-xs font-semibold leading-4 whitespace-nowrap mt-8">
                              Contact Number
                            </div>
                            <div className="text-black text-xs font-medium leading-5 whitespace-nowrap">
                              +63 917 000 000
                            </div>
                          </span>
                          <span className="items-stretch flex grow basis-[0%] flex-col">
                            <div className="text-zinc-500 text-xs font-semibold leading-4">
                              Address
                            </div>
                            <div className="text-black text-xs font-medium leading-5 whitespace-nowrap">
                              Quezon City, Philippines
                            </div>
                            <div className="text-zinc-500 text-xs font-semibold leading-4 mt-8">
                              Member Since
                            </div>
                            <div className="text-black text-xs font-medium leading-5">
                              06 January 2024
                            </div>
                          </span>
                          <span className="items-stretch flex grow basis-[0%] flex-col">
                            <div className="text-zinc-500 text-xs font-semibold leading-4">
                              Allergies
                            </div>
                            <div className="text-black text-xs font-medium leading-5 whitespace-nowrap">
                              None
                            </div>
                            <div className="text-zinc-500 text-xs font-semibold leading-4 mt-8">
                              BMI
                            </div>
                            <div className="text-black text-xs font-medium leading-5">
                              24.9
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch w-2/5 ml-5 max-md:w-full max-md:ml-0">
                    <div className="border border-[color:var(--background-background-600,#E8E8E8)] shadow-sm bg-white flex w-full grow flex-col items-stretch mx-auto pt-7 pb-12 px-10 rounded border-solid max-md:mt-6 max-md:px-5">
                      <span className="flex items-stretch justify-between gap-3">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5cf686ec2e95bccdc2019a3ed27571cb8d91814d20d6e3653960477e65ab4a27?"
                          className="aspect-[1.18] object-contain object-center w-5 fill-black overflow-hidden shrink-0 max-w-full"
                        />
                        <div className="text-black text-base font-semibold leading-6 grow shrink basis-auto self-start">
                          Recent Activity
                        </div>
                      </span>
                      <span className="border border-[color:var(--background-background-600,#E8E8E8)] shadow-sm bg-white flex w-full flex-col items-stretch mt-8 pl-5 pr-20 py-3 rounded border-solid max-md:pr-5">
                        <span className="flex items-stretch gap-2.5 max-md:mr-2">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4e200b4f856742582f5e0e389be9f0e37a54ceeade0f863f225fac2f02a2371f?"
                            className="aspect-square object-contain object-center w-[25px] overflow-hidden shrink-0 max-w-full"
                          />
                          <div className="text-black text-xs font-medium leading-5 mt-1">
                            Messages
                          </div>
                        </span>
                        <div className="text-black text-xs leading-5 whitespace-nowrap self-start max-md:mr-2">
                          You have 1 unread message.
                        </div>
                      </span>
                      <span className="border border-[color:var(--background-background-600,#E8E8E8)] shadow-sm bg-white flex w-full flex-col items-stretch mt-3.5 mb-1 pl-6 pr-4 py-5 rounded border-solid max-md:pl-5">
                        <span className="flex items-stretch gap-4">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7cae08d706b3994d9e190dda132eef11708140f917bbbb70e4390ffc05da87c6?"
                            className="aspect-[0.78] object-contain object-center w-3.5 fill-black overflow-hidden shrink-0 max-w-full"
                          />
                          <div className="text-black text-xs font-medium leading-5">
                            Diagnosis
                          </div>
                        </span>
                        <div className="text-black text-xs leading-5">
                          Dr. Santos added one new diagnosis to your health
                          record on January 04.
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 max-md:max-w-full">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                  <div className="flex flex-col items-stretch w-[67%] max-md:w-full max-md:ml-0">
                    <div className="border border-[color:var(--background-background-600,#E8E8E8)] shadow-sm bg-white grow w-full pl-8 pr-12 py-5 rounded border-solid max-md:max-w-full max-md:mt-7 max-md:px-5">
                      <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                        <div className="flex flex-col items-stretch w-[55%] max-md:w-full max-md:ml-0">
                          <span className="items-stretch flex grow flex-col max-md:mt-10">
                            <div className="text-black text-base font-semibold leading-6">
                              Latest Care Plan(s)
                            </div>
                            <div className="text-blue-500 text-xs font-semibold leading-5 mt-2.5">
                              Care Plan #1
                            </div>
                            <span className="flex justify-between gap-1 mt-3.5 items-start">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d2d16adc26cdf297cc56f2b11bf7445f300308e55e3580060a017039d865f09?"
                                className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
                              />
                              <div className="text-black text-xs leading-5 grow whitespace-nowrap">
                                From Dr. Johnny Santos - Cardiologist
                              </div>
                            </span>
                            <span className="flex items-stretch gap-1 mt-1.5">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/77c892c93de3e4c6962e053180bf065e6181ec56787bd30de7fe7e11f7266e4c?"
                                className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
                              />
                              <div className="text-black text-xs leading-5">
                                2023-08-05
                              </div>
                            </span>
                            <div className="text-blue-500 text-xs font-semibold leading-5 mt-3.5 max-md:mr-0.5">
                              Prescribed Medication(s)
                            </div>
                            <div className="items-stretch flex w-[239px] max-w-full justify-between gap-5 mt-1.5 pr-12 max-md:mr-0.5 max-md:pr-5">
                              <span className="items-stretch flex flex-col">
                                <div className="text-black text-xs font-semibold leading-5 whitespace-nowrap">
                                  Brand Name
                                </div>
                                <div className="text-black text-xs font-semibold leading-5 whitespace-nowrap mt-1.5">
                                  Generic Name
                                </div>
                                <div className="text-black text-xs font-semibold leading-5 mt-1.5">
                                  Dose
                                </div>
                                <div className="text-black text-xs font-semibold leading-5 mt-1.5">
                                  Form
                                </div>
                                <div className="text-black text-xs font-semibold leading-5 mt-1.5">
                                  Quantity
                                </div>
                              </span>
                              <span className="items-stretch flex flex-col">
                                <div className="text-black text-xs leading-5 whitespace-nowrap">
                                  Losartan
                                </div>
                                <div className="text-black text-xs leading-5 whitespace-nowrap mt-1.5">
                                  Losartan
                                </div>
                                <div className="text-black text-xs leading-5 whitespace-nowrap mt-1.5">
                                  50 mg
                                </div>
                                <div className="text-black text-xs leading-5 whitespace-nowrap mt-1.5">
                                  Tablet
                                </div>
                                <div className="text-black text-xs leading-5 mt-1.5">
                                  30
                                </div>
                              </span>
                            </div>
                            <button className="self-start text-blue-500 text-xs font-medium leading-4 underline mt-11 max-md:mr-0.5 max-md:mt-10">
                              View Complete Care Plan
                            </button>
                          </span>
                        </div>
                        <div className="flex flex-col items-stretch w-[45%] ml-5 max-md:w-full max-md:ml-0">
                          <span className="items-stretch flex grow flex-col mt-8 max-md:mt-10">
                            <div className="text-blue-500 text-xs font-semibold leading-5">
                              Care Plan #2
                            </div>
                            <span className="flex justify-between gap-1 mt-3.5 items-start">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d2d16adc26cdf297cc56f2b11bf7445f300308e55e3580060a017039d865f09?"
                                className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
                              />
                              <div className="text-black text-xs leading-5 grow whitespace-nowrap">
                                From Dr. John Doe - Endocrinologist
                              </div>
                            </span>
                            <span className="flex items-stretch gap-1 mt-1.5">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/77c892c93de3e4c6962e053180bf065e6181ec56787bd30de7fe7e11f7266e4c?"
                                className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
                              />
                              <div className="text-black text-xs leading-5">
                                2023-08-05
                              </div>
                            </span>
                            <div className="text-blue-500 text-xs font-semibold leading-5 mt-3.5 max-md:mr-0.5">
                              Prescribed Medication(s)
                            </div>
                            <div className="items-stretch flex justify-between gap-5 mt-1.5 max-md:mr-0.5">
                              <span className="items-stretch flex flex-col">
                                <div className="text-black text-xs font-semibold leading-5 whitespace-nowrap">
                                  Brand Name
                                </div>
                                <div className="text-black text-xs font-semibold leading-5 whitespace-nowrap mt-1.5">
                                  Generic Name
                                </div>
                                <div className="text-black text-xs font-semibold leading-5 mt-1.5">
                                  Dose
                                </div>
                                <div className="text-black text-xs font-semibold leading-5 mt-1.5">
                                  Form
                                </div>
                                <div className="text-black text-xs font-semibold leading-5 mt-1.5">
                                  Quantity
                                </div>
                              </span>
                              <span className="items-stretch flex flex-col">
                                <div className="text-black text-xs leading-5 whitespace-nowrap">
                                  Metformin
                                </div>
                                <div className="text-black text-xs leading-5 whitespace-nowrap mt-1.5">
                                  Metformin
                                </div>
                                <div className="text-black text-xs leading-5 whitespace-nowrap mt-1.5">
                                  50 mg
                                </div>
                                <div className="text-black text-xs leading-5 whitespace-nowrap mt-1.5">
                                  Tablet
                                </div>
                                <div className="text-black text-xs leading-5 mt-1.5">
                                  30
                                </div>
                              </span>
                            </div>
                            <button className="self-start text-blue-500 text-xs font-medium leading-4 underline mt-11 max-md:mr-0.5 max-md:mt-10">
                              View Complete Care Plan
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                    <span className="border border-[color:var(--background-background-600,#E8E8E8)] shadow-sm bg-white flex w-full grow flex-col items-stretch mx-auto pl-5 pr-3.5 pt-11 pb-6 rounded border-solid max-md:mt-7 max-md:pl-5">
                      <div className="text-black text-base font-semibold leading-6">
                        Latest Diagnosis
                      </div>
                      <div className="text-blue-500 text-xs font-medium leading-5 whitespace-nowrap mt-6">
                        Angiopathy Without Gangrene
                      </div>
                      <span className="items-stretch flex  gap-4 mt-12 max-md:mt-10">
                        <div className="text-black text-xs font-semibold leading-5">
                          Date of Diagnosis
                        </div>
                        <div className="text-black text-xs leading-5">
                          2020-01-02
                        </div>
                      </span>
                      <span className="flex  gap-8 mt-3 items-start">
                        <div className="text-black text-xs font-semibold leading-5">
                          Other Doctor/s
                        </div>
                        <div className="text-black text-xs leading-5">
                          Dr. Johnny Santos - Cardiologist
                        </div>
                      </span>
                      <span className="items-stretch flex gap-12 mt-3">
                        <div className="text-black text-xs font-semibold leading-5">
                          Procedure/s
                        </div>
                        <div className="text-black text-xs leading-5">CGM</div>
                      </span>
                      <button className="self-start text-blue-500 text-xs font-medium leading-4 underline mt-11 max-md:mt-10">
                        View Complete Care Plan
                      </button>
                      <button className="self-start text-blue-500 text-xs font-medium leading-4 underline mt-3">
                        View Lab Test Results
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
