import { getData } from '@/utils/get-data';

export const state = () => ({
	courses: [],
});

export const mutations = {
	SET_COURSES(state, courses) {
		state.courses = courses;
	},

	ADD_COURSE(state, course) {
		let courses = state.courses.concat(course);
		state.courses = courses;
	},

	EDIT_COURSE(state, course) {
		let v = state.courses.find(v => v.id == course.id);
		v = course;
	},
	DELETE_COURSE(state, courseId) {
		let courses = state.courses.filter(v => v.id != courseId);
		state.courses = courses;
	},
};

export const actions = {
	async loadAll({ commit }) {
		let { data: courses } = await getData('/misc/courses/all', this.$axios);

		commit('SET_COURSES', courses);
	},

	async loadAllCourses({ commit }) {
		let { data: courses } = await getData('/course', this.$axios)

		commit('SET_COURSES', courses)
	},


	async create({ commit }, course) {
		let response = await this.$axios.post('/course/add', course);
		let savedCourse = response.data.data;
		commit('ADD_COURSE', savedCourse);
		return savedCourse;
	},

	async edit({ commit }, course) {
		let response = await this.$axios.put(`/course/update/${course.id}`, course);
		let newCourse = response.data;
		commit('EDIT_COURSE', newCourse);
		return newCourse;
	},

	async delete({ commit }, course) {
		// todo: make this work ** api section **

		let response = await this.$axios.delete(`/course/remove/${course.id}`);
		if (response.status == 200 || response.status == 204) {
			commit('DELETE_COURSE', course.id);
		} else {
			alert(`Error while deleting course`);
		}
	}
};

export const getters = {
	get: state => id => {
		return state.courses.find(v => v.id == id) || {};
	},

	getAllCourseName: state => () => {
		return state.courses.map(c => c.title);
	},

	getCourseId: state => (course_name) => {
		return state.courses.find(c => c.title === course_name);
	},

	getCourseByName: state => title => {
		return state.courses.find(v => v.title == title)
	}
};
