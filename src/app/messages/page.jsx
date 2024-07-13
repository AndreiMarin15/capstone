"use client";
import * as React from "react";
import Image from "next/image";
import {
  getMessages,
  getMessagesAndSubscribe,
  getProfilePicturePatient,
} from "@/backend/message/getMessages";
export default function Messaging() {
  const [patient, setPatient] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [changeUser, setChangeUser] = React.useState(false);
  const [newMessage, setNewMessage] = React.useState(false);
  const [currentPhoto, setCurrentPhoto] = React.useState(null);
  const [chats, setChats] = React.useState([
    { id: "", patient: "", patient_full_name: "" },
  ]);
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
    patients: {
      last_name: "selected",
      first_name: "No patient",
    },
  });
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleInserts = (payload) => {
    setNewMessage(!newMessage);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const message = formData.get("message");

    setMessage("");
    if (patient) {
      getMessages.insertMessage(patient, message, "sent");
    }
  };

  getMessagesAndSubscribe(handleInserts);

  React.useEffect(() => {
    const importMessage = async () => {
      const chatList = await getMessages.getChats();
      const chatsWithPhotos = await Promise.all(
        chatList.map(async (item) => {
          const photo = await getProfilePicturePatient(item.patient);
          return {
            ...item,
            photo,
          };
        })
      );
      setChats(chatsWithPhotos);
      console.log("THESE ARE CHATS", chatList);
      setPatient(chatList[0]?.id || ""); // Set the initial patient ID
    };

    importMessage();
  }, [newMessage]);

  React.useEffect(() => {
    console.log("CHATSS", chats);
  }, [chats]);

  React.useEffect(() => {
    const importMessage = async () => {
      const messages = await getMessages.getMessage(patient);
      // update to read
      await getMessages.updateRead(patient, "received", "read");
      console.log("THESE ARE MSGS", messages);
      setMessageInfo(messages);
    };

    importMessage();
  }, [changeUser, newMessage]);

  function getUser(userId, photo) {
    setCurrentPhoto(photo);
    setPatient(userId);
    setChangeUser(!changeUser);
  }

  return (
    <div className="flex bg-white gap-4">
      <div className="flex w-1/4">
        {/* Left side tabs */}
        <div className="flex flex-col w-full px-5 mt-9 gap-3">
          {chats &&
            chats?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full group"
                  onClick={() => getUser(item.id, item.photo)}
                >
                  <div className="flex gap-5 items-center group-hover:bg-neutral-200">
                    {/* IF SELECTED DISPLAY THE BLUE */}
                    <div
                      className={
                        "min-w-2.5 h-[40px] group-hover:bg-blue-500 " +
                        (patient == item.id ? "bg-blue-500" : "bg-blue-200")
                      }
                    />
                    <Image
                      alt="image"
                      height={0}
                      width={0}
                      loading="lazy"
                      src={
                        item.photo ??
                        "https://cdn.builder.io/api/v1/image/assets/TEMP/a7c15d8e78fed1700b5a41fe03386945de7b86991164dd8f5e36bb4f2a9286b8?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
                      }
                      className="w-[25px]"
                    />
                    <div className="flex flex-col flex-1">
                      <div className="text-normal font-semibold whitespace-nowrap">
                        {item.patient_full_name}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex flex-col items-end max-md:pl-5 h-[100vh] w-full z-0">
        <span className="shadow-sm bg-white z-[1] flex w-full max-w-full justify-between gap-5 pl-7 pr-10 py-9 self-start max-md:flex-wrap max-md:px-5">
          <div className="text-black text-xl font-semibold leading-8 mt-1.5">
            Messaging
          </div>
        </span>
        <div className="shadow-sm bg-white mt-0 w-full max-w-full pl-5 pr-20 pt-8 pb-4 max-md:px-5">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch max-md:w-full max-md:ml-0">
              <Image
                alt="picture"
                height={0}
                width={0}
                loading="lazy"
                src={currentPhoto ?? "https://cdn.builder.io/api/v1/image/assets/TEMP/e6422eb52375a50afd15b70553c37dc9849d7544cde4956bbb282ba7a868bffd?"}
                className="aspect-square object-contain object-center w-[43px] overflow-hidden shrink-0 max-w-full ml-2 mt-1.5 max-md:mt-10"
              />
            </div>
            <div className="flex flex-col items-stretch w-[74%] max-md:w-full max-md:ml-0">
              <span className="text-black text-lg font-semibold leading-7 whitespace-nowrap items-stretch grow mt-3 pr-3 pb-5 max-md:mt-10">
                {messageInfo.patients
                  ? messageInfo.patients.first_name +
                    " " +
                    messageInfo.patients.last_name
                  : " "}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-stone-50 self-center flex w-full max-w-full flex-col-reverse items-stretch pt-6 pb-12 max-md:max-w-full max-h-full h-full px-7 overflow-y-auto gap-3">
          {/* Start Message */}
          {messageInfo.messages &&
            messageInfo.messages?.map((item, index) => {
              if (
                item.message_status === "received" ||
                item.message_status === "read"
              ) {
                return (
                  <div
                    key={index}
                    className="flex gap-4 items-start max-md:max-w-full max-md:flex-wrap max-w-[50%]"
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
                item.message_status === "sent" ||
                item.message_status === "seen"
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

        <form
          className="shadow-sm bg-white self-center flex w-full max-w-full flex-col items-stretch p-6 max-md:max-w-full max-md:px-5"
          onSubmit={handleSubmit}
        >
          <input
            className="text-zinc-500 text-base leading-6 whitespace-nowrap bg-stone-50 p-12 rounded-lg items-start max-md:max-w-full max-md:pr-5"
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
    </div>
  );
}
