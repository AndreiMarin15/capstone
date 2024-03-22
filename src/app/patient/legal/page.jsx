"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";

export default function SendReceiveScreen() {
  const router = useRouter();
  const introRef = useRef(null);
  const definitionsRef = useRef(null);
  const infoRef = useRef(null);
  const whenRef = useRef(null);
  const howRef = useRef(null);
  const rightsRef = useRef(null);
  const storeRef = useRef(null);
  const longRef = useRef(null);

  return (
    <div className="flex flex-col bg-white">
      <div
        className="py-14 pr-10 pl-16 w-full shadow-sm max-md:px-5 max-md:max-w-full"
        style={{
          background:
            "linear-gradient(180deg, #00296C 0%, rgba(0, 82, 216, 0.51) 99.99%, rgba(0, 97, 255, 0.57) 100%)",
        }}
      >
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="mt-2 text-4xl font-bold text-white flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            Legal Notices
          </div>
          <div className="flex flex-col w-4/12 max-md:ml-0 max-md:w-full">
            <button className="grow justify-center px-3 py-2.5 w-full text-lg font-semibold text-white bg-blue-500 rounded border border-white border-solid max-md:px-5 max-md:mt-10">
              Privacy Policy
            </button>
          </div>
          <div className="flex flex-col w-4/12 max-md:ml-0 max-md:w-full">
            <button
              onClick={() => {
                router.push("/patient/legal/terms_of_service");
              }}
              className="grow justify-center px-3 py-2.5 w-full text-lg font-semibold text-sky-900 bg-white rounded border border-sky-900 hover:bg-blue-500 hover:text-white border-solid max-md:px-5 max-md:mt-10"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-14 mt-9 w-full max-md:px-5 max-md:max-w-full">
        <div className="max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[70%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow text-xs leading-5 text-black max-md:mt-10 max-md:max-w-full">
                <div className="italic max-md:max-w-full">
                  Effective February 04, 2024
                </div>
                <div className="mt-4 text-2xl font-bold max-md:max-w-full">
                  EndoTracker’s Privacy Policy
                </div>
                <div
                  ref={introRef}
                  className="mt-6 text-xl font-semibold max-md:max-w-full"
                >
                  Introduction
                </div>
                <div className="mt-6 leading-5 max-md:max-w-full">
                  EndoTracker is committed to protecting your personal
                  information and your right to privacy. Should you have any
                  questions or concerns regarding our policy or with how we
                  handle your personal information, feel free to reach out to us
                  at —<br />
                  <br />
                  With the use EndoTracker, you trust us with handling your
                  personal information. Our Privacy Policy governs your use of
                  EndoTracker and explains, as thoroughly as possible, how we
                  collect, use, protect, and disclose any information that
                  results from your use of our provided service, along with the
                  privacy rights that you have as the owner of that information,
                  and how the law protects you.
                  <br />
                  <br />
                  Should there be any terms in our policy that you disagree
                  with, please discontinue the use of our services. This privacy
                  policy applies to all information that is collected and use
                  throughout our system.
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[30%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow items-start py-5 pr-5 pl-5 mt-2.5 rounded-md border border-solid border-zinc-500 max-md:px-5 max-md:mt-10">
                <div className="text-sm font-semibold leading-5 text-black">
                  Table of Contents
                </div>
                <div className="mt-3 text-xs leading-6 text-sky-900">
                  <button
                    className="hover:underline"
                    onClick={() =>
                      introRef.current.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    Introduction
                  </button>
                  <br />
                  <button
                    className="hover:underline"
                    onClick={() =>
                      definitionsRef.current.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    Definitions
                  </button>
                  <br />
                  <button
                    className="hover:underline"
                    onClick={() =>
                      infoRef.current.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    Information we collect
                  </button>
                  <br />
                  <button
                    className="hover:underline"
                    onClick={() =>
                      whenRef.current.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    When and how we collect
                  </button>
                  <br />
                  <button
                    className="hover:underline"
                    onClick={() =>
                      howRef.current.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    How do we use your information and why we collect
                  </button>
                  <br />
                  <button
                    className="hover:underline"
                    onClick={() =>
                      rightsRef.current.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    Your privacy choices and rights
                  </button>
                  <br />
                  <button
                    className="hover:underline"
                    onClick={() =>
                      storeRef.current.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    Where do we store the data?
                  </button>
                  <br />
                  <button
                    className="hover:underline"
                    onClick={() =>
                      longRef.current.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    For how long do we store the data?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={definitionsRef}
          className="mt-9 text-xl font-semibold leading-8 text-black max-md:max-w-full"
        >
          Definitions
        </div>
        <div className="mt-6 text-xs leading-5 text-black  max-md:max-w-full">
          For the purposes of this Privacy Policy:
          <br />
          <br />
          <span className="font-bold">Account</span> means a unique account
          created for You to access our Service or parts of our Service.
          <br />
          <br />
          <span className="font-bold">Application</span> refers to EndoTracker,
          the software program provided by the Company.
          <br />
          <br />
          <span className="font-bold">Cookies</span> are small files that are
          placed on Your computer, mobile device or any other device by a
          website, containing the details of Your browsing history on that
          website among its many uses.
          <br />
          <br />
          <span className="font-bold">Country</span> refers to: Philippines
          <br />
          <br />
          <span className="font-bold">Device</span> means any device that can
          access the Service such as a computer, a cellphone or a digital
          tablet.
          <br />
          <br />
          <span className="font-bold">Personal Data</span> is any information
          that relates to an identified or identifiable individual.
          <br />
          <br />
          <span className="font-bold">Service</span> refers to the Application
          or the Website or both.&lt;/p&gt;
          <br />
          <br />
          <span className="font-bold">Usage Data</span> refers to data collected
          automatically, either generated by the use of the Service or from the
          Service infrastructure itself (for example, the duration of a page
          visit).
          <br />
          <br />
          <span className="font-bold">Website</span> refers to EndoTracker,
          accessible from{" "}
          <a
            href="https://capstone-cap2224.vercel.app/"
            className="underline"
            target="_blank"
          >
            https://capstone-cap2224.vercel.app/
          </a>
          <br />
          <br />
          <span className="font-bold">You</span> means the individual accessing
          or using the Service, or the company, or other legal entity on behalf
          of which such individual is accessing or using the Service, as
          applicable.
        </div>
        <div
          ref={infoRef}
          className="mt-9 text-xl font-semibold leading-8 text-black max-md:max-w-full"
        >
          Information We Collect
        </div>
        <div className="mt-6 text-xs leading-5 text-black  max-md:max-w-full">
          Our EndoTracker may collect, document, use and store your personal
          information and health information to ensure that you will be given
          the highest possible quality of patient care that you deserve. These
          personal information and health information may include the following:
          While using Our Service, We may ask You to provide Us with certain
          personally identifiable information that can be used to contact or
          identify You. Personally identifiable information may include, but is
          not limited to:
          <ul class="list-disc ml-5 mt-4">
            <li>
              Basic personal information, such as but not limited to your full
              name, age, birthday, gender, address, and your contact
              information.
            </li>
            <li>Biometrics (such as height, weight, and body mass index).</li>
            <li>
              Family History (Family members names, age, gender, relationship
              status, and medical conditions)
            </li>
            <li>
              Social History (Smoker status, alcohol consumption, and physical
              activities).
            </li>
            <li>
              Medical History (Chronic illnesses such as hypertension and
              stroke, and past medical procedures)
            </li>
            <li>Chief Complaint(s)</li>
            <li>Allergen(s) (Including drug allergies)</li>
            <li>Vital signs (Blood pressure and pulse rate)</li>
            <li>
              Visit(s) (The date, diagnosis, medications prescribed, careplans
              given, and tests done)
            </li>
            <li>
              Medication(s) (date of consumption, form, dosage, frequency, and
              last day of consumption)
            </li>
            <li>
              Condition(s) (Date of onset, status, doctor, and hospital origin)
            </li>
            <li>Test(s) (Previously taken)</li>
          </ul>
        </div>
        <div
          ref={whenRef}
          className="mt-9 text-xl font-semibold leading-8 text-black max-md:max-w-full"
        >
          When and How We Collect Your Data
        </div>
        <div className="mt-6 text-xs leading-5 text-black  max-md:max-w-full">
          TEXT HERE
        </div>
      </div>
    </div>
  );
}
