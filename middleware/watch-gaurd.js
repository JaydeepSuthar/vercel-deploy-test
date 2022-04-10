export default async function ({ redirect, from, $auth }) {
	let isIntialPageLoad = !from

	if (isIntialPageLoad) {
		// store.dispatch("snackbar/setSnackbar", {
		// 	text: `You must logged in to access this page`,
		// 	color: "danger"
		// });
		let user = $auth.$storage.getUniversal('user')

		if (user) {
			redirect('/me/learning')
		} else {
			redirect('/login')
		}
	}
}

