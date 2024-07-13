"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
const TermsOfService = () => {
  const router = useRouter();

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
            <button
              onClick={() => {
                router.push("/patient/patient_legal/privacy_policy");
              }}
              className="grow justify-center px-3 py-2.5 w-full text-lg font-semibold text-sky-900 bg-white rounded border border-sky-900 hover:bg-blue-500 hover:text-white border-solid max-md:px-5 max-md:mt-10"
            >
              Privacy Policy
            </button>
          </div>
          <div className="flex flex-col w-4/12 max-md:ml-0 max-md:w-full">
            <button
              onClick={() => {
                router.push("/patient/patient_legal/terms_of_service");
              }}
              className="grow justify-center px-3 py-2.5 w-full text-lg font-semibold text-white bg-blue-500 rounded border border-white border-solid max-md:px-5 max-md:mt-10"
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
              <div className="flex flex-col grow text-sm leading-5 text-black max-md:mt-10 max-md:max-w-full">
                <div className="italic max-md:max-w-full">
                  Effective March 22, 2024
                </div>
                <div className="mt-4 text-2xl font-bold max-md:max-w-full">
                  EndoTracker’s Terms of Service
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-justify mt-5">
          {
            " Welcome to EndoTracker! These Terms of Service ('Terms') govern your access to and use of the EndoTracker website and any related services provided by us. By accessing or using our website, you agree to be bound by these Terms."
          }
        </p>
        <br />
        <p>
          <h2>
            <strong>{"1. Use of Our Services"}</strong>
          </h2>
        </p>
        <ul className="text-gray-700 ml-8" style={{ listStyleType: "disc" }}>
          <li>
            {
              "Eligibility: By accessing or using our services, you represent and warrant that you are at least 18 years old or have reached the age of majority in your jurisdiction. If you are accessing or using our services on behalf of a minor, you represent and warrant that you are the parent or legal guardian of the minor and have the authority to bind them to these Terms."
            }
          </li>
          <li>
            {
              "Account Registration: You may need to register for an account to access certain features of our services. You agree to provide accurate, current, and complete information during the registration process."
            }
          </li>
          <li>
            {
              "User Responsibilities: You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account."
            }
          </li>
        </ul>
        <br />
        <p>
          <strong>{"2. Privacy Policy"}</strong>{" "}
        </p>
        <ul className="text-gray-700 ml-8">
          <li>
            {
              "Your use of our services is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and disclose your personal information."
            }
          </li>
        </ul>
        <br />
        <p>
          <strong>{"3. Intellectual Property"}</strong>{" "}
        </p>
        <ul className="text-gray-700 ml-8" style={{ listStyleType: "disc" }}>
          <li>
            {
              "Content: Our services may contain materials, including but not limited to text, images, and logos, which are protected by copyright, trademark, or other intellectual property rights. You may not use, modify, reproduce, or distribute any such materials without our prior written consent."
            }
          </li>
          <li>
            {
              "User Content: You retain ownership of any content you submit or upload to our services ('User Content'). By submitting or uploading User Content, you grant us a non-exclusive, worldwide, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform the User Content in connection with our services."
            }
          </li>
        </ul>
        <br />
        <p>
          <strong>{"4. Prohibited Conduct"}</strong>{" "}
        </p>
        <p>
          {
            "You agree not to engage in any of the following prohibited activities:"
          }
        </p>
        <ul className="text-gray-700 ml-8" style={{ listStyleType: "disc" }}>
          <li>{"Violating any applicable laws or regulations."}</li>
          <li>
            {
              "Impersonating any person or entity or falsely stating or otherwise misrepresenting your affiliation with a person or entity."
            }
          </li>
          <li>{"Interfering with or disrupting our services or servers."}</li>
          <li>
            {
              "Collecting or storing personal data about other users without their consent."
            }
          </li>
          <li>
            {
              "Engaging in any conduct that restricts or inhibits any other user from using or enjoying our services."
            }
          </li>
        </ul>
        <br />
        <p>
          <strong>{"5. Limitation of Liability"}</strong>{" "}
        </p>
        <ul className="text-gray-700 ml-8">
          <li>
            {
              "To the fullest extent permitted by law, EndoTracker and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use our services; (b) any conduct or content of any third party on our services; or (c) unauthorized access, use, or alteration of your transmissions or content."
            }
          </li>
        </ul>
        <br />
        <p>
          <strong>{"6. Indemnification"}</strong>{" "}
        </p>
        <ul className="text-gray-700 ml-8">
          <li>
            {
              "You agree to indemnify and hold EndoTracker and its affiliates harmless from any claims, losses, damages, liabilities, including legal fees, arising out of your use or misuse of our services, your violation of these Terms, or your violation of any rights of a third party."
            }
          </li>
        </ul>
        <br />
        <p>
          <strong>{"7. Governing Law"}</strong>{" "}
        </p>
        <ul className="text-gray-700 ml-8">
          <li>
            {
              "These Terms shall be governed by and construed in accordance with the laws of the Republic of the Philippines, without regard to its conflict of law provisions."
            }
          </li>
        </ul>
        <br />
        <p>
          <strong>{"8. Changes to These Terms"}</strong>{" "}
        </p>
        <ul className="text-gray-700 ml-8">
          <li>
            {
              "We reserve the right to modify these Terms at any time. If we make changes to these Terms, we will post the revised Terms on our website and update the 'Effective date' date at the top of these Terms. Your continued use of our services following the posting of the revised Terms will constitute your acceptance of such changes."
            }
          </li>
        </ul>
        <br />
        <p>
          <strong>{"9. Contact Us"}</strong>{" "}
        </p>
        <ul className="text-gray-700 ml-8 mb-10">
          <li>
            {
              "If you have any questions about these Terms, please contact us at placeholder."
            }
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TermsOfService;
