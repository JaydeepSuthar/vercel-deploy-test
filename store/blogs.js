import { getData } from '@/utils/get-data';

export const state = () => ({
	blogs: [],
});

export const mutations = {
	SET_BLOGS(state, blogs) {
		state.blogs = blogs;
	}
};

export const actions = {
	async loadAllBlogs({ commit }) {
		let { data: blogsData } = await getData('/blog', this.$axios);
		let blogs = blogsData.data;
		commit('SET_BLOGS', blogs);
	}
};

export const getters = {
	get: state => id => {
		return state.blogs.find(v => v.id == id) || {};
	},

	// getCourseId: state => (course_name) => {
	// 	return state.courses.find(c => c.title === course_name);
	// },

	// getCourseByName: state => title => {
	// 	return state.courses.find(v => v.title == title)
	// }
};

