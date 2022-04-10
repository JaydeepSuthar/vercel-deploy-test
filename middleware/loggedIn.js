export default async function ({ $auth }) {

	let user = $auth.$storage.getUniversal('user')

	if (user) {
		// let user in
		console.log(`i got called`)
		$auth.setUser(user)
	}
}
