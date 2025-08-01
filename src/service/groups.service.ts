import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
import type { ParamsType } from "@types";

export const groupsService = {
	async getGroup(params: ParamsType | {}) {
		const res = await apiConfig().getRequest(ApiUrls.GROUPS, params);
		return res;
	},
	async getGroupById(id: Number) {
		const res = await apiConfig().getRequest(
			`${ApiUrls.GROUPS}/${id}`
		);
		return res;
	},
	async getGroupLessons(id: number) {
		const res = await apiConfig().getRequest(`${ApiUrls.GROUP_LESSONS}/${id}`);
		return res;
	},
	async getGroupStudents(id: number) {
		const res = await apiConfig().getRequest(
			`${ApiUrls.GROUP_STUDENTS_BY_GROUP_ID}/${id}`
		);
		return res;
	},
	async getGroupTeachers(id: number) {
		const res = await apiConfig().getRequest(
			`${ApiUrls.GROUP_TEACHERS_BY_GROUP_ID}/${id}`
		);
		return res;
	},
	async getGroupStudentsById(id: number) {
		const res = await apiConfig().getRequest(
			`${ApiUrls.GET_GROUP_STUDENTS_BY_GROUP_ID}/${id}`
		);
		return res;
	},

	async deleteGroup(id: number) {
		const res = await apiConfig().deleteRequest(`${ApiUrls.GROUPS}/${id}`);
		return res;
	},
	async updateGroup(id: number, body: object) {
		const res = await apiConfig().updateRequest(
			`${ApiUrls.GROUPS}/${id}`,
			body
		);
		return res;
	},
	async createGroup(body: object) {
		const res = await apiConfig().postRequest(`${ApiUrls.GROUPS}`, body);
		return res;
	},

	async addStudentToGroup(data: any) {
		const res = await apiConfig().postRequest(
			`${ApiUrls.GROUP_STUDENTS}`,
			data
		);
		return res;
	},
	async addTeacherToGroup(data: any) {
		const res = await apiConfig().postRequest(
			`${ApiUrls.GROUP_TEACHERS}`,
			data
		);
		return res;
	},
};
