
export const strict = false;

export const state = () => ({
	user: [],
	isLoggedIn: false
});

export const mutations = {
	SET_USER(state, user) {
		state.user = user;
		state.isLoggedIn = true;
	},
	SET_LOGGED_IN(state, status) {
		state.isLoggedIn = status;
	}
};

export const actions = {
	setUser({ commit }, user) {
		commit('SET_USER', user);
	},

	toggleLoggedIn({ commit }, status) {
		commit('SET_LOGGED_IN', status)
	}
};

export const getters = {
	isAuthenticated(state) {
		return state.isLoggedIn; // auth object as default will be added in vuex state, when you initialize nuxt auth
	},
	getUserInfo(state) {
		return state.user;
	}
};
