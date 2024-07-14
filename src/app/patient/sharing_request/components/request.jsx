import React from "react";
import { currentUser } from "@/app/store";
import { toast } from "react-toastify";
const Request = ({ sharing, index, handleApproval }) => {
  const [otp, setOtp] = React.useState(null);
  const [enteredOtp, setEntered] = React.useState(null);
  const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const user = currentUser.getState().user;

  const sendOTP = () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "App 91d4a8b0601ff8df491c9006dad21c8a-e6bfac93-3e03-400f-a373-bb89c9193f6e"
    );
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    const raw = JSON.stringify({
      messages: [
        {
          destinations: [
            { to: 639178855981 },
            {
              to: `63${
                user.personal_information?.contact_number ?? "9178855981"
              }`,
            },
          ], // replace with patient data					from: "ServiceSMS",
          text: `Hello! Your OTP is  ${otp}
     
     By providing this pin to your healthcare provider, you are authorizing EndoTracker and your Practitioner, to access your health information, such the following:

     - Your clinic visits
     - Your medications
     - Your vitals and biometrics
     - Your care plan

     EndoTracker respects the privacy of personal data, and are committed to handling your personal data with care. It is your right to be informed of how EndoTracker collects your data, including the purposes of how we collect, use, and disclose. 
     
     For more information on how EndoTracker handles and makes use of your data, please refer to the Privacy Policy full text which can be found in the system https://capstone-cap2224.vercel.app/legal/privacy_policy.`,
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://y36nrg.api.infobip.com/sms/2/text/advanced", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(() => {
        toast.success(
          `OTP Requested. Kindly Wait for the message on your number, ${user.personal_information.contact_number}`,
          { position: "top-left", theme: "colored", autoClose: 8000 }
        );
      })
      .catch((error) => console.error(error));
  };

  React.useEffect(() => {
    setOtp(generateOTP());
  }, []);

  return (
    <tr key={sharing.id}>
      <td className="px-6 py-4 whitespace-nowrap">{sharing.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{sharing.specialization}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {sharing.document?.map((document, i) => (
          <div key={i}>
            {document}
            {i !== sharing.document.length - 1 && <br />}
          </div>
        ))}
      </td>
      <td
        className="px-6 py-4 whitespace-nowrap"
        rowSpan={sharing.document.length}
      >
        <div className="flex items-center">
          <div>
            <input
              type="text"
              className="border border-gray-200 rounded-md m-1 p-2 w-24"
              placeholder="OTP"
              id={`approveYes${index}`}
              name={`approveGroup${index}`}
              style={{ marginRight: "8px" }}
              onChange={(e) => {
                setEntered(e.target.value);
              }}
            />
            <button
              class="middle none center mr-4 rounded-lg bg-green-500 py-2 px-4 font-sans text-sm font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              onClick={() => {
                if (parseInt(enteredOtp) === otp) {
                  handleApproval(true, sharing.id);
                } else {
                  toast.error("Invalid OTP", {
                    position: "top-left",
                    theme: "colored",
                    autoClose: 8000,
                  });
                }
              }}
            >
              Confirm
            </button>
            <button
              class="middle none center mr-4 rounded-lg bg-red-500 py-2 px-4 font-sans text-sm font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              onClick={() => handleApproval(false, sharing.id)}
            >
              Reject
            </button>
            <button
              class="middle none center mr-4 rounded-lg bg-blue-500 py-2 px-4 font-sans text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              onClick={() => {
                sendOTP();
              }}
            >
              Request OTP
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Request;
