"use client";
import * as React from "react";
import Image from "next/image";
import {
  getMessages,
  getMessagesAndSubscribe,
  getProfilePictureDoctor,
} from "@/backend//message/getMessages";
export default function Messaging() {
  const [newMessage, setNewMessage] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [chat, setChat] = React.useState("");
  const [doctorPhoto, setDoctorPhoto] = React.useState(null);
  const [chats, setChats] = React.useState([
    { id: "", chat: "", doctor_full_name: "" },
  ]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const [messageInfo, setMessageInfo] = React.useState({
    messages: [
      {
        message: "No data",
        created_at: "2024-03-17T09:20:29.080437+00:00",
        message_status: "received",
      },
      {
        message: "No data",
        created_at: "2024-03-17T09:22:08.343375+00:00",
        message_status: "sent",
      },
    ],
    patient: "",
    patients: {
      last_name: "Undefined",
      first_name: "Undefined",
    },
    doctor: "",
    doctors: {
      last_name: "Undefined",
      first_name: "Undefined",
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const message = formData.get("message");
    setMessage("");
    if (chat) {
      getMessages.insertMessage(chat, message, "received");
    }
  };

  const handleInserts = (payload) => {
    setNewMessage(!newMessage);
  };

  getMessagesAndSubscribe(handleInserts);

  //change to get chat based on doctor if not exist create a chat
  React.useEffect(() => {
    const importMessage = async () => {
      const chatList = await getMessages.getChats();
      setChats(chatList);
      console.log("PATIENT CHATLIST", chatList);
      setChat(chatList[0]?.id || "");
    };

    importMessage();
  }, [newMessage]);

  React.useEffect(() => {
    const getDoctorPhoto = async () => {
      const photo = await getProfilePictureDoctor(chats[0]?.doctor);
      setDoctorPhoto(photo);
    };

    getDoctorPhoto();
  }, [chats]);

  //get the chats under the doctor
  React.useEffect(() => {
    const importMessage = async () => {
      const messages = await getMessages.getMessage(chat);
      // update to read
      await getMessages.updateRead(chat, "sent", "seen");
      setMessageInfo(messages);
    };

    importMessage();
  }, [chat, newMessage]);
  return (
    <div className="bg-white flex flex-col items-end max-md:pl-5 h-[100vh]">
      <div className=" shadow-sm flex gap-5 justify-between px-14 py-9 mt-1.5 w-full whitespace-nowrap bg-white max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="mt-2.5 text-xl font-semibold text-black">Messages</div>
        <div className="flex gap-3.5 justify-between text-sm"></div>
      </div>
      <div className="shadow-sm bg-white mt-0 w-full max-w-full pl-5 pr-20 pt-8 pb-4 max-md:px-5">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch max-md:w-full max-md:ml-0">
            <Image
              alt="picture"
              height={0}
              width={0}
              loading="lazy"
              src={
                doctorPhoto ??
                "https://cdn.builder.io/api/v1/image/assets/TEMP/e6422eb52375a50afd15b70553c37dc9849d7544cde4956bbb282ba7a868bffd?"
              }
              className="aspect-square object-contain object-center w-[43px] overflow-hidden shrink-0 max-w-full ml-2 mt-1.5 max-md:mt-10"
            />
          </div>
          <div className="flex flex-col items-stretch w-[74%] max-md:w-full max-md:ml-0">
            <span className="text-black text-lg font-semibold leading-7 whitespace-nowrap items-stretch grow mt-3 pr-3 pb-5 max-md:mt-10">
              {chats[0]?.doctor_full_name ?? "No Chats Yet"}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-stone-50 self-center flex w-full max-w-full flex-col-reverse items-stretch pt-6 pb-12 max-md:max-w-full max-h-full h-full px-7 overflow-y-auto gap-3">
        {/* Start Message */}
        {messageInfo.messages &&
          messageInfo.messages?.map((item, index) => {
            if (
              item.message_status === "sent" ||
              item.message_status === "seen"
            ) {
              return (
                <div
                  key={index}
                  className="flex gap-4 items-start max-md:max-w-full max-md:flex-wrap"
                >
                  <Image
                    alt="picture"
                    height={0}
                    width={0}
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/dffd38d13978a933c893f2eb7821e2e2acf925db34c9fb328f0cab15f6120276?"
                    className="aspect-square object-contain object-center w-7 overflow-hidden shrink-0 max-w-full"
                  />
                  <span className="text-zinc-600 text-sm font-medium leading-5 shadow-sm bg-white self-stretch justify-center items-stretch px-5 py-4 rounded">
                    {item.message}
                  </span>
                </div>
              );
            } else if (
              item.message_status === "received" ||
              item.message_status === "read"
            ) {
              return (
                <div
                  key={index}
                  className="flex gap-4 justify-end items-start max-md:max-w-full max-md:flex-wrap self-end max-w-[50%]"
                >
                  <span className="text-white text-sm font-medium leading-5 shadow-sm bg-blue-500 self-stretch justify-center items-stretch px-5 py-4 rounded">
                    {item.message}
                  </span>
                  <Image
                    alt="picture"
                    height={0}
                    width={0}
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/dffd38d13978a933c893f2eb7821e2e2acf925db34c9fb328f0cab15f6120276?"
                    className="aspect-square object-contain object-center w-7 overflow-hidden shrink-0 max-w-full"
                  />
                </div>
              );
            }
          })}
      </div>
      {/* <div className="bg-stone-50 self-center flex w-full max-w-full flex-col items-stretch pt-6 pb-12 max-md:max-w-full">
        <div className="flex flex-col px-7 items-start max-md:max-w-full max-md:px-5">
          <div className="flex gap-4 items-start max-md:max-w-full max-md:flex-wrap">
            <Image
              alt="picture"
              height={0}
              width={0}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/dffd38d13978a933c893f2eb7821e2e2acf925db34c9fb328f0cab15f6120276?"
              className="aspect-square object-contain object-center w-7 overflow-hidden shrink-0 max-w-full"
            />
            <span className="text-zinc-600 text-sm font-medium leading-5 shadow-sm bg-white self-stretch grow justify-center items-stretch px-5 py-4 rounded max-md:max-w-full max-md:px-5">
              {
                "Hi, how are you dealing with the care plan? Do you have any concerns?"
              }
            </span>
          </div>
          <div className="justify-end items-stretch flex gap-4 mt-12 self-end max-md:max-w-full max-md:flex-wrap max-md:mt-10">
            <span className="text-white text-sm font-medium leading-5 shadow-sm bg-blue-500 grow justify-center items-stretch p-4 rounded max-md:max-w-full">
              {
                "Yes, regarding my diet. I think our weight goal is too challenging for me. It makes me dizzy."
              }
            </span>
            <Image
              alt="picture"
              height={0}
              width={0}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/de9c67effad7bceb2cc1b7c7e86cd59aa8389013374f7f725ff726686166f85f?"
              className="aspect-square object-contain object-center w-7 overflow-hidden shrink-0 max-w-full self-start"
            />
          </div>
        </div>
        <div className="flex gap-4 ml-7 mt-12 mb-20 self-start items-start max-md:max-w-full max-md:flex-wrap max-md:my-10">
          <Image
            alt="picture"
            height={0}
            width={0}
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b22ea85d41d4f064a89b11204518bb621ac7e3a8c3c3468a5e2e1d018b44e95?"
            className="aspect-square object-contain object-center w-7 overflow-hidden shrink-0 max-w-full"
          />
          <span className="text-zinc-600 text-sm font-medium leading-5 shadow-sm bg-white self-stretch grow justify-center items-stretch px-5 py-4 rounded max-md:max-w-full max-md:px-5">
            {
              "Okay. I'll adjust them as necessary. Kindly view your adjusted care plan in a few minutes."
            }
          </span>
        </div>
      </div> */}
      <form
        onSubmit={handleSubmit}
        className="shadow-sm bg-white self-center flex w-full max-w-full flex-col items-stretch px-12 py-3.5 max-md:max-w-full max-md:px-5"
      >
        <input
          className="text-zinc-500 text-base leading-6 whitespace-nowrap bg-stone-50 pl-5 pr-16 pt-3.5 pb-14 rounded-lg items-start max-md:max-w-full max-md:pr-5"
          placeholder=" Message..."
          name="message"
          onChange={handleMessageChange}
          value={message}
          required
        />
        <div className="flex w-full items-center justify-between gap-5 mt-2.5 pr-4 max-md:max-w-full max-md:flex-wrap">
          <span className="flex items-stretch gap-2 my-auto"></span>
          <button
            type="submit"
            className="text-white text-sm font-semibold whitespace-nowrap justify-center items-stretch bg-blue-500 self-stretch px-7 py-2 rounded max-md:px-5"
          >
            SEND
          </button>
        </div>
      </form>
    </div>
  );
}
