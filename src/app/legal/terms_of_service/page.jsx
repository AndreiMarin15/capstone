"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
const TermsOfService = () => {
  const router = useRouter();

  return (
<div className="border bg-white flex flex-col items-center  h-screen overflow-auto">
  <div className="text-black text-xl font-semibold mb-8 mt-8">Terms of Service</div>
  <div className="ml-8 mb-8 mr-8">
    <p className="text-gray-700">
        <h1><strong>{"Effective date: Feb 12, 2024"}</strong></h1> <br />
     <p className="text-justify">
     {" Welcome to EndoTracker! These Terms of Service ('Terms') govern your access to and use of the EndoTracker website and any related services provided by us. By accessing or using our website, you agree to be bound by these Terms."}
        </p><br />
        
        <h2><strong>{"1. Use of Our Services"}</strong></h2>
        </p>
        <ul className="text-gray-700 ml-8" style={{ listStyleType: 'disc' }}>
            <li>{"Eligibility: By accessing or using our services, you represent and warrant that you are at least 18 years old or have reached the age of majority in your jurisdiction. If you are accessing or using our services on behalf of a minor, you represent and warrant that you are the parent or legal guardian of the minor and have the authority to bind them to these Terms."}</li>
            <li>{"Account Registration: You may need to register for an account to access certain features of our services. You agree to provide accurate, current, and complete information during the registration process."}</li>
            <li>{"User Responsibilities: You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account."}</li>
        </ul><br />

        <p>
        <strong>{"2. Privacy Policy"}</strong> </p>
        <ul className="text-gray-700 ml-8">
            <li>{"Your use of our services is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and disclose your personal information."}</li>
        </ul><br />

        <p>
        <strong>{"3. Intellectual Property"}</strong> </p>
        <ul className="text-gray-700 ml-8" style={{ listStyleType: 'disc' }}>
            <li>{"Content: Our services may contain materials, including but not limited to text, images, and logos, which are protected by copyright, trademark, or other intellectual property rights. You may not use, modify, reproduce, or distribute any such materials without our prior written consent."}</li>
            <li>{"User Content: You retain ownership of any content you submit or upload to our services ('User Content'). By submitting or uploading User Content, you grant us a non-exclusive, worldwide, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform the User Content in connection with our services."}</li>
        </ul><br />
  
        <p>
        <strong>{"4. Prohibited Conduct"}</strong> </p>
        <p>{"You agree not to engage in any of the following prohibited activities:"}</p>
        <ul className="text-gray-700 ml-8" style={{ listStyleType: 'disc' }}>
            <li>{"Violating any applicable laws or regulations."}</li>
            <li>{"Impersonating any person or entity or falsely stating or otherwise misrepresenting your affiliation with a person or entity."}</li>
            <li>{"Interfering with or disrupting our services or servers."}</li>
            <li>{"Collecting or storing personal data about other users without their consent."}</li>
            <li>{"Engaging in any conduct that restricts or inhibits any other user from using or enjoying our services."}</li>
        </ul><br />

        <p>
        <strong>{"5. Limitation of Liability"}</strong> </p>
        <ul className="text-gray-700 ml-8">
            <li>{"To the fullest extent permitted by law, EndoTracker and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use our services; (b) any conduct or content of any third party on our services; or (c) unauthorized access, use, or alteration of your transmissions or content."}</li>
        </ul><br />

        <p>
        <strong>{"6. Indemnification"}</strong> </p>
        <ul className="text-gray-700 ml-8">
            <li>{"You agree to indemnify and hold EndoTracker and its affiliates harmless from any claims, losses, damages, liabilities, including legal fees, arising out of your use or misuse of our services, your violation of these Terms, or your violation of any rights of a third party."}</li>
        </ul><br />

        <p>
        <strong>{"7. Governing Law"}</strong> </p>
        <ul className="text-gray-700 ml-8">
            <li>{"These Terms shall be governed by and construed in accordance with the laws of the Republic of the Philippines, without regard to its conflict of law provisions."}</li>
        </ul><br />


        <p>
        <strong>{"8. Changes to These Terms"}</strong> </p>
        <ul className="text-gray-700 ml-8">
            <li>{"We reserve the right to modify these Terms at any time. If we make changes to these Terms, we will post the revised Terms on our website and update the 'Effective date' date at the top of these Terms. Your continued use of our services following the posting of the revised Terms will constitute your acceptance of such changes."}</li>
        </ul><br />


        <p>
        <strong>{"9. Contact Us"}</strong> </p>
        <ul className="text-gray-700 ml-8">
            <li>{"If you have any questions about these Terms, please contact us at placeholder."}</li>
        </ul>
        {/* BACK BUTTON */}
        <div className="flex flex-col items-start justify-end text-xs font-semibold text-black whitespace-nowrap rounded max-w-[137px] mt-10">
                <button
                    onClick={() => {
                        router.push("/legal");
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

export default TermsOfService;
