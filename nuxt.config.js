import colors from 'vuetify/es5/util/colors'

require('dotenv').config()

export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		titleTemplate: '%s - Be a Programmer',
		title: 'Be a Programmer',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'@/assets/main.scss'
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		// { src: '@/plugins/axios.js' }
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/vuetify
		'@nuxtjs/vuetify',
		'@nuxt/postcss8', // postcss for tailwindcss
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
		'@nuxtjs/auth',
		"cookie-universal-nuxt",
		'@nuxt/image',
		'@nuxtjs/cloudinary',
		'@nuxtjs/dotenv',
	],

	cloudinary: {
		cloudName: process.env.CLOUDINARY_CLOUD_NAME,
		apiKey: process.env.CLOUDINARY_API_KEY,
		apiSecret: process.env.CLOUDINARY_API_SECRET,
		useComponent: true
	},

	// image: {
	// 	cloudinary: {
	// 		baseURL: 'https://res.cloudinary.com/be-a-programmer/image/upload/'
	// 	}
	// }

	// Nuxt Auth
	auth: {
		strategies: {
			local: {
				token: {
					property: 'token',
					global: true,
					required: true,
					type: 'Bearer',
					maxAge: ((1000 * 60) * 15) // = 900000 millisecons = 15 min
				},
				user: {
					property: 'user',
					// autoFetch: true
				},
				endpoints: {
					login: { url: '/admin/login', method: 'post' },
					logout: false,
					user: false
				}
			},
			// user: {
			// 	_schema: "local",
			// 	endpoints: {
			// 		login: { url: '/admin/login', method: 'post' },
			// 		logout: false,
			// 		user: false
			// 	}
			// }
			// google: {
			// 	clientId: '...'
			// },
		}
	},


	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		// Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
		baseURL: process.env.API_URL,
		credentials: true
	},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			lang: 'en'
		}
	},

	// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		theme: {
			dark: false,
			default: 'light',
			disable: false,
			// options: {
			// 	cspNonce: undefined,
			// 	customProperties: undefined,
			// 	minifyTheme: undefined,
			// 	themeCache: undefined,
			// },
			themes: {
				light: {
					primary: '#1976D2',
					secondary: '#424242',
					accent: '#82B1FF',
					error: '#FF5252',
					info: '#2196F3',
					success: '#4CAF50',
					warning: '#FB8C00',
				},
				dark: {
					primary: '#2196F3',
					secondary: '#424242',
					accent: '#FF4081',
					error: '#FF5252',
					info: '#2196F3',
					success: '#4CAF50',
					warning: '#FB8C00',
				},
			}
		},
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		postcss: {
			plugins: {
				tailwindcss: {},
				autoprefixer: {},
			},
		},
	}
}
