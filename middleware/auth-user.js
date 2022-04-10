export default async function ({ $auth, redirect, store }) {

	let user = $auth.$storage.getUniversal('user')

	if (!user) {
		// let user in
		store.dispatch("snackbar/setSnackbar", {
			text: `You must logged in to access this page`,
			color: "danger"
		});
		redirect('/login')
	} else {

	}
}
