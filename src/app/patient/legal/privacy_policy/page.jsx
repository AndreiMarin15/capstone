"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
const PrivacyPolicy = () => {
  const router = useRouter();

  return (
<div className="border bg-white flex flex-col items-center h-screen overflow-auto">
    
  <div className="text-black text-xl font-semibold mb-8">Privacy Policy</div>
  <div className="ml-8 mb-8 mr-8">
    <p className="text-gray-700">
        <h1><strong>{"Effective date: Feb 12, 2024"}</strong></h1> <br />
     <p className="text-justify">
        {"All health and health-related information contained in this EndoTracker website is general in nature and should not be used as a substitute for a visit with a healthcare professional or medical advice. Any health advice found here is intended to offer general information for you to discuss your medical condition with your healthcare provider. Endo Tracker respects the privacy of personal data and is committed to handling your personal data with care. It is your right to be informed how EndoTracker collects your data, including the purposes of how we collect, use, and disclose."}
        </p><br />
        
        <h2><strong>{"What personal data do we collect from you?"}</strong></h2>
        </p>
        <ul className="text-gray-700 ml-8" style={{ listStyleType: 'disc' }}>
            <li>{"Basic personal information, such as but not limited to your full name, age, birthday, gender, address, and your contact information."}</li>
            <li>{"Biometrics (such as height, weight, and body mass index)."}</li>
            <li>{"Family History (Family members' names, age, gender, relationship status, and medical conditions)."}</li>
            <li>{"Social History (Smoker status, alcohol consumption, and physical activities)."}</li>
            <li>{"Medical History (Chronic illnesses such as hypertension and stroke, and past medical procedures)."}</li>
            <li>{"Chief Complaint(s)."}</li>
            <li>{"Allergen(s) (Including drug allergies)."}</li>
            <li>{"Vital signs (Blood pressure and pulse rate)."}</li>
            <li>{"Visit(s) (The date, diagnosis, medications prescribed, careplans given, and tests done)."}</li>
            <li>{"Medication(s) (Date of consumption, form, dosage, frequency, and last day of consumption)."}</li>
            <li>{"Condition(s) (Date of onset, status, doctor, and hospital origin)."}</li>
            <li>{"Test(s) (Previously taken)."}</li>
        </ul><br />

        <p className="text-gray-700">
        <strong>{"How and when do we collect your data?"}</strong><br /> </p>
        <ul className="text-gray-700 ml-8" style={{ listStyleType: 'disc' }}>
        <li>{"It is important that we collect timely and accurate information about you in electronic and paper-based forms before implementing the healthcare services available within the system."}
        </li></ul><br />

        <p>
        <strong>{"Why do we collect personal data about you?"}</strong> </p>
        <ul className="text-gray-700 ml-8" style={{ listStyleType: 'disc' }}>
            <li>{"For patient care and medical treatment: When providing patient care and medical treatment, we collect your personal data to help your doctors understand your current health status<br /> and to assist us in maintaining a record of the care and services that you have received in different hospitals."}</li>
            <li>{"For historical and statistical purposes: Your information may be used to generate data substantial to the enhancement of the electronic health records services."}</li>
            <li>{"We will be obtaining informed consent from you or your authorized representative before the use of your personal data."}</li>
        </ul><br />

        <p>
        <strong>{"Do we share your personal data to other institutions or organizations?"}</strong> </p>
        <ul className="text-gray-700 ml-8" style={{ listStyleType: 'disc' }}>
            <li>{"There will be instances where we will share your personal data to government agencies which lawfully collects information. We may also share personal information to fulfill legal mandate(s) like when ordered lawfully to do so by a court or a government agency or public authority."}
            </li>
            <li>{"We may also share personal information with our service providers and related entities who provide the service to the electronic healthcare record."}</li>
        </ul><br />
  
        <p>
        <strong>{"How do we secure your personal data? How long will we keep your data?"}</strong> </p>
        <ul className="text-gray-700 ml-8" style={{ listStyleType: 'disc' }}>
            <li>{"Only authorized personnel will have access to your personal information. The system is set up with adequate technical security measures to protect your data from unauthorized access."}</li>
        </ul><br />

        <p>
        <strong>{"What are your Rights as the data subject?"}</strong> </p>
        <ul className="text-gray-700 ml-8" style={{ listStyleType: 'disc' }}>
            <li>{"You have the right to request a copy of your personal and health information that we hold about you, as well as to ask for it to be corrected if you think there is incorrect information."}</li>
            <li>{"You have the right to withdraw your consent that may have been given for certain data processing."}</li>
            <li>{"You have the right to suspend or withdraw, schedule the removal or destruction of your personal data from our system if you have substantial evidence that your rights have been violated or your data is incomplete, false, or processed for an unlawful purpose."}</li>
            <li>{"You have the right to be indemnified for damages you may have sustained due to inaccurate, incomplete, false, or unauthorized use of your personal data."}</li>
            <li>{"Upon death or incapacity, your rights may be transferred to your lawful heirs."}</li>
        </ul><br />

        <p>
        <strong>{"Technical Privacy Policy"}</strong> </p>
        <ul className="text-gray-700 ml-8" style={{ listStyleType: 'disc' }}>
            <li>{"Website log data (Cookies) are used to monitor your activities on the system."}</li>
            <li>{"Cookies are packets of information that any website transfers to a user’s computer for record-keeping purposes. These are used to keep track of users’ preferences for content and alert them to new content areas. Most browsers allow you to turn off cookies if you do not want them tracking your preferences. However, many sites will not function well if you disable them."}</li>
            <li>{"These cookies do not contain your identifiable personal data. It is simply used as a tracking method for aggregate information for the number of website visitors, IP Addresses, Website Referrals, Most Searched keywords and top-visited webpages."}</li>
            <li>{"These cookies are only for enhancing the usability of our webpages. We do not store any personal information our our website."}</li>
        </ul><br />

        <p>
        <strong>{"Website Data Security"}</strong> </p>
        <ul className="text-gray-700 ml-8" style={{ listStyleType: 'disc' }}>
            <li>{"The website is a highly secured website, which may request confidential information for medical and healthcare purposes. We will not share this information with other partners, affiliates, or persons and organizations for marketing and non-medical purposes."}</li>
            <li>{"Rest assured that these data are located on our highly secured one way encrypted database "} </li>
        </ul>
        {/* BACK BUTTON */}
        <div className="flex flex-col items-start justify-end text-xs font-semibold text-black whitespace-nowrap rounded max-w-[137px] mt-10">
                    <button
                        onClick={() => {
                            router.push("/patient/legal");
                        }}
                        className="flex items-center justify-center px-10 py-1 w-full rounded border border-sky-900 border-solid font-semibold border-1.5"
                    >
                    <div className="flex gap-0.5 justify-between items-center">
                        <Image
                        height={0}
                        width={0}
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0de7471415fd70bdaba9dd1e6f7c2e7075e37988a454dfb91c7aed9b11350077?"
                        className="w-4 h-4 aspect-square"
                        alt="Back Arrow"
                        />
                        <div className="ml-1">BACK</div>
                    </div>
                    </button>
        </div>
    </div>
</div>
  );
};

export default PrivacyPolicy;
