import { Notification } from "@helpers";
import axiosInstance from ".";

export function apiConfig() {
	async function getRequest(url: string, params: object = {}) {
		try {
			const res = await axiosInstance.get(url, { params });
			return res;
		} catch (error) {
			console.log(error);
		}
	}
	async function postRequest(url: string, body: object = {}) {
		try {
			const res = await axiosInstance.post(url, body);
			Notification("success", "Created");
			return res;

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			Notification("error", error?.message);
		}
	}
	async function deleteRequest(url: string, params: object = {}) {
		try {
			const res = await axiosInstance.delete(url, params);
			Notification("info", "Deleted");
			return res;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			Notification("error", error?.message);
		}
	}
	async function updateRequest(url: string, body: object) {
		try {
			const res = await axiosInstance.patch(url, body);
			Notification("success", "Updated");
			return res;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			// console.log(error);
			Notification("error", error?.response?.data?.message?.message);
		}
	}
	return {
		getRequest,
		postRequest,
		deleteRequest,
		updateRequest,
	};
}
