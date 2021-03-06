module.exports = {
	corePlugins: {
		preflight: false,
	},
	prefix: "tw-",
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
