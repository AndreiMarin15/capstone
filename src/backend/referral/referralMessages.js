import { supabase, PROJECT } from "../project/db";
import { currentUser } from "@/app/store";

export const newChat = async (doctorId) => {
	return PROJECT.insertInto("messages_header_referral", {
		doctor1: currentUser.getState().info.id,
		doctor2: doctorId,
	});
};

// Listening to insert messages
export const getMessagesAndSubscribe = async (handleInserts) => {
	return supabase
		.channel("messages_referral")
		.on("postgres_changes", { event: "INSERT", schema: "project", table: "messages_referral" }, handleInserts)
		.subscribe();
};
// Listening to insert chat(new chat between doctor and patient)
export const getChatAndSubscribe = async (handleInserts) => {
	return supabase
		.channel("chats_referral")
		.on("postgres_changes", { event: "INSERT", schema: "project", table: "message_header_referral" }, handleInserts)
		.subscribe();
};
// list of supabase functions
export const getMessages = {
	insertMessage: async (header, message, status) => {
		const { data, error } = await supabase.from("messages_referral").insert({
			message_status: status,
			message: message,
			message_header_id: header,
		});

		const { data: headerData, error: headerError } = await supabase
			.from("messages_header_referral")
			.select("*")
			.eq("id", header);

		if (headerData[0].doctor1 === currentUser.getState().info.id) {
			sendNotification(headerData[0].doctor2, "New Message", "You have a new message", currentUser.getState().user.id);
		} else if (headerData[0].doctor2 === currentUser.getState().info.id) {
			sendNotification(headerData[0].doctor1, "New Message", "You have a new message", currentUser.getState().user.id);
		}
	},
	updateRead: async (header, status, statusUpdate) => {
		const { data, error } = await supabase
			.from("messages_referral")
			.update({
				message_status: statusUpdate,
			})
			.eq("message_header_id", header)
			.eq("message_status", status);
	},
	//patient = chatID mali ng naming convention pero this is for getting the whole message list per chat
	getMessage: async (chatID) => {
		console.log("the chat ID: ", chatID);
		const { data, error } = await supabase
			.from("messages_header_referral")
			.select(
				`
        *,
        messages_referral:id(
          message,
          created_at,
          message_status
        ),
        doctor1:doctor1(
			id,
            first_name,
            last_name
          ),
		doctor2:doctor2(
			id,
			first_name,
			last_name
		)
        
      `
			)
			.eq("id", chatID)
			.order("created_at", { referencedTable: "messages_referral", ascending: false });
		console.log(data);

		return data ? data[0] : [];
	},
	// for rendering the clickable left panel(wiith changing colors)
	getChats: async () => {
		const { data, error } = await supabase
			.from("chats_referral")
			.select(`*`)
			.or(`doctor1.eq.${currentUser.getState().info.id},doctor2.eq.${currentUser.getState().info.id}`)
			.order("created_at", { ascending: false });
		return data ? data : [];
	},
	getNotifications: async () => {
		const { data, error } = await supabase
			.from("messages_header_referral")
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
