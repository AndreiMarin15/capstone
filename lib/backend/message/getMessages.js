import { supabase, PROJECT } from "../project/db";
import { currentUser } from "../../../src/app/store";

export const newChat = async (doctorId) => {
  return PROJECT.insertInto("messages_header", {
    patient: currentUser.getState().info.id,
    doctor: doctorId,
  });
};
export const getMessagesAndSubscribe = async (handleInserts) => {
  return supabase
    .channel("messages")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "project", table: "messages" },
      handleInserts
    )
    .subscribe();
};

export const getChatAndSubscribe = async (handleInserts) => {
  return supabase
    .channel("chats")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "project", table: "message_header" },
      handleInserts
    )
    .subscribe();
};

export const getMessages = {
  insertMessage: async (header, message, status) => {
    const { data, error } = await supabase.from("messages").insert({
      message_status: status,
      message: message,
      message_header_id: header,
    });
  },
  updateRead: async (header, status, statusUpdate) => {
    const { data, error } = await supabase
      .from("messages")
      .update({
        message_status: statusUpdate,
      })
      .eq("message_header_id", header)
      .eq("message_status", status);
  },
  getMessage: async (chatID) => {
    console.log("the chat ID: ", chatID);
    const { data, error } = await supabase
      .from("messages_header")
      .select(
        `
        *,
        messages:id(
          message,
          created_at,
          message_status
        ),
        patients:patient(
          personal_information->first_name,
          personal_information->last_name
        ),
        doctors:doctor(
          first_name,
          last_name
        )
      `
      )
      .eq("id", chatID)
      .order("created_at", { referencedTable: "messages", ascending: false });
    console.log(data);
    return data ? data[0] : [];
  },
  getChats: async () => {
    const { data, error } = await supabase
      .from("chats")
      .select(`*`)
      .or(
        `doctor.eq.${currentUser.getState().info.id},patient.eq.${
          currentUser.getState().info.id
        }`
      )
      .order("created_at", { ascending: false });
    return data ? data : [];
  },
  getNotifications: async () => {
    const { data, error } = await supabase
      .from("messages_header")
      .select(
        `
    *,
    messages:id(
      message,
      created_at,
      message_status
    ),
    patients:patient(
      personal_information->first_name,
      personal_information->last_name
    )
    `
      )
      .order("created_at", { referencedTable: "messages", ascending: true });
    console.log(data);
    return data;
  },
};
