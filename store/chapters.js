import { getData } from '@/utils/get-data';

export const state = () => ({
	chapters: [],
});

export const mutations = {
	SET_CHAPTERS(state, chapters) {
		state.chapters = chapters;
	},

	ADD_CHAPTER(state, chapter) {
		let chapters = state.chapters.concat(chapter);
		state.chapters = chapters;
	},

	EDIT_CHAPTER(state, chapter) {
		let v = state.chapters.find(v => v.id == chapter.id);
		v = chapter;
	},
	DELETE_CHAPTER(state, courseId) {
		let chapters = state.chapters.filter(v => v.id != courseId);
		state.chapters = chapters;
	},
};

export const actions = {
	async loadAllChapters({ commit }, courseId) {
		let { data: chapters } = await getData(`/chapter/${courseId}`, this.$axios);

		commit('SET_CHAPTERS', chapters.data);
	},

	async create({ commit }, chapter) {
		let response = await this.$axios.post('/chapter/add', chapter);
		let savedCourse = response.data.data;
		commit('ADD_CHAPTER', savedCourse);
		return savedCourse;
	},

	async edit({ commit }, chapter) {
		let response = await this.$axios.put(`/chapter/edit/${chapter.id}`, chapter);
		let newCourse = response.data;
		commit('EDIT_CHAPTER', newCourse);
		return newCourse;
	},

	async delete({ commit }, chapter) {
		// todo: make this work ** api section **

		let response = await this.$axios.delete(`/chapter/delete/${chapter.id}`);
		if (response.status == 200 || response.status == 204) {
			commit('DELETE_CHAPTER', chapter.id);
		} else {
			alert(`Error while deleting chapter`);
		}
	}
};

export const getters = {
	get: state => id => {
		return state.chapters.find(v => v.id == id) || {};
	},

	getAllChapterName: state => () => {
		return state.chapters.map(c => c.chapter_name);
	},

};
