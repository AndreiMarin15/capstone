"use client";
import Image from "next/image";
import * as React from "react";
import dashboard from "@/backend/patient/patient_dashboard/dashboard";
import {
  getNotifications,
  getSenderData,
  markAsRead,
} from "@/backend/sendNotification";
import { getReminders } from "@/backend/reports/getReportsData";
import { currentUser } from "@/app/store";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
export default function Home() {
  const [patientData, setPatient] = React.useState({
    name: "Juan Dela Cruz",
    age: 74,
    gender: "Male",
    birthday: "01 January 1950",
    address: "Quezon City",
    allergies: [],
    contact: "+63 917 000 000",
    memberSince: "06 January 2024",
    bmi: "24.9",
    photo:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/2973ce194094175870e4010225d7995b70a4add3f96a4c16d2302409e5e7ccd8?",
  });

  const [careplanData, setCareplan] = React.useState({});
  const [notifications, setNotifications] = React.useState([]);
  const [reminders, setReminders] = React.useState([]);

  React.useEffect(() => {
    const fetchNotifs = async () => {
      const notifications = await getNotifications(
        currentUser.getState().info.id
      );
      const notificationsWithSender = await Promise.all(
        notifications.map(async (notif) => ({
          title: notif.title,
          content: notif.content,
          sender: await getSenderData(notif.id),
          id: notif.id,
        }))
      );
      setNotifications(notificationsWithSender);
    };

    fetchNotifs();
  }, []);

  React.useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  React.useEffect(() => {
    const getRemindersData = async () => {
      const reminders = await getReminders(currentUser.getState().info.id);
      setReminders(reminders);
    };
    getRemindersData();
  }, []);

  React.useEffect(() => {
    const getData = async () => {
      const patient = await dashboard.getPatientData();
      const careplan = await dashboard.getLatestCarePlan();
      console.log(patient);
      console.log(careplan);
      if (careplan?.resource !== undefined && careplan?.resource !== null) {
        setCareplan(careplan.resource);
      }

      setPatient(patient);
    };

    getData();
  }, []);

  React.useEffect(() => {
    console.log(careplanData);
  }, [careplanData]);

  return (
    <div className="px-5 w-full max-md:max-w-full h-auto bg-white">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 h-[100vh]">
        <div className="flex-col ml-5 w-[50%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col self-stretch my-auto max-md:mt-10 max-md:max-w-full">
            <div className="text-xl font-semibold leading-8 text-black max-md:max-w-full mt-12">
              Home
            </div>
            <div className="px-16 py-8 mt-6 bg-white rounded border border-solid shadow-sm border-[color:var(--background-background-600,#E8E8E8)] max-md:px-5 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                <div className="flex flex-col max-md:ml-0 max-md:w-full">
                  <Image
                    alt="image"
                    width={0}
                    height={0}
                    loading="lazy"
                    src={patientData.photo}
                    className="w-14 aspect-square max-md:mt-10"
                  />
                </div>
                <div className="flex flex-col max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col self-stretch my-auto text-xs leading-5 text-black max-md:mt-10">
                    <div className="font-semibold">{patientData.name}</div>
                    <div className="flex gap-5 justify-between">
                      <div>{patientData.age} years old</div>
                      <div>{patientData.gender}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center px-7 py-7 mt-6 text-xs font-semibold leading-4 bg-white border border-solid shadow-sm border-[color:var(--background-background-600,#E8E8E8)] text-zinc-500 max-md:px-5 max-md:max-w-full">
              <div className="flex gap-5 justify-between pr-5 max-md:flex-wrap max-md:max-w-full">
                <div className="flex flex-col flex-1">
                  <div>Date of Birth</div>
                  <div className="text-xs font-medium text-black whitespace-nowrap">
                    {patientData.birthday}
                  </div>
                  <div className="mt-8 whitespace-nowrap">Contact Number</div>
                  <div className="text-xs font-medium text-black whitespace-nowrap">
                    {patientData.contact}
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <div>Address</div>
                  <div className="text-xs font-medium text-black ">
                    {patientData.address}
                  </div>
                  <div className="mt-8">Member Since</div>
                  <div className="text-xs font-medium text-black">
                    {patientData.memberSince}
                  </div>
                </div>
                <div className="flex flex-col flex-1 whitespace-nowrap">
                  <div>Allergies</div>
                  <div className="text-xs font-medium text-black">
                    {patientData.allergies.length > 0
                      ? patientData.allergies?.map((allergy) => (
                          <>{allergy.allergen}</>
                        ))
                      : "None"}
                  </div>
                  <div className="mt-8">BMI</div>
                  <div className="text-xs font-medium text-black">
                    {patientData.bmi}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start py-6 pr-20 pl-8 mt-6 text-xs leading-5 text-black bg-white rounded border border-solid shadow-sm border-[color:var(--background-background-600,#E8E8E8)] max-md:px-5 max-md:max-w-full">
              <div className="text-base font-semibold">Latest Care Plan(s)</div>
              <div className="mt-4 font-semibold text-blue-500">
                {careplanData.title ?? "No Careplans Yet"}
              </div>
              <div className="flex gap-1 mt-3.5 whitespace-nowrap">
                <Image
                  alt="image"
                  width={0}
                  height={0}
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d2d16adc26cdf297cc56f2b11bf7445f300308e55e3580060a017039d865f09?"
                  className="self-start w-3 aspect-square"
                />
                <div className="grow">
                  {careplanData.title && "From Dr."}
                  {careplanData.title
                    ? careplanData.contributor[0].display
                    : ""}
                </div>
              </div>
              <div className="flex gap-1 mt-1.5 whitespace-nowrap">
                <Image
                  alt="image"
                  width={0}
                  height={0}
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c143ab5d1cdb22259fa52ecbdeff08a38239d2dc5c1367b795e50464ab9c2249?"
                  className="w-2.5 aspect-square"
                />
                <div className="flex-auto">
                  {careplanData.title ? careplanData.created : ""}
                </div>
              </div>
              <div className="mt-3.5 font-semibold text-blue-500">Details</div>
              <div className="flex gap-5 justify-between pr-8 mt-1.5 max-w-full whitespace-nowrap w-[229px] max-md:pr-5">
                <div className="flex flex-col font-semibold">
                  {careplanData.title &&
                    careplanData.activity?.map((activity) => {
                      return (
                        <div
                          className="flex gap-3"
                          key={activity.detail.code.text}
                        >
                          <div className="mt-1.5">
                            {activity.detail.code.text}:{" "}
                           <span className="font-normal"> {activity.detail.description}</span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-col mt-14 ml-5 w-[40%] max-md:ml-0 max-md:w-full">
          <ScrollArea className="max-md:mt-10 h-[80dvh]">
            <div className="mt-[50px] flex flex-col self-stretch px-10 pt-7 pb-12 m-auto w-full text-xs text-black bg-white rounded border border-solid shadow-sm border-[color:var(--background-background-600,#E8E8E8)] max-md:px-5 max-md:mt-10">
              <div className="flex gap-3 justify-between text-base font-semibold leading-6">
                <Image
                  alt="image"
                  width={0}
                  height={0}
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/5cf686ec2e95bccdc2019a3ed27571cb8d91814d20d6e3653960477e65ab4a27?"
                  className="w-5 aspect-[1.18] fill-black"
                />
                <div className="flex-auto">Notifications</div>

                <Button
                  variant="outline"
                  onClick={() => {
                    notifications.forEach(async (notification) => {
                      console.log(notification);
                      await markAsRead(notification.id);
                    });
                  }}
                >
                  Mark all as read
                </Button>
              </div>
              {notifications?.length > 0
                ? notifications?.map((notification) => (
                    <div
                      key={notification.title}
                      className="border border-[color:var(--background-background-600,#E8E8E8)] shadow-sm bg-white flex justify-between gap-3.5 mt-3.5 pl-5 pr-20 pt-3 pb-6 rounded border-solid items-start max-md:pr-5"
                    >
                      <Bell size={20} />
                      <span className="flex grow basis-[0%] flex-col items-stretch">
                        <div className="text-black text-xs font-medium leading-5">
                          {notification.title}
                        </div>
                        <div className="text-black text-xs leading-5 mt-2.5">
                          {notification.content}{" "}
                          {notification.title === "New Message"
                            ? `from ${notification.sender}`
                            : `by ${notification.sender}`}{" "}
                        </div>
                      </span>
                    </div>
                  ))
                : "No notifications"}

              <div className="flex gap-3 justify-between text-base font-semibold leading-6 mt-10">
                <Image
                  alt="image"
                  width={0}
                  height={0}
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/5cf686ec2e95bccdc2019a3ed27571cb8d91814d20d6e3653960477e65ab4a27?"
                  className="w-5 aspect-[1.18] fill-black"
                />
                <div className="flex-auto">Reminders</div>
              </div>

              {reminders?.length > 0
                ? reminders?.map((reminder) => (
                    <div
                      key={reminder.reminderText}
                      className="border border-[color:var(--background-background-600,#E8E8E8)] shadow-sm bg-white flex justify-between gap-3.5 mt-3.5 pl-5 pr-20 pt-3 pb-6 rounded border-solid items-start max-md:pr-5"
                    >
                      <Bell size={20} />
                      <span className="flex grow basis-[0%] flex-col items-stretch">
                        <div className="text-black text-xs font-medium leading-5">
                          {reminder.reminderText}
                        </div>
                        <div className="text-black text-xs leading-5 mt-2.5">
                          Your Last Visit: {reminder.lastVisit}
                        </div>
                        <div className="text-black text-xs leading-5 mt-2.5">
                          Your Supposed Visit: {reminder.supposedVisit}
                        </div>
                        <div className="text-black text-xs leading-5 mt-2.5">
                          From Dr. {reminder.doctor_name}
                        </div>
                      </span>
                    </div>
                  ))
                : "No reminders"}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
