import { client } from "./initSupabase";
const supabase = client("project");

export const sendNotification = async (recepient_id, title, content, sender) => {
	const { data: notification, error } = await supabase.from("notifications").insert({
		recepient_id,
		title,
		content,
		sender,
	});

	console.log(notification);
	return notification;
};

export const updateNotification = async (id, read) => {
	const { data: notification, error } = await supabase.from("notifications").update({ read }).match({ id });

	return notification;
};

export const updateNotificationByIdAndTitle = async (id, read, title) => {
	const { data: notification, error } = await supabase.from("notifications").update({ read }).match({ id, title });

	return notification;
};

export const getNotifications = async (recepient_id) => {
	const { data: notifications, error } = await supabase
		.from("notifications")
		.select("*")
		.eq("recepient_id", recepient_id)
		.eq("read", false);
	
	console.log(error)
	console.log(notifications);
	return notifications;
};
