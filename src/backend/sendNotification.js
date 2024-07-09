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
		.eq("read", false)
		.order("created_at", { ascending: false })
		.limit(5);

	console.log(error);
	console.log(notifications);
	return notifications;
};

export const getSenderData = async (notification_id) => {
	const notification = await supabase.from("notifications").select("*").eq("id", notification_id);
	console.log(notification);
	const sender = notification.data[0]?.sender;

	console.log(sender);
	const doctorData = await supabase.from("doctors").select("*").eq("id", sender);

	const patientData = await supabase.from("patients").select("*").eq("id", sender);

	console.log(doctorData);
	console.log(patientData);
	if (doctorData?.data?.length > 0) {
		return doctorData.data[0].first_name + " " + doctorData.data[0].last_name;
	} else if (patientData?.data?.length > 0) {
		return (
			patientData.data[0].personal_information?.first_name + " " + patientData.data[0].personal_information?.last_name
		);
	} else {
		return null;
	}
};

export const markAsRead = async (notification_id) => {
	const { data: notification, error } = await supabase
		.from("notifications")
		.update({ read: true })
		.eq("id", notification_id);
	console.log(notification);
	return notification;
};
